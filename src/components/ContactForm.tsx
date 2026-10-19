import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import styles from './ContactForm.module.css'

interface Fields {
  nombre: string
  email: string
  mensaje: string
}

const EMPTY: Fields = { nombre: '', email: '', mensaje: '' }

/**
 * Formulario controlado (un único estado con todos los campos).
 * No hay servidor: al enviar, abre la aplicación de correo del visitante con el mensaje ya redactado.
 * Así nunca aparenta un envío que no ocurre.
 */
export function ContactForm({ to }: { to: string }) {
  const [form, setForm] = useState<Fields>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'opened'>('idle')
  const id = useId()

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = `Contacto desde el portafolio — ${form.nombre}`
    const body = `${form.mensaje}\n\n${form.nombre}\n${form.email}`
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('opened')
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} aria-describedby={`${id}-note`}>
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
        />
      </div>
      <div className={styles.footer}>
        <p id={`${id}-note`} className={styles.note} aria-live="polite">
          {status === 'opened'
            ? 'Se abrió tu aplicación de correo con el mensaje listo. Solo falta pulsar Enviar.'
            : 'Al enviar se abrirá tu aplicación de correo con el mensaje ya redactado.'}
        </p>
        <button type="submit" className="btn">
          <Send size={18} aria-hidden="true" /> Preparar correo
        </button>
      </div>
    </form>
  )
}
