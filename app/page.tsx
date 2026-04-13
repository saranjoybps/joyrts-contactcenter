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
            24/7 support flow
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Keep scrolling to see how our support system stays active
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200/80 sm:text-base">
            This section creates the vertical space needed to showcase the
            experience while reinforcing the message: we provide 24/7 contact
            center coverage, automate calls, and build AI workflows that keep
            support moving without delays.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm font-semibold text-white">Always available</p>
              <p className="mt-2 text-sm leading-6 text-slate-300/80">
                Around-the-clock coverage for every caller, even after hours,
                on weekends, and during spikes.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm font-semibold text-white">Call automation</p>
              <p className="mt-2 text-sm leading-6 text-slate-300/80">
                We capture intent, route calls, and trigger the next step
                without forcing customers to repeat themselves.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm font-semibold text-white">AI workflows</p>
              <p className="mt-2 text-sm leading-6 text-slate-300/80">
                Tickets, follow-ups, CRM updates, and handoffs are automated so
                your team can focus on higher-value work.
              </p>
            </div>
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
