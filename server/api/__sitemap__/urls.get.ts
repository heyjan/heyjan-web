import { defineSitemapEventHandler, asSitemapUrl } from '#imports'

export default defineSitemapEventHandler(async (event) => {
  const blogItems = await queryCollection(event, 'content')
    .where('path', 'LIKE', '/blog/%')
    .all()

  return blogItems
    .filter((item: any) => !item?.meta?.draft)
    .map((item: any) => asSitemapUrl({
      loc: item.path,
      lastmod: item?.meta?.date ? new Date(item.meta.date) : new Date(),
      changefreq: 'monthly',
      priority: 0.8,
    }))
})



