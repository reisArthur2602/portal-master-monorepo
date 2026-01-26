import { prisma } from '@/db/client.js'
import { NotFoundError } from '@/helpers/errors/not-found.js'
import { authPlugin } from '@/http/plugins/auth.js'
import { ProfileResponseSchema } from '@repo/models'
import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

export const profile = (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .get(
      '/profile',
      {
        schema: {
          tags: ['Users'],
          summary: 'Get profile user',
          operationId: 'profile',
          response: {
            200: ProfileResponseSchema,
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        })

        if (!user) throw new NotFoundError('Usuário não encontrado')

        return reply.status(200).send({
          user,
        })
      }
    )
}
