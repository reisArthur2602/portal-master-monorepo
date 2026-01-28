import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/db/client.js'
import { authPlugin } from '@/http/plugins/auth.js'
import { ListExamsRequestSchema, ListExamsResponseSchema } from '@repo/models'

export const listExams = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .get(
      '/list',
      {
        schema: {
          tags: ['Exams'],
          summary: 'List Exams',
          operationId: 'listExams',
          querystring: ListExamsRequestSchema,
          response: {
            200: ListExamsResponseSchema,
          },
        },
      },

      async (request, reply) => {
        const { status } = request.query

        const exams = await prisma.exam.findMany({
          where: {
            ...(status && { status }),
          },
          select: {
            id: true,
            description: true,
            createdAt: true,
            patient: {
              select: {
                name: true,
              },
            },
          },
        })

        return reply.status(200).send({ exams })
      }
    )
}
