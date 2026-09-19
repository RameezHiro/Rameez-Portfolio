import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export type ProceduralModelOptions = {
  wireframe?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  textureSize?: number;
  textureAnisotropy?: number;
  qualityPriority?: 'reference-fidelity' | 'balanced';
  canopyWidth?: number;
  canopyHeight?: number;
  primaryBranches?: number;
  secondaryBranches?: number;
  tertiaryBranches?: number;
  seed?: number;
  trunkHeight?: number;
  blossomDensity?: number;
};

export type ProceduralModelRuntime = {
  nodes: Record<string, THREE.Object3D>;
  meshes: Record<string, THREE.Mesh>;
  sockets: Record<string, THREE.Object3D>;
  colliders: Record<string, unknown>;
  destructionGroups: Record<string, THREE.Object3D[]>;
};
function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function clampAlbedoChannel(value: number): number {
  return Math.max(30, Math.min(240, Math.round(value)));
}

type SculptMaterialSpec = Record<string, any>;

function readLayerNumber(value: unknown, keys: string[], fallback: number): number {
  if (typeof value === 'number') return value;
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    for (const key of keys) if (typeof record[key] === 'number') return record[key] as number;
  }
  return fallback;
}

function hexToRgb(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.replace('#', ''), 16);
  return [clampAlbedoChannel((value >> 16) & 255), clampAlbedoChannel((value >> 8) & 255), clampAlbedoChannel(value & 255)];
}

function clampedAlbedoColor(spec: SculptMaterialSpec): THREE.Color {
  return new THREE.Color(typeof spec.baseColor === 'string' ? spec.baseColor : '#8A7A5F');
}

function clampPbrMetalness(value: number): number { return value >= 0.5 ? 1 : 0; }
function clampPbrF0(value: number): number { return Math.max(0.02, Math.min(1, value)); }
function clampPbrIor(value: number): number { return Math.max(1, Math.min(2.5, value)); }

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) hash = Math.imul(hash ^ value.charCodeAt(index), 16777619);
  return hash >>> 0;
}

function materialPalette(spec: SculptMaterialSpec): string[] {
  const palette = spec.colorVariation?.palette;
  return Array.isArray(palette) && palette.length > 0
    ? palette.filter((value: unknown): value is string => typeof value === 'string')
    : [spec.baseColor ?? spec.color ?? '#8A7A5F'];
}

type SurfaceBand = { frequency: number; amplitude: number };

function surfaceBands(spec: SculptMaterialSpec): SurfaceBand[] {
  return Array.isArray(spec.surfaceFrequencyBands)
    ? spec.surfaceFrequencyBands.map((band: Record<string, unknown>) => ({
      frequency: typeof band.frequency === 'number' ? band.frequency : 1,
      amplitude: typeof band.amplitude === 'number' ? band.amplitude : 0.1,
    }))
    : [{ frequency: 2, amplitude: 0.42 }, { frequency: 12, amplitude: 0.22 }, { frequency: 56, amplitude: 0.08 }];
}

function sampleSurface(u: number, v: number, bands: SurfaceBand[], seed: number): number {
  let value = 0.5;
  let weight = 0;
  for (const band of bands) {
    const phase = seed * 0.000013 + band.frequency;
    value += Math.sin((u * band.frequency + phase) * Math.PI * 2) * band.amplitude * 0.18;
    value += Math.cos((v * band.frequency - phase) * Math.PI * 2) * band.amplitude * 0.12;
    weight += band.amplitude;
  }
  return weight > 0 ? clamp01(value / (1 + weight * 0.08)) : 0.5;
}

function mixPalette(colors: [number, number, number][], value: number): [number, number, number] {
  if (colors.length === 1) return colors[0];
  const scaled = clamp01(value) * (colors.length - 1);
  const index = Math.min(colors.length - 2, Math.floor(scaled));
  const mix = scaled - index;
  const a = colors[index];
  const b = colors[index + 1];
  return [
    Math.round(THREE.MathUtils.lerp(a[0], b[0], mix)),
    Math.round(THREE.MathUtils.lerp(a[1], b[1], mix)),
    Math.round(THREE.MathUtils.lerp(a[2], b[2], mix)),
  ];
}

type ColorGradientStop = { offset: number; color: string };
type ColorGradientSpec = {
  type: 'linear' | 'radial';
  axis: [number, number];
  stops: ColorGradientStop[];
};

function parseRgba(value: string): [number, number, number] {
  const match = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(value);
  if (!match) return [138, 122, 95];
  return [clampAlbedoChannel(Number(match[1])), clampAlbedoChannel(Number(match[2])), clampAlbedoChannel(Number(match[3]))];
}

// Analytical per-pixel gradient sample. The extraction schema's colorGradient carries
// exact rgba(...) stop colors (see extract_part_color_recipe.py), so this samples the
// same trend directly in JS math rather than round-tripping through a Canvas 2D
// createLinearGradient/createRadialGradient object â€” same visual result, and it composes
// directly with the existing noise/height-correlated colorVariation blend below.
function sampleColorGradient(gradient: ColorGradientSpec, u: number, v: number): [number, number, number] {
  const stops = gradient.stops.length >= 2 ? gradient.stops : [{ offset: 0, color: 'rgba(138,122,95,1)' }, { offset: 1, color: 'rgba(138,122,95,1)' }];
  let t: number;
  if (gradient.type === 'radial') {
    const [cx, cy] = gradient.axis;
    const dx = u - cx;
    const dy = v - cy;
    const maxRadius = Math.max(0.001, Math.hypot(Math.max(cx, 1 - cx), Math.max(cy, 1 - cy)));
    t = clamp01(Math.hypot(dx, dy) / maxRadius);
  } else {
    const [ax, ay] = gradient.axis;
    const projection = (u - 0.5) * ax + (v - 0.5) * ay;
    const maxProjection = 0.5 * (Math.abs(ax) + Math.abs(ay)) || 0.5;
    t = clamp01(projection / maxProjection + 0.5);
  }
  const scaled = t * (stops.length - 1);
  const index = Math.min(stops.length - 2, Math.max(0, Math.floor(scaled)));
  const mix = scaled - index;
  const a = parseRgba(stops[index].color);
  const b = parseRgba(stops[index + 1].color);
  return [
    THREE.MathUtils.lerp(a[0], b[0], mix),
    THREE.MathUtils.lerp(a[1], b[1], mix),
    THREE.MathUtils.lerp(a[2], b[2], mix),
  ];
}

function writePixel(data: Uint8ClampedArray, offset: number, red: number, green: number, blue: number): void {
  data[offset] = Math.max(0, Math.min(255, Math.round(red)));
  data[offset + 1] = Math.max(0, Math.min(255, Math.round(green)));
  data[offset + 2] = Math.max(0, Math.min(255, Math.round(blue)));
  data[offset + 3] = 255;
}

