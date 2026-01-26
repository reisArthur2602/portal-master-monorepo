import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/db/client.js'
import { authPlugin } from '@/http/plugins/auth.js'
import { ListUsersResponseSchema } from '@repo/models'
import { UserRole } from 'generated/prisma/enums.js'

export const listUsers = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .get(
      '/list',
      {
        schema: {
          tags: ['Users'],
          summary: 'List Users',
          operationId: 'listUsers',
          response: {
            200: ListUsersResponseSchema,
          },
        },
        preHandler: (request, _) => request.shouldBeAdmin(),
      },

      async (_, reply) => {
        const users = await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        })

        return reply.status(200).send({ users })
      }
    )
}
