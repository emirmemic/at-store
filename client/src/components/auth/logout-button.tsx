'use client';

import { ReactNode, ButtonHTMLAttributes, useState } from 'react';

import { PAGE_NAMES } from '@/i18n/page-names';
import { useRouter } from '@/i18n/routing';
import { logoutUser } from '@/lib/services';

interface LogoutButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: (props: { isLoading: boolean; error: string | null }) => ReactNode;
  className?: string;
}

export default function LogoutButton({
  children,
  className,
  ...props
}: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await logoutUser();
      router.push(PAGE_NAMES.HOME);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        className={className}
        {...props}
        disabled={isLoading}
        type="submit"
      >
        {typeof children === 'function'
          ? children({ isLoading, error })
          : children}
      </button>
    </form>
  );
}
