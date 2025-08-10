import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface UserProps {
  email: string;
  googleId: string;
  name: string;
  avatarUrl?: string | null;

  createdAt: Date;
  lastLogin?: Date | null;
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

  get googleId(): string {
    return this.props.googleId;
  }

  set googleId(googleId: string) {
    this.props.googleId = googleId;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get avatarUrl(): string | null {
    return this.props.avatarUrl ?? null;
  }

  set avatarUrl(avatarUrl: string | null) {
    this.props.avatarUrl = avatarUrl;
  }

  static create(
    props: Optional<UserProps, "createdAt" | "lastLogin" | "avatarUrl">,
    id?: UniqueEntityID
  ) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
        lastLogin: props.lastLogin ?? null,
        avatarUrl: props.avatarUrl ?? null,
      },
      id
    );

    return user;
  }
}
