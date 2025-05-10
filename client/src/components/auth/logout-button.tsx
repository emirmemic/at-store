'use client';

import { useTranslations } from 'next-intl';
import { ButtonHTMLAttributes, ReactNode, useState } from 'react';

import { redirectToHomePage } from '@/app/actions';
import { useUserProvider } from '@/app/providers/user-provider';
import { useToast } from '@/lib/hooks/use-toast';

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
  const { setUser } = useUserProvider();
  const { toast } = useToast();
  const t = useTranslations();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      redirectToHomePage();
      toast({
        title: t('common.successful'),
        variant: 'success',
      });
      setUser(null);
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
