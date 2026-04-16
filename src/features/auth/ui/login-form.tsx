import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { loginWithEmail } from "@/features/auth/api/login";
import { loginSchema, type LoginFormData } from "@/features/auth/lib/auth-schema";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const navigate = useNavigate();
  const authLogin = useAuthStore((state) => state.login);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setServerError(null);

      const response = await loginWithEmail(data);

      authLogin({
        token: response.token,
        user: response.user,
      });

      navigate({ to: "/dashboard" });
    } catch {
      setServerError("Não foi possível entrar. Tente novamente.");
    }
  }

  return (
    <Card className="w-full max-w-md border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-50 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Entrar no CineDash</CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400">
          Acesse o dashboard de curadoria de filmes.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="voce@email.com"
              {...register("email")}
              className="border-zinc-700 bg-zinc-950"
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="border-zinc-700 bg-zinc-950"
            />
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          {serverError && (
            <p className="text-sm text-red-400">{serverError}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}