function makeCanvas(size: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

function createMapTexture(
  canvas: HTMLCanvasElement,
  colorSpace: THREE.ColorSpace,
  spec: SculptMaterialSpec,
  options: ProceduralModelOptions,
): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  const projection = spec.textureProjection && typeof spec.textureProjection === 'object' ? spec.textureProjection : {};
  const repeat = Array.isArray(projection.repeat) ? projection.repeat : [2, 2];
  texture.colorSpace = colorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(
    typeof repeat[0] === 'number' ? repeat[0] : 2,
    typeof repeat[1] === 'number' ? repeat[1] : 2,
  );
  texture.anisotropy = Math.max(1, Math.round(options.textureAnisotropy ?? projection.anisotropy ?? 8));
  texture.needsUpdate = true;
  return texture;
}

type ProceduralTextureSet = {
  albedo: THREE.Texture;
  roughness: THREE.Texture;
  height: THREE.Texture;
  normal: THREE.Texture;
  ao: THREE.Texture;
  source: 'reference-pixel-extraction' | 'procedural';
};

function referenceMapUrl(spec: SculptMaterialSpec, channel: string): string | null {
  const reference = spec.referencePbr;
  if (!reference || typeof reference !== 'object') return null;
  if (reference.usable === false) return null;
  const confidence = typeof reference.confidence === 'number'
    ? reference.confidence
    : (typeof reference.estimatedFidelity === 'number' ? reference.estimatedFidelity : 0);
  const threshold = typeof reference.targetThreshold === 'number' ? reference.targetThreshold : 0.7;
  if (confidence < threshold) return null;
  const maps = reference.maps;
  if (!maps || typeof maps !== 'object') return null;
  const map = (maps as Record<string, unknown>)[channel];
  if (!map || typeof map !== 'object') return null;
  const record = map as Record<string, unknown>;
  const url = typeof record.url === 'string' && record.url.trim() ? record.url : record.path;
  return typeof url === 'string' && url.trim() ? url : null;
}

function createLoadedMapTexture(
  url: string,
  colorSpace: THREE.ColorSpace,
  spec: SculptMaterialSpec,
  options: ProceduralModelOptions,
): THREE.Texture {
  const texture = new THREE.TextureLoader().load(url);
  const projection = spec.textureProjection && typeof spec.textureProjection === 'object' ? spec.textureProjection : {};
  const repeat = Array.isArray(projection.repeat) ? projection.repeat : [1, 1];
  texture.colorSpace = colorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(
    typeof repeat[0] === 'number' ? repeat[0] : 1,
    typeof repeat[1] === 'number' ? repeat[1] : 1,
  );
  texture.anisotropy = Math.max(1, Math.round(options.textureAnisotropy ?? projection.anisotropy ?? 8));
  texture.needsUpdate = true;
  return texture;
}

function makeReferenceTextureSet(spec: SculptMaterialSpec, options: ProceduralModelOptions): ProceduralTextureSet | null {
  const albedo = referenceMapUrl(spec, 'albedo');
  const roughness = referenceMapUrl(spec, 'roughness');
  const height = referenceMapUrl(spec, 'height');
  const normal = referenceMapUrl(spec, 'normal');
  const ao = referenceMapUrl(spec, 'ao');
  if (!albedo || !roughness || !height || !normal || !ao) return null;
  return {
    albedo: createLoadedMapTexture(albedo, THREE.SRGBColorSpace, spec, options),
    roughness: createLoadedMapTexture(roughness, THREE.NoColorSpace, spec, options),
    height: createLoadedMapTexture(height, THREE.NoColorSpace, spec, options),
    normal: createLoadedMapTexture(normal, THREE.NoColorSpace, spec, options),
    ao: createLoadedMapTexture(ao, THREE.NoColorSpace, spec, options),
    source: 'reference-pixel-extraction',
  };
}

