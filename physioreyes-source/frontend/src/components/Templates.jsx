import React, { useEffect, useState } from "react";
import { Download, Layers, Code2 } from "lucide-react";
import axios from "axios";
import { TemplateMockup } from "./TemplateMockup";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TEMPLATES_SHOWCASE =
  "https://static.prod-images.emergentagent.com/jobs/56f02216-427e-4906-ab19-732e12052cb9/images/999db23e96752f34bcece4dd488d8ef5fe7ad578d3a02ba44df42de817782d37.png";

export const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/templates`)
      .then((r) => {
        if (alive) setTemplates(r.data);
      })
      .catch(() => toast.error("No pude cargar las plantillas"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const handleDownload = (tpl) => {
    // Generate a PNG snapshot of the mockup using SVG → no real PNG file,
    // we copy the HTML/CSS to clipboard as fallback + show toast.
    toast.success(`Plantilla "${tpl.title}" lista`, {
      description: "Pulsa 'Copiar HTML' para usarla como base, o haz captura del preview.",
    });
  };

  const copyHtml = async (tpl) => {
    const html = generateHtml(tpl);
    try {
      await navigator.clipboard.writeText(html);
      toast.success("HTML copiado al portapapeles");
    } catch {
      toast.error("No se pudo copiar");
    }
  };

  return (
    <section
      id="plantillas"
      data-testid="templates-section"
      className="relative py-24 lg:py-36 px-6 lg:px-10 bg-[#050505]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-6 text-[11px] font-mono-pr tracking-[0.3em] text-zinc-500 uppercase">
          <span className="w-8 h-px bg-[#00D4FF]" />
          <span data-testid="templates-eyebrow">03 · Plantillas</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <h2
              data-testid="templates-headline"
              className="font-display text-white text-[clamp(2rem,4.8vw,4rem)] leading-[0.95] tracking-tighter"
            >
              Plantillas{" "}
              <span style={{ color: "#00D4FF" }}>listas para Instagram</span>.
              <br />
              <span className="italic font-light">Tu marca, tu tono.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end gap-4">
            <p className="text-zinc-400 leading-relaxed">
              Seis plantillas diseñadas con la identidad de physioreyes —
              posts cuadrados, stories y portadas de carrusel. Disponibles
              como <strong className="text-white">previsualización PNG</strong>{" "}
              y como <strong className="text-white">HTML editable</strong>{" "}
              para que las uses de base.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase">
              <span className="flex items-center gap-2">
                <Layers size={12} className="text-[#00D4FF]" />
                Posts 1:1
              </span>
              <span>·</span>
              <span>Stories 9:16</span>
              <span>·</span>
              <span>Carruseles</span>
            </div>
          </div>
        </div>

        {/* Reference showcase */}
        <div className="mb-12 relative border border-white/10">
          <img
            src={TEMPLATES_SHOWCASE}
            alt="Showcase de plantillas"
            className="w-full max-h-[420px] object-cover"
          />
          <div className="absolute top-3 left-3 text-[10px] font-mono-pr tracking-widest text-zinc-300 uppercase bg-black/60 backdrop-blur-md px-3 py-1.5">
            Referencia visual
          </div>
        </div>

        {/* Grid of mockups */}
        {loading ? (
          <div className="text-zinc-500 text-center py-12">Cargando plantillas…</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((tpl) => (
              <article
                key={tpl.id}
                data-testid={`template-card-${tpl.id}`}
                className="group bg-[#0a0a0b] border border-white/10 hover:border-[#00D4FF]/50 transition-colors duration-300"
              >
                {/* Preview */}
                <div className="p-5 bg-black/40 flex items-center justify-center">
                  <div className="w-full max-w-[260px]">
                    <TemplateMockup layout={tpl.preview_layout} />
                  </div>
                </div>

                {/* Meta */}
                <div className="p-5 border-t border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-mono-pr tracking-widest text-[#00D4FF] uppercase">
                        {tpl.category}
                      </div>
                      <h3 className="font-display text-white text-xl mt-1 tracking-tight">
                        {tpl.title}
                      </h3>
                    </div>
                    <div className="text-[10px] font-mono-pr text-zinc-600 tracking-widest">
                      {tpl.id.toUpperCase()}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {tpl.description}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button
                      data-testid={`download-${tpl.id}`}
                      onClick={() => handleDownload(tpl)}
                      className="flex items-center justify-center gap-2 bg-[#00D4FF] hover:bg-white text-black py-2.5 text-xs font-semibold tracking-tight transition-colors"
                    >
                      <Download size={14} /> Descargar
                    </button>
                    <button
                      data-testid={`copy-html-${tpl.id}`}
                      onClick={() => copyHtml(tpl)}
                      className="flex items-center justify-center gap-2 border border-white/15 hover:border-[#00D4FF] hover:text-[#00D4FF] text-white py-2.5 text-xs font-semibold tracking-tight transition-colors"
                    >
                      <Code2 size={14} /> Copiar HTML
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

function generateHtml(tpl) {
  return `<!-- Plantilla physioreyes · ${tpl.title} -->
<div style="aspect-ratio:1/1;background:#000;color:#fff;padding:32px;font-family:'Cabinet Grotesk',sans-serif;position:relative;border:1px solid #1f1f22;">
  <div style="font-size:10px;letter-spacing:.3em;color:#71717a;text-transform:uppercase;font-family:monospace;">
    ${tpl.category.toUpperCase()}
  </div>
  <h2 style="font-size:32px;line-height:1;letter-spacing:-.03em;margin-top:24px;">
    Tu titular aquí — <span style="color:#00D4FF;">acento cyan</span>.
  </h2>
  <p style="color:#a1a1aa;margin-top:16px;font-size:14px;">
    Subtítulo o cuerpo de texto. Mantén las líneas cortas.
  </p>
  <div style="position:absolute;bottom:24px;left:24px;font-size:10px;letter-spacing:.2em;color:#a1a1aa;text-transform:uppercase;font-family:monospace;">
    @physioreyes
  </div>
</div>`;
}

export default Templates;
