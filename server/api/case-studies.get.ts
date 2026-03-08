export default defineEventHandler(async (event) => {
  try {
    const items = await queryCollection(event, 'content')
      .where('path', 'LIKE', '/case-studies/%')
      .all()

    return items
      .filter((i: any) => !i?.meta?.draft && i?.meta?.status !== 'draft')
      .sort((a: any, b: any) => {
        const dateA = a?.meta?.date ? new Date(a.meta.date).getTime() : 0
        const dateB = b?.meta?.date ? new Date(b.meta.date).getTime() : 0
        return dateB - dateA
      })
      .map((i: any) => ({
        _path: i?.path,
        title: i?.title,
        description: i?.description,
        date: i?.meta?.date,
        author: i?.meta?.author,
        authorUrl: i?.meta?.authorUrl,
        tags: i?.meta?.tags,
        image: i?.meta?.image,
        client: i?.meta?.client,
        industry: i?.meta?.industry,
        duration: i?.meta?.duration,
      }))
  } catch (error: any) {
    console.error('Case studies API error:', error?.message || error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch case studies',
      message: error?.message || 'Unknown error'
    })
  }
})
