import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetProfileUseCase } from "./get-profile";
import { makeUser } from "test/factories/make-user";
import { UserNotFoundError } from "./errors/user-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetProfileUseCase;

describe("Get profile use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetProfileUseCase(usersRepository);
  });

  it("should get profile user by id", async () => {
    const user = makeUser();
    usersRepository.create(user);

    const result = await sut.execute({ userId: user.id.toString() });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.user).toMatchObject({
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      });
    }
  });

  it("should return an error if the user does not exist", async () => {
    const user = makeUser();
    usersRepository.create(user);

    const result = await sut.execute({ userId: "non-exists-user" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserNotFoundError);
  });
});