function makeProceduralTextureSet(
  id: string,
  spec: SculptMaterialSpec,
  options: ProceduralModelOptions,
): ProceduralTextureSet | null {
  if (typeof document === 'undefined') return null;
  const qualityFirst = (options.qualityPriority ?? 'reference-fidelity') === 'reference-fidelity';
  const requested = options.textureSize ?? spec.textureResolution;
  const requestedSize = typeof requested === 'number' && Number.isFinite(requested)
    ? requested
    : (qualityFirst ? 1024 : 512);
  const size = Math.max(256, Math.min(2048, 2 ** Math.round(Math.log2(requestedSize))));
  const canvases = {
    albedo: makeCanvas(size),
    roughness: makeCanvas(size),
    height: makeCanvas(size),
    normal: makeCanvas(size),
    ao: makeCanvas(size),
  };
  const contexts = {
    albedo: canvases.albedo.getContext('2d'),
    roughness: canvases.roughness.getContext('2d'),
    height: canvases.height.getContext('2d'),
    normal: canvases.normal.getContext('2d'),
    ao: canvases.ao.getContext('2d'),
  };
  if (!contexts.albedo || !contexts.roughness || !contexts.height || !contexts.normal || !contexts.ao) return null;
  const images = {
    albedo: contexts.albedo.createImageData(size, size),
    roughness: contexts.roughness.createImageData(size, size),
    height: contexts.height.createImageData(size, size),
    normal: contexts.normal.createImageData(size, size),
    ao: contexts.ao.createImageData(size, size),
  };
  const seed = hashString(id);
  const bands = surfaceBands(spec);
  const heightField = new Float32Array(size * size);
  const roughnessField = new Float32Array(size * size);
  const palette = materialPalette(spec);
  const fallback = typeof spec.baseColor === 'string' ? spec.baseColor : '#8A7A5F';
  const colors = (palette.length >= 2 ? palette : [fallback, '#6E614B', '#A08F70']).map(hexToRgb);
  const baseRoughness = clamp01(readLayerNumber(spec.roughness, ['base'], 0.76));
  const roughnessVariation = clamp01(readLayerNumber(spec.roughness, ['variation'], 0.18));
  const colorAmplitude = clamp01(readLayerNumber(spec.colorVariation, ['amplitude', 'variation'], 0.18));
  const heightCorrelation = clamp01(readLayerNumber(spec.colorVariation, ['heightCorrelation'], 0.3));
  const colorGradient: ColorGradientSpec | undefined = spec.colorGradient;
  for (let y = 0; y < size; y += 1) {
    const v = y / size;
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      const index = y * size + x;
      const height = sampleSurface(u, v, bands, seed + 101);
      const roughNoise = sampleSurface(u, v, bands, seed + 7001);
      const colorNoise = sampleSurface(u, v, bands, seed + 15013);
      heightField[index] = height;
      roughnessField[index] = clamp01(baseRoughness + (roughNoise - 0.5) * roughnessVariation * 2);
      let color: [number, number, number];
      if (colorGradient) {
        // Evidence-derived spatial gradient (Plan 1.3 Workstream C) takes priority
        // over the noise-based palette blend below â€” it is a measured trend, not a guess.
        color = sampleColorGradient(colorGradient, u, v);
      } else {
        const paletteValue = clamp01(
          0.5 + (colorNoise - 0.5) * colorAmplitude * 2 + (height - 0.5) * heightCorrelation
        );
        color = mixPalette(colors, paletteValue);
      }
      writePixel(images.albedo.data, index * 4, color[0], color[1], color[2]);
    }
  }
  const normalStrength = Math.max(0.05, readLayerNumber(spec.normal, ['strength', 'amplitude'], 0.35));
  const aoStrength = clamp01(readLayerNumber(spec.ambientOcclusion, ['cavityStrength', 'strength'], 0.35));
  for (let y = 0; y < size; y += 1) {
    const up = ((y - 1 + size) % size) * size;
    const down = ((y + 1) % size) * size;
    for (let x = 0; x < size; x += 1) {
      const left = (x - 1 + size) % size;
      const right = (x + 1) % size;
      const index = y * size + x;
      const center = heightField[index];
      const dx = (heightField[y * size + right] - heightField[y * size + left]) * normalStrength * 6;
      const dy = (heightField[down + x] - heightField[up + x]) * normalStrength * 6;
      const inverseLength = 1 / Math.sqrt(dx * dx + dy * dy + 1);
      const normalX = -dx * inverseLength;
      const normalY = -dy * inverseLength;
      const normalZ = inverseLength;
      const neighborAverage = (
        heightField[y * size + left] + heightField[y * size + right]
        + heightField[up + x] + heightField[down + x]
      ) * 0.25;
      const cavity = Math.max(0, neighborAverage - center);
      const ao = clamp01(1 - aoStrength * (cavity * 12 + (1 - center) * 0.16));
      const offset = index * 4;
      const heightByte = center * 255;
      const roughnessByte = roughnessField[index] * 255;
      writePixel(images.height.data, offset, heightByte, heightByte, heightByte);
      writePixel(images.roughness.data, offset, roughnessByte, roughnessByte, roughnessByte);
      writePixel(
        images.normal.data, offset,
        (normalX * 0.5 + 0.5) * 255,
        (normalY * 0.5 + 0.5) * 255,
        (normalZ * 0.5 + 0.5) * 255,
      );
      writePixel(images.ao.data, offset, ao * 255, ao * 255, ao * 255);
    }
  }
  contexts.albedo.putImageData(images.albedo, 0, 0);
  contexts.roughness.putImageData(images.roughness, 0, 0);
  contexts.height.putImageData(images.height, 0, 0);
  contexts.normal.putImageData(images.normal, 0, 0);
  contexts.ao.putImageData(images.ao, 0, 0);
  return {
    albedo: createMapTexture(canvases.albedo, THREE.SRGBColorSpace, spec, options),
    roughness: createMapTexture(canvases.roughness, THREE.NoColorSpace, spec, options),
    height: createMapTexture(canvases.height, THREE.NoColorSpace, spec, options),
    normal: createMapTexture(canvases.normal, THREE.NoColorSpace, spec, options),
    ao: createMapTexture(canvases.ao, THREE.NoColorSpace, spec, options),
    source: 'procedural',
  };
}

