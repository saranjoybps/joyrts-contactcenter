"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Center, Html, useProgress } from "@react-three/drei";
import React, { Suspense, useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { Group } from "three";

class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ModelErrorState />;
    }

    return this.props.children;
  }
}

function Loader() {
  const { active, progress } = useProgress();

  if (!active) {
    return null;
  }

  return (
    <Html center>
      <div className="flex min-w-44 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-200 shadow-2xl backdrop-blur-md">
        <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
          Loading model
        </span>
        <div className="h-1.5 w-36 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-300 transition-all"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
        <span className="text-slate-300">{Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

function ModelErrorState() {
  return (
    <div className="flex min-h-[30rem] items-center justify-center p-6 text-center">
      <div className="max-w-sm rounded-[1.75rem] border border-white/10 bg-slate-950/80 px-6 py-8 text-slate-50 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">
          3D preview unavailable
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-200/85">
          The voice-support preview could not load{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 text-cyan-100">
            /headphone.glb
          </code>
          . The rest of the page remains usable.
        </p>
      </div>
    </div>
  );
}

function Model() {
  const gltf = useLoader(GLTFLoader, "/headphone.glb");
  const { gl } = useThree();
  const groupRef = useRef<Group>(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const dragOffsetTargetRef = useRef({ x: 0, y: 0 });
  const dragOffsetCurrentRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const canvas = gl.domElement;

    const getPointerPosition = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      return {
        x: clamp(((event.clientX - rect.left) / width) * 2 - 1, -1, 1),
        y: clamp(((event.clientY - rect.top) / height) * 2 - 1, -1, 1),
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      const position = getPointerPosition(event);

      pointerTargetRef.current.x = position.x;
      pointerTargetRef.current.y = position.y;

      if (!isDraggingRef.current) {
        return;
      }

      const dragX = event.clientX - dragStartRef.current.x;
      const dragY = event.clientY - dragStartRef.current.y;

      dragOffsetTargetRef.current.x =
        dragStartRef.current.offsetX + dragY * 0.006;
      dragOffsetTargetRef.current.y =
        dragStartRef.current.offsetY + dragX * 0.008;
    };

    const handlePointerDown = (event: PointerEvent) => {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        offsetX: dragOffsetTargetRef.current.x,
        offsetY: dragOffsetTargetRef.current.y,
      };

      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const handlePointerUp = (event: PointerEvent) => {
      isDraggingRef.current = false;
      canvas.releasePointerCapture(event.pointerId);
      canvas.style.cursor = "grab";
    };

    const handlePointerLeave = () => {
      pointerTargetRef.current.x = 0;
      pointerTargetRef.current.y = 0;
    };

    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    const damping = 1 - Math.exp(-4 * delta);
    pointerCurrentRef.current.x +=
      (pointerTargetRef.current.x - pointerCurrentRef.current.x) * damping;
    pointerCurrentRef.current.y +=
      (pointerTargetRef.current.y - pointerCurrentRef.current.y) * damping;
    dragOffsetCurrentRef.current.x +=
      (dragOffsetTargetRef.current.x - dragOffsetCurrentRef.current.x) * damping;
    dragOffsetCurrentRef.current.y +=
      (dragOffsetTargetRef.current.y - dragOffsetCurrentRef.current.y) * damping;

    const elapsed = performance.now() / 1000;
    const idleX = Math.sin(elapsed * 0.55) * 0.025;
    const idleY = Math.sin(elapsed * 0.45) * 0.04;
    const idleZ = Math.sin(elapsed * 0.35) * 0.01;

    groupRef.current.rotation.x =
      idleX - pointerCurrentRef.current.y * 0.08 + dragOffsetCurrentRef.current.x;
    groupRef.current.rotation.y =
      idleY + pointerCurrentRef.current.x * 0.12 + dragOffsetCurrentRef.current.y;
    groupRef.current.rotation.z = idleZ + pointerCurrentRef.current.x * 0.012;
    groupRef.current.position.y = -0.02 + Math.sin(elapsed * 0.6) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive
          object={gltf.scene}
          scale={1.1}
          rotation={[0, -Math.PI / 4, 0]}
          position={[0, -0.45, 0]}
        />
      </Center>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight position={[4, 6, 5]} intensity={2.6} color="#dbeafe" />
      <spotLight position={[-4, 7, 7]} angle={0.35} penumbra={0.7} intensity={1.2} color="#8be9ff" />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
    </>
  );
}

export default function ModelViewer() {
  return (
    <SceneErrorBoundary>
      <div className="h-full w-full rounded-[2rem]">
        <Canvas
          className="block h-[110%] w-full"
          style={{ touchAction: "none", cursor: "grab" }}
          shadows={false}
          camera={{ position: [0, 0.2, 18], fov: 31, near: 0.1, far: 100 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}
