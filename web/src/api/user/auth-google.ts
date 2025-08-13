import { api } from "@/lib/axios";

interface SignInRequest {
  idToken: string;
}

type SignInResponse = void;

export async function authGoogle({
  idToken,
}: SignInRequest): Promise<SignInResponse> {
  await api.post("/users/auth", { idToken });
}
