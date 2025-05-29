// server/api/user/create.ts
import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      flag: body.flag,
      A1: false,
      A2: false,
      A3: false,
      A4: false,
      A5: false
    }
  })

  return newUser
})
