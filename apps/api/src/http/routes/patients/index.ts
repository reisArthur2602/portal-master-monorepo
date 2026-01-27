import { FastifyInstance } from 'fastify'
import { createPatient } from './create-patient.js'
import { getPatient } from './get-patient.js'
import { listPatients } from './list-patients.js'
import { removePatient } from './remove-patients.js'

export const patientsRoutes = (fastify: FastifyInstance) => {
  fastify.register(createPatient)
  fastify.register(listPatients)
  fastify.register(removePatient)
  fastify.register(getPatient)
}
