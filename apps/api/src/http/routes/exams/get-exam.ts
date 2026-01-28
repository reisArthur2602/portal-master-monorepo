import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/db/client.js'
import { NotFoundError } from '@/helpers/errors/not-found.js'
import { authPlugin } from '@/http/plugins/auth.js'
import { GetExamRequestSchema, GetExamResponseSchema } from '@repo/models'

export const getExam = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .get(
      '/:examId',
      {
        schema: {
          tags: ['Exams'],
          summary: 'Get Exam',
          operationId: 'getExam',
          params: GetExamRequestSchema,
          response: {
            200: GetExamResponseSchema,
          },
        },
      },

      async (request, reply) => {
        const { examId } = request.params

        const exam = await prisma.exam.findUnique({
          where: { id: examId },
          select: {
            id: true,
            notes: true,
            createdAt: true,
            description: true,
            performedBy: true,
            type: true,
            orthancStudyId: true,
            patient: { select: { name: true, birthDate: true } },
            registry: true,
            status: true,
          },
        })

        if (!exam) throw new NotFoundError('O exame não foi encontrado')

        return reply.status(200).send({ exam })
      }
    )
}
