import { Either, right } from "@/core/either";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "../../enterprise/entities/user";
import { Encrypter } from "../../cryptography/encrypter";

interface AuthenticateGoogleRequest {
  googleId: string;
  email: string;
  name: string;
  avatarUrl: string;
}

type AuthenticateGoogleResponse = Either<
  { message: string },
  { accessToken: string; refreshToken: string }
>;

export class AuthenticateGoogleUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private encrypter: Encrypter
  ) {}

  async execute({
    googleId,
    email,
    name,
    avatarUrl,
  }: AuthenticateGoogleRequest): Promise<AuthenticateGoogleResponse> {
    let user = await this.usersRepository.findByGoogleId(googleId);
    if (!user) {
      user = User.create({ email, googleId, name, avatarUrl });
      this.usersRepository.create(user);
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    });
    const refreshToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      expiresIn: "7d",
    });

    return right({
      accessToken,
      refreshToken,
    });
  }
}
