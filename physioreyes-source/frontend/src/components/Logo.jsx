import React from "react";

/**
 * PhysioreyesLogo
 * --------------------------------------------------
 * Logo oficial proporcionado por el usuario:
 *  · R blanca con la pierna en cyan estilizada como articulación.
 *  · Corona hand-drawn sobre la cabeza de la R.
 *
 * El asset es PNG cuadrado con fondo negro y padding amplio,
 * por lo que se renderiza dentro de un contenedor overflow-hidden
 * con transform: scale() para recortar el padding visualmente.
 *
 * Variantes: "full" | "mark"
 */
const LOGO_SRC =
  "https://customer-assets.emergentagent.com/job_physio-landing-7/artifacts/pi264fa9_ChatGPT%20Image%2011%20jun%202026%2C%2013_49_45.png?v=2";

const Mark = ({ size, className = "" }) => (
  <div
    className={`relative inline-block overflow-hidden ${className}`}
    style={{ width: size, height: size }}
    aria-label="physioreyes mark"
  >
    <img
      src={LOGO_SRC}
      alt="physioreyes"
      draggable="false"
      className="absolute inset-0 w-full h-full object-cover select-none"
      style={{ transform: "scale(1.55)", transformOrigin: "center" }}
    />
  </div>
);

export const PhysioreyesLogo = ({
  variant = "full",
  accent = "#00D4FF",
  size = 64,
  className = "",
}) => {
  if (variant === "mark") {
    return <Mark size={size} className={className} />;
  }

  // Full variant: mark + wordmark + tagline
  const markSize = Math.round(size * 0.55);
  const wordSize = Math.max(14, Math.round(size * 0.2));
  const tagSize = Math.max(7, Math.round(size * 0.055));

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Mark size={markSize} />
      <div className="leading-none">
        <div
          style={{
            fontFamily: "'Cabinet Grotesk', 'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: wordSize,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            lineHeight: 1,
          }}
        >
          physio
          <span style={{ color: accent }}>reyes</span>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: tagSize,
            letterSpacing: "0.22em",
            color: "#A1A1AA",
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          MOVIMIENTO · RENDIMIENTO · RECUPERACIÓN
        </div>
        <div
          style={{
            width: Math.round(size * 0.18),
            height: 2,
            background: accent,
            marginTop: 6,
          }}
        />
      </div>
    </div>
  );
};

export default PhysioreyesLogo;
