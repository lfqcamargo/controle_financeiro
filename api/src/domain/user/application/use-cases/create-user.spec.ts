import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create User use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    sut = new CreateUserUseCase(usersRepository);
  });

  it("should user must be created", async () => {
    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
  });
});
