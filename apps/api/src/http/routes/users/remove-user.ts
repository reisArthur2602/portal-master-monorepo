import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/db/client.js'
import { NotFoundError } from '@/helpers/errors/not-found.js'
import { authPlugin } from '@/http/plugins/auth.js'
import { RemoveUserRequestSchema, RemoveUserResponseSchema } from '@repo/models'

export const removeUser = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .delete(
      '/remove/:userId',
      {
        schema: {
          tags: ['Users'],
          summary: 'Remove User',
          operationId: 'removeUser',
          params: RemoveUserRequestSchema,
          response: {
            204: RemoveUserResponseSchema,
          },
        },
        preHandler: (request, _) => request.shouldBeAdmin(),
      },

      async (request, reply) => {
        const { userId } = request.params

        const existingUser = await prisma.user.findUnique({
          where: { id: userId },
        })

        if (!existingUser) throw new NotFoundError('Usuário não encontrado')

        await prisma.user.delete({
          where: { id: userId },
        })

        return reply.status(204).send(null)
      }
    )
}
