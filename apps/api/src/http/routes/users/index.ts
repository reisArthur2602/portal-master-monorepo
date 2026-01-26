import { FastifyInstance } from 'fastify'
import { createUser } from './create-user.js'
import { profile } from './profile.js'
import { signIn } from './sign-in.js'

export const usersRoutes = async (fastify: FastifyInstance) => {
  await fastify.register(createUser)
  await fastify.register(signIn)
  await fastify.register(profile)
}
