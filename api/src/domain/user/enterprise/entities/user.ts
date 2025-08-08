import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface UserProps {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  lastLogin: Date | null;
}

export class User extends AggregateRoot<UserProps> {
  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  static create(
    props: Optional<UserProps, "createdAt" | "lastLogin">,
    id?: UniqueEntityID
  ) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
        lastLogin: props.lastLogin ?? null,
      },
      id
    );

    return user;
  }
}
