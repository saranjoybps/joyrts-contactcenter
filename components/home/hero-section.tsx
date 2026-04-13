import { Anton } from "next/font/google";
import ModelViewport from "./model-viewport";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
});

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative isolate h-[100svh] overflow-hidden pt-2 text-slate-50 sm:pt-3"
    >
      <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute right-[-12rem] top-24 h-[20rem] w-[20rem] rounded-full bg-violet-500/10 blur-3xl" />
      <div className="relative flex h-full w-full flex-col px-4 pt-1 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
          <div className="mt-6 flex min-h-[28rem] w-full items-stretch justify-center pt-2 sm:mt-8 sm:pt-3 lg:mt-12 lg:pt-4">
            <div className="h-full w-full">
              <ModelViewport />
            </div>
          </div>

          <div className="w-full px-4 pb-0 pt-0 text-center sm:px-6 lg:px-8">
            <p
              className={`${anton.className} mx-auto inline-block max-w-[12ch] whitespace-normal text-center text-[clamp(3.25rem,11.5vw,7.5rem)] leading-[0.9] tracking-[-0.045em] bg-[linear-gradient(90deg,#5ef3ff_0%,#4b88ff_45%,#845dff_100%)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)] sm:max-w-none sm:whitespace-nowrap sm:text-[clamp(2.7rem,7vw,7.5rem)] lg:text-[clamp(3.4rem,7vw,7.5rem)]`}
            >
              Speak louder, serve smarter
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-slate-200/80 sm:text-base">
              Premium AI voice support for 24/7 coverage, smarter routing, and
              seamless human handoff.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
