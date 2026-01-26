import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/db/client.js'
import { NotFoundError } from '@/helpers/errors/not-found.js'
import { authPlugin } from '@/http/plugins/auth.js'
import {
  RemovePatientRequestSchema,
  RemovePatientResponseSchema,
} from '@repo/models'

export const removePatient = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .delete(
      '/remove/:patientId',
      {
        schema: {
          tags: ['Patient'],
          summary: 'Remove Patient',
          operationId: 'removePatient',
          params: RemovePatientRequestSchema,
          response: {
            204: RemovePatientResponseSchema,
          },
        },
      },

      async (request, reply) => {
        const { patientId } = request.params

        const existingPatient = await prisma.patient.findUnique({
          where: { id: patientId },
        })

        if (!existingPatient) throw new NotFoundError('Paciente não encontrado')

        await prisma.patient.delete({
          where: { id: patientId },
        })

        return reply.status(204).send(null)
      }
    )
}
