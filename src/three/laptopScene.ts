/**
 * Portátil fotorrealista dibujado en tiempo real con three.js.
 * Mismo principio que las páginas de producto de Apple —un objeto 3D con materiales físicos e
 * iluminación de estudio—, renderizado en el navegador para mostrar la pantalla real y verse
 * nítido a cualquier tamaño. Solo se redibuja cuando cambia el progreso o el tamaño.
 */
import {
  ACESFilmicToneMapping,
  CanvasTexture,
  Color,
  DirectionalLight,
  Group,
  HemisphereLight,
  InstancedMesh,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  RepeatWrapping,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export interface LaptopScene {
  setProgress(p: number): void
  resize(): void
  dispose(): void
}

// Medidas en centímetros, proporciones de un portátil de 14 pulgadas.
const W = 31.26
const D = 22.12
const BASE_H = 0.62
const LID_T = 0.42
const LID_H = 21.4
const BEZEL = 0.55
const SCREEN_W = W - 2 * BEZEL - 0.5
const SCREEN_H = SCREEN_W / 1.6

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  draw(c.getContext('2d')!)
  const t = new CanvasTexture(c)
  t.colorSpace = SRGBColorSpace
  return t
}

/** Rejilla de altavoz: puntos perforados sobre aluminio. */
function grilleTexture() {
  const t = canvasTexture(64, 256, (g) => {
    g.fillStyle = '#d6d8db'
    g.fillRect(0, 0, 64, 256)
    g.fillStyle = '#2a2b2e'
    for (let y = 4; y < 256; y += 6)
      for (let x = 4 + ((y / 6) % 2) * 3; x < 64; x += 6) {
        g.beginPath()
        g.arc(x, y, 1.15, 0, Math.PI * 2)
        g.fill()
      }
  })
  t.wrapS = t.wrapT = RepeatWrapping
  return t
}

/** Distribución de teclas por fila (anchos relativos) y altura relativa de cada fila. */
const ROWS: { keys: number[]; h: number }[] = [
  { keys: Array(14).fill(1), h: 0.55 },
  { keys: [...Array(13).fill(1), 1.5], h: 1 },
  { keys: [1.5, ...Array(12).fill(1), 1], h: 1 },
  { keys: [1.75, ...Array(11).fill(1), 1.75], h: 1 },
  { keys: [2.25, ...Array(10).fill(1), 2.25], h: 1 },
  { keys: [1, 1, 1, 1.25, 5.5, 1.25, 1, 1, 1, 1], h: 1 },
]

