import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Icon, OAuthProvider } from '@/lib/types';
import { cn, getStrapiURL } from '@/lib/utils/utils';

import { IconApple, IconFacebook, IconGoogle } from '../icons';

export default function OAuthButton({
  provider,
  variant,
}: {
  provider: OAuthProvider;
  variant?: 'icon' | 'button';
}) {
  const backendUrl = getStrapiURL();
  const path = `/api/connect/${provider}`;
  const url = new URL(backendUrl + path);

  const Icon: Icon = (() => {
    switch (provider) {
      case 'google':
        return IconGoogle;
      case 'facebook':
        return IconFacebook;
      case 'apple':
        return IconApple;
      default:
        throw new Error(`Unsupported OAuth provider: ${provider}`);
    }
  })();

  return (
    <>
      {variant === 'icon' ? (
        <Button asChild>
          <Link href={url.href}>
            <Icon />
            <span className="sr-only">{`${provider} sign in`}</span>
          </Link>
        </Button>
      ) : (
        <Link
          className={cn(
            'flex w-full min-w-[300px] items-center justify-center gap-2.5 rounded-2xl p-2.5 text-center capitalize',
            provider === 'facebook' ? 'bg-blue' : '',
            provider === 'google' ? 'bg-white text-black' : '',
            provider === 'apple' ? 'bg-grey-darkest' : ''
          )}
          href={url.href}
        >
          <Icon />
          {provider}
        </Link>
      )}
    </>
  );
}
