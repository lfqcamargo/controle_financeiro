import { FastifyInstance } from "fastify";
import { authenticateGoogleComposer } from "../http/controllers/user/composer/authenticate-google";

export async function userRoutes(app: FastifyInstance) {
  app.post("/auth/", (request, reply) =>
    authenticateGoogleComposer().handle(request, reply)
  );
}
