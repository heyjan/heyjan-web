export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  try {
    const items = await queryCollection(event, 'content')
      .where('path', 'LIKE', '/case-studies/%')
      .all()

    const expectedPath = `/case-studies/${slug}`
    const item = items.find((i: any) => {
      const path = i?.path
      const stem = i?.stem
      return path === expectedPath || stem === `case-studies/${slug}` || path?.endsWith(`/${slug}`) || stem?.endsWith(`/${slug}`)
    }) ?? null

    if (!item) {
      throw createError({ statusCode: 404, statusMessage: 'Not found' })
    }

    return item
  } catch (error: any) {
    if (error?.statusCode) {
      throw error
    }
    console.error('Case study fetch error:', error?.message || error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch case study',
      message: error?.message || 'Unknown error'
    })
  }
})