function createSculptMaterial(id: string, spec: SculptMaterialSpec, options: ProceduralModelOptions, denseComponent = false): THREE.MeshPhysicalMaterial {
  // A material that declares -- with evidence -- that its subject carries no texture
  // detail gets NO texture set. Synthesising one anyway is not a harmless default: the
  // branch below then forces color to white and roughness to 1 and reads both from the
  // generated maps, so the authored albedo and the reference-derived roughness are both
  // discarded, and the model gains mottling the reference does not have. Measured on the
  // tuxedo cat, whose black fur rendered as speckled grey-and-white from a palette that
  // only ever described two flat regions.
  const textureless = (spec.textureless as { declared?: boolean } | undefined)?.declared === true;
  const textures = textureless
    ? null
    : makeReferenceTextureSet(spec, options) ?? makeProceduralTextureSet(id, spec, options);
  const material = new THREE.MeshPhysicalMaterial({
    color: textures ? 0xffffff : clampedAlbedoColor(spec),
    roughness: textures ? 1 : clamp01(readLayerNumber(spec.roughness, ['base'], 0.76)),
    metalness: clampPbrMetalness(readLayerNumber(spec.metalness, ['base'], 0.0)),
    clearcoat: clamp01(readLayerNumber(spec.clearcoat, ['base', 'amount'], 0)),
    clearcoatRoughness: clamp01(readLayerNumber(spec.clearcoatRoughness, ['base'], 0.25)),
    transmission: clamp01(readLayerNumber(spec.transmission, ['base', 'amount'], 0)),
    ior: clampPbrIor(readLayerNumber(spec.ior, ['base', 'value'], 1.5)),
    thickness: Math.max(0, readLayerNumber(spec.thickness, ['base', 'amount'], 0)),
    attenuationDistance: Math.max(0.001, readLayerNumber(spec.attenuationDistance, ['base', 'value'], Infinity)),
    attenuationColor: new THREE.Color(typeof spec.attenuationColor === 'string' ? spec.attenuationColor : '#ffffff'),
    sheen: clamp01(readLayerNumber(spec.sheen, ['base', 'amount'], 0)),
    sheenColor: new THREE.Color(typeof spec.sheenColor === 'string' ? spec.sheenColor : '#ffffff'),
    sheenRoughness: clamp01(readLayerNumber(spec.sheenRoughness, ['base'], 1.0)),
    iridescence: clamp01(readLayerNumber(spec.iridescence, ['base', 'amount'], 0)),
    iridescenceIOR: clampPbrIor(readLayerNumber(spec.iridescenceIOR, ['base', 'value'], 1.3)),
    anisotropy: clamp01(readLayerNumber(spec.anisotropy, ['base', 'amount'], 0)),
    anisotropyRotation: readLayerNumber(spec.anisotropy, ['rotation'], 0),
    specularIntensity: clampPbrF0(readLayerNumber(spec.specularF0 ?? spec.f0 ?? spec.specularIntensity, ['base', 'value'], 1.0)),
    specularColor: new THREE.Color(typeof spec.specularColor === 'string' ? spec.specularColor : '#ffffff'),
    emissive: new THREE.Color(typeof spec.emissive === 'string' ? spec.emissive : '#000000'),
    emissiveIntensity: Math.max(0, readLayerNumber(spec.emissiveIntensity, ['base'], 1.0)),
    opacity: clamp01(readLayerNumber(spec.opacity, ['base'], 1)),
    transparent: readLayerNumber(spec.transmission, ['base', 'amount'], 0) > 0 || readLayerNumber(spec.opacity, ['base'], 1) < 1,
    alphaTest: Math.max(0, readLayerNumber(spec.alpha, ['cutoff', 'alphaTest'], 0)),
    wireframe: options.wireframe ?? false,
    side: spec.doubleSided === true ? THREE.DoubleSide : THREE.FrontSide,
    flatShading: spec.flatShading === true,
  });
  if (textures) {
    material.map = textures.albedo;
    material.roughnessMap = textures.roughness;
    material.normalMap = textures.normal;
    material.normalScale.setScalar(Math.max(0.05, readLayerNumber(spec.normal, ['strength', 'amplitude'], 0.35)));
    material.aoMap = textures.ao;
    material.aoMap.channel = 0;
    material.aoMapIntensity = readLayerNumber(spec.ambientOcclusion, ['cavityStrength', 'strength'], 0.35);
    const denseMesh = denseComponent || spec.denseMesh === true || spec.geometryDensity === 'dense' || spec.topologyClass === 'dense';
    const bumpScale = Math.max(0, readLayerNumber(spec.bump, ['amplitude', 'strength'], 0));
    const effectiveBumpScale = denseMesh ? Math.max(0.05, bumpScale) : bumpScale;
    if (effectiveBumpScale > 0) {
      material.bumpMap = textures.height;
      material.bumpScale = effectiveBumpScale;
    }
    const displacementScale = Math.max(0, readLayerNumber(spec.displacement, ['amplitude', 'strength'], 0));
    const effectiveDisplacementScale = denseMesh ? Math.max(0.005, displacementScale) : displacementScale;
    if (effectiveDisplacementScale > 0) {
      material.displacementMap = textures.height;
      material.displacementScale = effectiveDisplacementScale;
      material.displacementBias = -effectiveDisplacementScale * 0.5;
    }
  }
  material.envMapIntensity = readLayerNumber(spec, ['envMapIntensity'], 0.8);
  material.userData.sculptMaterial = spec;
  material.userData.proceduralMapsIndependent = true;
  material.userData.pbrConstraints = { albedoRange: [30, 240], binaryMetalness: true, f0Range: [0.02, 1], iorRange: [1, 2.5] };
  material.userData.pbrTextureSource = textures?.source ?? 'flat-fallback';
  material.userData.referencePbr = spec.referencePbr ?? null;
  material.userData.referenceMaterialId = spec.referenceMaterialId ?? spec.materialReference?.profileId ?? null;
  material.userData.materialEvidence = spec.materialEvidence ?? null;
  material.userData.validationViews = spec.materialReference?.validationViews ?? [];
  material.needsUpdate = true;
  return material;
}

type AttachmentEndpoint = {
  start: THREE.Vector3;
  midpoint: THREE.Vector3;
  quaternion: THREE.Quaternion;
  length: number;
  baseRadius: number;
  endRadius: number;
};

function readVector3(value: unknown, fallback: [number, number, number]): THREE.Vector3 {
  if (Array.isArray(value) && value.length === 3 && value.every((item) => typeof item === 'number')) {
    return new THREE.Vector3(value[0], value[1], value[2]);
  }
  return new THREE.Vector3(fallback[0], fallback[1], fallback[2]);
}

function readNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function makeAttachmentEndpoint(attachment: unknown): AttachmentEndpoint | null {
  if (!attachment || typeof attachment !== 'object') return null;
  const record = attachment as Record<string, unknown>;
  const start = readVector3(record.localStart, [0, 0, 0]);
  const end = readVector3(record.localEnd, [0, 1, 0]);
  const delta = end.clone().sub(start);
  const length = delta.length();
  if (length <= 0.0001) return null;
  const direction = delta.clone().normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  const baseRadius = Math.max(0.005, readNumber(record.baseRadius, 0.06));
  const endRadius = Math.max(0.003, readNumber(record.endRadius, baseRadius * 0.55));
  return {
    start,
    midpoint: delta.multiplyScalar(0.5),
    quaternion,
    length,
    baseRadius,
    endRadius,
  };
}

