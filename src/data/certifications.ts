import type { Certification } from '../types'

// Fuente: LinkedIn → Licencias y certificaciones (verificado el 2026-10-19).
// Para añadir una: copia un objeto y completa los campos; `expires: null` si no vence o no consta.
export const certifications: Certification[] = [
  {
    name: 'Introducción a la Ciencia de Datos',
    issuer: 'Cisco Networking Academy',
    issued: '2025-06',
    expires: null,
    credentialId: 'ad4ad76e-adef-49e0-bc55-9bc43dda8274',
    verifyUrl: 'https://www.netacad.com/recognitions/verify/ad4ad76e-adef-49e0-bc55-9bc43dda8274',
  },
  {
    name: 'Conceptos básicos de redes',
    issuer: 'Cisco Networking Academy',
    issued: '2024-12',
    expires: null,
    credentialId: 'b7ee1bbf-0370-4b11-a712-80c779391e7c',
    verifyUrl: 'https://www.netacad.com/recognitions/verify/b7ee1bbf-0370-4b11-a712-80c779391e7c',
  },
  {
    name: 'Conceptos Básicos de Hardware de Computadora',
    issuer: 'Cisco Networking Academy',
    issued: '2024-12',
    expires: null,
    credentialId: '5ebb44bc-a0a6-4562-8e07-f91d5a3dc273',
    verifyUrl: 'https://www.netacad.com/recognitions/verify/5ebb44bc-a0a6-4562-8e07-f91d5a3dc273',
  },
  {
    name: 'Introducción a la Ciberseguridad',
    issuer: 'Cisco Networking Academy',
    issued: '2024-10',
    expires: null,
    credentialId: '0a665e04-157d-41b7-9622-477b03530043',
    verifyUrl: 'https://www.netacad.com/recognitions/verify/0a665e04-157d-41b7-9622-477b03530043',
  },
  {
    name: 'Introducción al Internet de las Cosas y Transformación Digital',
    issuer: 'Cisco Networking Academy',
    issued: '2024-10',
    expires: null,
    credentialId: '20201fa8-876e-4f68-93f8-87f4cf9420f5',
    verifyUrl: 'https://www.netacad.com/recognitions/verify/20201fa8-876e-4f68-93f8-87f4cf9420f5',
  },
]
