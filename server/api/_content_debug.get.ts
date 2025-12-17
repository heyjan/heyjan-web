export default defineEventHandler(async (event) => {
  try {
    const all = await queryCollection(event, 'content').all()
    return {
      ok: true,
      count: all.length,
      sample: all.slice(0, 5).map((i: any) => ({
        _path: i?._path,
        path: i?.path,
        title: i?.title,
      })),
    }
  } catch (err: any) {
    return {
      ok: false,
      message: err?.message,
      stack: err?.stack,
    }
  }
})


