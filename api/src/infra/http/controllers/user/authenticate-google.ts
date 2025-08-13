import { FastifyReply, FastifyRequest } from "fastify";
import { OAuth2Client } from "google-auth-library";
import { z } from "zod";
import { AuthenticateGoogleUseCase } from "@/domain/user/application/use-cases/authenticate-google";

const authenticateGoogleBodySchema = z.object({
  idToken: z.string(),
});

export class AuthenticateGoogleController {
  constructor(
    private authenticateGoogleUseCase: AuthenticateGoogleUseCase,
    private googleClient: OAuth2Client
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { idToken } = authenticateGoogleBodySchema.parse(request.body);

      const ticket = await this.googleClient.verifyIdToken({ idToken });
      const payload = ticket.getPayload();

      if (!payload) {
        return reply.status(401).send({ error: "Invalid Google token" });
      }

      const { sub: googleId, email, name, picture } = payload;

      const result = await this.authenticateGoogleUseCase.execute({
        googleId,
        email: email ?? "",
        name: name ?? "",
        avatarUrl: picture ?? "",
      });

      if (result.isLeft()) {
        return reply.status(500).send();
      }

      const { refreshToken } = result.value;

      reply.setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        httpOnly: true,
      });

      return reply.status(200).send({ message: "loggin" });
    } catch (err) {
      console.error("Erro na autenticação:", err);
      return reply.status(403).send({ error: "Authentication failed" });
    }
  }
}
