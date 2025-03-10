'use client';

import { useState } from 'react';
import { ZodError } from 'zod';

import { FormField } from '@/components/forms/form-field';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { useAuth } from '@/lib/hooks';
import { registerSchema } from '@/lib/schemas/auth';

export default function RegisterForm() {
  const { register, isLoading, error } = useAuth();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const validated = registerSchema.parse(data);
      setValidationErrors({});
      await register(validated);
    } catch (err) {
      if (err instanceof ZodError) {
        setValidationErrors(
          Object.fromEntries(
            err.errors.map(({ path, message }) => [path[0], message])
          )
        );
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        noValidate
        className="w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
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
            error={validationErrors.username}
            id="username"
            label="Username"
            name="username"
            type="text"
          />

          <FormField
            required
            error={validationErrors.email}
            id="email"
            label="Email"
            name="email"
            type="email"
          />

          <FormField
            required
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
            {isLoading ? 'Registering...' : 'Register'}
          </Button>

          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link className="text-pink-600 hover:text-pink-500" href="/login">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
