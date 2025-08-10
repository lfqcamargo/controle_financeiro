import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User } from "@/domain/user/enterprise/entities/user";
import { User as PrismaUser, Prisma } from "generated/prisma";

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        email: raw.email,
        googleId: raw.googleId,
        name: raw.name,
        avatarUrl: raw.avatarUrl,
        createdAt: raw.createdAt,
        lastLogin: raw.lastLogin ?? null,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      email: user.email,
      googleId: user.googleId,
      name: user.name,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin ?? null,
    };
  }
}
