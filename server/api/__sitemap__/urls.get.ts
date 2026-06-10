import { defineSitemapEventHandler, asSitemapUrl } from '#imports'

export default defineSitemapEventHandler(async (event) => {
  try {
    const blogItems = await queryCollection(event, 'content')
      .where('path', 'LIKE', '/blog/%')
      .all()

    const blogUrls = blogItems
      .filter((item: any) => !item?.meta?.draft && item?.meta?.status !== 'draft')
      .map((item: any) => asSitemapUrl({
        loc: item.path,
        lastmod: item?.meta?.date ? new Date(item.meta.date) : new Date(),
        changefreq: 'monthly',
        priority: 0.8,
      }))

    // Standalone case-study reports served as static HTML (not part of the content collection).
    const staticCaseStudies = [
      asSitemapUrl({
        loc: '/case-studies/ai-job-market-report',
        changefreq: 'daily',
        priority: 0.9,
      }),
    ]

    return [...blogUrls, ...staticCaseStudies]
  } catch (error: any) {
    console.error('Sitemap URLs error:', error?.message || error)
    return []
  }
})





