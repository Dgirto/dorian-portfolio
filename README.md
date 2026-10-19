# Dorian Girón Prato · Portafolio

Portafolio personal construido con **React + TypeScript + Vite**. Presenta mi trabajo como ingeniero de software júnior en Ruvic AI, mi formación (estudiante de 5.º ciclo de Ingeniería de Software con IA en SENATI) y mis proyectos con código público, empezando por los **46 conectores** que construí para que un agente de IA trabaje con sistemas externos.

La experiencia sigue el ritmo de una página de producto: titulares cortos y grandes, capturas reales dentro de dispositivos que se animan con el desplazamiento, capítulos oscuros fijados en pantalla y proyectos que se abren en detalle. El concepto, la paleta y el lenguaje de movimiento están documentados en [`DESIGN.md`](DESIGN.md).

## Requisitos previos

- Node.js 20.19 o superior (probado con Node 24)
- npm 10 o superior

## Instalación y desarrollo

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Verificación de tipos (`tsc -b`) y compilación de producción en `dist/` |
| `npm run preview` | Sirve `dist/` localmente para revisar la compilación |
| `npm run lint` | ESLint (TypeScript + reglas de hooks de React) |
| `npm run typecheck` | Solo verificación de tipos |
| `npm test` | Pruebas unitarias con Vitest (búsqueda, resumen de GitHub, integridad de datos) |

## Tecnologías

| Pieza | Motivo |
| --- | --- |
| React 19 + TypeScript | Núcleo de la interfaz, tipado de todos los datos editables |
| Vite 8 | Desarrollo rápido y compilación estática lista para Vercel |
| CSS Modules + tokens en `global.css` | Estilos por componente sin dependencias de runtime |
| `three` | Portátil 3D del hero con materiales físicos. Se carga en un fragmento aparte al primer gesto del visitante; antes se muestra un fotograma fijo |
| `motion` | Animaciones ligadas al scroll (portátil, paralaje, frase fijada, línea de tiempo), entradas y contadores. Se carga con `LazyMotion` + `domAnimation` |
| `lucide-react` | Iconos SVG consistentes (solo se empaquetan los usados) |
| `@fontsource-variable/geist` | Tipografía Geist autoalojada: sin peticiones a terceros |
| Vitest | Pruebas de la lógica y de los datos |

No se usa React Router (es una sola página) ni backend.

## Estructura

```
src/
  components/   Piezas reutilizables (cabecera, dispositivos, entrada animada, frase fijada, contador, enlace externo)
  sections/     Una sección por archivo, cada una con su .module.css
  data/         TODO el contenido editable (ver abajo)
  hooks/        API de GitHub y hora local
  types/        Tipos compartidos
  utils/        Búsqueda de conectores, formato de fechas, cliente de la API de GitHub
  styles/       Tokens de diseño y estilos globales
public/
  logos/        Logo de cada conector (<repo-en-minúsculas>.svg)
  work/         Capturas de proyectos, pantallas de Figma y retrato
  robots.txt, sitemap.xml, favicon.svg, og-image.png
iot/
  alerta-sismica/  Programas de Arduino del proyecto de Tinkercad (controlador y actuadores)
docs/
  Laboratorio-4-Dorian-Giron-Prato.pdf  Documentación del Laboratorio #4 (SENATI)
  capturas/        Capturas de ejecución usadas en el PDF
  herramientas/    Scripts que toman las capturas y generan el PDF
```

## Editar el contenido

Ningún componente contiene textos personales: todo vive en `src/data/`.

| Archivo | Contenido |
| --- | --- |
| `profile.ts` | Nombre, titular, presentación, correo, enlaces, retrato, URL del sitio |
| `timeline.ts` | Experiencia laboral y formación académica |
| `projects.ts` | Proyectos destacados |
| `certifications.ts` | Certificaciones |
| `stack.ts` | Tecnologías por categoría, cada una con su evidencia |
| `connectors.ts` | Catálogo de conectores (generado desde los `manifest.json`) |
| `families.ts` | Familias de conectores y su color de par |
| `navigation.ts` | Enlaces de la cabecera y el pie |

### Añadir un proyecto

1. Guarda sus capturas en `public/work/` (WebP, 1000–1400 px de ancho).
2. Añade un objeto al arreglo de `src/data/projects.ts`:

```ts
{
  slug: 'mi-proyecto',
  name: 'mi-proyecto',
  featured: false,             // true: ocupa todo el ancho de la cuadrícula
  // Portada: { kind: 'laptop' | 'phone' | 'plain', src, alt, width, height }
  //          { kind: 'phones', shots: [shot, shot] } · { kind: 'logos' } · { kind: 'code' }
  cover: { kind: 'laptop', src: '/work/mi-proyecto.webp', alt: 'Descripción', width: 1400, height: 875 },
  kind: 'Personal',            // 'Prácticas' | 'Académico' | 'Personal'
  year: '2026',
  thesis: 'Una línea que diga qué es.',
  problem: '…', solution: '…', contribution: '…',
  team: 'Individual',
  stack: ['React', 'TypeScript'],
  repo: 'https://github.com/Dgirto/mi-proyecto',
  demo: 'https://…',           // opcional
  slides: [
    { type: 'image', src: '/work/mi-proyecto.webp', alt: 'Descripción', width: 1400, height: 875 },
    { type: 'code', filename: 'src/app.py', language: 'python', code: '…', caption: '…' }, // python | java | bash | json
  ],
}
```

