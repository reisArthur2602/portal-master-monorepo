import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/db/client.js'
import { BadRequestError } from '@/helpers/errors/bad-request.js'
import { authPlugin } from '@/http/plugins/auth.js'
import {
  CreatePatientRequestSchema,
  CreatePatientResponseSchema,
} from '@repo/models'

export const createPatient = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .post(
      '/create',
      {
        schema: {
          tags: ['Patients'],
          summary: 'Create Patient',
          operationId: 'createPatient',
          body: CreatePatientRequestSchema,
          response: {
            201: CreatePatientResponseSchema,
          },
        },
      },

      async (request, reply) => {
        const { birthDate, cpf, name, phone } = request.body

        const existingPatientWithCPF = await prisma.patient.findUnique({
          where: {
            cpf,
          },
        })

        if (existingPatientWithCPF)
          throw new BadRequestError(
            'Já existe um paciente cadastrado com este CPF'
          )

        const existingPatientWithPhone = await prisma.patient.findUnique({
          where: {
            phone,
          },
        })

        if (existingPatientWithPhone)
          throw new BadRequestError(
            'Já existe um paciente cadastrado com este telefone'
          )

        await prisma.patient.create({
          data: { birthDate, cpf, name, phone },
        })

        return reply.status(201).send(null)
      }
    )
}
