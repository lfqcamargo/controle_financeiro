import { Either, left, right } from "@/core/either";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "../../enterprise/entities/user";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface GetProfileRequest {
  userId: string;
}

type GetProfileResponse = Either<
  UserNotFoundError,
  {
    user: User;
  }
>;

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetProfileRequest): Promise<GetProfileResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) return left(new UserNotFoundError());

    return right({ user });
  }
}