// Generated from ObjectSculptSpec target: CherryBlossomTree
// Sculpt build pass: blockout
// This factory is intentionally pass-gated. Finish browser screenshot review before unlocking deeper passes.
export function createCherryBlossomTreeModel(options: ProceduralModelOptions = {}): THREE.Group {
  const root = new THREE.Group();
  root.name = 'CherryBlossomTree';

  const seed = options.seed ?? 42;
  let randomState = (seed >>> 0) || 1;
  const random = (): number => {
    randomState = Math.imul(randomState ^ (randomState >>> 15), 1 | randomState);
    randomState ^= randomState + Math.imul(randomState ^ (randomState >>> 7), 61 | randomState);
    return ((randomState ^ (randomState >>> 14)) >>> 0) / 4294967296;
  };
  const range = (minimum: number, maximum: number): number => minimum + (maximum - minimum) * random();
  const choose = <T,>(values: readonly T[]): T => values[Math.floor(random() * values.length) % values.length];
  const trunkHeight = options.trunkHeight ?? 6.4;
  const canopyWidth = options.canopyWidth ?? 8.6;
  const canopyHeight = options.canopyHeight ?? 5.0;
  const primaryCount = Math.max(4, options.primaryBranches ?? 7);
  const secondaryCount = Math.max(3, options.secondaryBranches ?? 4);
  const tertiaryCount = Math.max(2, options.tertiaryBranches ?? 3);
  const blossomDensity = Math.max(0.35, options.blossomDensity ?? 1);
  const castShadow = options.castShadow ?? true;
  const receiveShadow = options.receiveShadow ?? true;
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x49332a, roughness: 0.96 });
  const branchMaterial = new THREE.MeshStandardMaterial({ color: 0x3a2721, roughness: 0.98 });
  const flowerMaterials = [
    new THREE.MeshStandardMaterial({ color: 0xf3afc9, roughness: 0.86, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0xe982ad, roughness: 0.84, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0xffcddd, roughness: 0.88, side: THREE.DoubleSide }),
  ];
  const centerMaterial = new THREE.MeshStandardMaterial({ color: 0xc96a85, roughness: 0.9 });
  const branchGeometry = new THREE.CylinderGeometry(1, 1, 1, 8, 2);
  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, -0.11);
  petalShape.quadraticCurveTo(0.16, -0.05, 0.12, 0.1);
  petalShape.quadraticCurveTo(0, 0.19, -0.12, 0.1);
  petalShape.quadraticCurveTo(-0.16, -0.05, 0, -0.11);
  const petalGeometry = new THREE.ShapeGeometry(petalShape, 4);
  petalGeometry.scale(1.35, 1.35, 1.35);
  petalGeometry.translate(0, 0.11, 0);
  const centerGeometry = new THREE.SphereGeometry(0.042, 6, 4);
  const branchGroup = new THREE.Group();
  const blossomGroup = new THREE.Group();
  const twigTips: THREE.Vector3[] = [];
  root.add(branchGroup, blossomGroup);

  const addSegment = (start: THREE.Vector3, end: THREE.Vector3, radius: number): THREE.Mesh => {
    const direction = end.clone().sub(start);
    const segment = new THREE.Mesh(branchGeometry, branchMaterial);
    segment.position.copy(start).add(end).multiplyScalar(0.5);
    segment.scale.set(radius, direction.length(), radius * range(0.82, 1.08));
    segment.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    segment.castShadow = castShadow;
    segment.receiveShadow = receiveShadow;
    branchGroup.add(segment);
    return segment;
  };

  const growBranch = (start: THREE.Vector3, direction: THREE.Vector3, length: number, radius: number, depth: number): void => {
    const end = start.clone().add(direction.clone().normalize().multiplyScalar(length));
    const midpoint = start.clone().lerp(end, 0.5).add(new THREE.Vector3(range(-0.2, 0.2), range(-0.08, 0.2), range(-0.2, 0.2)));
    addSegment(start, midpoint, radius);
    addSegment(midpoint, end, radius * 0.82);
    if (depth <= 0) {
      twigTips.push(end);
      return;
    }
    const childCount = depth === 3 ? secondaryCount : depth === 2 ? tertiaryCount : 3;
    const parentDirection = end.clone().sub(start).normalize();
    const side = new THREE.Vector3().crossVectors(parentDirection, new THREE.Vector3(0, 1, 0)).normalize();
    if (side.lengthSq() < 0.01) side.set(1, 0, 0);
    for (let childIndex = 0; childIndex < childCount; childIndex += 1) {
      const angle = ((childIndex - (childCount - 1) / 2) * 0.78) + range(-0.28, 0.28);
      const childDirection = parentDirection.clone().multiplyScalar(0.62)
        .add(side.clone().multiplyScalar(Math.sin(angle)))
        .add(new THREE.Vector3(0, Math.cos(angle) * 0.48 + range(-0.12, 0.2), 0));
      growBranch(end, childDirection, length * range(0.48, 0.7), radius * range(0.48, 0.66), depth - 1);
    }
  };

  const trunkPoints = [
    new THREE.Vector3(0, 0.2, 0),
    new THREE.Vector3(range(-0.08, 0.08), trunkHeight * 0.24, range(-0.08, 0.08)),
    new THREE.Vector3(range(-0.16, 0.16), trunkHeight * 0.5, range(-0.14, 0.14)),
    new THREE.Vector3(range(-0.22, 0.22), trunkHeight * 0.76, range(-0.2, 0.2)),
    new THREE.Vector3(range(-0.28, 0.28), trunkHeight, range(-0.24, 0.24)),
  ];
  const trunkCurve = new THREE.CatmullRomCurve3(trunkPoints);
  const trunk = new THREE.Mesh(
    new THREE.TubeGeometry(trunkCurve, 22, 0.46, 12, false),
    trunkMaterial,
  );
  trunk.scale.set(1.35, 1, 1.35);
  trunk.castShadow = castShadow;
  trunk.receiveShadow = receiveShadow;
  root.add(trunk);
  const baseFlare = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.82, 0.38, 16), trunkMaterial);
  baseFlare.position.y = 0.2;
  baseFlare.scale.z = 0.9;
  baseFlare.castShadow = castShadow;
  baseFlare.receiveShadow = receiveShadow;
  root.add(baseFlare);

  for (let branchIndex = 0; branchIndex < primaryCount; branchIndex += 1) {
    const angle = (branchIndex / primaryCount) * Math.PI * 2 + range(-0.3, 0.3);
    const start = new THREE.Vector3(
      range(-0.18, 0.18),
      trunkHeight * range(0.44, 0.64),
      range(-0.18, 0.18),
    );
    const direction = new THREE.Vector3(
      Math.cos(angle) * range(0.72, 1.05),
      range(0.08, 0.48) + (branchIndex % 3 === 0 ? -0.12 : 0),
      Math.sin(angle) * range(0.72, 1.05),
    );
    growBranch(start, direction, range(canopyWidth * 0.31, canopyWidth * 0.48), range(0.2, 0.28), 3);
  }

  // Upper leaders prevent the mature crown from collapsing into a shallow umbrella.
  const leaderStart = new THREE.Vector3(trunkPoints[trunkPoints.length - 1].x, trunkHeight * 0.88, trunkPoints[trunkPoints.length - 1].z);
  growBranch(leaderStart, new THREE.Vector3(range(-0.18, 0.05), 0.95, range(-0.12, 0.12)), canopyHeight * 0.42, 0.16, 2);
  growBranch(leaderStart.clone().add(new THREE.Vector3(0.05, -0.18, 0)), new THREE.Vector3(range(0.04, 0.24), 0.9, range(-0.16, 0.16)), canopyHeight * 0.38, 0.14, 2);
  growBranch(leaderStart.clone().add(new THREE.Vector3(-0.06, -0.22, 0.05)), new THREE.Vector3(range(-0.24, -0.04), 0.78, range(0.08, 0.22)), canopyHeight * 0.34, 0.13, 2);

  const flowerCount = Math.max(2200, Math.floor(twigTips.length * 52 * blossomDensity));
  const flowersPerCluster = 5;
  const petalInstances = flowerMaterials.map((material) => new THREE.InstancedMesh(petalGeometry, material, flowerCount * flowersPerCluster));
  const centerInstances = new THREE.InstancedMesh(centerGeometry, centerMaterial, flowerCount);
  // Thousands of petals do not need individual shadow-map passes. Keep the trunk and
  // branch shadows for depth, while the blossom canopy is lit in the main color pass.
  petalInstances.forEach((mesh) => { mesh.castShadow = false; mesh.receiveShadow = false; blossomGroup.add(mesh); });
  centerInstances.castShadow = false;
  centerInstances.receiveShadow = false;
  blossomGroup.add(centerInstances);

  const flowerTransform = new THREE.Object3D();
  const centerTransform = new THREE.Object3D();
  const flowerCenter = new THREE.Vector3();
  let instanceIndex = 0;
  const trunkCenter = new THREE.Vector3(0, trunkHeight * 0.68, 0);
  const anchors = twigTips.flatMap((tip) => [
    tip,
    tip.clone().lerp(trunkCenter, 0.22),
    tip.clone().lerp(trunkCenter, 0.46),
    tip.clone().multiplyScalar(0.72).setY(tip.y - canopyHeight * 0.18),
  ]);
  // Add a restrained interior layer around the actual branch network so the mature crown
  // is full in depth, not just decorated at its terminal twigs.
  for (let anchorIndex = 0; anchorIndex < 260; anchorIndex += 1) {
    const x = range(-canopyWidth * 0.48, canopyWidth * 0.48);
    const z = range(-canopyWidth * 0.34, canopyWidth * 0.34);
    const y = trunkHeight * 0.54 + range(0, canopyHeight * 0.92);
    const normalized = (x / (canopyWidth * 0.52)) ** 2 + (z / (canopyWidth * 0.38)) ** 2 + ((y - (trunkHeight * 0.54 + canopyHeight * 0.45)) / (canopyHeight * 0.62)) ** 2;
    if (normalized < 1.15) anchors.push(new THREE.Vector3(x, y, z));
  }
  for (let clusterIndex = 0; clusterIndex < flowerCount; clusterIndex += 1) {
    const twig = choose(anchors);
    flowerCenter.copy(twig).add(new THREE.Vector3(range(-0.26, 0.26), range(-0.18, 0.22), range(-0.26, 0.26)));
    const clusterRadius = range(0.08, 0.25);
    for (let petalIndex = 0; petalIndex < flowersPerCluster; petalIndex += 1) {
      const angle = (petalIndex / flowersPerCluster) * Math.PI * 2 + range(-0.12, 0.12);
      flowerTransform.position.set(flowerCenter.x + Math.cos(angle) * clusterRadius, flowerCenter.y + Math.sin(angle) * clusterRadius, flowerCenter.z + range(-0.05, 0.05));
      flowerTransform.rotation.set(range(-0.5, 0.5), range(0, Math.PI * 2), angle);
      flowerTransform.scale.set(range(0.78, 1.18), range(0.72, 1.05), range(0.72, 1.05));
      flowerTransform.updateMatrix();
      petalInstances[instanceIndex % flowerMaterials.length].setMatrixAt(instanceIndex, flowerTransform.matrix);
      instanceIndex += 1;
    }
    centerTransform.position.copy(flowerCenter).add(new THREE.Vector3(0, 0.02, 0));
    centerTransform.rotation.set(range(-0.3, 0.3), range(0, Math.PI * 2), 0);
    centerTransform.scale.setScalar(range(0.8, 1.15));
    centerTransform.updateMatrix();
    centerInstances.setMatrixAt(clusterIndex, centerTransform.matrix);
  }
  petalInstances.forEach((mesh) => { mesh.instanceMatrix.needsUpdate = true; });
  centerInstances.instanceMatrix.needsUpdate = true;
  root.userData.sculptRuntime = {
    nodes: { root, trunk, branchGroup, blossomGroup },
    meshes: { trunk },
    sockets: {},
    colliders: {},
    destructionGroups: { trunk: [trunk], canopy: [branchGroup, blossomGroup] },
  } satisfies ProceduralModelRuntime;
  root.userData.materialPipeline = { trunk: 'bark', branches: 'bark', blossoms: 'instanced-petals' };
  root.userData.reconstructionEvidence = { itemFamily: 'tree', subtype: 'cherry-blossom', route: 'hierarchical-branching', exactnessTier: 'stylized-realistic' };
  return root;

  {
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: 0x3f2920,
    roughness: 0.92,
    metalness: 0.0,
  });
  const branchMaterial = new THREE.MeshStandardMaterial({
    color: 0x2f1d18,
    roughness: 0.95,
    metalness: 0.0,
  });
  const blossomMaterial = new THREE.MeshStandardMaterial({
    color: 0xe66f9d,
    roughness: 0.8,
    metalness: 0.05,
  });
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x86b77d,
    roughness: 0.8,
    metalness: 0.0,
  });

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.62, 5.2, 18), trunkMaterial);
  trunk.position.y = 2.6;
  trunk.castShadow = options.castShadow ?? true;
  trunk.receiveShadow = options.receiveShadow ?? true;
  root.add(trunk);

  const branchGroup = new THREE.Group();
  root.add(branchGroup);

  const addBranch = (start: THREE.Vector3, end: THREE.Vector3, radius: number): void => {
    const direction = end.clone().sub(start);
    const branch = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.58, radius, direction.length(), 10),
      branchMaterial,
    );
    branch.position.copy(start).add(end).multiplyScalar(0.5);
    branch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    branch.castShadow = options.castShadow ?? true;
    branch.receiveShadow = options.receiveShadow ?? true;
    branchGroup.add(branch);
  };

  const baseFlare = new THREE.Mesh(
    new THREE.CylinderGeometry(0.78, 0.98, 0.58, 14),
    trunkMaterial,
  );
  baseFlare.position.y = 0.28;
  baseFlare.scale.z = 0.82;
  baseFlare.castShadow = options.castShadow ?? true;
  baseFlare.receiveShadow = options.receiveShadow ?? true;
  root.add(baseFlare);

  [
    [[-0.15, 0.35, 0.0], [-0.95, 0.12, 0.18]],
    [[0.15, 0.35, 0.0], [0.9, 0.1, -0.2]],
    [[0.0, 0.38, 0.12], [-0.2, 0.08, 0.9]],
    [[0.0, 0.38, -0.12], [0.25, 0.08, -0.85]],
  ].forEach(([start, end]) => {
    addBranch(
      new THREE.Vector3(...(start as [number, number, number])),
      new THREE.Vector3(...(end as [number, number, number])),
      0.18,
    );
  });

  [
    [[-0.12, 3.0, 0.0], [-1.75, 4.55, 0.25], 0.19],
    [[0.12, 3.05, 0.0], [1.8, 4.65, -0.2], 0.19],
    [[-0.08, 3.75, 0.0], [-1.4, 5.35, -0.35], 0.15],
    [[0.08, 3.8, 0.0], [1.45, 5.4, 0.3], 0.15],
    [[-0.05, 4.35, 0.0], [-0.85, 6.0, 0.25], 0.11],
    [[0.05, 4.4, 0.0], [0.9, 6.05, -0.2], 0.11],
  ].forEach(([start, end, radius]) => {
    addBranch(
      new THREE.Vector3(...(start as [number, number, number])),
      new THREE.Vector3(...(end as [number, number, number])),
      radius as number,
    );
  });

  /* Keep the canopy slightly wider than the trunk without turning the limbs into spikes. */
  // The source coordinates are front-view heavy; expand depth so rotation never collapses
  // the tree into a thin column.
  branchGroup.scale.set(1.22, 1.08, 1.6);
  branchGroup.position.y = -0.2;

  const blossomGroup = new THREE.Group();
  root.add(blossomGroup);

  const bloomCenters = [
    [-2.7, 4.1, 0.2], [-2.05, 4.4, 0.75], [-1.35, 4.25, -0.45], [-0.55, 4.55, 0.4],
    [0.55, 4.25, -0.65], [1.35, 4.4, 0.3], [2.05, 4.1, -0.2], [2.7, 4.4, 0.5],
    [-3.05, 4.0, 0.0], [3.05, 4.05, 0.1], [-2.65, 4.45, -0.55], [2.65, 4.5, 0.55],
    [-2.8, 4.85, -0.35], [-2.15, 5.0, 0.45], [-1.35, 5.1, -0.65], [-0.55, 5.2, 0.25],
    [0.55, 5.05, -0.35], [1.35, 5.15, 0.65], [2.15, 5.0, -0.5], [2.8, 4.85, 0.15],
    [-2.55, 5.45, 0.35], [-1.85, 5.45, -0.25], [-0.95, 5.45, 0.2], [0.0, 5.5, -0.2],
    [0.95, 5.45, 0.25], [1.85, 5.45, -0.2], [2.55, 5.45, 0.3],
    [-1.65, 4.75, 0.0], [-0.8, 4.85, 0.15], [0.0, 4.8, 0.0], [0.8, 4.85, -0.15], [1.65, 4.75, 0.0],
    [-1.4, 5.55, -0.1], [-0.5, 5.65, 0.1], [0.45, 5.62, -0.1], [1.4, 5.55, 0.1],
    [-2.35, 5.6, 0.1], [-1.45, 5.7, -0.55], [-0.65, 5.85, 0.55], [0.6, 5.75, -0.5],
    [1.45, 5.7, 0.45], [2.35, 5.6, -0.3], [-1.35, 6.35, 0.1], [0.0, 6.5, -0.35],
    [1.35, 6.35, 0.3],
    [-1.8, 6.05, 0.35], [-0.9, 6.15, -0.25], [0.0, 6.2, 0.2], [0.9, 6.15, -0.25], [1.8, 6.05, 0.3],
    [-1.55, 6.45, 0.25], [1.55, 6.45, -0.2],
  ].map(([x, y, z]) => new THREE.Vector3(x, y, z));

  bloomCenters.forEach((center, index) => {
    const cluster = new THREE.Group();
    cluster.position.copy(center);
    cluster.rotation.y = index * 0.8;

    for (let petalIndex = 0; petalIndex < 34; petalIndex += 1) {
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.125, 10, 8), petalIndex % 5 === 0
        ? new THREE.MeshStandardMaterial({ color: 0xf08ab0, roughness: 0.82 })
        : blossomMaterial);
      const angle = petalIndex * 2.399963;
      const radius = 0.12 + (petalIndex % 7) * 0.065;
      petal.position.set(
        Math.cos(angle) * radius,
        ((petalIndex % 6) - 2.5) * 0.11 + Math.sin(angle * 1.7) * 0.08,
        Math.sin(angle) * radius * 0.8,
      );
      petal.scale.set(1.18, 0.9, 1.04);
      petal.castShadow = options.castShadow ?? true;
      petal.receiveShadow = options.receiveShadow ?? true;
      cluster.add(petal);
    }

    const centerBloom = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xc93f78, roughness: 0.7 }),
    );
    centerBloom.castShadow = options.castShadow ?? true;
    centerBloom.receiveShadow = options.receiveShadow ?? true;
    cluster.add(centerBloom);
    blossomGroup.add(cluster);
  });
  blossomGroup.scale.set(1.5, 1.8, 2.8);
  blossomGroup.position.y = -2.35;

  const leafGroup = new THREE.Group();
  root.add(leafGroup);

  const leafPositions: number[][] = [];

  leafPositions.forEach((position, index) => {
    const leaf = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 8, 8),
      index % 2 === 0 ? leafMaterial : new THREE.MeshStandardMaterial({ color: 0x7ca567, roughness: 0.85 }),
    );
    leaf.position.set(position[0], position[1], position[2]);
    leaf.scale.set(1.8, 0.7, 1.2);
    leaf.castShadow = options.castShadow ?? true;
    leaf.receiveShadow = options.receiveShadow ?? true;
    leafGroup.add(leaf);
  });

  const nodes: Record<string, THREE.Object3D> = { root, trunk, branchGroup, blossomGroup, leafGroup };
  const meshes: Record<string, THREE.Mesh> = { trunk, branch: branchGroup.children[0] as THREE.Mesh };
  const sockets: Record<string, THREE.Object3D> = {};
  const colliders: Record<string, unknown> = {};
  const destructionGroups: Record<string, THREE.Object3D[]> = {
    trunk: [trunk],
    canopy: [blossomGroup, leafGroup],
  };

  root.userData.sculptRuntime = { nodes, meshes, sockets, colliders, destructionGroups } satisfies ProceduralModelRuntime;
  root.userData.materialPipeline = { trunk: 'wood', branches: 'wood', blossoms: 'petals', leaves: 'foliage' };
  root.userData.reconstructionEvidence = {
    itemFamily: 'tree',
    subtype: 'cherry-blossom',
    componentAdapter: 'procedural-tree-blockout',
    route: 'trunk-and-canopy',
    exactnessTier: 'stylized',
  };

  return root;
  }
}

