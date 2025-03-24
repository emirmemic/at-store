import Image from 'next/image';

import { Link } from '@/i18n/routing';

export default function Logo() {
  return (
    <Link className="flex items-center gap-2 shrink-0 w-36 lg:w-40 h-full" href="/">
      <Image
        priority
        alt="AT Store"
        className="w-full h-full object-contain"
        height={30}
        src="/assets/images/logo.png"
        width={133}
      />
    </Link>
  );
}
