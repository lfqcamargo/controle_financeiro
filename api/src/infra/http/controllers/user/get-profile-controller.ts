import { GetProfileUseCase } from "@/domain/user/application/use-cases/get-profile";
import { FastifyReply, FastifyRequest } from "fastify";

export class GetProfileController {
  constructor(private getProfileUseCase: GetProfileUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request.user as { sub: string }).sub;
      if (!userId) {
        return reply.status(401).send({ error: "Unauthorized" });
      }

      const result = await this.getProfileUseCase.execute({ userId });

      if (result.isLeft()) {
        return reply.status(404).send({ error: "User not found" });
      }

      const user = result.value.user;

      return reply.status(200).send(user);
    } catch (err) {
      console.error("Error in GetProfileController:", err);
      return reply.status(500).send({ error: "Internal server error" });
    }
  }
}
