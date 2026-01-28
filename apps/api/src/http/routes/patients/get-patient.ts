import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/db/client.js'
import { NotFoundError } from '@/helpers/errors/not-found.js'
import { authPlugin } from '@/http/plugins/auth.js'
import { GetPatientRequestSchema, GetPatientResponseSchema } from '@repo/models'

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
          params: GetPatientRequestSchema,
          response: {
            200: GetPatientResponseSchema,
          },
        },
      },

      async (request, reply) => {
        const { patientId } = request.params

        const patient = await prisma.patient.findUnique({
          where: { id: patientId },
        })

        if (!patient) throw new NotFoundError('O paciente não foi encontrado')

        return reply.status(200).send({ patient })
      }
    )
}
