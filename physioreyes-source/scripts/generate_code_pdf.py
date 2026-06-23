"""Generates a downloadable PDF with all the project source code."""
from fpdf import FPDF
from pathlib import Path
import os
import sys

ROOT = Path("/app")
OUT = Path("/app/frontend/public/physioreyes-source-code.pdf")

# Files to include (in order)
FILES = [
    ("BACKEND", [
        ("backend/.env (estructura)", None),  # special: placeholder
        ("backend/requirements.txt (clave)", None),
        ("backend/server.py", "backend/server.py"),
    ]),
    ("FRONTEND - Config", [
        ("frontend/.env (estructura)", None),
        ("frontend/public/index.html", "frontend/public/index.html"),
        ("frontend/tailwind.config.js", "frontend/tailwind.config.js"),
    ]),
    ("FRONTEND - Estilos", [
        ("frontend/src/App.css", "frontend/src/App.css"),
        ("frontend/src/index.css", "frontend/src/index.css"),
    ]),
    ("FRONTEND - App raíz", [
        ("frontend/src/App.js", "frontend/src/App.js"),
    ]),
    ("FRONTEND - Componentes", [
        ("frontend/src/components/Logo.jsx", "frontend/src/components/Logo.jsx"),
        ("frontend/src/components/Signature.jsx", "frontend/src/components/Signature.jsx"),
        ("frontend/src/components/Nav.jsx", "frontend/src/components/Nav.jsx"),
        ("frontend/src/components/Hero.jsx", "frontend/src/components/Hero.jsx"),
        ("frontend/src/components/About.jsx", "frontend/src/components/About.jsx"),
        ("frontend/src/components/Services.jsx", "frontend/src/components/Services.jsx"),
        ("frontend/src/components/Blog.jsx", "frontend/src/components/Blog.jsx"),
        ("frontend/src/components/Contact.jsx", "frontend/src/components/Contact.jsx"),
        ("frontend/src/components/Footer.jsx", "frontend/src/components/Footer.jsx"),
    ]),
]

ENV_BACKEND = """MONGO_URL=mongodb://localhost:27017
DB_NAME=physioreyes
CORS_ORIGINS=*
ADMIN_TOKEN=tu_token_admin_aqui
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM=onboarding@resend.dev
CONTACT_TO_EMAIL=physioreyes@gmail.com
"""

REQUIREMENTS = """fastapi
uvicorn
motor
python-dotenv
pydantic
resend>=2.0.0
"""

ENV_FRONTEND = """REACT_APP_BACKEND_URL=https://tu-dominio.com
"""

def safe(s: str) -> str:
    # Replace characters not in Latin-1 (FPDF core fonts limitation)
    return s.encode("latin-1", "replace").decode("latin-1")

class PDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(0, 212, 255)
        self.cell(0, 6, "physioreyes - source code", align="L")
        self.set_text_color(120, 120, 120)
        self.cell(0, 6, f"Pagina {self.page_no()}", align="R", new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(0, 212, 255)
        self.set_line_width(0.3)
        self.line(10, 18, 200, 18)
        self.ln(4)

    def cover(self):
        self.add_page()
        self.set_fill_color(5, 5, 5)
        self.rect(0, 0, 210, 297, "F")
        # Title
        self.set_y(80)
        self.set_text_color(255, 255, 255)
        self.set_font("Helvetica", "B", 48)
        self.cell(0, 20, "physioreyes", align="C", new_x="LMARGIN", new_y="NEXT")
        self.set_text_color(0, 212, 255)
        self.set_font("Helvetica", "B", 18)
        self.cell(0, 10, "SOURCE CODE", align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(20)
        self.set_text_color(180, 180, 180)
        self.set_font("Helvetica", "", 11)
        self.cell(0, 8, "Landing page personal - Samuel Reyes Tejera", align="C", new_x="LMARGIN", new_y="NEXT")
        self.cell(0, 8, "Movimiento - Rendimiento - Recuperacion", align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(20)
        self.set_text_color(120, 120, 120)
        self.set_font("Helvetica", "", 9)
        self.cell(0, 6, "Stack: FastAPI + MongoDB + Resend  |  React 19 + Tailwind + Sonner", align="C", new_x="LMARGIN", new_y="NEXT")

    def section_title(self, title: str):
        self.add_page()
        self.set_font("Helvetica", "B", 18)
        self.set_text_color(255, 255, 255)
        self.set_fill_color(0, 212, 255)
        self.set_text_color(0, 0, 0)
        self.cell(0, 14, f"  {title}", fill=True, new_x="LMARGIN", new_y="NEXT")
        self.ln(4)

    def file_block(self, label: str, content: str):
        # File label
        if self.get_y() > 250:
            self.add_page()
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(0, 212, 255)
        self.cell(0, 8, safe(label), new_x="LMARGIN", new_y="NEXT")
        self.ln(1)
        # Code
        self.set_font("Courier", "", 7.5)
        self.set_text_color(40, 40, 40)
        for line in content.splitlines() or [""]:
            # Wrap long lines manually
            text = safe(line.replace("\t", "    "))
            if not text:
                self.ln(3.2)
                continue
            # Page break check
            if self.get_y() > 285:
                self.add_page()
            # Auto-wrap using multi_cell
            self.set_x(12)
            self.multi_cell(w=186, h=3.4, txt=text, align="L")
        self.ln(4)


def main():
    pdf = PDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=True, margin=14)
    pdf.set_margins(left=10, top=22, right=10)

    pdf.cover()

    for section_name, items in FILES:
        pdf.section_title(section_name)
        for label, rel_path in items:
            if rel_path is None:
                # Use static content
                if "backend/.env" in label:
                    content = ENV_BACKEND
                elif "requirements.txt" in label:
                    content = REQUIREMENTS
                elif "frontend/.env" in label:
                    content = ENV_FRONTEND
                else:
                    content = ""
            else:
                path = ROOT / rel_path
                try:
                    content = path.read_text(encoding="utf-8")
                except Exception as e:
                    content = f"# Error reading file: {e}"
            pdf.file_block(label, content)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Generated: {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
