import Image from 'next/image';

import { Link } from '@/i18n/routing';

export default function Logo() {
  return (
    <Link
      className="flex h-full w-36 shrink-0 items-center gap-2 lg:w-40"
      href="/"
    >
      <Image
        priority
        alt="AT Store"
        className="h-full w-full object-contain"
        height={30}
        src="/assets/images/logo.png"
        width={133}
      />
    </Link>
  );
}
