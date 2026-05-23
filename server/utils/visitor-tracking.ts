import { createHash, randomUUID } from 'node:crypto'
import { reverse } from 'node:dns/promises'
import type { H3Event } from 'h3'
import { useDB } from '~/server/utils/db'

let tableReady = false

type VisitorFingerprint = {
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

type TrackPayload = {
  visitorId?: string
  fingerprintHash?: string
  fingerprint?: VisitorFingerprint
  path?: string
  fullPath?: string
  refToken?: string
}

type IpEnrichment = {
  reverseDns: string | null
  companyName: string | null
  asn: string | null
  org: string | null
  city: string | null
  region: string | null
  country: string | null
  timezone: string | null
  isHosting: boolean
}

const COMPANY_STOP_WORDS = new Set([
  'com', 'net', 'org', 'de', 'co', 'io', 'cloud', 'corp', 'internal',
  'local', 'lan', 'vpn', 'dsl', 'fiber', 'broadband', 'telekom', 'vodafone'
])

function safeString(value: unknown, maxLength = 2048): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  return trimmed.slice(0, maxLength)
}

function normalizeIp(ip: string): string {
  if (ip.startsWith('::ffff:')) {
    return ip.slice(7)
  }
  return ip
}

function isPrivateIp(ip: string): boolean {
  if (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('fc') ||
    ip.startsWith('fd') ||
    ip.startsWith('fe80:')
  ) {
    return true
  }

  if (ip.startsWith('172.')) {
    const secondOctet = Number(ip.split('.')[1] || 0)
    return secondOctet >= 16 && secondOctet <= 31
  }

  return false
}

function guessCompanyFromReverseDns(hostname: string | null): string | null {
  if (!hostname) {
    return null
  }

  const parts = hostname.toLowerCase().split('.').filter(Boolean)
  if (parts.length < 2) {
    return null
  }

  const candidate = parts[parts.length - 2]
  const normalized = candidate.replace(/[^a-z0-9-]/g, '')

  if (!normalized || normalized.length < 3 || COMPANY_STOP_WORDS.has(normalized)) {
    return null
  }

  return normalized
}

async function resolveReverseDns(ip: string): Promise<string | null> {
  try {
    const hostnames = await Promise.race([
      reverse(ip),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('rdns-timeout')), 1200)
      })
    ])

    if (hostnames.length > 0) {
      return safeString(hostnames[0], 255)
    }
  } catch {
    return null
  }

  return null
}

async function fetchIpIntel(ip: string): Promise<Partial<IpEnrichment>> {
  const runtimeConfig = useRuntimeConfig()
  const token = safeString(runtimeConfig.visitorIntelToken, 256)

  if (!token) {
    return {}
  }

  try {
    const response = await $fetch<{
      org?: string
      city?: string
      region?: string
      country?: string
      timezone?: string
      company?: { name?: string }
      privacy?: { hosting?: boolean }
    }>(`https://ipinfo.io/${encodeURIComponent(ip)}/json`, {
      query: { token },
      timeout: 1800
    })

    const org = safeString(response.org, 255)
    const asn = org?.match(/^AS\d+/)?.[0] || null
    const cleanedOrg = org?.replace(/^AS\d+\s+/, '') || null

    return {
      org: cleanedOrg,
      asn,
      companyName: safeString(response.company?.name, 255) || cleanedOrg,
      city: safeString(response.city, 100),
      region: safeString(response.region, 100),
      country: safeString(response.country, 20),
      timezone: safeString(response.timezone, 100),
      isHosting: Boolean(response.privacy?.hosting)
    }
  } catch {
    return {}
  }
}

