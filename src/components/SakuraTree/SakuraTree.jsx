import { useEffect, useRef } from "react";
import * as THREE from "three";

import {
  configureCherryBlossomTreeRenderer,
  createCherryBlossomTreeEnvironment,
  createCherryBlossomTreeInspectControls,
  createCherryBlossomTreeLookDevLights,
  createCherryBlossomTreeModel,
} from "./createCherryBlossomTreeModel";

export default function SakuraTree() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // =========================================================
    // RENDERER
    // =========================================================

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    configureCherryBlossomTreeRenderer(renderer);

    container.appendChild(renderer.domElement);

    // =========================================================
    // SCENE
    // =========================================================

    const scene = new THREE.Scene();

    // Portfolio background remains transparent.
    // The parent section controls the actual background.
    scene.background = null;

    scene.environment =
      createCherryBlossomTreeEnvironment(renderer);

    // =========================================================
    // TREE
    // =========================================================

    const tree = createCherryBlossomTreeModel({
      qualityPriority: "reference-fidelity",
      castShadow: true,
      receiveShadow: true,
    });

    scene.add(tree);

    // =========================================================
    // LIGHTING
    // =========================================================

    const lights =
      createCherryBlossomTreeLookDevLights("neutral");

    scene.add(lights);

    // =========================================================
    // CAMERA
    // =========================================================

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    // Fit the whole canopy on narrow portrait screens: pull the camera
    // back as the container gets narrower, so the tree is never cropped
    // on mobile. Desktop framing is unchanged.
    const fitCameraToContainer = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width === 0 || height === 0) return;

      const aspect = width / height;
      const distance = Math.min(
        (18.5 / Math.min(aspect, 1)) * 1.15,
        38
      );

      camera.position.set(0, 6.0, distance);
      camera.aspect = aspect;

      camera.updateProjectionMatrix();
    };

    fitCameraToContainer();

    camera.lookAt(
      0,
      4.9,
      0
    );

    // =========================================================
    // CONTROLS
    // =========================================================

    const controls =
      createCherryBlossomTreeInspectControls(
        camera,
        renderer.domElement
      );

    controls.target.set(
      0,
      4.9,
      0
    );

    controls.update();

    // =========================================================
    // ANIMATION (pauses while off-screen)
    // =========================================================

    // Portfolio Final embed: the canvas must never hijack page scroll.
    // Wheel input passes through to the page and vertical touch scrolls
    // naturally; horizontal drags can still orbit the tree.
    controls.enableZoom = false;
    renderer.domElement.style.touchAction = 'pan-y';

    let animationFrameId = 0;

    const renderFrame = () => {
      controls.update();

      renderer.render(
        scene,
        camera
      );
    };

    const startLoop = () => {
      if (animationFrameId) return;

      const tick = () => {
        animationFrameId =
          requestAnimationFrame(tick);

        renderFrame();
      };

      animationFrameId =
        requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (!animationFrameId) return;

      cancelAnimationFrame(
        animationFrameId
      );

      animationFrameId = 0;
    };

    // The tree lives at the bottom of a long page. Rendering 11k+
    // instanced blossoms with shadows every frame while nobody can see
    // them is the main source of scroll jank — so the loop only runs
    // while the canvas is near the viewport.
    const visibilityObserver =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handleResize();
            renderFrame();
            startLoop();
          } else {
            stopLoop();
          }
        },
        { rootMargin: '200px' }
      );

    visibilityObserver.observe(container);

    startLoop();

    // =========================================================
    // RESIZE
    // =========================================================

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width === 0 || height === 0) return;

      fitCameraToContainer();

      renderer.setSize(
        width,
        height
      );

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 1.5)
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    // =========================================================
    // CLEANUP
    // =========================================================

    return () => {
      stopLoop();

      visibilityObserver.disconnect();

      window.removeEventListener(
        "resize",
        handleResize
      );

      controls.dispose();

      // Dispose tree resources
      tree.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }

        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(
              (material) => material.dispose()
            );
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();

      if (
        container.contains(
          renderer.domElement
        )
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
    />
  );
}