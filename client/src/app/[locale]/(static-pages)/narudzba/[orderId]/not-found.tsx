import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

/**
 * Not found page for invalid order IDs
 */
export default async function OrderNotFound() {
  const t = await getTranslations('orderDetailsPage');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          {t('orderNotFoundTitle')}
        </h1>

        <p className="mb-8 text-gray-600">{t('orderNotFoundDescription')}</p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}
