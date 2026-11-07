# DESIGN.md — Portafolio de Dorian Girón Prato (v3)

> Tercera versión del sistema visual. Sustituye la experiencia de producto con portátil 3D por una dirección más técnica: negro y blanco con un único color principal amarillo verdoso, líneas, cuadrícula, sombras y gráficos propios.

## 1. Concepto

**El trabajo se explica solo.** La página presenta quién es Dorian sin tono de venta: un titular directo, un diagrama de lo que conecta y proyectos reales con capturas, código y un video corto.

Recorrido:

1. **Hero**: «Soy Dorian Girón, ingeniero de software júnior.», una presentación breve, enlaces de texto y un diagrama de nodos que se dibuja al cargar.
2. **Sobre mí**: retrato fijo al desplazarse, presentación y trayectoria.
3. **Certificaciones**: cada una con miniatura; «Ver» abre el certificado completo y las de Cisco conservan «Verificar».
4. **Filosofía**: «Crecer con estrategia.» en una línea, con un trazo escalonado que se dibuja con el scroll.
5. **Proyectos**: cuadrícula de tarjetas (las destacadas a todo el ancho); cada una abre un diálogo con video, galería, problema, solución, aporte, tecnologías y enlaces.
6. **Stack en mosaico**: cada herramienta con su evidencia.
7. **GitHub en vivo**: cifras y actividad reciente de la API pública.
8. **Contacto** y pie.

## 2. Paleta

Blanco y negro puros con un solo color principal. El amarillo verdoso nunca se usa como texto sobre blanco: ahí se emplea su versión oscura.

| Rol | Token | Valor | Contraste |
| --- | --- | --- | --- |
| Fondo claro | `--bg` | `#ffffff` | — |
| Panel | `--surface` | `#f5f5f5` | — |
| Panel 2 | `--surface-2` | `#e8e8e8` | — |
| Líneas | `--line` | `#d6d6d6` | — |
| Texto | `--ink` | `#0a0a0a` | 19.8:1 sobre `--bg` |
| Texto secundario | `--muted` | `#5c5c5c` | 6.7:1 sobre `--bg` |
| Fondo oscuro | `--night` | `#0a0a0a` | — |
| Paneles oscuros | `--night-2` / `--night-3` | `#141414` / `#262626` | — |
| Texto sobre oscuro | `--on-night` | `#ffffff` | 19.8:1 |
| Secundario sobre oscuro | `--on-night-muted` | `#a8a8a8` | 8.3:1 |
| Color principal | `--accent` | `#c8f031` | 15.1:1 sobre `--night` |
| Texto sobre el principal | `--accent-ink` | `#0a0a0a` | 15.1:1 |
| Principal como texto sobre claro | `--accent-strong` | `#4c5e00` | 7.2:1 sobre `--bg` |

## 3. Tipografía

**Geist** (variable, autoalojada con `@fontsource-variable/geist`) para titulares y texto, y **Geist Mono** (`@fontsource-variable/geist-mono`) para índices, metadatos y código.

| Token | Tamaño | Uso |
| --- | --- | --- |
| `--fs-hero` | 48 → 112 px | Titular del hero y de contacto, peso 700, tracking −0.05em |
| `--fs-h2` | 40 → 80 px | Títulos de sección, peso 650 |
| `--fs-h3` | 24 → 36 px | Títulos de tarjeta y de entrada |
| `--fs-lead` | 19 → 24 px | Entradillas |
| `--fs-body` | 17 px | Texto corrido |
| `--fs-small` | 14 px | Metadatos |

Los títulos de sección terminan en punto, como frases afirmativas.

## 4. Espacio y forma

- Contenedor: `min(1240px, 100% − 2 × margen)`, margen `clamp(20px, 4vw, 48px)`.
- Separación entre secciones: `clamp(96px, 6rem + 6vw, 200px)`.
- Radios: 28 px en tarjetas y paneles, 16 px en elementos internos, píldora (999 px) en botones y filtros.
- Sombras solo en lo que flota o se levanta: dispositivos, tarjetas al pasar el cursor, diálogo, nodos y video (`--shadow-md`, `--shadow-lg`).
- Cuadrícula de líneas como fondo con la utilidad `.grid-lines`.

