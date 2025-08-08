import { right } from "@/core/either";
import { UsersRepository } from "../repositories/users-repository";

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    return right({});
  }
}
