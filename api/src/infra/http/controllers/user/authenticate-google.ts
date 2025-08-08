import { env } from "@/infra/env";
import { FastifyReply, FastifyRequest } from "fastify";
import { OAuth2Client } from "google-auth-library";
import z from "zod";

// Simulação simples de banco (substitua pelo seu repositório/DB real)
const usersDB = new Map<string, any>();

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

const authenticateGoogleBodySchema = z.object({
  idToken: z.string().nonempty(),
});

export async function authenticateGoogle(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { idToken } = authenticateGoogleBodySchema.parse(request.body);

  try {
    // Valida o id_token do Google e obtém o payload (dados do usuário)
    const ticket = await googleClient.verifyIdToken({
      idToken,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return reply.status(401).send({ error: "Invalid Google token" });
    }

    const { sub: googleId, email, name, picture } = payload;

    // let user = usersDB.get(email);
    // if (!user) {
    //   user = {
    //     id: googleId,
    //     email,
    //     name,
    //     avatarUrl: picture,
    //   };
    //   usersDB.set(email, user);
    // }

    const user = {
      id: googleId,
      email: email,
      name: name,
      avatarUrl: picture,
    };

    const token = await reply.jwtSign(
      {
        sub: user.id,
      },
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        sub: user.id,
      },
      {
        expiresIn: "7d",
      }
    );

    reply.setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: true,
    });

    return reply.status(200).send({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    console.error(err);
    return reply.status(403).send({ error: "Authentication failed" });
  }
}
