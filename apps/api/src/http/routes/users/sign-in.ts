import type { FastifyInstance } from 'fastify'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'

import bcrypt from 'bcryptjs'

import { prisma } from '@/db/client.js'
import { BadRequestError } from '@/helpers/errors/bad-request.js'
import { SignInRequestSchema, SignInResponseSchema } from '@repo/models'

export const signIn = (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/sign-in',
    {
      schema: {
        tags: ['Users'],
        summary: 'Authenticate User',
        body: SignInRequestSchema,
        operationId: 'signIn',
        response: {
          200: SignInResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
        },
      })

      if (!user) throw new BadRequestError('Credenciais inválidas')

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) throw new BadRequestError('Credenciais inválidas')

      const accessToken = await reply.jwtSign(
        { sub: user.id },
        { expiresIn: '7d' }
      )

      return reply.status(200).send({
        user: { email: user.email, name: user.name },
        accessToken,
      })
    }
  )
}
