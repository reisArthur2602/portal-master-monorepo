import { FastifyInstance } from 'fastify'
import { createUser } from './create-user.js'
import { listUsers } from './list-users.js'
import { profile } from './profile.js'
import { removeUser } from './remove-user.js'
import { signIn } from './sign-in.js'

export const usersRoutes = (fastify: FastifyInstance) => {
  fastify.register(signIn)
  fastify.register(createUser)
  fastify.register(removeUser)
  fastify.register(profile)
  fastify.register(listUsers)
}
