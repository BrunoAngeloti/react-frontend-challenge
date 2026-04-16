import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Film, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginWithEmail } from "@/features/auth/api/login";
import {
  loginSchema,
  type LoginFormData,
} from "@/features/auth/lib/auth-schema";
import { useAuthStore } from "@/features/auth/model/auth-store";

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
    <Card className="w-full border border-zinc-200/80 bg-white/90 shadow-2xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
      <CardHeader className="space-y-4 p-8 pb-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/15">
          <Film className="h-5 w-5" />
        </div>

        <div className="space-y-1.5">
          <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Entrar no CineDash
          </CardTitle>

          <CardDescription className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Acesse seu dashboard de curadoria e organize os filmes da sua
            watchlist com uma experiência rápida e moderna.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-8 pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-200">
              E-mail
            </Label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                id="email"
                type="email"
                placeholder="voce@email.com"
                {...register("email")}
                className="h-11 border-zinc-200 bg-white pl-10 text-zinc-950 placeholder:text-zinc-400 focus-visible:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
              />
            </div>

            {errors.email ? (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2.5">
            <Label
              htmlFor="password"
              className="text-zinc-700 dark:text-zinc-200"
            >
              Senha
            </Label>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="h-11 border-zinc-200 bg-white pl-10 text-zinc-950 placeholder:text-zinc-400 focus-visible:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
              />
            </div>

            {errors.password ? (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          {serverError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
              {serverError}
            </div>
          ) : null}

          <Button
            type="submit"
            className="h-11 w-full rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>

          <p className="text-center text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            Login simulado para o desafio técnico. Use qualquer e-mail válido e
            uma senha com pelo menos 6 caracteres.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}