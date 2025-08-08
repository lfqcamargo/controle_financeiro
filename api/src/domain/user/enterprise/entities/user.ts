import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface UserProps {
  email: string;
  createdAt: Date;
  lastLogin?: Date | null;

  googleId: string;
  name: string;
  avatarUrl: string;
}

export class User extends AggregateRoot<UserProps> {
  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get lastLogin(): Date | null {
    return this.props.lastLogin ?? null;
  }

  set lastLogin(date: Date) {
    this.props.lastLogin = date;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
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