## 5. Componentes

- **Cabecera**: fija, con el monograma DG, índice numerado en mono, línea inferior negra y subrayado del color principal en la sección activa.
- **Diagrama del hero** (`HeroGraphic`): SVG de Python, TypeScript, SQL, React, LLM y APIs conectados al nodo DG.
- **Dispositivos** (`Laptop`, `Phone`): MacBook Pro e iPhone 14 Pro adaptados de devices.css (MIT), usados solo en las portadas de proyectos.
- **Marquesina de logos** (`LogoMarquee`): dos filas en movimiento dentro de la tarjeta del catálogo de conectores.
- **Línea de tiempo** (`Timeline`): trayectoria dentro de «Sobre mí».
- **Visor de certificados**: `<dialog>` nativo con la imagen completa.
- **Ventana de código** (`CodeWindow`): fragmentos reales de los repositorios con resaltado de sintaxis propio (sin dependencias).
- **Placa de logo** (`LogoTile`): logo del sistema sobre cuadrado blanco redondeado.
- **Tarjeta de proyecto**: el título es el botón y su área se extiende a toda la tarjeta; abre un `<dialog>` nativo.

### Imágenes y video

- Cada proyecto tiene portada (dispositivo, captura, código o logos) y galería con material real. Las pantallas de appTareas son diseños de Figma, no capturas de la app.
- Cada proyecto tiene un video de presentación de 16 s, sin sonido, en `public/videos/<slug>.mp4` (1280 × 720) con su fotograma en `.webp`. Se generan con HyperFrames a partir de los datos de `projects.ts`.

## 6. Movimiento

Biblioteca: `motion`, con `LazyMotion` + `domAnimation` para reducir el peso.

| Efecto | Dónde |
| --- | --- |
| Entrada al cargar y trazado de las conexiones | Hero |
| Trazo escalonado ligado al scroll | Filosofía |
| Marquesina continua de logos | Tarjeta del catálogo de conectores |
| Contador animado | Repositorios públicos |
| Aparición al entrar en pantalla (`whileInView`, una vez) | Títulos, tarjetas, baldosas |
| Línea de tiempo | Sobre mí |
| Video en bucle al abrir el diálogo | Proyectos |

`prefers-reduced-motion`: `MotionConfig reducedMotion="user"`, el video no arranca solo, la marquesina se detiene y los componentes animados se renderizan sin transición.

## 7. Accesibilidad

- WCAG 2.2 AA; Lighthouse 100 en accesibilidad (escritorio y móvil).
- Un `h1`, jerarquía h2 → h3, landmarks y enlace «Saltar al contenido».
- El video tiene controles nativos y etiqueta accesible; el diagrama del hero es decorativo.
- Diálogo nativo con foco atrapado, cierre con Escape, clic fuera o botón.
- Objetivos táctiles ≥ 44 px; foco visible.

## 8. Responsive

| Ancho | Cambios |
| --- | --- |
| > 900 px | Navegación completa; cuadrícula de proyectos a 2 columnas con las destacadas a todo el ancho. |
| ≤ 900 px | Menú desplegable. |
| ≤ 860 px | Una columna en proyectos, sobre mí y trayectoria. |
| ≤ 640 px | Mosaico de stack a una columna. |

## 9. Nitidez de las imágenes

- Capturas a 2× (escritorio, 2400 px) y 3× (móvil, emulación de dispositivo real); pantallas de Figma en WebP sin pérdida.
- Ninguna imagen termina con `scale` ni con transformaciones residuales, así el navegador no rasteriza a menor tamaño.

## 10. Rendimiento

- Secciones bajo el pliegue con `content-visibility: auto`.
- Imágenes WebP con dimensiones declaradas; carga diferida salvo el hero.
- Videos de 200–670 KB con `preload="metadata"`: solo se descargan al abrir un proyecto.
