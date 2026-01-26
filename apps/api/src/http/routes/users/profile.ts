import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { ProfileResponseSchema } from "@repo/models";

import { NotFoundError } from "../../../helpers/errors/not-found";
import { authPlugin } from "../../plugins/auth";
import { prisma } from "../../../db/client";

export const profile = (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .register(authPlugin)
    .get(
      "/profile",
      {
        schema: {
          tags: ["Users"],
          summary: "Get profile user",
          operationId: "profile",
          response: {
            200: ProfileResponseSchema,
          },
        },
      },
      async (request, reply) => {
        const user = await prisma.user.findUnique({
          where: {
            id: request.user.toString(),
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        if (!user) throw new NotFoundError("Usuário não encontrado");

        return reply.status(200).send({
          user,
        });
      },
    );
};
