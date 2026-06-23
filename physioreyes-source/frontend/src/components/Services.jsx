import React from "react";
import { ArrowUpRight } from "lucide-react";

const KINETIC_BG =
  "https://static.prod-images.emergentagent.com/jobs/56f02216-427e-4906-ab19-732e12052cb9/images/6647b0ea87c85e72def0cbc70743828179d4cf9a9db0e46df4dd1464b297afc5.png";

const SERVICES = [
  {
    n: "01",
    title: "Readaptación",
    tag: "Vuelta al deporte",
    desc: "Cierro el hueco entre el alta médica y el primer entreno con tu equipo. Programación progresiva de carga, criterios objetivos de return to play y testing funcional.",
    points: [
      "Test isométrico de fuerza",
      "Modelo de carga semanal",
      "Criterios RTP por fase",
      "Reintroducción al gesto deportivo",
    ],
  },
  {
    n: "02",
    title: "Rehabilitación",
    tag: "De la lesión al movimiento",
    desc: "Terapia manual, ejercicio terapéutico y educación en dolor basados en evidencia. Sesiones largas, individualizadas y con plan de ejercicio en casa.",
    points: [
      "Valoración funcional completa",
      "Terapia manual y movilizaciones",
      "Ejercicio terapéutico progresivo",
      "Educación en dolor (PNE)",
    ],
  },
  {
    n: "03",
    title: "Rendimiento",
    tag: "Optimización del entreno",
    desc: "Programación de fuerza y condicionamiento para deportistas amateur y de equipo. VBT cuando aporta, RPE bien medido siempre, monitorización inteligente.",
    points: [
      "Programación periodizada",
      "Velocity Based Training",
      "Monitorización RPE / HRV",
      "Prevención de lesiones",
    ],
  },
];

export const Services = () => {
  return (
    <section
      id="servicios"
      data-testid="services-section"
      className="relative py-24 lg:py-36 px-6 lg:px-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${KINETIC_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/85 to-[#050505] z-[1]" />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-6 text-[11px] font-mono-pr tracking-[0.3em] text-zinc-500 uppercase">
          <span className="w-8 h-px bg-[#00D4FF]" />
          <span data-testid="services-eyebrow">02 · Servicios</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-end mb-16">
          <h2
            data-testid="services-headline"
            className="lg:col-span-8 font-display text-white text-[clamp(2rem,4.8vw,4rem)] leading-[0.95] tracking-tighter"
          >
            Tres caminos.
            <br />
            <span style={{ color: "#00D4FF" }}>Una sola</span> filosofía:{" "}
            <span className="italic font-light">datos sobre intuición</span>.
          </h2>
          <p className="lg:col-span-4 text-zinc-400 leading-relaxed">
            No se trata de elegir entre rehabilitar, readaptar o entrenar.
            Cada deportista pasa por las tres fases — la pregunta es{" "}
            <em>cuándo</em> y <em>cómo</em>.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid lg:grid-cols-3 gap-px bg-white/5">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              data-testid={`service-${s.n}`}
              className="group relative bg-[#0a0a0b] hover:bg-[#0e0e10] p-8 lg:p-10 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono-pr text-[11px] tracking-[0.3em] text-[#00D4FF]">
                  / {s.n}
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-zinc-600 group-hover:text-[#00D4FF] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
                />
              </div>

              <h3 className="font-display text-white text-4xl lg:text-5xl tracking-tighter leading-none">
                {s.title}
              </h3>
              <div className="mt-2 text-zinc-500 text-xs font-mono-pr tracking-widest uppercase">
                {s.tag}
              </div>

              <p className="mt-7 text-zinc-300 text-sm leading-relaxed">
                {s.desc}
              </p>

              <ul className="mt-7 space-y-2.5">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="text-sm text-zinc-400 flex items-start gap-3"
                  >
                    <span className="mt-1.5 w-1 h-1 bg-[#00D4FF] shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                <a
                  href="#contacto"
                  data-testid={`service-cta-${s.n}`}
                  className="text-sm text-white group-hover:text-[#00D4FF] transition-colors font-medium"
                >
                  Solicitar →
                </a>
                <span className="text-[10px] font-mono-pr tracking-widest text-zinc-600 uppercase">
                  1:1 · presencial / online
                </span>
              </div>

              {/* Hover cyan accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#00D4FF] group-hover:w-full transition-all duration-500" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
