import React, { useState } from "react";
import axios from "axios";
import { Send, Instagram, Linkedin, Mail, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ReyesSignature } from "./Signature";


const INTERESTS = [
  "Readaptación deportiva",
  "Rehabilitación de lesión",
  "Programación de fuerza",
  "Valoración funcional",
  "Otra consulta",
];

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: INTERESTS[0],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.name.length < 2 || form.email.length < 5 || form.message.length < 5) {
      toast.error("Revisa los campos obligatorios");
      return;
    }
    setSubmitting(true);
    try {
     await axios.post(
  "https://formspree.io/f/mgojvnpg",
  form
);
      toast.success("¡Mensaje enviado!", {
        description: "Te contesto lo antes posible. Gracias por confiar.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        interest: INTERESTS[0],
        message: "",
      });
    } catch (err) {
      toast.error("No se pudo enviar", {
        description: "Intenta de nuevo o escríbeme por Instagram.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      data-testid="contact-section"
      className="relative py-24 lg:py-36 px-6 lg:px-10 bg-[#050505]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-6 text-[11px] font-mono-pr tracking-[0.3em] text-zinc-500 uppercase">
          <span className="w-8 h-px bg-[#00D4FF]" />
          <span data-testid="contact-eyebrow">05 · Contacto</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left - intro + direct contacts */}
          <div className="lg:col-span-5">
            <h2
              data-testid="contact-headline"
              className="font-display text-white text-[clamp(2rem,4.5vw,3.8rem)] leading-[0.95] tracking-tighter"
            >
              Cuéntame
              <br />
              <span className="italic font-light">qué te trae</span>
              <br />
              <span style={{ color: "#00D4FF" }}>aquí</span>.
            </h2>

            <p className="mt-8 text-zinc-300 leading-relaxed max-w-md">
              Tanto si quieres reservar una valoración como si tienes una duda
              concreta sobre tu proceso — escríbeme. Leo todos los mensajes.
            </p>

            <div className="mt-12 space-y-5">
              <a
                data-testid="direct-ig"
                href="https://www.instagram.com/physioreyes/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-4 border border-white/10 hover:border-[#00D4FF]/50 transition-colors"
              >
                <div className="w-10 h-10 border border-white/15 flex items-center justify-center group-hover:border-[#00D4FF] group-hover:text-[#00D4FF] text-white transition-colors">
                  <Instagram size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase">
                    Instagram · más rápido
                  </div>
                  <div className="text-white">@physioreyes</div>
                </div>
              </a>

              <a
                data-testid="direct-li"
                href="https://www.linkedin.com/in/samuel-reyes-tejera-74344b290/?locale=es"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-4 border border-white/10 hover:border-[#00D4FF]/50 transition-colors"
              >
                <div className="w-10 h-10 border border-white/15 flex items-center justify-center group-hover:border-[#00D4FF] group-hover:text-[#00D4FF] text-white transition-colors">
                  <Linkedin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase">
                    LinkedIn · profesional
                  </div>
                  <div className="text-white">Samuel Reyes Tejera</div>
                </div>
              </a>

              <div
                data-testid="direct-location"
                className="flex items-center gap-4 p-4 border border-white/10"
              >
                <div className="w-10 h-10 border border-white/15 flex items-center justify-center text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase">
                    Consulta
                  </div>
                  <div className="text-white">Málaga · Presencial / Online</div>
                </div>
              </div>
            </div>

            <div className="mt-14">
              <div className="text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase mb-2">
                Firmado
              </div>
              <ReyesSignature size={200} color="#00D4FF" />
            </div>
          </div>

          {/* Right - form */}
          <div className="lg:col-span-7">
            <form
              data-testid="contact-form"
              onSubmit={onSubmit}
              className="bg-[#0a0a0b] border border-white/10 p-8 lg:p-12 space-y-7"
            >
              <div className="grid sm:grid-cols-2 gap-7">
                <Field
                  label="Nombre"
                  required
                  testid="field-name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Tu nombre completo"
                />
                <Field
                  label="Email"
                  type="email"
                  required
                  testid="field-email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="tu@email.com"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-7">
                <Field
                  label="Teléfono (opcional)"
                  testid="field-phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="+34 ..."
                />
                <div>
                  <label className="block text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase mb-2">
                    Te interesa
                  </label>
                  <select
                    data-testid="field-interest"
                    name="interest"
                    value={form.interest}
                    onChange={onChange}
                    className="w-full bg-transparent border-b border-white/15 focus:border-[#00D4FF] outline-none text-white py-2.5 text-base appearance-none"
                  >
                    {INTERESTS.map((i) => (
                      <option key={i} value={i} className="bg-[#0a0a0b]">
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase mb-2">
                  Cuéntame *
                </label>
                <textarea
                  data-testid="field-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  placeholder="Lesión, objetivo, contexto deportivo... lo que necesites contarme."
                  className="w-full bg-transparent border-b border-white/15 focus:border-[#00D4FF] outline-none text-white py-2.5 text-base resize-none placeholder:text-zinc-600"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <p className="text-[11px] text-zinc-500 max-w-sm leading-relaxed">
                  Al enviar aceptas que te contacte por email o teléfono. No
                  spam — sólo respuesta a tu mensaje.
                </p>
                <button
                  data-testid="submit-contact"
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-3 bg-[#00D4FF] hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed text-black px-8 py-4 text-sm font-semibold tracking-tight transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, required, testid, ...rest }) => (
  <div>
    <label className="block text-[10px] font-mono-pr tracking-widest text-zinc-500 uppercase mb-2">
      {label} {required && "*"}
    </label>
    <input
      data-testid={testid}
      required={required}
      className="w-full bg-transparent border-b border-white/15 focus:border-[#00D4FF] outline-none text-white py-2.5 text-base placeholder:text-zinc-600"
      {...rest}
    />
  </div>
);

export default Contact;
