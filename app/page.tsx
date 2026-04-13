import HeroSection from "@/components/home/hero-section";
import CustomerSupportSection from "@/components/home/customer-support-section";
import ContactFormSection from "@/components/home/contact-form-section";
import FooterSection from "@/components/home/footer-section";
import NeonAudioSpectrumWave from "@/components/home/neon-audio-spectrum-wave";
import ParticleWaveSphere from "@/components/home/particle-wave-sphere";
import ToolStackSection from "@/components/home/tool-stack-section";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <section className="mx-auto w-full max-w-5xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur sm:p-8">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">
            Scroll test content
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Keep scrolling to watch the 3D model react
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200/80 sm:text-base">
            This extra section exists so the page has real vertical overflow for
            testing the scroll-linked rotation. As you move down the page, the
            model should speed up in the scroll direction and ease back to a
            stop when you pause.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm font-semibold text-white">Scroll down</p>
              <p className="mt-2 text-sm leading-6 text-slate-300/80">
                The model should rotate with the direction and speed of your
                scroll.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm font-semibold text-white">Pause</p>
              <p className="mt-2 text-sm leading-6 text-slate-300/80">
                When scrolling stops, the motion should ease out naturally.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm font-semibold text-white">Scroll up</p>
              <p className="mt-2 text-sm leading-6 text-slate-300/80">
                The direction should reverse without snapping.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-32 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(15,23,42,0.5))] p-6">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-cyan-100">
              Interaction notes
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-200/80">
              This is a simple test harness for the scroll behavior, so we can
              tune sensitivity and easing before wiring it into the real page
              sections.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(124,58,237,0.12),rgba(15,23,42,0.5))] p-6">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-violet-100">
              Extra spacing
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-200/80">
              The extra height below gives the browser enough room to scroll,
              even if the viewport is tall.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <ParticleWaveSphere />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-0 max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            <span className="bg-[linear-gradient(90deg,#5ef3ff_0%,#4b88ff_45%,#845dff_100%)] bg-clip-text text-transparent">
              AI voice
            </span>{" "}
            that answers first.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200/80 sm:text-base">
            Greet callers instantly, route requests, and keep every call
            moving without needing a front desk.
          </p>
        </div>

        <NeonAudioSpectrumWave />

        <div className="mt-1 flex flex-wrap justify-center gap-3 text-sm text-slate-200/80">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            24/7 answering
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            Smart routing
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            Faster handoff
          </span>
        </div>
      </section>

      <CustomerSupportSection />

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <ToolStackSection />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-28 pt-4 sm:px-6 lg:px-8">
        <ContactFormSection />
      </section>

      <FooterSection />
    </main>
  );
}
