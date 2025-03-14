import Image from 'next/image';

import { Link } from '@/i18n/routing';

export default function Logo() {
  return (
    <Link href="/">
      <Image
        alt="logo "
        height={30}
        src={'/assets/images/logo.png'}
        width={133}
      />
    </Link>
  );
}
