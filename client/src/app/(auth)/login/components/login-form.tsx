"use client";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks";
import { loginSchema } from "@/lib/schemas/auth";
import Link from "next/link";
import { useState } from "react";
import { ZodError } from "zod";

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const validated = loginSchema.parse(data);
      setValidationErrors({});
      await login(validated);
    } catch (err) {
      if (err instanceof ZodError) {
        setValidationErrors(
          Object.fromEntries(
            err.errors.map(({ path, message }) => [path[0], message]),
          ),
        );
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
        <div className="space-y-4 rounded-md border-gray-200 bg-pink-50 p-10 shadow-md">
          {error && (
            <div
              className="rounded-md bg-red-50 p-3 text-sm text-red-600"
              role="alert"
            >
              {error.message}
            </div>
          )}

          <FormField
            label="Email"
            type="email"
            name="email"
            id="email"
            required
            autoComplete="email"
            error={validationErrors.email}
          />

          <FormField
            label="Password"
            type="password"
            name="password"
            id="password"
            required
            autoComplete="current-password"
            error={validationErrors.password}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-pink-600 hover:text-pink-500"
            >
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
