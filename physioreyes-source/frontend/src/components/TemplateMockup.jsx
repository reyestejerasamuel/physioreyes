import React from "react";
import { PhysioreyesLogo } from "./Logo";

/**
 * TemplateMockup
 * Renderiza una previsualización de plantilla de Instagram según
 * el layout pedido. Todas siguen la identidad: negro, cyan y blanco.
 */
export const TemplateMockup = ({ layout, accent = "#00D4FF" }) => {
  const aspect = layout === "story-cta" ? "9/16" : "1/1";

  return (
    <div
      data-testid={`mockup-${layout}`}
      className="relative w-full overflow-hidden bg-black border border-white/10"
      style={{ aspectRatio: aspect }}
    >
      {layout === "post-quote" && <PostQuote accent={accent} />}
      {layout === "post-stat" && <PostStat accent={accent} />}
      {layout === "post-tip" && <PostTip accent={accent} />}
      {layout === "story-cta" && <StoryCTA accent={accent} />}
      {layout === "carousel-cover" && <CarouselCover accent={accent} />}
      {layout === "post-anatomy" && <PostAnatomy accent={accent} />}
    </div>
  );
};

// ---------- helpers ----------
const Watermark = ({ accent }) => (
  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 opacity-80">
    <PhysioreyesLogo variant="mark" size={18} accent={accent} />
    <span className="text-[8px] font-mono-pr tracking-widest text-zinc-400 uppercase">
      @physioreyes
    </span>
  </div>
);

// ---------- layouts ----------
const PostQuote = ({ accent }) => (
  <div className="absolute inset-0 p-6 flex flex-col justify-between">
    <div className="text-[9px] font-mono-pr tracking-[0.3em] text-zinc-500 uppercase">
      CITA · 001
    </div>
    <div>
      <div
        className="font-display text-white text-[clamp(1.1rem,2.2vw,1.6rem)] leading-tight tracking-tight"
        style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
      >
        "El dolor no es el enemigo. Es{" "}
        <span style={{ color: accent }}>información</span>."
      </div>
      <div className="mt-3 text-[10px] font-mono-pr text-zinc-500 tracking-widest uppercase">
        — Lorimer Moseley
      </div>
    </div>
    <div className="flex items-end justify-between">
      <div className="w-10 h-px" style={{ background: accent }} />
      <Watermark accent={accent} />
    </div>
  </div>
);

const PostStat = ({ accent }) => (
  <div className="absolute inset-0 p-6 flex flex-col justify-between">
    <div className="text-[9px] font-mono-pr tracking-[0.3em] text-zinc-500 uppercase">
      DATO · EVIDENCIA
    </div>
    <div>
      <div
        className="font-display leading-none tracking-tighter"
        style={{ color: accent, fontSize: "clamp(3rem,7vw,5rem)" }}
      >
        82<span className="text-white">%</span>
      </div>
      <div className="text-white text-xs lg:text-sm mt-2 max-w-[80%]">
        de las recidivas de isquios ocurren en los primeros 2 meses tras el
        alta.
      </div>
    </div>
    <Watermark accent={accent} />
  </div>
);

const PostTip = ({ accent }) => (
  <div className="absolute inset-0 p-6 flex flex-col">
    <div className="flex items-center gap-2 mb-4">
      <div
        className="px-2 py-1 text-[9px] font-mono-pr tracking-widest uppercase"
        style={{ background: accent, color: "#000" }}
      >
        TIP
      </div>
      <span className="text-[9px] font-mono-pr text-zinc-500 tracking-widest uppercase">
        Rendimiento
      </span>
    </div>
    <div
      className="font-display text-white tracking-tight leading-tight"
      style={{ fontSize: "clamp(1rem,2.2vw,1.4rem)" }}
    >
      Si no puedes medir la
      <span style={{ color: accent }}> velocidad</span> de tu serie,
      <br />
      al menos cronometra la <span style={{ color: accent }}>pausa</span>.
    </div>
    <div className="mt-auto text-[10px] text-zinc-500 font-mono-pr">
      Hilo en stories ↗
    </div>
    <Watermark accent={accent} />
  </div>
);

const StoryCTA = ({ accent }) => (
  <div className="absolute inset-0 flex flex-col">
    <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
      <div
        className="font-display text-white tracking-tighter leading-[0.9]"
        style={{ fontSize: "clamp(1.4rem,3vw,2.4rem)" }}
      >
        ¿Lesión
        <br />
        <span style={{ color: accent }}>otra vez</span>?
      </div>
      <div className="mt-3 text-zinc-400 text-xs">Quizá no es mala suerte.</div>
    </div>
    <div
      className="py-4 text-center text-black text-xs font-bold tracking-tight uppercase"
      style={{ background: accent }}
    >
      Desliza arriba ↑
    </div>
    <Watermark accent={accent} />
  </div>
);

const CarouselCover = ({ accent }) => (
  <div className="absolute inset-0 p-6 flex flex-col justify-between">
    <div className="flex items-start justify-between">
      <div className="text-[9px] font-mono-pr tracking-[0.3em] text-zinc-500 uppercase">
        CARRUSEL · 7 SLIDES
      </div>
      <div
        className="text-[9px] font-mono-pr tracking-widest"
        style={{ color: accent }}
      >
        1/7
      </div>
    </div>
    <div>
      <div
        className="font-display text-white tracking-tighter leading-[0.9]"
        style={{ fontSize: "clamp(1.4rem,2.6vw,2rem)" }}
      >
        5 errores
        <br />
        al volver
        <br />
        <span style={{ color: accent }}>tras lesión</span>
      </div>
      <div className="mt-4 text-zinc-400 text-xs max-w-[90%]">
        Lo que la evidencia dice y lo que tu cuerpo necesita.
      </div>
    </div>
    <div className="flex items-end justify-between">
      <div
        className="text-[10px] font-mono-pr"
        style={{ color: accent }}
      >
        Desliza →
      </div>
      <Watermark accent={accent} />
    </div>
  </div>
);

const PostAnatomy = ({ accent }) => (
  <div className="absolute inset-0 p-6 flex flex-col">
    <div className="text-[9px] font-mono-pr tracking-[0.3em] text-zinc-500 uppercase mb-3">
      MAPA · RODILLA
    </div>
    <div className="flex-1 relative">
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
        {/* Simplified knee diagram */}
        <path
          d="M 100 30 L 100 90 L 90 95 L 90 130 L 100 170"
          stroke="#fff"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="100" cy="90" r="14" stroke={accent} strokeWidth="2" fill="none" />
        <circle cx="100" cy="90" r="3" fill={accent} />
        {/* Labels */}
        <line x1="114" y1="90" x2="150" y2="70" stroke={accent} strokeWidth="0.8" />
        <text x="152" y="72" fontSize="7" fill="#fff" fontFamily="JetBrains Mono">
          rótula
        </text>
        <line x1="100" y1="120" x2="55" y2="135" stroke={accent} strokeWidth="0.8" />
        <text x="20" y="138" fontSize="7" fill="#fff" fontFamily="JetBrains Mono">
          tendón rotuliano
        </text>
        <line x1="100" y1="40" x2="150" y2="35" stroke={accent} strokeWidth="0.8" />
        <text x="152" y="37" fontSize="7" fill="#fff" fontFamily="JetBrains Mono">
          cuádriceps
        </text>
      </svg>
    </div>
    <Watermark accent={accent} />
  </div>
);

export default TemplateMockup;
