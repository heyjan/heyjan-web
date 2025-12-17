export default defineEventHandler(async (event) => {
  const items = await queryCollection(event, 'content')
    .where('path', 'LIKE', '/blog/%')
    .all()

  return items
    .filter((i: any) => !i?.draft)
    .sort((a: any, b: any) => {
      const dateA = a?.date ? new Date(a.date).getTime() : 0
      const dateB = b?.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })
    .map((i: any) => ({
      _path: i?._path ?? i?.path,
      title: i?.title,
      description: i?.description,
      date: i?.date,
      author: i?.author,
      tags: i?.tags,
      image: i?.image,
    }))
})


