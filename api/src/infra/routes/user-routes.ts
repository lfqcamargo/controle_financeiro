import { FastifyInstance } from "fastify";
import { authenticateGoogle } from "../http/controllers/user/authenticate-google";

export async function userRoutes(app: FastifyInstance) {
  app.post("/auth/", authenticateGoogle);
}
