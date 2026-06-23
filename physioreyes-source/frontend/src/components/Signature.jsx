import React from "react";

/**
 * Firma "Reyes" — versión profesional.
 * Usamos la tipografía Caveat (manuscrita) con trazo confiado +
 * un paraphe (rúbrica) corto en SVG. Esto evita el "doodle" de
 * paths dibujados a mano y queda como una firma real.
 */
export const ReyesSignature = ({
  color = "#00D4FF",
  size = 220,
  className = "",
}) => {
  // height ratio ~ 0.42
  const height = Math.round(size * 0.4);

  return (
    <div
      className={`inline-flex flex-col items-start leading-none ${className}`}
      style={{ width: size }}
      aria-label="Firma de Samuel Reyes"
      role="img"
    >
      <span
        style={{
          fontFamily: "'Caveat', cursive",
          fontWeight: 600,
          color,
          fontSize: Math.round(size * 0.34),
          lineHeight: 0.9,
          letterSpacing: "-0.01em",
          transform: "skewX(-6deg)",
          transformOrigin: "left center",
          marginLeft: Math.round(size * 0.02),
        }}
      >
        Reyes
      </span>
      <svg
        viewBox="0 0 260 30"
        width={size}
        height={height * 0.45}
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginTop: -Math.round(size * 0.02) }}
        aria-hidden
      >
        {/* Paraphe: trazo decisivo bajo el nombre + remate fino */}
        <path
          d="M 6 14
             C 40 6, 130 4, 210 9
             C 226 10, 238 12, 252 18"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 240 22 L 256 14"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
};

export default ReyesSignature;
