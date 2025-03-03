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
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6"
        noValidate
      >
        <div className="border-gray-200 space-y-4 rounded-md bg-pink-50 p-10 shadow-md">
          {error && (
            <div
              className="rounded-md bg-red-50 p-3 text-sm text-red-600"
              role="alert"
            >
              {error.message}
            </div>
          )}

          <FormField
            label="Username"
            type="text"
            name="username"
            id="username"
            required
            error={validationErrors.username}
          />

          <FormField
            label="Email"
            type="email"
            name="email"
            id="email"
            required
            error={validationErrors.email}
          />

          <FormField
            label="Password"
            type="password"
            name="password"
            id="password"
            required
            error={validationErrors.password}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>

          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-pink-600 hover:text-pink-500">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
