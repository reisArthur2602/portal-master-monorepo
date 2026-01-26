import { prisma } from '@/db/client.js'
import { UnauthorizedError } from '@/helpers/errors/unauthorized.js'
import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

export const authPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', async (request, _) => {
    try {
      const payload = await request.jwtVerify<{
        sub: string
      }>()

      const existingUser = await prisma.user.findUnique({
        where: { id: payload.sub },
      })

      if (!existingUser) throw new UnauthorizedError('Acesso negado')

      request.user = payload.sub
    } catch {
      throw new UnauthorizedError('Acesso negado')
    }
  })
})
