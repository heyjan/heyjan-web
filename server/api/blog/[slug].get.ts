export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  // Nuxt Content v3 query syntax is strict. To avoid brittle query conditions (and edge cases in fields),
  // we fetch blog documents via a known-working LIKE filter and then match the requested slug in JS.
  const items = await queryCollection(event, 'content')
    .where('path', 'LIKE', '/blog/%')
    .all()

  const expectedPath = `/blog/${slug}`
  const item = items.find((i: any) => {
    const path = i?.path
    const stem = i?.stem
    return path === expectedPath || stem === `blog/${slug}` || path?.endsWith(`/${slug}`) || stem?.endsWith(`/${slug}`)
  }) ?? null

  if (!item) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  return item
})


