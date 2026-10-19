# DESIGN.md — Portafolio de Dorian Girón Prato (v2)

> Segunda versión del sistema visual. La primera (hoja de contactos en hueso y chocolate) se descartó por feedback de Dorian: se veía apagada, los proyectos parecían desordenados y la redacción necesitaba pulirse. Esta versión responde a su pedido explícito: una paleta investigada y una experiencia de desplazamiento al estilo de las páginas de producto de Apple, con imágenes y animación, sin copiar su diseño.

## 1. Concepto

**El producto es el trabajo.** Cada proyecto se presenta como se presenta un producto: una frase corta y grande, una imagen protagonista (capturas reales dentro de dispositivos dibujados en CSS) y el detalle a un clic. El ritmo alterna capítulos claros, para leer, y capítulos oscuros, para los momentos de impacto.

Recorrido:

1. **Hero claro**: nombre, «Software que conecta sistemas.» y un portátil con el panel real de watchdog-bot-monitor que se endereza y crece al desplazarse, con un teléfono (appEscuela) en paralaje.
2. **Sobre mí**: retrato con paralaje, presentación y tres datos clave.
3. **Capítulo oscuro fijado**: una frase que se ilumina palabra a palabra con el scroll.
4. **Muro de conectores**: un contador hasta 46 y dos filas de placas con el logo de cada sistema sobre un cuadrado blanco (como iconos de aplicación), en movimiento continuo y con pausa.
5. **Proyectos**: cuadrícula de tarjetas (la destacada a todo el ancho); cada una abre un diálogo con galería, problema, solución, aporte, tecnologías y enlaces.
6. **Explorador de conectores**: búsqueda y filtros por familia; resultados agrupados por familia en tarjetas de altura fija (logo, nombre en una línea, variante y código en otra) y una ficha con el logo grande.
7. **Stack en mosaico**: cada herramienta con su evidencia.
8. **Trayectoria oscura**: línea de tiempo que se dibuja con el scroll y certificaciones verificables.
9. **GitHub en vivo**: cifras y actividad reciente de la API pública.
10. **Contacto oscuro** y pie.

## 2. Paleta (investigada)

Base inspirada en las extracciones públicas del sistema de Apple (`#f5f5f7` para paneles, `#1d1d1f` para texto) y en paletas oscuras para desarrolladores (`#0d1117` de base, un acento verde «compile»). El acento propio sustituye al azul de Apple para no copiar su identidad.

| Rol | Token | Valor | Contraste |
| --- | --- | --- | --- |
| Fondo claro | `--bg` | `#fbfbfd` | — |
| Panel | `--surface` | `#f5f5f7` | — |
| Panel 2 | `--surface-2` | `#e8e8ed` | — |
| Texto | `--ink` | `#1d1d1f` | 16.3:1 sobre `--bg` |
| Texto secundario | `--muted` | `#6e6e73` | 4.9:1 sobre `--bg` |
| Fondo oscuro | `--night` | `#0d1117` | — |
| Paneles oscuros | `--night-2` / `--night-3` | `#161b22` / `#21262d` | — |
| Texto sobre oscuro | `--on-night` | `#f5f5f7` | 17.4:1 |
| Secundario sobre oscuro | `--on-night-muted` | `#a1a1a6` | 7.4:1 |
| Acento sobre oscuro | `--accent` | `#3ecf8e` | 9.5:1 sobre `--night` |
| Acento sobre claro | `--accent-strong` | `#0a7f52` | 5.0:1 con texto blanco |

Familias de conectores (solo puntos y etiquetas): datos `#4b8df8`, nube `#f08c2e`, productividad `#3ecf8e`, seguridad `#f2545b`, DevOps `#a1a1a6`.

## 3. Tipografía

**Geist** (variable, autoalojada con `@fontsource-variable/geist`): grotesca neutra y técnica, cercana en espíritu a la tipografía de sistema de Apple sin ser ella.

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
- Sombras solo en lo que flota o se levanta: dispositivos, tarjetas al pasar el cursor, diálogo.

## 5. Componentes

