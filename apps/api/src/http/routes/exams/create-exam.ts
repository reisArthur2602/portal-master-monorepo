import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/db/client.js'
import { authPlugin } from '@/http/plugins/auth.js'
import { CreateExamRequestSchema, CreateExamResponseSchema } from '@repo/models'

export const createExam = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .post(
      '/create',
      {
        schema: {
          tags: ['Exams'],
          summary: 'Create Exam',
          operationId: 'createExam',
          body: CreateExamRequestSchema,
          response: {
            201: CreateExamResponseSchema,
          },
        },
      },

      async (request, reply) => {
        const { description, notes, patientId, performedBy } = request.body

        await prisma.exam.create({
          data: { description, notes, patientId, performedBy },
        })

        return reply.status(201).send(null)
      }
    )
}
