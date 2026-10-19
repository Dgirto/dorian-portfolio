# DESIGN.md — Portafolio de Dorian Girón Prato

> Documento de diseño previo a la implementación. Define el concepto, el sistema visual y las reglas que siguen todos los componentes. Si el código y este documento discrepan, se corrige uno de los dos; nunca se dejan divergir.

## 1. Concepto creativo

**La hoja de contactos de sistemas conectados.**

Dorian tiene algo que casi ningún portafolio junior puede mostrar: **46 conectores públicos** en GitHub (`Dgirto`), cada uno integrando un sistema distinto (PostgreSQL, Gmail, Okta, AWS S3, Palo Alto PAN-OS…), todos construidos con el mismo método durante sus prácticas en Ruvic AI. Ningún texto lo explica mejor que verlos todos a la vez.

Por eso el sitio se compone como una **hoja de contactos de fotógrafo**: decenas de fotogramas pequeños en filas estrictas, todos con el mismo tratamiento. Cada fotograma es una **captura real** de la guía de documentación de uno de sus conectores. El volumen y la consistencia son el argumento; el visitante elige dónde mirar.

La segunda capa viene del mundo físico de las conexiones: el **código de colores del cableado estructurado** (pares azul, naranja, verde, marrón y gris de la norma TIA-568) y las **etiquetas de cable** que identifican cada línea. Cada familia de sistemas lleva un color de par; cada conector lleva su etiqueta (`CON-016 · PostgreSQL`). No es decoración: el color clasifica y la etiqueta identifica, igual que en un armario de red.

> En esta página, **los 46 conectores reales de Dorian** se convierten en **la hoja de contactos**, y **el código de colores del cableado** se convierte en **su sistema de clasificación**.

Prueba del competidor: otro desarrollador junior no puede poner esta frase en su portafolio, porque no tiene esos 46 repositorios.

### Lo vivo (una interacción, hecha del contenido)

**"¿Qué sistema necesitas conectar?"** Un campo de búsqueda sobre la hoja: el visitante escribe `postgres`, `correo`, `firewall` o `aws` y la hoja ilumina los conectores que coinciden (por nombre, palabra clave del `manifest.json` o categoría) y atenúa el resto. Al elegir uno se muestra su ficha real: código de catálogo, descripción, modos de autenticación, operaciones y enlace al repositorio. Sin JavaScript, la hoja completa sigue visible y cada fotograma enlaza a su repositorio.

### Fuentes de dirección (skills)

- **Taste Skill** (`design-taste-frontend`): repartió la dirección *The contact sheet* (semilla 1393726029) con tipo Work Sans y paleta hueso / verde / chocolate. Redibujos con motivo: `about` → *Side facts, wide paragraph* (la plantilla de equipo era para muchas personas, aquí hay una); `contact` → *Sentence, portrait, two links* (la plantilla original exigía un formulario y no hay backend: no se simulan envíos).
- **Impeccable**: modo *Experience* (portafolio: el trabajo manda desde el primer viewport). Semilla `seed:861fb64b96c8e68d`, candidato asignado: código de colores y etiquetado de cableado estructurado, fusionado con la composición de Taste. Se aplica su *craft floor* (contraste, estados, superficies del navegador, sin eyebrows, sin glass, sin gradientes).
- **UI/UX Pro Max**: su sistema sugerido (pizarra oscura + verde + JetBrains Mono / IBM Plex) es precisamente el valor por defecto de la categoría que Impeccable y Taste rechazan, así que se descartó su estética y se adoptaron sus reglas UX: objetivos táctiles ≥ 44 px, separación ≥ 8 px, `prefers-reduced-motion`, scroll suave en anclas, sin desplazamiento horizontal de página (solo dentro de filas que lo declaran), carga diferida y espacio reservado para imágenes (CLS < 0,1).

### Referencias estudiadas (principios, no copia)

| Referencia | Principio tomado |
| --- | --- |
| partners.pe | Una frase-tesis por proyecto; una idea de marca llevada a todo el sitio. |
| staffdigital.pe | Tipografía como jerarquía; división de CTA por intención (empresa / proyecto). |
| miranda.studio | Contraste dentro de la línea tipográfica; ritmo oscuro → claro entre capítulos. |
| brandingperu.com | Transparencia y proceso visibles generan confianza. |
| Hostinger (artículo) | Lista de verificación: proyectos reales, código enlazado, contacto claro. |

