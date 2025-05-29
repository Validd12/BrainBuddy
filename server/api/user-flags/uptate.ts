// server/api/user-flags/update.post.ts
import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, flagName, value } = body

  if (!userId || !flagName || typeof value !== 'boolean') {
    throw createError({ statusCode: 400, statusMessage: 'Missing parameters' })
  }

  // Upsert the UserFlags row for that user, update the specific flag
  const dataToUpdate = { [flagName]: value }

  const updatedFlags = await prisma.userFlags.upsert({
    where: { userId },
    update: dataToUpdate,
    create: { userId, ...dataToUpdate },
  })

  return updatedFlags
})
