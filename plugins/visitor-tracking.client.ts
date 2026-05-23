type FingerprintPayload = {
  userAgent?: string
  language?: string
  languages?: string[]
  platform?: string
  timezone?: string
  hardwareConcurrency?: number
  deviceMemory?: number
  maxTouchPoints?: number
  pixelRatio?: number
  cookieEnabled?: boolean
  doNotTrack?: string
  canvasHash?: string
  webglVendor?: string
  webglRenderer?: string
  screen?: {
    width?: number
    height?: number
    colorDepth?: number
  }
}

const TRACKING_PATH_BLOCKLIST = ['/app', '/auth', '/api', '/_nuxt']

function shouldTrackPath(path: string): boolean {
  return !TRACKING_PATH_BLOCKLIST.some(prefix => path.startsWith(prefix))
}

function readLocalStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeLocalStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // ignore storage failures
  }
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function sha256(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return toHex(digest)
}

function getCanvasEntropyString(): string {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    canvas.width = 280
    canvas.height = 64
    ctx.textBaseline = 'top'
    ctx.font = '16px Arial'
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, 280, 64)
    ctx.fillStyle = '#f2f2f2'
    ctx.fillText('heyjan-fingerprint-2026', 8, 8)
    ctx.fillStyle = '#00c896'
    ctx.fillText(navigator.userAgent, 8, 28)

    return canvas.toDataURL()
  } catch {
    return ''
  }
}

function getWebglFingerprint(): { vendor: string; renderer: string } {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      return { vendor: '', renderer: '' }
    }

    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info')
    if (!debugInfo) {
      return { vendor: '', renderer: '' }
    }

    const vendor = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
    const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

    return {
      vendor: typeof vendor === 'string' ? vendor : '',
      renderer: typeof renderer === 'string' ? renderer : ''
    }
  } catch {
    return { vendor: '', renderer: '' }
  }
}

async function buildFingerprint(): Promise<{ hash: string; payload: FingerprintPayload }> {
  const webgl = getWebglFingerprint()
  const canvasEntropy = getCanvasEntropyString()
  const canvasHash = canvasEntropy ? await sha256(canvasEntropy) : ''

  const payload: FingerprintPayload = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    languages: Array.isArray(navigator.languages) ? navigator.languages.slice(0, 6) : [],
    platform: navigator.platform,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
    maxTouchPoints: navigator.maxTouchPoints,
    pixelRatio: window.devicePixelRatio,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack || '',
    canvasHash,
    webglVendor: webgl.vendor,
    webglRenderer: webgl.renderer,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth
    }
  }

  const hash = await sha256(JSON.stringify(payload))
  return { hash, payload }
}

async function postTracking(route: ReturnType<typeof useRoute>) {
  const path = route.path || '/'
  if (!shouldTrackPath(path)) {
    return
  }

  let visitorId = readLocalStorage('hj_visitor_id')
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    writeLocalStorage('hj_visitor_id', visitorId)
  }

  const { hash, payload } = await buildFingerprint()
  const queryRef = route.query.ref
  const refToken = typeof queryRef === 'string' ? queryRef.slice(0, 191) : ''

  await fetch('/api/visitors/track', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      visitorId,
      fingerprintHash: hash,
      fingerprint: payload,
      path: route.path,
      fullPath: route.fullPath,
      refToken
    }),
    keepalive: true
  }).catch(() => {
    // do not interrupt page flow if tracking fails
  })
}

export default defineNuxtPlugin(() => {
  const route = useRoute()
  const router = useRouter()
  const sentByPath = new Set<string>()

  const send = async () => {
    const key = route.fullPath || route.path || '/'
    if (sentByPath.has(key)) {
      return
    }

    sentByPath.add(key)
    await postTracking(route)
  }

  onNuxtReady(async () => {
    await send()
  })

  router.afterEach(async (to) => {
    if (!to) return
    await send()
  })
})
