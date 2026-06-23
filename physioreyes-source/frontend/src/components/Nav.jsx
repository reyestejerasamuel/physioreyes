import React, { useState, useEffect } from "react";
import { PhysioreyesLogo } from "./Logo";
import { Menu, X } from "lucide-react";

const NAV = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "servicios", label: "Servicios" },
  { id: "blog", label: "Blog" },
  { id: "contacto", label: "Contacto" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        <a
          data-testid="nav-logo"
          href="#top"
          className="flex items-center gap-2 group"
          aria-label="Ir al inicio"
        >
          <PhysioreyesLogo variant="mark" size={36} />
          <span className="font-display text-white text-lg leading-none">
            physio<span style={{ color: "#00D4FF" }}>reyes</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((item) => (
            <a
              key={item.id}
              data-testid={`nav-link-${item.id}`}
              href={`#${item.id}`}
              className="text-sm text-zinc-300 hover:text-[#00D4FF] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          data-testid="nav-cta"
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 bg-[#00D4FF] hover:bg-white text-black px-5 py-2.5 text-sm font-semibold tracking-tight transition-colors duration-200"
        >
          Reservar consulta
          <span aria-hidden>→</span>
        </a>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
        >
          <div className="flex flex-col px-6 py-6 gap-5">
            {NAV.map((item) => (
              <a
                key={item.id}
                data-testid={`mobile-link-${item.id}`}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="text-zinc-200 text-lg"
              >
                {item.label}
              </a>
            ))}
            <a
              data-testid="mobile-cta"
              href="#contacto"
              onClick={() => setOpen(false)}
              className="bg-[#00D4FF] text-black px-5 py-3 text-sm font-semibold inline-block text-center"
            >
              Reservar consulta →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
