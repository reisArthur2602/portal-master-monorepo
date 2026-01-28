import { FastifyInstance } from 'fastify'
import { createExam } from './create-exam.js'
import { getExam } from './get-exam.js'
import { listExams } from './list-exams.js'
import { updateExamStatus } from './update-exam-status.js'

export const examsRoutes = (fastify: FastifyInstance) => {
  fastify.register(createExam)
  fastify.register(getExam)
  fastify.register(listExams)
  fastify.register(updateExamStatus)
}
