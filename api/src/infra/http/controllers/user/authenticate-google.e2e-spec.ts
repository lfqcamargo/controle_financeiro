import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { PrismaClient } from "generated/prisma";
import { describe } from "node:test";
import { expect, it, vi } from "vitest";
import { AuthenticateGoogleController } from "./authenticate-google";
import { AuthenticateGoogleUseCase } from "@/domain/user/application/use-cases/authenticate-google";
import { EncrypterHandler } from "@/infra/cryptography/encrypter-handler";
import { LoginTicket, OAuth2Client } from "google-auth-library";

class OAuth2ClientMock implements Partial<OAuth2Client> {
  async verifyIdToken({ idToken }: { idToken: string }): Promise<LoginTicket> {
    if (idToken === "invalid") {
      return { getPayload: () => null } as unknown as LoginTicket;
    }
    return {
      getPayload: () => ({
        sub: "mockGoogleId",
        email: "mock@example.com",
        name: "Mock User",
        picture: "http://avatar.url",
      }),
    } as unknown as LoginTicket;
  }
}

const googleClient = new OAuth2ClientMock() as OAuth2Client;

describe("Authenticate Google (e2e)", () => {
  it("[POST] /auth/", async () => {
    const prisma = new PrismaClient();
    const encrypter = new EncrypterHandler();
    const usersRepository = new PrismaUsersRepository(prisma);
    const useCase = new AuthenticateGoogleUseCase(usersRepository, encrypter);
    const controller = new AuthenticateGoogleController(useCase, googleClient);

    const mockRequest = {
      body: { idToken: "valid-token" },
    } as unknown as FastifyRequest;

    const mockReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      setCookie: vi.fn().mockReturnThis(),
    } as unknown as FastifyReply;

    await controller.handle(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({ message: "loggin" });
  });
});
