'use client';

import { ButtonHTMLAttributes, ReactNode, useContext, useState } from 'react';

import { redirectToHomePage } from '@/app/actions';
import { UserContext } from '@/app/providers';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userProvider = useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      redirectToHomePage();
      userProvider.setUser(null);
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
