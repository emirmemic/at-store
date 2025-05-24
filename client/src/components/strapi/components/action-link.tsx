import Link from 'next/link';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Button, ButtonProps } from '@/components/ui/button';
import { ActionLinkResponse } from '@/lib/types';

interface ButtonLinkProps extends Omit<ButtonProps, 'asChild'> {
  actionLink: ActionLinkResponse;
  linkProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
}

export const ActionLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ actionLink, children, linkProps = {}, ...buttonProps }, ref) => {
    const t = useTranslations('common');
    if (!actionLink?.linkUrl) return null;

    const {
      linkUrl,
      isExternal = false,
      openInNewTab = false,
      linkText,
    } = actionLink;

    return (
      <Button asChild {...buttonProps}>
        <Link
          ref={ref}
          aria-label={linkText || t('viewMore')}
          href={linkUrl}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          target={openInNewTab ? '_blank' : undefined}
          title={linkText || t('viewMore')}
          {...linkProps}
        >
          {children}
        </Link>
      </Button>
    );
  }
);

ActionLink.displayName = 'ActionLink';
