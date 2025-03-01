import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={'/assets/images/logo.png'}
        width={133}
        height={30}
        alt="logo "
      />
    </Link>
  );
}