- **Barra de navegación**: fija, translúcida con desenfoque, sección activa resaltada, botón «Escríbeme».
- **Botones**: píldora verde (primario) y contorno (secundario); enlaces «Ver más ›».
- **Dispositivos** (`Laptop`, `Phone`): marcos dibujados en CSS que contienen capturas reales.
- **Ventana de código** (`CodeWindow`): fragmentos reales de los repositorios con resaltado de sintaxis propio (sin dependencias).
- **Placa de logo** (`LogoTile`): logo del sistema sobre cuadrado blanco redondeado, en tres tamaños.

### Imágenes

| Proyecto | Portada | Galería |
| --- | --- | --- |
| watchdog-bot-monitor | Portátil con el panel real | Panel, cockpit de IA, documentación OpenAPI |
| Conectores Ruvic AI | Mosaico de logos sobre fondo oscuro | Mosaico, extracto de `client.py`, `manifest.json` |
| appEscuela | Teléfono con la demo real | Escritorio, detalle, móvil |
| msgraph-Robin | Ventana de código | Dos fragmentos del README |
| appTareas (doit) | Dos teléfonos con el diseño de Figma | Cinco pantallas del archivo de Figma del proyecto |

Las guías HTML de los conectores ya no se usan como imagen: a tamaño reducido eran ilegibles y mostraban marcadores sin rellenar.
- **Tarjeta de proyecto**: el título es el botón y su área se extiende a toda la tarjeta; abre un `<dialog>` nativo.
- **Explorador**: búsqueda en píldora, filtros por familia, resultados en cuadrícula, ficha fija.
- **Mosaico de stack**, **línea de tiempo**, **cifras en vivo**.

## 6. Movimiento

Biblioteca: `motion` (antes Framer Motion), con `LazyMotion` + `domAnimation` para reducir el peso.

| Efecto | Dónde |
| --- | --- |
| Entrada al cargar (subida + opacidad, escalonada) | Hero |
| Portátil que se endereza (rotateX 22° → 0°) y crece (0.86 → 1) ligado al scroll | Hero |
| Paralaje | Teléfono del hero, retrato |
| Frase fijada que se ilumina palabra a palabra | Capítulo oscuro |
| Contador animado | 46 conectores, repositorios públicos |
| Marquesina continua con pausa (y pausa al pasar el cursor) | Muro de conectores |
| Aparición al entrar en pantalla (`whileInView`, una vez) | Títulos, tarjetas, baldosas |
| Línea de tiempo que se rellena con el scroll | Trayectoria |
| Diálogo que entra deslizándose | Proyectos |

`prefers-reduced-motion`: `MotionConfig reducedMotion="user"`, la frase se muestra estática, la marquesina se detiene y pasa a desplazamiento manual, y los componentes animados se renderizan sin transición.

## 7. Accesibilidad

- WCAG 2.2 AA; Lighthouse 100 en accesibilidad (escritorio y móvil).
- Un `h1`, jerarquía h2 → h3, landmarks y enlace «Saltar al contenido».
- La frase animada existe una sola vez para lectores de pantalla (texto oculto visualmente); las palabras decorativas se pintan con CSS.
- Diálogo nativo con foco atrapado, cierre con Escape, clic fuera o botón.
- Objetivos táctiles ≥ 44 px; foco visible en verde.

## 8. Responsive

| Ancho | Cambios |
| --- | --- |
| > 900 px | Navegación completa; cuadrícula de proyectos a 2 columnas con la destacada a todo el ancho; explorador con ficha lateral fija. |
| ≤ 900 px | Menú desplegable. |
| ≤ 860 px | Una columna en proyectos, sobre mí, trayectoria y explorador (la ficha pasa arriba y la lista hace scroll hasta ella). |
| ≤ 640 px | Mosaico de stack a una columna; botones del hero apilados. |

## 9. Rendimiento

- Secciones bajo el pliegue con `content-visibility: auto`.
- Imágenes WebP con dimensiones declaradas; carga diferida salvo el hero.
- Sin animaciones de layout medido (los resultados del explorador usan una entrada CSS).
