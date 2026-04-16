import { describe, expect, it } from "vitest";

import { loginSchema } from "./auth-schema";

describe("login schema", () => {
  it("should validate correct credentials", () => {
    const result = loginSchema.safeParse({
      email: "user@email.com",
      password: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = loginSchema.safeParse({
      email: "invalido",
      password: "123456",
    });

    expect(result.success).toBe(false);
  });

  it("should reject short password", () => {
    const result = loginSchema.safeParse({
      email: "user@email.com",
      password: "123",
    });

    expect(result.success).toBe(false);
  });
});