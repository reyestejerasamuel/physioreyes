import React from "react";
import { PhysioreyesLogo } from "./Logo";
import { ReyesSignature } from "./Signature";
import { ArrowRight, Instagram, Linkedin } from "lucide-react";

const HERO_BG =
  "https://static.prod-images.emergentagent.com/jobs/56f02216-427e-4906-ab19-732e12052cb9/images/eeb46645c44a3179e4cdda80f334f2633e165cd007da0946bc00df492954973d.png";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Vertical decorative grid lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[8%] w-px bg-white/5" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5" />
        <div className="absolute top-0 bottom-0 right-[8%] w-px bg-white/5" />
      </div>

      {/* Structured layout: nav padding + meta + content + marquee, no overlap */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top meta strip — pushed below sticky nav (72px) with safe margin */}
        <div className="pt-[110px] pb-6 px-6 lg:px-10">
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4 text-[10px] lg:text-[11px] font-mono-pr tracking-[0.2em] lg:tracking-[0.25em] text-zinc-400 uppercase">
            <span data-testid="hero-meta-location" className="truncate">
              Málaga · España
            </span>
            <span className="hidden lg:inline-flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full shimmer-line" />
              Disponible para consultas
            </span>
            <span
              data-testid="hero-meta-year"
              className="text-right truncate col-start-2 lg:col-start-3"
            >
              2026 · Edición Atleta
            </span>
          </div>
        </div>

        {/* Content row */}
        <div className="flex-1 flex items-center px-6 lg:px-10 pb-24 pt-4 lg:pt-8">
          <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Headline */}
            <div className="lg:col-span-7 fade-up">
              <div
                className="flex items-center gap-3 mb-6 text-[10px] lg:text-[11px] font-mono-pr tracking-[0.3em] text-zinc-400 uppercase"
                data-testid="hero-eyebrow"
              >
                <span className="w-8 h-px bg-[#00D4FF]" />
                Samuel Reyes Tejera · Fisio + CAFYD
              </div>

              <h1
                data-testid="hero-headline"
                className="font-display text-white text-[clamp(2.2rem,5.6vw,5rem)] leading-[0.95] tracking-tighter"
              >
                Donde la <span className="italic font-light">ciencia</span>
                <br />
                del movimiento
                <br />
                se vuelve{" "}
                <span style={{ color: "#00D4FF" }} className="inline-block relative">
                  rendimiento
                  <svg
                    className="absolute left-0 -bottom-3 w-full"
                    viewBox="0 0 400 10"
                    preserveAspectRatio="none"
                    height="8"
                    aria-hidden
                  >
                    <path
                      d="M 2 6 Q 100 1, 200 5 T 398 3"
                      stroke="#00D4FF"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
                <span className="text-white">.</span>
              </h1>

              <p
                data-testid="hero-sub"
                className="mt-10 max-w-xl text-zinc-300 text-base lg:text-lg leading-relaxed"
              >
                Readaptación, rehabilitación y rendimiento basados en evidencia.
                Combino fisioterapia, ciencias del deporte y máster en
                optimización del entrenamiento para llevarte del dolor al pico
                competitivo — sin pasos intermedios borrosos.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 lg:gap-4">
                <a
                  data-testid="hero-cta-primary"
                  href="#contacto"
                  className="group inline-flex items-center gap-3 bg-[#00D4FF] hover:bg-white text-black px-6 lg:px-7 py-3.5 lg:py-4 text-sm font-semibold tracking-tight transition-colors duration-200"
                >
                  Reserva tu valoración
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  data-testid="hero-cta-secondary"
                  href="#sobre-mi"
                  className="inline-flex items-center gap-3 border border-white/20 hover:border-[#00D4FF] hover:text-[#00D4FF] text-white px-6 lg:px-7 py-3.5 lg:py-4 text-sm font-semibold tracking-tight transition-colors duration-200"
                >
                  Conóceme
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  data-testid="hero-social-ig"
                  href="https://www.instagram.com/physioreyes/?hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-[#00D4FF] transition-colors flex items-center gap-2 text-sm"
                >
                  <Instagram size={16} /> @physioreyes
                </a>
                <a
                  data-testid="hero-social-li"
                  href="https://www.linkedin.com/in/samuel-reyes-tejera-74344b290/?locale=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-[#00D4FF] transition-colors flex items-center gap-2 text-sm"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>

            {/* Right: Logo card */}
            <div
              data-testid="hero-logo-card"
              className="lg:col-span-5 fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-black/50 backdrop-blur-md border border-white/10 p-7 lg:p-9 relative">
                <div className="absolute top-3 right-3 text-[10px] font-mono-pr tracking-widest text-zinc-500">
                  BRAND · MARK
                </div>

                <div className="flex justify-center pt-3 pb-2">
                  <PhysioreyesLogo variant="mark" size={140} />
                </div>

                <div className="mt-4 border-t border-white/10 pt-5">
                  <div className="text-[10px] font-mono-pr tracking-[0.25em] text-zinc-500 uppercase mb-2">
                    Firmado
                  </div>
                  <ReyesSignature size={200} color="#00D4FF" />
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  <div className="border border-white/10 py-3">
                    <div className="text-white font-display text-xl leading-none">
                      4
                    </div>
                    <div className="text-[9px] font-mono-pr tracking-widest text-zinc-500 uppercase mt-1.5">
                      Titulaciones
                    </div>
                  </div>
                  <div className="border border-white/10 py-3">
                    <div className="text-white font-display text-xl leading-none">
                      100%
                    </div>
                    <div className="text-[9px] font-mono-pr tracking-widest text-zinc-500 uppercase mt-1.5">
                      Evidencia
                    </div>
                  </div>
                  <div className="border border-white/10 py-3">
                    <div className="text-white font-display text-xl leading-none">
                      1:1
                    </div>
                    <div className="text-[9px] font-mono-pr tracking-widest text-zinc-500 uppercase mt-1.5">
                      Directo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom marquee — in-flow, no longer absolute */}
        <div className="relative border-t border-white/10 bg-black/70 backdrop-blur-md overflow-hidden">
          <div className="flex marquee-track whitespace-nowrap py-3 text-xs font-mono-pr tracking-[0.3em] text-zinc-400 uppercase">
            {Array.from({ length: 2 }).map((_, j) => (
              <div key={j} className="flex shrink-0">
                {[
                  "Readaptación deportiva",
                  "Fuerza & condicionamiento",
                  "Tendinopatías",
                  "Return to play",
                  "Análisis biomecánico",
                  "VBT & RPE",
                  "Lesiones de rodilla",
                  "Core & estabilidad",
                ].map((t, i) => (
                  <span key={i} className="mx-8 inline-flex items-center gap-8">
                    <span className="w-1 h-1 bg-[#00D4FF] rounded-full" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
