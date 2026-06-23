import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clock, ArrowUpRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Blog = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/articles`)
      .then((r) => {
  console.log("API:", r.data);
  if (Array.isArray(r.data)) {
    setArticles(r.data);
  } else {
    setArticles([]);
  }
})
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section
      id="blog"
      data-testid="blog-section"
      className="relative py-24 lg:py-36 px-6 lg:px-10 bg-[#050505] border-t border-white/5"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-6 text-[11px] font-mono-pr tracking-[0.3em] text-zinc-500 uppercase">
          <span className="w-8 h-px bg-[#00D4FF]" />
          <span data-testid="blog-eyebrow">04 · Blog basado en evidencia</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
          <h2
            data-testid="blog-headline"
            className="lg:col-span-8 font-display text-white text-[clamp(2rem,4.8vw,3.8rem)] leading-[0.95] tracking-tighter"
          >
            Artículos para
            <br />
            <span className="italic font-light">deportistas que </span>
            <span style={{ color: "#00D4FF" }}>preguntan por qué</span>.
          </h2>
          <p className="lg:col-span-4 text-zinc-400 leading-relaxed">
            Sin clickbait. Sin "el mejor ejercicio para…". Sólo lo que la
            evidencia y mi experiencia clínica respaldan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-white/5">
          {articles.map((a, i) => (
            <article
              key={a.id}
              data-testid={`article-${a.id}`}
              className="group bg-[#0a0a0b] hover:bg-[#0e0e10] transition-colors duration-300 p-8 lg:p-10 cursor-pointer relative"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono-pr tracking-[0.3em] uppercase text-[#00D4FF]">
                  {a.category}
                </span>
                <span className="text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <Clock size={12} />
                  {a.read_minutes} min
                </span>
              </div>

              <h3 className="font-display text-white text-2xl lg:text-3xl leading-tight tracking-tight group-hover:text-[#00D4FF] transition-colors">
                {a.title}
              </h3>
              <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
                {a.excerpt}
              </p>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase">
                  {new Date(a.published_at).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-zinc-500 group-hover:text-[#00D4FF] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                />
              </div>

              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00D4FF] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
              <div className="absolute top-3 right-3 text-[9px] font-mono-pr tracking-widest text-zinc-700">
                /{(i + 1).toString().padStart(2, "0")}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            data-testid="blog-cta"
            href="https://www.instagram.com/physioreyes/?hl=es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-white/20 hover:border-[#00D4FF] hover:text-[#00D4FF] px-7 py-4 text-sm font-semibold tracking-tight transition-colors"
          >
            Más contenido en Instagram <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
