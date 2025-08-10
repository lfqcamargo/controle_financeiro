import { AuthenticateGoogleUseCase } from "@/domain/user/application/use-cases/authenticate-google";
import { EncrypterHandler } from "@/infra/cryptography/encrypter-handler";
import { AuthenticateGoogleController } from "../authenticate-google";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import prismaClient from "@/infra/database/prisma/prisma-client";
import { OAuth2Client } from "google-auth-library";
import { env } from "@/infra/env";

export function authenticateGoogleComposer() {
  const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);
  const encrypter = new EncrypterHandler();
  const usersRepository = new PrismaUsersRepository(prismaClient);
  const authenticateGoogleUseCase = new AuthenticateGoogleUseCase(
    usersRepository,
    encrypter
  );
  const controller = new AuthenticateGoogleController(
    authenticateGoogleUseCase,
    googleClient
  );

  return controller;
}