Para eliminarlo, borra el objeto. `npm test` comprueba que cada imagen enlazada existe.

### Añadir una certificación

Añade un objeto a `src/data/certifications.ts` con `name`, `issuer`, `issued` (`AAAA-MM`), `expires` (`AAAA-MM` o `null`), `credentialId` y `verifyUrl` (o `null` si no hay enlace de verificación). La sección se ordena tal como está el arreglo.

### Añadir un conector

Añade un objeto a `src/data/connectors.ts` con la misma forma y su logo en `public/logos/<repo-en-minúsculas>.svg`. Aparecerá en el muro animado y en el explorador; la búsqueda usa nombre, código, descripción, palabras clave y operaciones.

## Integración con GitHub

La sección «GitHub, en vivo» consulta la **API pública** (`/users/Dgirto` y `/users/Dgirto/repos`) desde el navegador, **sin token**:

- Muestra repositorios públicos, lenguaje más usado, último push y los seis repositorios con actividad más reciente.
- Guarda la respuesta 30 minutos en `sessionStorage` para no gastar el límite (60 peticiones por hora e IP).
- Gestiona los estados de carga, error de red, límite de peticiones (con la hora en que se libera) y cuenta vacía.
- La API pública solo devuelve repositorios públicos.

**Nunca pongas un token de GitHub en el frontend.** Si algún día necesitas más límite, crea una función serverless en Vercel que lea el token de una variable de entorno y haga de intermediaria.

El usuario se cambia en `profile.githubUser`.

## Despliegue en Vercel

El proyecto no necesita `vercel.json`: Vercel detecta Vite automáticamente.

1. Entra en [vercel.com/new](https://vercel.com/new) e importa el repositorio `Dgirto/dorian-portfolio`.
2. Framework: **Vite** · Build command: `npm run build` · Output directory: `dist`.
3. No hay variables de entorno que configurar.
4. Tras el primer despliegue, actualiza la URL definitiva en:
   - `src/data/profile.ts` → `siteUrl`
   - `index.html` → `canonical`, `og:url`, `og:image` y JSON-LD
   - `public/robots.txt` y `public/sitemap.xml`

Cada push a `main` generará un despliegue nuevo.

## Calidad

- `npm run lint`, `npm run typecheck`, `npm test` y `npm run build` sin errores.
- Lighthouse 12 (compilación de producción servida en local, 19 oct. 2026): escritorio 100 rendimiento · 100 accesibilidad · 100 buenas prácticas · 100 SEO; móvil 92 · 100 · 100 · 100 (el rendimiento móvil varía entre 92 y 94 según la ejecución). Si la API pública de GitHub responde 403 por límite de consultas, buenas prácticas baja a 96 y la sección muestra su estado de error.
- Respeta `prefers-reduced-motion` (sin desplazamientos, marquesina detenida, frase estática), navegable con teclado, foco visible, diálogo nativo accesible, enlaces externos con `rel="noopener noreferrer"`.

## Documentación del Laboratorio #4

El PDF [`docs/Laboratorio-4-Dorian-Giron-Prato.pdf`](docs/Laboratorio-4-Dorian-Giron-Prato.pdf) documenta el proyecto según la Guía Práctica 4 del curso Fullstack Developer Software – Seminario (IA 501) de SENATI: cada paso de la guía con su código y su captura de ejecución, el proyecto de Tinkercad, la verificación y las diferencias con la guía. Se regenera con Google Chrome instalado:

```bash
npm run dev                                  # en otra terminal
node docs/herramientas/capturas.mjs          # capturas de ejecución
npm run build && npm run preview             # en otra terminal, para Lighthouse
node docs/herramientas/lighthouse.mjs
node docs/herramientas/generar-pdf.mjs       # código resaltado con shiki + PDF
```

Si Chrome no está en la ruta habitual, indica su ubicación con la variable `CHROME_PATH`.

## Créditos

- Capturas: panel de watchdog-bot-monitor (ejecutado en local con sus datos de demostración) y demo pública de appEscuela, tomadas a 2× y 3× con emulación de dispositivo.
- Portátil 3D del hero: modelado por código con [three.js](https://threejs.org) (MIT) en `src/three/laptopScene.ts`.
- Marcos de iPhone 14 Pro y MacBook Pro estático (respaldo sin WebGL): adaptados de [devices.css](https://github.com/picturepan2/devices.css) de Yan Zhu (licencia MIT; aviso incluido en `src/components/Devices.module.css`). Se convirtieron a unidades relativas y la tapa del MacBook se separó para animar su apertura.
- Pantallas de appTareas: exportadas del archivo de Figma enlazado en su README; son diseños, no capturas de la app compilada.
- Logos de los conectores: los `icon.svg` de cada repositorio; los que faltaban proceden de [Devicon](https://devicon.dev) (MIT) y [Simple Icons](https://simpleicons.org) (CC0). Intune usa el logotipo de cuatro cuadrados de Microsoft. Todas las marcas pertenecen a sus propietarios y se muestran solo para identificar la integración.
- Proyecto de Arduino: diseñado y simulado en Tinkercad Circuits; la vista de protoboard y el esquema son capturas del propio diseño.
- Paleta: base inspirada en las extracciones públicas del sistema visual de Apple y en paletas oscuras para desarrolladores; acento verde propio.
