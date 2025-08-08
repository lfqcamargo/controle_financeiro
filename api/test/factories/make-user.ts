import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "@/domain/user/enterprise/entities/user";
import { faker } from "@faker-js/faker";

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
