import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/db/client.js'
import { authPlugin } from '@/http/plugins/auth.js'
import {
  UpdateExamStatusRequestSchema,
  UpdateExamStatusResponseSchema,
} from '@repo/models'

export const updateExamStatus = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .patch(
      '/:examId/:status',
      {
        schema: {
          tags: ['Exams'],
          summary: 'Update Exam Status',
          operationId: 'updateExamStatus',
          params: UpdateExamStatusRequestSchema,
          response: {
            204: UpdateExamStatusResponseSchema,
          },
        },
      },

      async (request, reply) => {
        const { status, examId } = request.params

        await prisma.exam.update({
          where: { id: examId },
          data: { status },
        })
 
        return reply.status(204).send(null)
      }
    )
}
