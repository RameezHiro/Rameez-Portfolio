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

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    // RENDERING (on demand, paused while off-screen)
    // =========================================================

    // Portfolio Final embed: the canvas must never hijack page scroll.
    // Wheel input passes through to the page and vertical touch scrolls
    // naturally; horizontal drags can still orbit the tree.
    controls.enableZoom = false;
    renderer.domElement.style.touchAction = 'pan-y';

    // The scene is static (no time-based uniforms, autoRotate off), so a
    // continuous loop only redraws the same image. Render when something
    // actually changes instead: a control interaction, the damping tail
    // after it, a resize, or the canvas entering the viewport.
    let settleFrameId = 0;
    let settling = false;

    const renderFrame = () => {
      renderer.render(scene, camera);
    };

    // Damping keeps moving the camera after the pointer is released. Follow
    // it only while OrbitControls reports movement, then stop for good.
    const settle = () => {
      settleFrameId = 0;
      settling = true;
      const stillMoving = controls.update();
      settling = false;
      renderFrame();

      if (stillMoving && !prefersReducedMotion) {
        settleFrameId = requestAnimationFrame(settle);
      }
    };

    const startSettling = () => {
      if (settleFrameId || prefersReducedMotion) return;
      settleFrameId = requestAnimationFrame(settle);
    };

    const stopSettling = () => {
      if (!settleFrameId) return;
      cancelAnimationFrame(settleFrameId);
      settleFrameId = 0;
    };

    // OrbitControls updates the camera and dispatches 'change' itself, so
    // drawing here shows the latest position without stepping damping twice.
    const handleControlsChange = () => {
      if (!settling) renderFrame();
    };

    controls.addEventListener('change', handleControlsChange);
    controls.addEventListener('end', startSettling);

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

      renderFrame();
    };

    // The tree lives at the bottom of a long page. Nothing is drawn while it
    // is far off-screen; entering the viewport produces one frame, and any
    // orbit interaction draws on demand.
    const visibilityObserver =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handleResize();
            startSettling();
          } else {
            stopSettling();
          }
        },
        { rootMargin: '200px' }
      );

    visibilityObserver.observe(container);

    // First paint. The observer callback above handles later visibility
    // changes; this guarantees the canvas is not blank if that is delayed.
    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    // =========================================================
    // CLEANUP
    // =========================================================

    return () => {
      stopSettling();

      controls.removeEventListener('change', handleControlsChange);
      controls.removeEventListener('end', startSettling);

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

      if (scene.environment) {
        scene.environment.dispose();
      }

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