import type { LoginFormData } from "../lib/auth-schema";

type LoginResponse = {
  token: string;
  user: {
    email: string;
    name: string;
  };
};

export async function loginWithEmail(
  payload: LoginFormData,
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    token: `fake-jwt-token-${crypto.randomUUID()}`,
    user: {
      email: payload.email,
      name: payload.email.split("@")[0],
    },
  };
}