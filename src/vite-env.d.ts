/// <reference types="vite/client" />

// Credenciales públicas de EmailJS (ver .env.example). Si faltan, el formulario abre el correo del visitante.
interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID?: string
  readonly VITE_EMAILJS_TEMPLATE_ID?: string
  readonly VITE_EMAILJS_PUBLIC_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