export async function ensureVisitorTable() {
  if (tableReady) {
    return
  }

  const db = useDB()
  await db.query(`
    CREATE TABLE IF NOT EXISTS visitor_events (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      visited_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      path VARCHAR(2048) NOT NULL,
      full_path TEXT NULL,
      ref_token VARCHAR(191) NULL,
      visitor_id VARCHAR(191) NULL,
      fingerprint_hash CHAR(64) NULL,
      ip_address VARCHAR(45) NOT NULL,
      ip_hash CHAR(64) NOT NULL,
      reverse_dns VARCHAR(255) NULL,
      company_name VARCHAR(255) NULL,
      asn VARCHAR(50) NULL,
      org VARCHAR(255) NULL,
      city VARCHAR(100) NULL,
      region VARCHAR(100) NULL,
      country VARCHAR(20) NULL,
      timezone VARCHAR(100) NULL,
      is_hosting TINYINT(1) NOT NULL DEFAULT 0,
      user_agent TEXT NULL,
      accept_language VARCHAR(255) NULL,
      referrer TEXT NULL,
      sec_ch_ua VARCHAR(512) NULL,
      sec_ch_ua_platform VARCHAR(100) NULL,
      dnt VARCHAR(20) NULL,
      fingerprint_json JSON NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_visitor_events_visited_at (visited_at),
      INDEX idx_visitor_events_company (company_name),
      INDEX idx_visitor_events_ref_token (ref_token),
      INDEX idx_visitor_events_fingerprint (fingerprint_hash),
      INDEX idx_visitor_events_ip_hash (ip_hash),
      INDEX idx_visitor_events_path (path(191))
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)

  tableReady = true
}

export function getClientIp(event: H3Event): string {
  const forwardedFor = safeString(getHeader(event, 'x-forwarded-for'), 512)
  const realIp = safeString(getHeader(event, 'x-real-ip'), 64)
  const requestIp = safeString(event.node.req.socket.remoteAddress || '', 64)

  const rawIp = forwardedFor?.split(',')[0]?.trim() || realIp || requestIp || '0.0.0.0'
  return normalizeIp(rawIp)
}

export async function enrichIp(ip: string): Promise<IpEnrichment> {
  const reverseDns = await resolveReverseDns(ip)
  const intel = await fetchIpIntel(ip)

  return {
    reverseDns,
    companyName: intel.companyName || guessCompanyFromReverseDns(reverseDns),
    asn: intel.asn || null,
    org: intel.org || null,
    city: intel.city || null,
    region: intel.region || null,
    country: intel.country || null,
    timezone: intel.timezone || null,
    isHosting: Boolean(intel.isHosting)
  }
}

export function buildFingerprintHash(payload: TrackPayload, ip: string): string {
  const runtimeConfig = useRuntimeConfig()
  const salt = safeString(runtimeConfig.visitorHashSalt, 256) || 'change-me'
  const fallback = JSON.stringify({
    ip,
    ua: payload.fingerprint?.userAgent,
    lang: payload.fingerprint?.language,
    platform: payload.fingerprint?.platform,
    canvasHash: payload.fingerprint?.canvasHash,
    webglVendor: payload.fingerprint?.webglVendor,
    webglRenderer: payload.fingerprint?.webglRenderer,
    screen: payload.fingerprint?.screen
  })

  const input = payload.fingerprintHash || fallback
  return createHash('sha256').update(`${salt}:${input}`).digest('hex')
}

export function buildIpHash(ip: string): string {
  const runtimeConfig = useRuntimeConfig()
  const salt = safeString(runtimeConfig.visitorHashSalt, 256) || 'change-me'
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

export function normalizeTrackPayload(input: TrackPayload): Required<TrackPayload> {
  return {
    visitorId: safeString(input.visitorId, 191) || randomUUID(),
    fingerprintHash: safeString(input.fingerprintHash, 128) || '',
    fingerprint: input.fingerprint || {},
    path: safeString(input.path, 2048) || '/',
    fullPath: safeString(input.fullPath, 8192) || '/',
    refToken: safeString(input.refToken, 191) || ''
  }
}

export function shouldSkipTracking(ip: string, path: string): boolean {
  if (isPrivateIp(ip) && process.env.NODE_ENV !== 'production') {
    return false
  }

  return path.startsWith('/api/') || path.startsWith('/_nuxt/')
}