export function createCherryBlossomTreeLookDevLights(
  mode: 'neutral' | 'grazing' | 'reference' = 'neutral',
): THREE.Group {
  const lights = new THREE.Group();
  lights.name = "CherryBlossomTree look-dev lights";
  const hemi = new THREE.HemisphereLight(
    mode === 'reference' ? 0xfff0d6 : 0xf2f4ff,
    0x363b42,
    mode === 'grazing' ? 0.28 : mode === 'reference' ? 0.72 : 0.85,
  );
  lights.add(hemi);
  const key = new THREE.DirectionalLight(
    mode === 'reference' ? 0xffcf8a : 0xfff4e8,
    mode === 'grazing' ? 4.2 : mode === 'reference' ? 2.6 : 2.15,
  );
  if (mode === 'grazing') key.position.set(7.5, 1.1, 4.0);
  else if (mode === 'reference') key.position.set(-4.5, 7.5, 5.0);
  else key.position.set(-4.0, 6.0, 5.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.00025;
  key.shadow.normalBias = 0.018;
  key.shadow.radius = 7;
  key.shadow.blurSamples = 24;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 30;
  key.shadow.camera.left = -2.6;
  key.shadow.camera.right = 2.6;
  key.shadow.camera.top = 2.6;
  key.shadow.camera.bottom = -2.6;
  key.shadow.camera.updateProjectionMatrix();
  lights.add(key);
  const fill = new THREE.DirectionalLight(0xa8c4ff, mode === 'grazing' ? 0.12 : 0.42);
  fill.position.set(4.0, 3.0, 3.5);
  lights.add(fill);
  const rim = new THREE.DirectionalLight(0xfff1c4, mode === 'grazing' ? 0.28 : 0.85);
  rim.position.set(0.5, 4.5, -6.0);
  lights.add(rim);
  lights.userData.reviewMode = mode;
  lights.userData.lightingFromPhoto = [];
  lights.userData.lookDevTargets = {"qualityPriority": "reference-fidelity", "materialPass": {"albedoPaletteRequired": true, "roughnessVariationRequired": true, "normalOrBumpRequired": true, "localOverridesRequired": true, "minimumTextureResolution": 1024, "preferredTextureResolution": 2048, "independentMapChannels": ["albedo", "roughness", "height", "normal", "ambient-occlusion"], "requiredSurfaceFrequencyBands": ["macro", "meso", "micro"], "geometryReliefRequiredWhenSilhouetteAffected": true, "referencePbrExtraction": {"requiredWhenSourceImagePresent": true, "targetThreshold": 0.7, "stopOnLowConfidence": true, "script": "forge/stage1_intake/extract_pbr_evidence.py", "acceptedLimitation": "single-image extraction is reference-derived inference, not exact photogrammetry"}, "mustAvoid": ["single flat albedo per material", "uniform roughness", "albedo texture reused as roughness/height/normal/AO", "single-frequency random noise", "plastic-looking smooth bark, stone, cloth, foliage, or aged material", "local color/detail described only in prose without material masks", "claiming exact PBR recovery when confidence is below the target threshold"]}, "lightingPass": {"requiredTerms": ["key light", "fill light", "rim or environment light", "exposure", "tone mapping", "background", "contact shadow"], "mustAvoid": ["ambient-only lighting", "flat value range", "missing contact shadow", "reference lighting copied without separating material readability"]}, "screenshotReview": ["Compare albedo palette and local color zones.", "Compare roughness/normal/bump response under light.", "Compare cavity dirt, edge wear, stains, moss, scratches, or other local masks.", "Compare key/fill/rim structure, exposure, tone mapping, background, and contact shadows.", "Capture a neutral-light render to verify material readability without reference lighting.", "Capture a grazing-light close-up to expose flat normals, uniform roughness, tiling, and plastic highlights.", "Capture a reference-matched render from the same camera framing as the source."]};
  return lights;
}

// PBR materials (clearcoat/iridescence/transmission/anisotropy) need an environment
// map to visually behave as intended â€” call this once per renderer and assign the
// result to scene.environment before rendering. No external HDR asset required.
export function createCherryBlossomTreeEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  return texture;
}

