"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

function ModelViewportSkeleton() {
  return (
    <div className="relative mt-4 flex h-full min-h-[30rem] w-full items-center justify-center rounded-[2rem] border border-green-500/50 bg-green-500/10 sm:mt-6 lg:mt-8">
      <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,transparent_10%,rgba(255,255,255,0.05)_24%,transparent_38%)]" />
      <div className="relative h-14 w-14 rounded-full border border-sky-300/30 bg-sky-300/10 shadow-[0_0_40px_rgba(56,189,248,0.2)]" />
    </div>
  );
}

function StaticVoiceFrame() {
  return (
    <div className="relative mt-4 flex h-full min-h-[30rem] w-full items-center justify-center rounded-[2rem] border border-green-500/50 bg-green-500/10 px-6 py-10 sm:mt-6 lg:mt-8">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.02),transparent_24%,rgba(255,255,255,0.01)_52%,transparent_78%)]" />
      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.24em] text-cyan-100 backdrop-blur">
        REDUCED MOTION
      </div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.2em] text-slate-200 backdrop-blur">
        VOICE INTELLIGENCE
      </div>
      <div className="relative flex max-w-sm flex-col items-center gap-6 text-center">
        <div className="relative h-36 w-36">
          <div className="absolute inset-0 rounded-full border border-cyan-300/15 bg-cyan-300/5 blur-[0.5px]" />
          <div className="absolute inset-4 rounded-full border border-white/15 bg-white/5" />
          <div className="absolute inset-8 rounded-full border border-cyan-200/20 bg-cyan-200/10" />
          <div className="absolute inset-12 rounded-full bg-cyan-300/20 blur-2xl" />
          <div className="absolute inset-[4.25rem] rounded-full border border-white/20 bg-slate-950/80 shadow-[0_0_50px_rgba(34,211,238,0.15)]" />
        </div>
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-cyan-100">
            Voice support, simplified
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-200/80">
            A lighter presentation for devices that prefer less motion, while
            keeping the story and call-to-action intact.
          </p>
        </div>
      </div>
    </div>
  );
}

const ModelViewer = dynamic(() => import("./model-viewer"), {
  ssr: false,
  loading: () => <ModelViewportSkeleton />,
});

export default function ModelViewport() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  if (prefersReducedMotion) {
    return <StaticVoiceFrame />;
  }

  return <ModelViewer />;
}
