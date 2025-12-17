export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  // Try different path formats
  let item = await queryCollection(event, 'content')
    .path(`blog/${slug}`)
    .first()

  if (!item) {
    item = await queryCollection(event, 'content')
      .path(`/blog/${slug}`)
      .first()
  }

  if (!item) {
    item = await queryCollection(event, 'content')
      .where({ _path: { $contains: `blog/${slug}` } })
      .first()
  }

  if (!item) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  return item
})