export function createLaptopScene(canvas: HTMLCanvasElement, screenUrl: string, onReady: () => void): LaptopScene {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap

  const scene = new Scene()
  const pmrem = new PMREMGenerator(renderer)
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.03).texture
  scene.environment = envTexture

  // Luz de estudio: principal suave desde arriba-izquierda con sombras, relleno frío y luz de cielo.
  const key = new DirectionalLight(0xffffff, 2.2)
  key.position.set(-5, 48, 14)
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  key.shadow.camera.left = -26
  key.shadow.camera.right = 26
  key.shadow.camera.top = 26
  key.shadow.camera.bottom = -26
  key.shadow.radius = 6
  key.shadow.bias = -0.0004
  scene.add(key)
  const fill = new DirectionalLight(0xdfe8ff, 0.6)
  fill.position.set(20, 12, 30)
  scene.add(fill)
  scene.add(new HemisphereLight(0xffffff, 0xd8d8dc, 0.35))

  // ── Materiales ──
  const aluminium = new MeshPhysicalMaterial({
    color: new Color('#e1e2e4'),
    metalness: 1,
    roughness: 0.38,
    clearcoat: 0.15,
    clearcoatRoughness: 0.5,
    envMapIntensity: 1.1,
  })
  const aluminiumEdge = new MeshPhysicalMaterial({ color: new Color('#f2f3f4'), metalness: 1, roughness: 0.18 })
  const keyMat = new MeshPhysicalMaterial({
    color: new Color('#09090a'),
    roughness: 0.55,
    metalness: 0,
    clearcoat: 0.2,
    clearcoatRoughness: 0.6,
  })
  const wellMat = new MeshStandardMaterial({ color: new Color('#08080a'), roughness: 0.9 })
  // El marco no recibe luz: así se ve negro profundo, como el de un portátil real.
  const bezelMat = new MeshBasicMaterial({ color: 0x050506, toneMapped: false })
  // Muesca con esquinas inferiores redondeadas (dibujada en un canvas con transparencia).
  const notchMat = new MeshBasicMaterial({
    map: canvasTexture(256, 64, (g) => {
      g.fillStyle = '#000'
      g.beginPath()
      g.roundRect(0, -32, 256, 96, 28)
      g.fill()
    }),
    transparent: true,
    toneMapped: false,
  })
  const trackpadMat = new MeshPhysicalMaterial({ color: new Color('#dcdee1'), metalness: 0.75, roughness: 0.28, clearcoat: 0.5 })
  const screenMat = new MeshBasicMaterial({ color: 0x0d1117, toneMapped: false })
  // Cristal sobre la pantalla: refleja el estudio de forma sutil.
  const screenGlass = new MeshPhysicalMaterial({
    color: 0x000000,
    roughness: 0.05,
    metalness: 0,
    clearcoat: 1,
    transparent: true,
    opacity: 0.035,
    envMapIntensity: 0.6,
    depthWrite: false,
  })
  const grilleMat = new MeshStandardMaterial({ map: grilleTexture(), metalness: 0.6, roughness: 0.45 })

  const laptop = new Group()
  scene.add(laptop)

  // ── Base ──
  const base = new Mesh(new RoundedBoxGeometry(W, BASE_H, D, 8, 0.3), aluminium)
  base.position.y = BASE_H / 2
  base.castShadow = true
  base.receiveShadow = true
  laptop.add(base)

  // Hueco del teclado (casi a ras)
  const kbW = W * 0.79
  const kbD = D * 0.405
  const kbZ = -D / 2 + 1.9 + kbD / 2
  const well = new Mesh(new RoundedBoxGeometry(kbW + 0.5, 0.04, kbD + 0.45, 4, 0.02), wellMat)
  well.position.set(0, BASE_H + 0.002, kbZ)
  well.receiveShadow = true
  laptop.add(well)

  // Teclas con su distribución real
  const gap = 0.19
  const unitsPerRow = ROWS.map((r) => r.keys.reduce((a, b) => a + b, 0))
  const totalH = ROWS.reduce((a, r) => a + r.h, 0)
  const rowUnit = (kbD - gap * (ROWS.length - 1)) / totalH
  const keyCount = ROWS.reduce((a, r) => a + r.keys.length, 0)
  const keyGeo = new RoundedBoxGeometry(1, 0.16, 1, 3, 0.06)
  const keys = new InstancedMesh(keyGeo, keyMat, keyCount)
  keys.castShadow = true
  keys.receiveShadow = true
  const tmp = new Object3D()
  let idx = 0
  let z = kbZ - kbD / 2
  ROWS.forEach((row, r) => {
    const unit = (kbW - gap * (row.keys.length - 1)) / unitsPerRow[r]
    const depth = row.h * rowUnit
    let x = -kbW / 2
    row.keys.forEach((kw) => {
      const w = kw * unit
      tmp.position.set(x + w / 2, BASE_H + 0.07, z + depth / 2)
      tmp.scale.set(w, 1, depth)
      tmp.updateMatrix()
      keys.setMatrixAt(idx++, tmp.matrix)
      x += w + gap
    })
    z += depth + gap
  })
  laptop.add(keys)

  // Rejillas de altavoz a ambos lados del teclado
  const grilleGeo = new PlaneGeometry(1.5, kbD)
  for (const side of [-1, 1]) {
    const grille = new Mesh(grilleGeo, grilleMat)
    grille.rotation.x = -Math.PI / 2
    grille.position.set(side * (kbW / 2 + 1.25), BASE_H + 0.003, kbZ)
    laptop.add(grille)
  }

  // Trackpad amplio
  const tpW = W * 0.47
  const tpD = D * 0.37
  const trackpad = new Mesh(new RoundedBoxGeometry(tpW, 0.03, tpD, 4, 0.35), trackpadMat)
  trackpad.position.set(0, BASE_H + 0.004, D / 2 - 1.0 - tpD / 2)
  trackpad.receiveShadow = true
  laptop.add(trackpad)

  // Canto pulido y muesca frontal
  const lip = new Mesh(new RoundedBoxGeometry(W - 0.4, 0.06, 0.06, 2, 0.03), aluminiumEdge)
  lip.position.set(0, BASE_H - 0.02, D / 2 - 0.02)
  laptop.add(lip)

  // ── Tapa (pivota sobre la bisagra trasera) ──
  const hinge = new Group()
  hinge.position.set(0, BASE_H, -D / 2 + 0.25)
  laptop.add(hinge)

  const lidShell = new Mesh(new RoundedBoxGeometry(W, LID_H, LID_T, 8, 0.2), aluminium)
  lidShell.position.set(0, LID_H / 2, -LID_T / 2)
  lidShell.castShadow = true
  hinge.add(lidShell)

  // Cristal negro casi de borde a borde
  const bezel = new Mesh(new RoundedBoxGeometry(W - 0.32, LID_H - 0.32, 0.04, 4, 0.5), bezelMat)
  bezel.position.set(0, LID_H / 2, 0.01)
  hinge.add(bezel)

  const screenY = LID_H - BEZEL - 0.35 - SCREEN_H / 2
  const screen = new Mesh(new PlaneGeometry(SCREEN_W, SCREEN_H), screenMat)
  screen.position.set(0, screenY, 0.035)
  hinge.add(screen)

  const glassFront = new Mesh(new PlaneGeometry(W - 0.4, LID_H - 0.4), screenGlass)
  glassFront.position.set(0, LID_H / 2, 0.045)
  hinge.add(glassFront)

  // Muesca de la cámara
  const camNotch = new Mesh(new PlaneGeometry(3.1, 0.78), notchMat)
  camNotch.position.set(0, screenY + SCREEN_H / 2 - 0.38, 0.04)
  hinge.add(camNotch)

  // Barra de la bisagra
  const hingeBar = new Mesh(new RoundedBoxGeometry(W * 0.86, 0.5, 0.5, 3, 0.24), new MeshStandardMaterial({ color: '#2b2c2f', roughness: 0.5 }))
  hingeBar.position.set(0, 0.05, -0.2)
  hinge.add(hingeBar)

  // Sombra de contacto muy pegada al objeto (oclusión ambiental falsa)
  const contact = new Mesh(
    new PlaneGeometry(W * 1.2, D * 1.25),
    new MeshBasicMaterial({
      map: canvasTexture(256, 256, (g) => {
        const grad = g.createRadialGradient(128, 128, 20, 128, 128, 128)
        grad.addColorStop(0, 'rgba(0,0,0,0.3)')
        grad.addColorStop(0.6, 'rgba(0,0,0,0.1)')
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        g.fillStyle = grad
        g.fillRect(0, 0, 256, 256)
      }),
      transparent: true,
      depthWrite: false,
    }),
  )
  contact.rotation.x = -Math.PI / 2
  contact.position.y = 0.005
  scene.add(contact)

  // ── Cámara de producto: teleobjetivo (poca deformación) ──
  const camera = new PerspectiveCamera(17, 1, 5, 600)

  let progress = 0
  let frame = 0

  const render = () => {
    frame = 0
    const p = MathUtils.clamp(progress, 0, 1)
    const t = ease(p)
    // Tapa: cerrada sobre el teclado → abierta ~108°.
    hinge.rotation.x = MathUtils.lerp(Math.PI / 2 - 0.006, -0.31, t)
    // Cámara: de una vista alta en tres cuartos a una vista frontal ligeramente elevada.
    const dist = MathUtils.lerp(100, 94, t)
    const elev = MathUtils.lerp(MathUtils.degToRad(48), MathUtils.degToRad(13), t)
    camera.position.set(0, Math.sin(elev) * dist, Math.cos(elev) * dist)
    camera.lookAt(0, MathUtils.lerp(0.5, 9.2, t), MathUtils.lerp(1.5, -3, t))
    renderer.render(scene, camera)
  }
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render)
  }

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    schedule()
  }

  new TextureLoader().load(screenUrl, (tex) => {
    tex.colorSpace = SRGBColorSpace
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
    screenMat.map = tex
    screenMat.color.set(0xffffff)
    screenMat.needsUpdate = true
    schedule()
    onReady()
  })

  resize()

  return {
    setProgress(p: number) {
      progress = p
      schedule()
    },
    resize,
    dispose() {
      cancelAnimationFrame(frame)
      renderer.dispose()
      pmrem.dispose()
      envTexture.dispose()
      scene.traverse((o) => {
        if (o instanceof Mesh || o instanceof InstancedMesh) {
          o.geometry.dispose()
          const mats = Array.isArray(o.material) ? o.material : [o.material]
          mats.forEach((m) => {
            if ('map' in m && m.map) m.map.dispose()
            m.dispose()
          })
        }
      })
    },
  }
}
