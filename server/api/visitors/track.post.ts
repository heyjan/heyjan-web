import { useDB } from '~/server/utils/db'
import {
  ensureVisitorTable,
  getClientIp,
  enrichIp,
  buildFingerprintHash,
  buildIpHash,
  normalizeTrackPayload,
  shouldSkipTracking
} from '~/server/utils/visitor-tracking'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const payload = normalizeTrackPayload(body || {})
    const ip = getClientIp(event)

    if (shouldSkipTracking(ip, payload.path)) {
      return { success: true, skipped: true }
    }

    const ipIntel = await enrichIp(ip)
    const fingerprintHash = buildFingerprintHash(payload, ip)
    const ipHash = buildIpHash(ip)

    await ensureVisitorTable()
    const db = useDB()

    await db.query(
      `INSERT INTO visitor_events (
        path,
        full_path,
        ref_token,
        visitor_id,
        fingerprint_hash,
        ip_address,
        ip_hash,
        reverse_dns,
        company_name,
        asn,
        org,
        city,
        region,
        country,
        timezone,
        is_hosting,
        user_agent,
        accept_language,
        referrer,
        sec_ch_ua,
        sec_ch_ua_platform,
        dnt,
        fingerprint_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.path,
        payload.fullPath,
        payload.refToken || null,
        payload.visitorId,
        fingerprintHash,
        ip,
        ipHash,
        ipIntel.reverseDns,
        ipIntel.companyName,
        ipIntel.asn,
        ipIntel.org,
        ipIntel.city,
        ipIntel.region,
        ipIntel.country,
        ipIntel.timezone || payload.fingerprint.timezone || null,
        ipIntel.isHosting ? 1 : 0,
        payload.fingerprint.userAgent || getHeader(event, 'user-agent') || null,
        payload.fingerprint.language || getHeader(event, 'accept-language') || null,
        getHeader(event, 'referer') || null,
        getHeader(event, 'sec-ch-ua') || null,
        getHeader(event, 'sec-ch-ua-platform') || payload.fingerprint.platform || null,
        payload.fingerprint.doNotTrack || getHeader(event, 'dnt') || null,
        JSON.stringify(payload.fingerprint || {})
      ]
    )

    return { success: true }
  } catch (error) {
    console.error('Visitor tracking error:', error)
    return { success: false }
  }
})
