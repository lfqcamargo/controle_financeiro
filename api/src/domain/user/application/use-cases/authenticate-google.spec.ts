import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { AuthenticateGoogleUseCase } from "./authenticate-google";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";

let usersRepository: InMemoryUsersRepository;
let encrypter: FakeEncrypter;
let sut: AuthenticateGoogleUseCase;

describe("Authenticate google use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateGoogleUseCase(usersRepository, encrypter);
  });

  it("should authenticate google", async () => {
    const result = await sut.execute({
      googleId: "1",
      email: "lfqcamargo@gmail.com",
      name: "Lucas Camargo",
      avatarUrl: "https://avatars.githubusercontent.com/u/153031752?v=4",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
    expect(usersRepository.items).toHaveLength(1);
    expect(usersRepository.items[0]).toMatchObject({
      googleId: "1",
      email: "lfqcamargo@gmail.com",
      name: "Lucas Camargo",
      avatarUrl: "https://avatars.githubusercontent.com/u/153031752?v=4",
    });
  });
});
