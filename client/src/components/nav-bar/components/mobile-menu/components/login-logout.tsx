import { useTranslations } from 'next-intl';

import { LogoutButton } from '@/components/auth';
import { IconAccount, IconLogout } from '@/components/nav-bar/icons';
import Loader from '@/components/ui/loader';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { UserInformation } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface PropsType {
  user: UserInformation | null;
  closeMenu: () => void;
}
export default function MobileLoginLogout({ user, closeMenu }: PropsType) {
  const t = useTranslations();

  const buttonClasses =
    'group mx-auto flex w-fit items-center gap-4 p-4 transition-colors duration-300 heading-4 hover:text-grey-medium';
  const iconClasses =
    'text-white transition-colors duration-300 group-hover:text-grey-medium';
  return (
    <>
      {user ? (
        <LogoutButton className="mx-auto flex w-fit flex-col">
          {({ isLoading, error }) => (
            <>
              <span
                className={cn(buttonClasses, {
                  'opacity-50': isLoading,
                })}
              >
                {isLoading ? (
                  <>
                    {t('login.loggingOut')}
                    <Loader className={iconClasses} size={28} />
                  </>
                ) : (
                  <>
                    {t('login.logout')}
                    <IconLogout className={iconClasses} size={28} />
                  </>
                )}
              </span>
              {error && <span className="paragraph-2">{error}</span>}
            </>
          )}
        </LogoutButton>
      ) : (
        <Link
          className={buttonClasses}
          href={PAGE_NAMES.LOGIN}
          onClick={closeMenu}
        >
          {t('login.login')}
          <IconAccount className={iconClasses} />
        </Link>
      )}
    </>
  );
}
