import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'

import { fastifyMultipart } from '@fastify/multipart'

import fastifySwagger from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'

import { errorHandler } from '@/helpers/errors/index.js'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { patientsRoutes } from './routes/patients/index.js'
import { usersRoutes } from './routes/users/index.js'

const PORT = 3030

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)
server.setErrorHandler(errorHandler)

server.register(fastifyCors, {
  origin: true,
})

server.register(fastifyJwt, {
  secret: 'jwt_secret',
})

server.register(fastifyMultipart, {
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 1,
    fields: 10,
  },
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Portal Master — API',
      version: '1.0.0',
    },
  },

  transform: jsonSchemaTransform,
})

server.register(scalarUI, {
  routePrefix: '/docs',
})

server.register(patientsRoutes, { prefix: '/patients' })
server.register(usersRoutes, { prefix: '/users' })

server.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
  console.clear()
  console.log('🌐 URL:                http://localhost:' + PORT)
  console.log('📘 Documentação:       http://localhost:' + PORT + '/docs')
})
