'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ZodError } from 'zod';

import { FormField } from '@/components/forms/form-field';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { useAuth } from '@/lib/hooks';
import { createLoginSchema } from '@/lib/schemas/auth';

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const t = useTranslations('validation');
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const loginSchema = createLoginSchema(t);
      const validated = loginSchema.parse(data);
      setValidationErrors({});
      await login(validated);
    } catch (err) {
      if (err instanceof ZodError) {
        setValidationErrors(
          Object.fromEntries(
            [...err.errors].reverse().map(({ path, message }) => {
              return [path[0], message];
            })
          )
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form noValidate className="w-full max-w-md" onSubmit={handleSubmit}>
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
            required
            autoComplete="email"
            error={validationErrors.email}
            id="email"
            label="Email"
            name="email"
            type="email"
          />

          <FormField
            required
            autoComplete="current-password"
            error={validationErrors.password}
            id="password"
            label="Password"
            name="password"
            type="password"
          />

          <Button
            aria-busy={isLoading}
            className="w-full"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              className="text-pink-600 hover:text-pink-500"
              href="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
