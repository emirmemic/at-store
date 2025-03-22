import Image from 'next/image';

import { Link } from '@/i18n/routing';

export default function Logo() {
  return (
    <Link className="flex items-center gap-2" href="/">
      <Image
        priority
        alt="AT Store"
        className="w-32 lg:w-40"
        height={30}
        src="/assets/images/logo.png"
        width={133}
      />
    </Link>
  );
}
