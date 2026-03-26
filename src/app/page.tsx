import { Countdown } from './components/countdown';
import { SignupForm } from './components/signup-form';
import { SCRUB_STUDIO_URL } from './lib/constants';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-[#D2BD7F4D] bg-[#EAE3D6]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,189,127,0.2),transparent_45%)]" />

        <div className="relative mx-auto w-[min(1120px,calc(100%-48px))] py-[88px] text-center md:py-[88px] md:pb-[150px] max-md:py-[72px] max-md:pb-[130px] max-sm:w-[min(1120px,calc(100%-32px))]">
          <div className="inline-block rounded-full border border-[#D2BD7F] bg-[#D2BD7F] px-[18px] py-[9px] font-sans text-[11px] uppercase tracking-[0.32em] text-black/70">
            Coming Soon...
          </div>

          <h1 className="mt-[18px] font-serif text-[clamp(3rem,8vw,5.5rem)] font-medium leading-[1.04]">
            <img src="/aluma-botanics-black-logo.svg" alt="Aluma Botanics" className="mx-auto h-[3.5em] w-auto" />
          </h1>

          <p className="mx-auto mt-[22px] max-w-[700px] font-sans text-[1.05rem] leading-[1.8] text-black/70">
            A softer ritual. A fresh botanical glow. Be first to experience the
            new Aluma Botanics vibe when we launch on June 1.
          </p>

          <Countdown />
        </div>
      </section>

      <section className="relative z-10 -mt-16 pb-12 max-sm:-mt-12">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))] max-sm:w-[min(1120px,calc(100%-32px))]">
          <div className="rounded-[32px] border border-[#D2BD7F66] bg-white p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] max-md:px-6 max-md:py-8 max-sm:rounded-[26px]">
            <p className="m-0 font-sans text-xs uppercase tracking-[0.3em] text-black/50">
              Join the Launch List
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,2.8rem)] font-medium leading-[1.15]">
              Be First! Sign Up to Unlock<br />
              Early Access & Free Launch Gift
            </h2>
            <SignupForm />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))] max-sm:w-[min(1120px,calc(100%-32px))]">
          <div className="rounded-[32px] border border-[#D2BD7F4D] bg-[#EAE3D6] px-7 py-10 text-center max-sm:rounded-[26px]">
            <p className="m-0 font-sans text-xs uppercase tracking-[0.3em] text-black/50">
              Shop Now
            </p>
            <h3 className="mt-4 font-serif text-[clamp(2rem,4vw,2.8rem)] font-medium leading-[1.15]">
              Need to order now?
            </h3>
            <p className="mx-auto mt-[18px] max-w-[660px] font-sans text-base leading-[1.8] text-black/70">
              Shop our signature collection at{' '}
              <a
                className="font-semibold underline decoration-[#D2BD7F] underline-offset-4"
                href={SCRUB_STUDIO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Scrub Studio
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