// Plan 1.3 Â§3.2 â€” auto-framing by bounding box. The Divine Eye can only compare a
// render to the reference if the object is FRAMED consistently (an object framed
// differently scores as wrong even when its shape is right). This positions the camera
// deterministically from the object's bounding box so it fills the frame at a stable
// margin, and sets near/far to the object scale. Call after adding the model to the
// scene, and again on resize (after updating camera.aspect).
export function frameCherryBlossomTreeCamera(
  camera: THREE.PerspectiveCamera,
  object: THREE.Object3D,
  options: { margin?: number; azimuthDeg?: number; elevationDeg?: number } = {},
): void {
  const box = new THREE.Box3().setFromObject(object);
  if (box.isEmpty()) return;
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const margin = options.margin ?? 1.15;
  const maxDim = Math.max(size.x, size.y, size.z) * margin;
  const fov = (camera.fov * Math.PI) / 180;
  // distance so the largest object dimension fits vertically in the frame
  const distance = (maxDim / 2) / Math.tan(fov / 2);
  const az = ((options.azimuthDeg ?? 0) * Math.PI) / 180;
  const el = ((options.elevationDeg ?? 0) * Math.PI) / 180;
  const dir = new THREE.Vector3(
    Math.sin(az) * Math.cos(el),
    Math.sin(el),
    Math.cos(az) * Math.cos(el),
  );
  camera.position.copy(center).addScaledVector(dir, distance);
  camera.near = Math.max(0.01, distance - maxDim);
  camera.far = distance + maxDim * 2;
  camera.lookAt(center);
  camera.updateProjectionMatrix();
}

