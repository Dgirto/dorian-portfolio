/**
 * MacBook dibujado en tiempo real con three.js (materiales físicos + iluminación de entorno).
 * Mismo principio que las páginas de producto de Apple —un objeto 3D con materiales reales—,
 * pero renderizado en el navegador para mostrar la pantalla real y verse nítido a cualquier tamaño.
 * Solo se redibuja cuando cambia el progreso o el tamaño: no hay bucle continuo.
 */
import {
  ACESFilmicToneMapping,
  CanvasTexture,
  Color,
  DirectionalLight,
  Group,
  InstancedMesh,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
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

// Medidas en centímetros (proporciones de un portátil de 14 pulgadas).
const W = 31.2
const D = 22.0
const BASE_H = 0.75
const LID_T = 0.5
const LID_H = 21.2
const SCREEN_W = 29.6
const SCREEN_H = SCREEN_W / 1.6

const ease = (t: number) => 1 - Math.pow(1 - t, 3)

/** Sombra de contacto suave, dibujada una vez en un canvas. */
function shadowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(128, 128, 10, 128, 128, 128)
  grad.addColorStop(0, 'rgba(0,0,0,0.32)')
  grad.addColorStop(0.45, 'rgba(0,0,0,0.14)')
  grad.addColorStop(0.8, 'rgba(0,0,0,0.03)')
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 256, 256)
  const t = new CanvasTexture(c)
  t.colorSpace = SRGBColorSpace
  return t
}

export function createLaptopScene(canvas: HTMLCanvasElement, screenUrl: string, onReady: () => void): LaptopScene {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  const scene = new Scene()
  const pmrem = new PMREMGenerator(renderer)
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTexture

  const key = new DirectionalLight(0xffffff, 1.4)
  key.position.set(-12, 30, 22)
  scene.add(key)

  // ── Materiales ──
  const aluminium = new MeshPhysicalMaterial({
    color: new Color('#d3d5d8'),
    metalness: 1,
    roughness: 0.24,
    clearcoat: 0.35,
    clearcoatRoughness: 0.3,
  })
  const aluminiumDark = new MeshPhysicalMaterial({ color: new Color('#a9acb0'), metalness: 1, roughness: 0.45 })
  const keyMat = new MeshStandardMaterial({ color: new Color('#141416'), roughness: 0.62, metalness: 0.1 })
  const wellMat = new MeshStandardMaterial({ color: new Color('#0c0c0e'), roughness: 0.8 })
  const glass = new MeshPhysicalMaterial({ color: new Color('#050506'), roughness: 0.08, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05 })
  const trackpadMat = new MeshPhysicalMaterial({ color: new Color('#b9bcc0'), metalness: 0.9, roughness: 0.18, clearcoat: 0.6 })
  const screenMat = new MeshBasicMaterial({ color: 0x0d1117, toneMapped: false })

  const laptop = new Group()
  scene.add(laptop)

  // ── Base ──
  const base = new Mesh(new RoundedBoxGeometry(W, BASE_H, D, 6, 0.42), aluminium)
  base.position.y = BASE_H / 2
  laptop.add(base)

  // Hueco del teclado
  const well = new Mesh(new RoundedBoxGeometry(W * 0.86, 0.06, D * 0.42, 4, 0.03), wellMat)
  well.position.set(0, BASE_H + 0.001, -D * 0.2)
  laptop.add(well)

  // Teclas (instanciadas): 6 filas × 14 columnas
  const cols = 14
  const rows = 6
  const gap = 0.24
  const kw = (W * 0.84 - gap * (cols - 1)) / cols
  const kd = (D * 0.4 - gap * (rows - 1)) / rows
  const keys = new InstancedMesh(new RoundedBoxGeometry(kw, 0.12, kd, 3, 0.08), keyMat, cols * rows)
  const tmp = new Object3D()
  let i = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      tmp.position.set(-W * 0.42 + kw / 2 + c * (kw + gap), BASE_H + 0.06, -D * 0.4 + kd / 2 + r * (kd + gap))
      tmp.updateMatrix()
      keys.setMatrixAt(i++, tmp.matrix)
    }
  }
  laptop.add(keys)

  // Trackpad
  const trackpad = new Mesh(new RoundedBoxGeometry(W * 0.42, 0.04, D * 0.36, 4, 0.3), trackpadMat)
  trackpad.position.set(0, BASE_H + 0.005, D * 0.24)
  laptop.add(trackpad)

  // Muesca frontal para abrir
  const notch = new Mesh(new RoundedBoxGeometry(4, 0.3, 0.6, 3, 0.14), aluminiumDark)
  notch.position.set(0, BASE_H * 0.72, D / 2 - 0.12)
  laptop.add(notch)

  // ── Tapa (pivota sobre la bisagra trasera) ──
  const hinge = new Group()
  hinge.position.set(0, BASE_H, -D / 2 + 0.35)
  laptop.add(hinge)

  const lidShell = new Mesh(new RoundedBoxGeometry(W, LID_H, LID_T, 6, 0.24), aluminium)
  lidShell.position.set(0, LID_H / 2, -LID_T / 2)
  hinge.add(lidShell)

  const bezel = new Mesh(new RoundedBoxGeometry(W - 0.2, LID_H - 0.2, 0.06, 4, 0.2), glass)
  bezel.position.set(0, LID_H / 2, 0.02)
  hinge.add(bezel)

  const screen = new Mesh(new PlaneGeometry(SCREEN_W, SCREEN_H), screenMat)
  screen.position.set(0, LID_H / 2 + 0.25, 0.06)
  hinge.add(screen)

  const camNotch = new Mesh(new RoundedBoxGeometry(2.6, 0.6, 0.02, 2, 0.12), glass)
  camNotch.position.set(0, LID_H / 2 + 0.25 + SCREEN_H / 2 - 0.2, 0.075)
  hinge.add(camNotch)

  // Sombra de contacto
  const shadow = new Mesh(
    new PlaneGeometry(W * 1.35, D * 1.45),
    new MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = 0.01
  laptop.add(shadow)

  // ── Cámara ──
  const camera = new PerspectiveCamera(26, 1, 1, 400)

  let progress = 0
  let frame = 0

  const render = () => {
    frame = 0
    const t = ease(MathUtils.clamp(progress, 0, 1))
    // Tapa: cerrada (≈ +90°, sobre el teclado) → abierta unos 105°.
    hinge.rotation.x = MathUtils.lerp(Math.PI / 2 - 0.012, -0.26, t)
    // Cámara: de una vista desde arriba a una vista frontal ligeramente elevada.
    const camY = MathUtils.lerp(58, 20, t)
    const camZ = MathUtils.lerp(30, 62, t)
    camera.position.set(0, camY, camZ)
    camera.lookAt(0, MathUtils.lerp(0, 8.5, t), MathUtils.lerp(2, -2, t))
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
