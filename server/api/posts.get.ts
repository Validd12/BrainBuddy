import prisma from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const posts = await prisma.post.findMany()
  return posts
})
