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

    camera.position.set(0, 6.0, 18.5);

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
    // ANIMATION
    // =========================================================

    let animationFrameId;

    const animate = () => {
      animationFrameId =
        requestAnimationFrame(animate);

    controls.update();

    // Portfolio Final embed: the canvas must never hijack page scroll.
    // Wheel input passes through to the page and vertical touch scrolls
    // naturally; horizontal drags can still orbit the tree.
    controls.enableZoom = false;
    renderer.domElement.style.touchAction = 'pan-y';

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // =========================================================
    // RESIZE
    // =========================================================

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width === 0 || height === 0) return;

      camera.aspect = width / height;

      camera.updateProjectionMatrix();

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
      cancelAnimationFrame(
        animationFrameId
      );

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