import { beforeEach, describe, expect, it } from "vitest";

import { clearStorage } from "@/test/test-utils";
import { useAuthStore } from "./auth-store";

describe("auth store", () => {
  beforeEach(() => {
    clearStorage();
    useAuthStore.setState({
      token: null,
      user: null,
      isAuthenticated: false,
      hasHydrated: true,
    });
  });

  it("should login correctly", () => {
    useAuthStore.getState().login({
      token: "fake-token",
      user: {
        email: "teste@email.com",
        name: "teste",
      },
    });

    const state = useAuthStore.getState();

    expect(state.token).toBe("fake-token");
    expect(state.user?.email).toBe("teste@email.com");
    expect(state.isAuthenticated).toBe(true);
  });

  it("should logout correctly", () => {
    useAuthStore.setState({
      token: "fake-token",
      user: {
        email: "teste@email.com",
        name: "teste",
      },
      isAuthenticated: true,
      hasHydrated: true,
    });

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();

    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});