from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from fastapi import Header
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend config
resend.api_key = os.environ.get("RESEND_API_KEY", "")
RESEND_FROM = os.environ.get("RESEND_FROM", "onboarding@resend.dev")
CONTACT_TO = os.environ.get("CONTACT_TO_EMAIL", "physioreyes@gmail.com")

app = FastAPI(title="Physioreyes API")
api_router = APIRouter(prefix="/api")


# ===== Models =====
class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: str = Field(min_length=5, max_length=120)
    phone: Optional[str] = Field(default=None, max_length=40)
    interest: Optional[str] = Field(default=None, max_length=60)
    message: str = Field(min_length=5, max_length=2000)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    interest: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class Template(BaseModel):
    id: str
    title: str
    category: str
    description: str
    color_scheme: str
    download_url: str
    preview_layout: str  # which mock layout to render (post-quote, post-stat, post-tip, story-cta, carousel-cover, post-anatomy)


class Article(BaseModel):
    id: str
    title: str
    excerpt: str
    category: str
    read_minutes: int
    published_at: str
    body: str


# ===== Routes =====
@api_router.get("/")
async def root():
    return {"message": "physioreyes api online", "version": "1.0.0"}


@api_router.post("/contacts", response_model=Contact, status_code=201)
async def create_contact(payload: ContactCreate, background_tasks: BackgroundTasks):
    contact = Contact(**payload.model_dump())
    await db.contacts.insert_one(contact.model_dump())
    # Fire-and-forget email notification — never block the response
    background_tasks.add_task(_send_contact_email, contact)
    return contact


