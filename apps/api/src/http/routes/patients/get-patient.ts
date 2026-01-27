import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/db/client.js'
import { NotFoundError } from '@/helpers/errors/not-found.js'
import { authPlugin } from '@/http/plugins/auth.js'
import { getPatientRequestSchema, getPatientResponseSchema } from '@repo/models'

export const getPatient = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .get(
      '/:patientId',
      {
        schema: {
          tags: ['Patients'],
          summary: 'Get Patient',
          operationId: 'getPatient',
          params: getPatientRequestSchema,
          response: {
            200: getPatientResponseSchema,
          },
        },
      },

      async (request, reply) => {
        const { patientId } = request.params

        const patient = await prisma.patient.findUnique({
          where: { id: patientId },
        })

        if (!patient)
          throw new NotFoundError('O paciente com o não foi encontrado')

        return reply.status(200).send({ patient })
      }
    )
}
