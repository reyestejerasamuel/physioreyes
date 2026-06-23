# physioreyes — Source Code

Landing page personal de **Samuel Reyes Tejera** (Málaga).
Marca: physioreyes · Movimiento · Rendimiento · Recuperación.

## Stack

- **Backend**: FastAPI · MongoDB (motor) · Resend (emails)
- **Frontend**: React 19 · TailwindCSS · shadcn/ui · Sonner · Lucide · Axios

## Estructura

```
backend/
├── .env.example         ← copia a .env y rellena
├── requirements.txt
└── server.py

frontend/
├── .env.example         ← copia a .env y rellena
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── index.html
└── src/
    ├── App.js
    ├── App.css
    ├── index.css
    ├── index.js
    └── components/
        ├── Logo.jsx
        ├── Signature.jsx
        ├── Nav.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Services.jsx
        ├── Blog.jsx
        ├── Contact.jsx
        ├── Footer.jsx
        ├── TemplateMockup.jsx  ← NO usado actualmente (sección plantillas oculta)
        └── Templates.jsx       ← NO usado actualmente
```

## Cómo levantarlo localmente

### 1. Pre-requisitos

- Python 3.11+
- Node 18+ · `yarn`
- MongoDB local corriendo en `mongodb://localhost:27017`

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edita .env y pon tu RESEND_API_KEY real
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env
# Edita .env y pon la URL del backend (en local: http://localhost:8001)
yarn install
yarn start
```

Abre http://localhost:3000.

## Endpoints backend

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/` | Health check |
| POST | `/api/contacts` | Crea contacto + envía email a physioreyes@gmail.com |
| GET | `/api/contacts` | Lista contactos (protegido con header `X-Admin-Token`) |
| GET | `/api/articles` | Lista artículos del blog |

## Notas

- El **logo** es un PNG hospedado en CDN (ver `Logo.jsx`).
- Las **fuentes** vienen de Fontshare (Cabinet Grotesk) y Google Fonts (Manrope, Caveat, JetBrains Mono).
- El correo se envía vía **Resend**. En modo gratuito sólo puedes enviar emails al correo con el que te registraste en Resend.
- Los componentes `TemplateMockup.jsx` y `Templates.jsx` existen pero **no están enlazados** desde `App.js` (la sección "Plantillas" se quitó por petición del usuario).