async def _send_contact_email(contact: "Contact") -> None:
    if not resend.api_key:
        logger.warning("RESEND_API_KEY not set — skipping email notification")
        return
    try:
        html = _render_contact_email_html(contact)
        params = {
            "from": RESEND_FROM,
            "to": [CONTACT_TO],
            "reply_to": contact.email,
            "subject": f"Nuevo contacto · {contact.name} · physioreyes",
            "html": html,
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Contact email sent: {result.get('id')}")
    except Exception as e:
        # Never crash the request flow because email failed
        logger.error(f"Failed to send contact email: {e}")


def _render_contact_email_html(c: "Contact") -> str:
    safe = lambda s: (s or "").replace("<", "&lt;").replace(">", "&gt;")
    return f"""
<!doctype html>
<html><body style="margin:0;padding:24px;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#f4f4f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#0a0a0b;border:1px solid #1f1f22;">
    <tr><td style="padding:24px;border-bottom:1px solid #1f1f22;">
      <div style="font-family:'Arial Black',sans-serif;font-size:22px;letter-spacing:-1px;color:#fff;">
        physio<span style="color:#00D4FF;">reyes</span>
      </div>
      <div style="font-size:11px;letter-spacing:.2em;color:#a1a1aa;text-transform:uppercase;margin-top:4px;">
        Nuevo contacto desde la web
      </div>
    </td></tr>
    <tr><td style="padding:24px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr><td style="padding:8px 0;color:#a1a1aa;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">Nombre</td></tr>
        <tr><td style="padding:0 0 16px 0;color:#fff;font-size:16px;">{safe(c.name)}</td></tr>
        <tr><td style="padding:8px 0;color:#a1a1aa;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">Email</td></tr>
        <tr><td style="padding:0 0 16px 0;color:#fff;font-size:16px;">
          <a href="mailto:{safe(c.email)}" style="color:#00D4FF;text-decoration:none;">{safe(c.email)}</a>
        </td></tr>
        <tr><td style="padding:8px 0;color:#a1a1aa;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">Teléfono</td></tr>
        <tr><td style="padding:0 0 16px 0;color:#fff;font-size:16px;">{safe(c.phone) or '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#a1a1aa;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">Interés</td></tr>
        <tr><td style="padding:0 0 16px 0;color:#fff;font-size:16px;">{safe(c.interest) or '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#a1a1aa;font-size:11px;letter-spacing:.18em;text-transform:uppercase;">Mensaje</td></tr>
        <tr><td style="padding:0 0 16px 0;color:#fff;font-size:15px;line-height:1.55;white-space:pre-wrap;">{safe(c.message)}</td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:18px 24px;background:#050505;border-top:1px solid #1f1f22;font-size:11px;color:#a1a1aa;letter-spacing:.15em;text-transform:uppercase;">
      Recibido · {c.created_at}
    </td></tr>
  </table>
</body></html>
""".strip()


@api_router.get("/contacts", response_model=List[Contact])
async def list_contacts(x_admin_token: Optional[str] = Header(default=None)):
    expected = os.environ.get("ADMIN_TOKEN", "")
    if not expected or x_admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [Contact(**d) for d in docs]


# ===== Static catalogues (seeded in code, no DB needed) =====
TEMPLATES: List[dict] = [
    {
        "id": "tpl-01",
        "title": "Cita de la semana",
        "category": "Post · Frase",
        "description": "Plantilla minimalista para citas de autores y referentes científicos. Tipografía grande y cita centrada.",
        "color_scheme": "Negro · Cyan",
        "download_url": "/api/templates/tpl-01/download",
        "preview_layout": "post-quote",
    },
    {
        "id": "tpl-02",
        "title": "Stat impactante",
        "category": "Post · Dato",
        "description": "Dato numérico destacado con contexto debajo. Ideal para divulgar evidencia y estudios.",
        "color_scheme": "Cyan · Blanco",
        "download_url": "/api/templates/tpl-02/download",
        "preview_layout": "post-stat",
    },
    {
        "id": "tpl-03",
        "title": "Tip rápido",
        "category": "Post · Tip",
        "description": "Consejo accionable en 1-2 líneas. Perfecto para reels y carruseles.",
        "color_scheme": "Negro · Cyan",
        "download_url": "/api/templates/tpl-03/download",
        "preview_layout": "post-tip",
    },
    {
        "id": "tpl-04",
        "title": "Story CTA",
        "category": "Story · 9:16",
        "description": "Llamada a la acción para stories: reservar consulta, descargar guía, suscribirse.",
        "color_scheme": "Cyan sólido",
        "download_url": "/api/templates/tpl-04/download",
        "preview_layout": "story-cta",
    },
    {
        "id": "tpl-05",
        "title": "Portada de carrusel",
        "category": "Carrusel · Cover",
        "description": "Portada con número de slides, título grande y subtítulo. Diseñada para frenar el scroll.",
        "color_scheme": "Negro · Blanco · Cyan",
        "download_url": "/api/templates/tpl-05/download",
        "preview_layout": "carousel-cover",
    },
    {
        "id": "tpl-06",
        "title": "Mapa anatómico",
        "category": "Post · Educativo",
        "description": "Lámina educativa con etiquetas. Para explicar lesiones, ejercicios o conceptos.",
        "color_scheme": "Negro · Cyan",
        "download_url": "/api/templates/tpl-06/download",
        "preview_layout": "post-anatomy",
    },
]

ARTICLES: List[dict] = [
    {
        "id": "art-01",
        "title": "Readaptación deportiva: del dolor al rendimiento",
        "excerpt": "El puente entre la lesión y el deporte no es la ausencia de dolor — es la capacidad de tolerar carga específica del gesto.",
        "category": "Readaptación",
        "read_minutes": 6,
        "published_at": "2025-11-12",
        "body": "Artículo completo próximamente.",
    },
    {
        "id": "art-02",
        "title": "Fuerza excéntrica en tendinopatías: lo que dice la evidencia",
        "excerpt": "Revisión de los protocolos Alfredson y Heavy Slow Resistance, sus indicaciones y por qué no son intercambiables.",
        "category": "Rehabilitación",
        "read_minutes": 8,
        "published_at": "2025-10-28",
        "body": "Artículo completo próximamente.",
    },
    {
        "id": "art-03",
        "title": "Velocidad de ejecución (VBT) aplicada al deporte amateur",
        "excerpt": "No necesitas un encoder de 2.000€ — sólo entender la curva fuerza-velocidad y por qué tu RPE engaña.",
        "category": "Rendimiento",
        "read_minutes": 5,
        "published_at": "2025-10-10",
        "body": "Artículo completo próximamente.",
    },
    {
        "id": "art-04",
        "title": "Carga interna vs externa: el GPS no cuenta toda la historia",
        "excerpt": "Cómo combinar RPE, HRV y métricas de campo para tomar decisiones reales sobre fatiga y readiness.",
        "category": "Rendimiento",
        "read_minutes": 7,
        "published_at": "2025-09-22",
        "body": "Artículo completo próximamente.",
    },
]


@api_router.get("/templates", response_model=List[Template])
async def list_templates():
    return [Template(**t) for t in TEMPLATES]


@api_router.get("/templates/{template_id}", response_model=Template)
async def get_template(template_id: str):
    for t in TEMPLATES:
        if t["id"] == template_id:
            return Template(**t)
    raise HTTPException(status_code=404, detail="Plantilla no encontrada")


@api_router.get("/articles", response_model=List[Article])
async def list_articles():
    return [Article(**a) for a in ARTICLES]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