Antipatrones observados y evitados: preloaders a pantalla completa, texto del hero que aparece tarde, galerías sin contexto, métricas de vanidad, widgets que tapan contenido.

## 2. Personalidad visual

Precisa, ordenada, abundante. Un archivo técnico bien etiquetado más que un escaparate. Calma en la tipografía (Work Sans ligera), densidad en las imágenes, color solo donde clasifica o invita a actuar.

## 3. Paleta

| Rol | Token | Valor | Uso |
| --- | --- | --- | --- |
| Fondo | `--bg` | `#e5e1d8` (hueso) | Fondo general |
| Superficie | `--surface` | `#dad5ca` | Escalón de tono entre zonas (nunca líneas) |
| Superficie 2 | `--surface-2` | `#cfc9bc` | Fotogramas en reposo, campos |
| Tinta | `--ink` | `#2a1d17` (chocolate) | Texto y campo oscuro del hero |
| Tinta suave | `--muted` | `#5e4f45` | Notas secundarias (≥ 4.5:1 sobre hueso) |
| Acento | `--accent` | `#456f3a` (verde) | Botón primario y el gran campo de color (certificaciones) |
| Sobre acento | `--accent-ink` | `#ffffff` | Texto sobre verde |
| Sobre tinta | `--on-ink` | `#ece8df` | Texto sobre el campo chocolate |
| Sobre tinta suave | `--on-ink-muted` | `#b9ab9e` | Secundario sobre chocolate (≥ 4.5:1) |

**Pares de cableado (clasificación de conectores, nunca decoración):**

| Familia | Token | Valor |
| --- | --- | --- |
| Bases de datos | `--pair-blue` | `#2f5f8f` |
| Nube y almacenamiento | `--pair-orange` | `#b5601d` |
| Productividad y mensajería | `--pair-green` | `#456f3a` |
| Seguridad | `--pair-brown` | `#6e4128` |
| DevOps | `--pair-slate` | `#56606b` |

Proporción: hueso ≈ 70 %, chocolate ≈ 15 % (hero y una baldosa del pie), verde ≈ 10 % (un campo completo y el botón), pares ≈ 5 % (franjas de etiqueta). Sin gradientes, sin violetas, sin sombras en reposo.

## 4. Sistema tipográfico

Una sola familia: **Work Sans** (autoalojada con `@fontsource-variable/work-sans`, sin peticiones a terceros).

| Paso | Token | Tamaño | Uso |
| --- | --- | --- | --- |
| Pequeño | `--step-small` | 13–14 px | Etiquetas de fotograma, metadatos |
| Cuerpo | `--step-body` | 17–19 px | Texto corrido (tinta completa) |
| Entrada | `--step-lead` | 20–26 px | Párrafo de presentación, filas destacadas |
| Titular | `--step-head` | 32–64 px | Encabezados de sección |
| Display | `--step-display` | 48 px → 7.6vw (máx. 8.5 rem) | Solo el nombre en el hero |

- Display: peso 300, tracking −0.035em, interlineado 0.95.
- Texto: peso 400 (500 para énfasis), interlineado 1.55, medida 45–72 caracteres.
- Cifras tabulares (`font-variant-numeric: tabular-nums`) en fechas, códigos y contadores.
- Monoespaciada solo dentro de `<pre><code>` con código real de los repositorios.
- Sin etiquetas en mayúsculas espaciadas, sin eyebrows, sin numeración 01/02/03 decorativa.

## 5. Escala de espaciado

