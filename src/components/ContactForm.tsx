import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import styles from './ContactForm.module.css'

interface Fields {
  nombre: string
  email: string
  mensaje: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'opened'

const EMPTY: Fields = { nombre: '', email: '', mensaje: '' }

// Credenciales públicas de EmailJS, leídas del .env (prefijo VITE_). No son secretas: EmailJS limita su uso
// a los dominios permitidos en su panel.
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
const emailjsReady = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey)

const NOTES: Record<Status, string> = {
  idle: emailjsReady
    ? 'Tu mensaje me llega directamente al correo.'
    : 'Al enviar se abrirá tu aplicación de correo con el mensaje ya redactado.',
  sending: 'Enviando tu mensaje…',
  sent: '¡Mensaje enviado! Te responderé a la brevedad.',
  error: 'No se pudo enviar. Inténtalo de nuevo o escríbeme directamente al correo.',
  opened: 'Se abrió tu aplicación de correo con el mensaje listo. Solo falta pulsar Enviar.',
}

/** Alerta con SweetAlert2, cargada solo al enviar para no pesar en la carga inicial. */
async function alerta(ok: boolean) {
  const { default: Swal } = await import('sweetalert2')
  await Swal.fire({
    title: ok ? '¡Mensaje enviado!' : 'No se pudo enviar',
    text: ok
      ? 'Gracias por contactarme. Te responderé a la brevedad.'
      : 'Hubo un problema al enviar el mensaje. Inténtalo más tarde o escríbeme directamente al correo.',
    icon: ok ? 'success' : 'error',
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#0a7f52',
    background: '#0d1117',
    color: '#f5f5f7',
    // Sin esto, SweetAlert2 fija la altura del body y la página salta al inicio mientras la alerta está abierta.
    heightAuto: false,
  })
}

/**
 * Formulario controlado (un único estado con todos los campos).
 * Con EmailJS configurado envía el correo de verdad; si faltan las credenciales, abre la aplicación de correo
 * del visitante con el mensaje redactado. Nunca aparenta un envío que no ocurre.
 */
export function ContactForm({ to }: { to: string }) {
  const [form, setForm] = useState<Fields>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const id = useId()
  const sending = status === 'sending'

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const openMailClient = () => {
    const subject = `Contacto desde el portafolio — ${form.nombre}`
    const body = `${form.mensaje}\n\n${form.nombre}\n${form.email}`
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('opened')
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!emailjsReady) return openMailClient()

    setStatus('sending')
    try {
      const { default: emailjs } = await import('@emailjs/browser')
      // Variables de la guía ({{nombre}}, {{email}}, {{mensaje}}) y también las de la plantilla
      // «Contact Us» por defecto de EmailJS ({{name}}, {{message}}, {{title}}, {{time}}).
      const params = {
        ...form,
        name: form.nombre,
        message: form.mensaje,
        title: `Mensaje de ${form.nombre} desde el portafolio`,
        time: new Date().toLocaleString('es-PE', { dateStyle: 'long', timeStyle: 'short' }),
      }
      await emailjs.send(EMAILJS.serviceId!, EMAILJS.templateId!, params, {
        publicKey: EMAILJS.publicKey,
        // Antispam: un envío cada 10 s por visitante y sin navegadores automatizados.
        limitRate: { id: 'contacto', throttle: 10_000 },
        blockHeadless: true,
      })
      setForm(EMPTY)
      setStatus('sent')
      await alerta(true)
    } catch (error) {
      console.error('Error al enviar el mensaje:', error)
      setStatus('error')
      await alerta(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} aria-describedby={`${id}-note`} aria-busy={sending}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={`${id}-nombre`}>Nombre</label>
          <input
            id={`${id}-nombre`}
            name="nombre"
            type="text"
            autoComplete="name"
            value={form.nombre}
            onChange={onChange}
            placeholder="Tu nombre"
            required
            disabled={sending}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-email`}>Correo</label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={onChange}
            placeholder="tu@correo.com"
            required
            disabled={sending}
          />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor={`${id}-mensaje`}>Mensaje</label>
        <textarea
          id={`${id}-mensaje`}
          name="mensaje"
          rows={5}
          value={form.mensaje}
          onChange={onChange}
          placeholder="Cuéntame sobre tu proyecto o la oportunidad…"
          required
          disabled={sending}
        />
      </div>
      <div className={styles.footer}>
        <p id={`${id}-note`} className={styles.note} aria-live="polite">
          {NOTES[status]}
        </p>
        <button type="submit" className="btn" disabled={sending}>
          <Send size={18} aria-hidden="true" /> {sending ? 'Enviando…' : emailjsReady ? 'Enviar mensaje' : 'Preparar correo'}
        </button>
      </div>
    </form>
  )
}
