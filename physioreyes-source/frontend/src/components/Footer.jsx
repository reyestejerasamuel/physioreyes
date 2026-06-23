import React from "react";
import { PhysioreyesLogo } from "./Logo";
import { ReyesSignature } from "./Signature";
import { Instagram, Linkedin, ArrowUp } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="footer"
      className="relative bg-black border-t border-white/10 px-6 lg:px-10 pt-20 pb-10"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Big sign-off */}
        <div className="mb-16 overflow-hidden">
          <div className="text-[11px] font-mono-pr tracking-[0.3em] text-zinc-500 uppercase mb-4">
            // fin de página
          </div>
          <h3
            data-testid="footer-bigtext"
            className="font-display text-white text-[clamp(2rem,11vw,7.5rem)] leading-[0.9] tracking-tighter whitespace-nowrap"
          >
            physio<span style={{ color: "#00D4FF" }}>reyes</span>
          </h3>
          <div className="mt-6 max-w-2xl">
            <ReyesSignature size={220} color="#00D4FF" />
            <p className="mt-4 text-zinc-400 italic font-script text-2xl">
              Movimiento. Rendimiento. Recuperación.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-5 overflow-hidden">
            <div className="max-w-full">
              <PhysioreyesLogo variant="full" size={200} className="max-w-full h-auto" />
            </div>
            <p className="mt-6 text-zinc-400 text-sm leading-relaxed max-w-md">
              Marca personal de Samuel Reyes Tejera. Readaptación,
              rehabilitación y rendimiento basados en evidencia y experiencia
              clínica.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase mb-4">
              Navega
            </div>
            <ul className="space-y-3">
              {[
                ["#sobre-mi", "Sobre mí"],
                ["#servicios", "Servicios"],
                ["#blog", "Blog"],
                ["#contacto", "Contacto"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    data-testid={`footer-link-${href.replace("#", "")}`}
                    href={href}
                    className="text-zinc-300 hover:text-[#00D4FF] transition-colors text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase mb-4">
              Conecta
            </div>
            <div className="space-y-3">
              <a
                data-testid="footer-ig"
                href="https://www.instagram.com/physioreyes/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-300 hover:text-[#00D4FF] transition-colors text-sm"
              >
                <Instagram size={16} /> @physioreyes
              </a>
              <a
                data-testid="footer-li"
                href="https://www.linkedin.com/in/samuel-reyes-tejera-74344b290/?locale=es"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-300 hover:text-[#00D4FF] transition-colors text-sm"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
            <div className="mt-8">
              <a
                href="#top"
                data-testid="footer-back-top"
                className="inline-flex items-center gap-2 text-xs font-mono-pr tracking-widest text-zinc-500 hover:text-[#00D4FF] uppercase"
              >
                <ArrowUp size={14} /> Volver arriba
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] font-mono-pr tracking-widest text-zinc-500 uppercase">
          <span>© {year} · physioreyes · Samuel Reyes Tejera</span>
          <span>Málaga · España</span>
          <span>v1.0 · ed. atleta</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
