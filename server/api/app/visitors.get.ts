import { useDB } from '~/server/utils/db'
import { ensureVisitorTable } from '~/server/utils/visitor-tracking'

function parseQueryNumber(value: unknown, fallback: number, min: number, max: number): number {
  const parsed = Number(value)
  if (Number.isNaN(parsed)) return fallback
  return Math.min(max, Math.max(min, Math.floor(parsed)))
}

export default defineEventHandler(async (event) => {
  try {
    const authCookie = getCookie(event, 'auth')
    if (!authCookie) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    JSON.parse(authCookie)
    const query = getQuery(event)
    const limit = parseQueryNumber(query.limit, 50, 1, 200)
    const offset = parseQueryNumber(query.offset, 0, 0, 50000)
    const search = String(query.search || '').trim().slice(0, 120)

    await ensureVisitorTable()
    const db = useDB()

    const whereSql = search
      ? `WHERE (
          path LIKE ?
          OR full_path LIKE ?
          OR ref_token LIKE ?
          OR company_name LIKE ?
          OR org LIKE ?
          OR reverse_dns LIKE ?
          OR visitor_id LIKE ?
        )`
      : ''

    const whereParams = search ? Array(7).fill(`%${search}%`) : []

    const rows = await db.query(
      `
      SELECT
        id,
        visited_at,
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
      FROM visitor_events
      ${whereSql}
      ORDER BY visited_at DESC
      LIMIT ?
      OFFSET ?
      `,
      [...whereParams, limit, offset]
    )

    const totalResult: any[] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM visitor_events
      ${whereSql}
      `,
      whereParams
    )

    const stats: any[] = await db.query(
      `
      SELECT
        COUNT(*) AS total_events,
        COUNT(DISTINCT visitor_id) AS unique_visitor_ids,
        COUNT(DISTINCT fingerprint_hash) AS unique_fingerprints,
        COUNT(DISTINCT ip_hash) AS unique_ip_hashes,
        SUM(CASE WHEN company_name IS NOT NULL AND company_name != '' THEN 1 ELSE 0 END) AS events_with_company
      FROM visitor_events
      `
    )

    return {
      success: true,
      rows,
      pagination: {
        total: Number(totalResult?.[0]?.total || 0),
        limit,
        offset
      },
      stats: stats?.[0] || {
        total_events: 0,
        unique_visitor_ids: 0,
        unique_fingerprints: 0,
        unique_ip_hashes: 0,
        events_with_company: 0
      }
    }
  } catch (error: any) {
    console.error('Visitor list error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Could not load visitor events'
    })
  }
})
