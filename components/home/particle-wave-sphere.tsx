"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function createParticleTexture() {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(48, 48, 0, 48, 48, 48);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.42, "rgba(255,255,255,0.35)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 96, 96);

  return new THREE.CanvasTexture(canvas);
}

function createParticleField(count: number) {
  const directions = new Float32Array(count * 3);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const color = new THREE.Color();
  const cyan = new THREE.Color("#5ef3ff");
  const blue = new THREE.Color("#4b88ff");
  const violet = new THREE.Color("#845dff");
  const magenta = new THREE.Color("#ff4fd1");
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const baseRadius = 4.85;

  for (let index = 0; index < count; index += 1) {
    const t = index / Math.max(count - 1, 1);
    const y = 1 - t * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * index;
    const x = Math.cos(theta) * ring;
    const z = Math.sin(theta) * ring;
    const offset = index * 3;
    const belt = 1 - Math.abs(y);

    directions[offset] = x;
    directions[offset + 1] = y;
    directions[offset + 2] = z;

    positions[offset] = x * baseRadius;
    positions[offset + 1] = y * baseRadius;
    positions[offset + 2] = z * baseRadius;

    phases[index] = Math.random() * Math.PI * 2;

    color.copy(cyan).lerp(blue, Math.min(1, belt * 0.95));
    color.lerp(violet, 0.16 + Math.abs(y) * 0.34);
    color.lerp(magenta, Math.max(0, belt - 0.58) * 0.75);

    colors[offset] = color.r;
    colors[offset + 1] = color.g;
    colors[offset + 2] = color.b;
  }

  return { directions, positions, colors, phases };
}

const PARTICLE_COUNT = 5200;
const PARTICLE_FIELD = createParticleField(PARTICLE_COUNT);

function useSphereViewport() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return viewport;
}

function ParticleFallback() {
  return (
    <div className="flex min-h-[32rem] items-center justify-center rounded-[2rem] border border-white/10 bg-[#02040a] p-6">
      <div className="max-w-sm text-center">
        <div className="mx-auto h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(94,243,255,0.34)_0%,_rgba(132,93,255,0.18)_34%,_rgba(2,4,10,0)_72%)] blur-[2px]" />
        <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-100">
          Particle Wave Sphere
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-200/75">
          The orb preview is unavailable, but the section remains styled for the
          same visual direction.
        </p>
      </div>
    </div>
  );
}

