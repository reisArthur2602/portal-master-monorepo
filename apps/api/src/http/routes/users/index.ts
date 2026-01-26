import { FastifyInstance } from "fastify";
import { signIn } from "./sign-in";
import { profile } from "./profile";
import { createUser } from "./create-user";

export const usersRoutes = async (fastify: FastifyInstance) => {
  await fastify.register(createUser);
  await fastify.register(signIn);
  await fastify.register(profile);
};