Base 4 px: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 96 · 120 · 160 · 200`.

- Márgenes de página: `clamp(16px, 2.2vw, 32px)`, iguales a ambos lados en todo ancho.
- Separación entre secciones: 120–200 px en escritorio, 72–96 px en móvil; siempre mayor que cualquier separación interna.
- Más espacio sobre un encabezado que debajo.

## 6. Componentes fundamentales

- **Fotograma** (`Frame`): captura real a altura fija, esquinas rectas, sin pie dentro de la imagen. Su etiqueta de cable (franja del color del par + código + nombre) va debajo, a 13–14 px.
- **Tira iluminada** (`LitStrip`, hero): fila horizontal desplazable con *scroll-snap*; el fotograma centrado a brillo completo, los demás a `brightness(.55)`.
- **Hoja de contactos** (`ContactSheet`): grupos por familia; cada grupo abre con su nombre y su par de color; los fotogramas se ajustan en filas de altura fija. Filtro por texto y por familia.
- **Ficha de conector** (`ConnectorCard`): panel fijo con los datos del `manifest.json`.
- **Tira de proyecto** (`ProjectStrip`): diapositiva central al 73 % con vecinas asomando; fila de datos en la rejilla de 12 columnas.
- **Fila de dos extremos** (`StackList`): tecnología a la izquierda, evidencia a la derecha.
- **Mosaico** (`GithubMosaic`): una fotografía repartida en baldosas cuadradas con cinco baldosas de color.
- **Botón**: relleno plano, esquinas rectas (radio 0), alto ≥ 48 px. Uno primario por pantalla.
- **Enlace**: subrayado con `text-underline-offset: .2em`, grosor 1px→2px en hover.

## 7. Reglas de composición

1. Rejilla de 12 columnas con los mismos márgenes en toda la página.
2. Cada sección cambia de composición respecto a su vecina; ninguna es una cuadrícula de tarjetas iguales.
3. Lo grande, grande (el nombre, la hoja); lo pequeño, pequeño (etiquetas). Nada intermedio sin motivo.
4. La asimetría vive dentro de la rejilla: todo vacío a un lado se cierra con algo en el otro.
5. Cada sección abre con un encabezado que la nombra; el primer viewport lleva el único `h1`.
6. Nada se superpone a un titular.

## 8. Lenguaje de animación

- **Movimiento firma: fila arrastrable.** Desplazamiento horizontal nativo con *snap* en la tira del hero y en las tiras de proyecto. Sin librerías de carrusel, sin flechas, sin puntos.
- **Entradas:** encabezado → texto → imagen, escalonados 70 ms, subida de 28 px (sin opacidad, para no perder contraste), una sola vez al entrar en pantalla. El contenido es visible por defecto; las clases de animación solo se activan si JS corre y el usuario no pide movimiento reducido.
- **Respuesta en controles:** hover, foco y pulsación en botones, enlaces, fotogramas y filtros (150–220 ms, `cubic-bezier(.2,.7,.2,1)`).
- **Imagen en movimiento:** la fotografía del mosaico deriva lentamente (escala 1 → 1.06 en 24 s).
- Solo `transform` y `opacity` (y `filter: brightness` en fotogramas).
- `prefers-reduced-motion: reduce` elimina desplazamientos y derivas; conserva cambios de estado instantáneos.

## 9. Accesibilidad

- WCAG 2.2 AA: contraste ≥ 4.5:1 en texto, ≥ 3:1 en texto grande y controles.
- Landmarks (`header`, `nav`, `main`, `footer`), un `h1`, jerarquía h2 → h3 sin saltos.
- Enlace "Saltar al contenido".
- Foco visible propio (anillo de 2 px en verde o hueso según el fondo, con separación de 3 px).
- Filas desplazables con `tabindex="0"`, `role="region"` y `aria-label`; navegables con flechas.
- Resultados del filtro anunciados con `aria-live="polite"`.
- Textos alternativos descriptivos en todas las capturas.
- Objetivos táctiles ≥ 44 × 44 px.
- Enlaces externos con `rel="noopener noreferrer"` e indicación de que abren otra pestaña.

## 10. Adaptaciones responsive

| Ancho | Cambios |
| --- | --- |
| ≥ 1200 px | Composición completa de 12 columnas. |
| 768–1199 px | La fila de datos de proyecto pasa a 2 columnas; el mosaico a 4 columnas. |
| < 768 px | Navegación en panel desplegable; el hero apila nombre, frase, tira (220 px) y acciones; la hoja usa fotogramas de 72 px de alto; las tiras de proyecto muestran diapositivas 4:5 al 82 %; el mosaico a 3 columnas; el pie a 2 columnas de baldosas. |
| < 380 px | Display a 13vw; filtros en fila desplazable. |

No hay desplazamiento horizontal de página en ningún ancho; las únicas filas desplazables lo son por diseño y lo anuncian.
