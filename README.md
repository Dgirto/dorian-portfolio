# Dorian Girón Prato · Portafolio

Portafolio personal construido con **React + TypeScript + Vite**. Presenta mi trabajo como ingeniero de software júnior en Ruvic AI y mis proyectos con código público, empezando por los **46 conectores** que construí para que un agente de IA trabaje con sistemas externos.

El diseño se compone como una **hoja de contactos**: cada fotograma es una captura real de la guía de un conector, clasificada con el código de colores del cableado estructurado. El concepto y el sistema visual están documentados en [`DESIGN.md`](DESIGN.md).

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
| `lucide-react` | Iconos SVG consistentes (solo se empaquetan los usados) |
| `@fontsource-variable/work-sans` | Tipografía autoalojada: sin peticiones a terceros |
| Vitest | Pruebas de la lógica y de los datos |

No se usa React Router (es una sola página), ni librerías de animación (el movimiento es CSS + `IntersectionObserver`), ni backend.

## Estructura

```
src/
  components/   Piezas reutilizables (cabecera, etiqueta de cable, enlace externo)
  sections/     Una sección por archivo, cada una con su .module.css
  data/         TODO el contenido editable (ver abajo)
  hooks/        Entradas al hacer scroll, API de GitHub, fotograma centrado, hora local
  types/        Tipos compartidos
  utils/        Búsqueda de conectores, formato de fechas, cliente de la API de GitHub
  styles/       Tokens de diseño y estilos globales
public/
  frames/       Capturas de las guías de los 46 conectores
  work/         Capturas de proyectos, retrato y mosaico
  robots.txt, sitemap.xml, favicon.svg, og-image.png
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
    { type: 'code', filename: 'src/app.ts', language: 'ts', code: '…', caption: '…' },
  ],
}
```

Para eliminarlo, borra el objeto. `npm test` comprueba que cada imagen enlazada existe.

### Añadir una certificación

Añade un objeto a `src/data/certifications.ts` con `name`, `issuer`, `issued` (`AAAA-MM`), `expires` (`AAAA-MM` o `null`), `credentialId` y `verifyUrl` (o `null` si no hay enlace de verificación). La sección se ordena tal como está el arreglo.

### Añadir un conector

Añade un objeto a `src/data/connectors.ts` con la misma forma y su captura en `public/frames/<repo-en-minúsculas>.webp` (480 × 300). La búsqueda usa nombre, código, descripción, palabras clave y operaciones.

## Integración con GitHub

La sección «En GitHub» consulta la **API pública** (`/users/Dgirto` y `/users/Dgirto/repos`) desde el navegador, **sin token**:

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
- Lighthouse 12 (compilación de producción servida en local, 19 oct. 2026): escritorio 99 rendimiento · 100 accesibilidad · 96 buenas prácticas · 100 SEO; móvil 94 · 100 · 96 · 100. El 96 se debe a un error 403 en consola: la API pública de GitHub limitó las consultas tras muchas pruebas seguidas desde la misma IP; la sección muestra entonces su estado de error.
- Respeta `prefers-reduced-motion`, navegable con teclado, foco visible, enlaces externos con `rel="noopener noreferrer"`.

## Créditos

- Capturas: guías de los conectores, panel de watchdog-bot-monitor y demo de appEscuela, todas de mis propios repositorios.
- Fotografía del mosaico: Dorothee Hübner, [Unsplash](https://unsplash.com/photos/4vPPtrfLRcs) (licencia Unsplash).