// Plan 1.3 Â§3.2c â€” PRESENTATION composer (DOF + bloom). CRITICAL (R-POSTFX): this is
// for the showcase/hero render ONLY. The Divine Eye's EVALUATION render MUST use a
// plain renderer with NO composer â€” bloom blows highlights and DOF blurs edges, which
// would corrupt the deterministic IoU/DCD/edge/blowout signals. Enable dof/bloom ONLY
// when the reference photo actually exhibits them (detect_reference_effects.py authorizes).
export function createCherryBlossomTreePresentationComposer(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  options: { dof?: boolean; bloom?: boolean; bloomStrength?: number; dofFocus?: number; dofAperture?: number } = {},
): EffectComposer {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  if (options.dof) {
    composer.addPass(new BokehPass(scene, camera, {
      focus: options.dofFocus ?? 10.0,
      aperture: options.dofAperture ?? 0.0002,
      maxblur: 0.01,
    }));
  }
  if (options.bloom) {
    const size = new THREE.Vector2();
    renderer.getSize(size);
    composer.addPass(new UnrealBloomPass(size, options.bloomStrength ?? 0.4, 0.4, 0.85));
  }
  return composer;
}

export function configureCherryBlossomTreeRenderer(renderer: THREE.WebGLRenderer): void {
  // Load-bearing for view-dependent finishes (anodized / Doppler): without ACES + sRGB
  // the environment reflection reads flat/washed instead of a believable metal response.
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
}

export function createCherryBlossomTreeInspectControls(
  camera: THREE.Camera,
  domElement: HTMLElement,
): OrbitControls {
  // View-dependent finishes only read correctly once the user orbits â€” their color
  // comes from the environment reflection, not albedo, so free rotation matters here.
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.minDistance = 1.0;
  controls.maxDistance = 40.0;
  controls.autoRotate = false;
  return controls;
}
