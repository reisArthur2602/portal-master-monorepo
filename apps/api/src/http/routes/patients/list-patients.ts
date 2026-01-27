import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/db/client.js'
import { authPlugin } from '@/http/plugins/auth.js'
import { ListPatientsResponseSchema } from '@repo/models'

export const listPatients = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .get(
      '/list',
      {
        schema: {
          tags: ['Patients'],
          summary: 'List Patients',
          operationId: 'listPatients',
          response: {
            200: ListPatientsResponseSchema,
          },
        },
      },

      async (_, reply) => {
        const patients = await prisma.patient.findMany({
          select: { id: true, name: true, cpf: true, phone: true },
        })

        return reply.status(200).send({ patients })
      }
    )
}
