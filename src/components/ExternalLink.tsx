import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> {
  href: string
  children: ReactNode
}

/** Enlace externo seguro: nueva pestaña, sin `opener`, con aviso para lectores de pantalla. */
export function ExternalLink({ href, children, ...rest }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="visually-hidden"> (se abre en otra pestaña)</span>
    </a>
  )
}
