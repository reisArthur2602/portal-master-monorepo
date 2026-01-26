import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";

import {
  CreateUserRequestSchema,
  CreateUserResponseSchema,
} from "@repo/models";
import { BadRequestError } from "../../../helpers/errors/bad-request";
import bcrypt from "bcryptjs";
import { prisma } from "../../../db/client";
import { authPlugin } from "../../plugins/auth";

export const createUser = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .post(
      "/create",
      {
        schema: {
          tags: ["Users"],
          summary: "Create User",
          operationId: "createUser",
          body: CreateUserRequestSchema,
          response: {
            201: CreateUserResponseSchema,
          },
        },
      },
      async (request, reply) => {
        const { email, password, name } = request.body;

        const existingUserWithEmail = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUserWithEmail)
          throw new BadRequestError(
            "Este e-mail está sendo usado por outro membro",
          );

        const passwordHash = await bcrypt.hash(password, 10);

        await prisma.user.create({
          data: { email, password: passwordHash, name },
        });

        return reply.status(201).send(null);
      },
    );
};
