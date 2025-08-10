import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "@/domain/user/enterprise/entities/user";
import { PrismaUserMapper } from "@/infra/database/prisma/mappers/prisma-user-mapper";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "generated/prisma";

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID
) {
  const user = User.create(
    {
      email: faker.internet.email(),
      createdAt: new Date(),
      lastLogin: new Date(),

      googleId: faker.string.uuid(),
      name: faker.person.fullName(),
      avatarUrl: faker.image.url(),

      ...override,
    },
    id
  );

  return user;
}

export class UserFactory {
  constructor(private prisma: PrismaClient) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data);

    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });

    return user;
  }
}
