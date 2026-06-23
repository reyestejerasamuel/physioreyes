import React from "react";
import { GraduationCap, Activity, BookOpen, Stethoscope } from "lucide-react";

const REHAB_IMG =
  "https://static.prod-images.emergentagent.com/jobs/56f02216-427e-4906-ab19-732e12052cb9/images/9c328b92ed6b8787b05d11ad57ddf8764148246b8f2b8947594dbbbefe4070df.png";

const FORMATIONS = [
  {
    year: "2020 · 2023",
    title: "CAFYD",
    subtitle: "Grado en Ciencias del Deporte · EADE (3 años)",
    icon: Activity,
    body: "Base científica del entrenamiento, fisiología del ejercicio y biomecánica aplicada al rendimiento.",
  },
  {
    year: "2023 · 2024",
    title: "MAES",
    subtitle: "Máster en Profesorado de Educación Secundaria",
    icon: BookOpen,
    body: "Pedagogía, didáctica y diseño de procesos de aprendizaje. La base de cómo enseño hoy a mis pacientes.",
  },
  {
    year: "2024 · 2025",
    title: "Máster Optimización",
    subtitle: "Optimización del Entrenamiento y Readaptación Físico-Deportiva",
    icon: GraduationCap,
    body: "Programación avanzada de carga, return to play, métricas de readiness y modelos de readaptación.",
  },
  {
    year: "2025 · 2029",
    title: "Fisioterapia",
    subtitle: "Grado en Fisioterapia · cursando 2º",
    icon: Stethoscope,
    body: "Cerrando el círculo clínico: terapia manual, electroterapia, valoración funcional y ejercicio terapéutico.",
  },
];

export const About = () => {
  return (
    <section
      id="sobre-mi"
      data-testid="about-section"
      className="relative py-24 lg:py-36 px-6 lg:px-10 bg-[#050505]"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6 text-[11px] font-mono-pr tracking-[0.3em] text-zinc-500 uppercase">
          <span className="w-8 h-px bg-[#00D4FF]" />
          <span data-testid="about-eyebrow">01 · Sobre mí</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left column - copy */}
          <div className="lg:col-span-5">
            <h2
              data-testid="about-headline"
              className="font-display text-white text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.95] tracking-tighter"
            >
              No soy <span className="italic font-light">otro fisio</span>.
              <br />
              Soy un{" "}
              <span style={{ color: "#00D4FF" }}>científico del cuerpo</span>{" "}
              que también pasa consulta.
            </h2>

            <p className="mt-8 text-zinc-300 leading-relaxed">
              Empecé por las ciencias del deporte porque quería entender{" "}
              <em>cómo</em> rinde un cuerpo. Hice el MAES para aprender a{" "}
              <em>enseñar</em>. El máster en optimización me dio las
              herramientas para <em>programar</em>. Y la fisioterapia me da el
              último eslabón: <em>devolver</em> al deportista al campo.
            </p>

            <p className="mt-5 text-zinc-400 leading-relaxed">
              Trabajo con pacientes que ya están cansados de "haz estos
              ejercicios y vuelve en dos semanas". Si lo que buscas es entender
              tu lesión, tu carga y tu camino de vuelta — estás en el sitio
              correcto.
            </p>

            {/* Image */}
            <div className="mt-10 relative">
              <img
                src={REHAB_IMG}
                alt="Sesión de fisioterapia"
                className="w-full h-72 lg:h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                data-testid="about-image"
              />
              <div className="absolute bottom-0 left-0 bg-[#00D4FF] text-black px-4 py-2 text-[11px] font-mono-pr tracking-widest uppercase">
                In clinic · Málaga
              </div>
            </div>
          </div>

          {/* Right column - timeline */}
          <div className="lg:col-span-7">
            <div className="text-[11px] font-mono-pr tracking-[0.3em] text-zinc-500 uppercase mb-8">
              Formación · Línea temporal
            </div>

            <div className="space-y-0">
              {FORMATIONS.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    data-testid={`formation-${i}`}
                    className="group grid grid-cols-12 gap-4 border-t border-white/10 py-7 hover:bg-white/[0.02] transition-colors duration-300 px-2"
                  >
                    <div className="col-span-3 lg:col-span-2">
                      <div className="text-[10px] font-mono-pr tracking-widest text-[#00D4FF] uppercase">
                        {f.year}
                      </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1 flex justify-center">
                      <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-[#00D4FF] group-hover:text-[#00D4FF] text-white transition-colors duration-300">
                        <Icon size={18} />
                      </div>
                    </div>
                    <div className="col-span-7 lg:col-span-9">
                      <div className="font-display text-white text-2xl lg:text-3xl tracking-tight">
                        {f.title}
                      </div>
                      <div className="text-zinc-400 text-sm mt-1">
                        {f.subtitle}
                      </div>
                      <div className="text-zinc-500 text-sm mt-3 leading-relaxed">
                        {f.body}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