function ParticleOrb() {
  const { gl, size } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const particleField = PARTICLE_FIELD;
  const isSmallScreen = size.width < 640;
  const isMediumScreen = size.width >= 640 && size.width < 1024;
  const particleSize = isSmallScreen ? 0.082 : isMediumScreen ? 0.086 : 0.075;
  const haloSize = isSmallScreen ? 0.145 : isMediumScreen ? 0.17 : 0.16;
  const orbitScale = isSmallScreen ? 0.94 : isMediumScreen ? 0.92 : 0.96;
  const geometry = useMemo(() => {
    const bufferGeometry = new THREE.BufferGeometry();

    bufferGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(PARTICLE_FIELD.positions, 3),
    );
    bufferGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(PARTICLE_FIELD.colors, 3),
    );

    return bufferGeometry;
  }, []);
  const particleTexture = useMemo(() => createParticleTexture(), []);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      geometry.dispose();
      particleTexture?.dispose();
    };
  }, [geometry, particleTexture]);

  useEffect(() => {
    const canvas = gl.domElement;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      pointerTargetRef.current.x = clamp(
        ((event.clientX - rect.left) / width) * 2 - 1,
        -1,
        1,
      );
      pointerTargetRef.current.y = clamp(
        ((event.clientY - rect.top) / height) * 2 - 1,
        -1,
        1,
      );
    };

    const handlePointerLeave = () => {
      pointerTargetRef.current.x = 0;
      pointerTargetRef.current.y = 0;
    };

    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [gl]);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const damping = 1 - Math.exp(-4.25 * delta);
    pointerCurrentRef.current.x +=
      (pointerTargetRef.current.x - pointerCurrentRef.current.x) * damping;
    pointerCurrentRef.current.y +=
      (pointerTargetRef.current.y - pointerCurrentRef.current.y) * damping;

    const elapsed = state.clock.getElapsedTime();

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const offset = index * 3;
      const x = particleField.directions[offset];
      const y = particleField.directions[offset + 1];
      const z = particleField.directions[offset + 2];
      const phase = particleField.phases[index];
      const belt = 1 - Math.abs(y);

      const waveA = Math.sin(elapsed * 1.25 + phase + x * 4.2);
      const waveB = Math.cos(elapsed * 0.95 + phase * 1.35 + z * 2.6);
      const waveC = Math.sin(elapsed * 0.5 + phase * 2.1 + belt * 7.0);
      const ripple = waveA * (0.16 + belt * 0.22);
      const twist = waveB * (0.14 + belt * 0.2);
      const lift = waveC * 0.08;
      const radius = 4.85 + ripple + twist * 0.52 + lift;

      particleField.positions[offset] = x * radius + z * twist * 0.26;
      particleField.positions[offset + 1] =
        y * radius + Math.sin(elapsed * 1.65 + phase + z * 2.0) * 0.08;
      particleField.positions[offset + 2] = z * radius - x * twist * 0.26;
    }

    const positionAttribute = geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute | undefined;
    if (!positionAttribute) {
      return;
    }
    positionAttribute.needsUpdate = true;

    groupRef.current.scale.setScalar(orbitScale);
    groupRef.current.rotation.x =
      Math.sin(elapsed * 0.35) * 0.06 - pointerCurrentRef.current.y * 0.1;
    groupRef.current.rotation.y =
      elapsed * 0.18 + pointerCurrentRef.current.x * 0.22;
    groupRef.current.rotation.z = Math.sin(elapsed * 0.25) * 0.02;
    groupRef.current.position.y = Math.sin(elapsed * 0.6) * 0.07;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          map={particleTexture ?? undefined}
          color="#ffffff"
          size={particleSize}
          sizeAttenuation
          transparent
          opacity={0.92}
          vertexColors
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          alphaTest={0.001}
        />
      </points>
      <points geometry={geometry}>
        <pointsMaterial
          map={particleTexture ?? undefined}
          color="#ffffff"
          size={haloSize}
          sizeAttenuation
          transparent
          opacity={0.12}
          vertexColors
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          alphaTest={0.001}
        />
      </points>
    </group>
  );
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#02040a", 12, 32]} />
      <ambientLight intensity={0.75} />
      <Suspense fallback={null}>
        <ParticleOrb />
      </Suspense>
    </>
  );
}

export default function ParticleWaveSphere() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const viewport = useSphereViewport();
  const isSmallScreen = viewport.width > 0 && viewport.width < 640;
  const isMediumScreen = viewport.width >= 640 && viewport.width < 1024;
  const canvasHeightClass = isSmallScreen
    ? "h-[34rem]"
    : isMediumScreen
      ? "h-[38rem]"
      : "h-[46rem]";
  const camera = isSmallScreen
    ? { position: [0, 0, 22.5] as const, fov: 34, zoom: 0.2, near: 0.1, far: 140 }
    : isMediumScreen
      ? { position: [0, 0, 22.8] as const, fov: 29, near: 0.1, far: 140 }
      : { position: [0, 0, 21.6] as const, fov: 26, near: 0.1, far: 140 };
  const dpr: [number, number] = isSmallScreen
    ? [1, 1.5]
    : isMediumScreen
      ? [1, 1.75]
      : [1, 1.9];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  if (prefersReducedMotion) {
    return <ParticleFallback />;
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem]">
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center">
        <p className="max-w-[12ch] bg-[linear-gradient(90deg,#5ef3ff_0%,#4b88ff_42%,#845dff_74%,#ff4fd1_100%)] bg-clip-text text-[clamp(2.55rem,10.2vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-transparent drop-shadow-[0_10px_28px_rgba(0,0,0,0.7)] [text-shadow:0_0_22px_rgba(94,243,255,0.12)] sm:max-w-[13ch] sm:text-[clamp(3.2rem,8vw,7.2rem)] lg:max-w-[14ch] lg:text-[clamp(3.8rem,8.6vw,7.2rem)]">
          Unlock a world of
          <br />
          voice with AI
        </p>
      </div>
      <div className={`relative ${canvasHeightClass}`}>
        <Canvas
          className="block h-full w-full"
          style={{ touchAction: "none" }}
          camera={camera}
          dpr={dpr}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </div>
    </div>
  );
}
