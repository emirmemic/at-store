'use client';

import { PAGE_NAMES } from '@/i18n/page-names';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Content() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage since newsletter signup is now in the footer
    router.push(PAGE_NAMES.HOME);
  }, [router]);

  return null;
}
