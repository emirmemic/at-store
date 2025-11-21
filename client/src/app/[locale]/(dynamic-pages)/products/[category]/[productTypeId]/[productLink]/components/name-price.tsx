'use client';

import { CheckIcon, ClipboardIcon } from 'lucide-react';

import Price from '@/components/ui/price';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface NamePriceProps {
  name: string;
  discountedPrice: number | null;
  originalPrice: number;
  productVariantId: string;
  shouldDisplayPreOrder?: boolean;
}

export default function NamePrice({
  name,
  discountedPrice,
  originalPrice,
  productVariantId,
  shouldDisplayPreOrder = false,
}: NamePriceProps) {
  const t = useTranslations('productPage');
  const hasDiscount =
    discountedPrice && originalPrice && discountedPrice < originalPrice;

  const finalPrice = discountedPrice ? discountedPrice : originalPrice;

  let discountPercentage: number | null = null;

  if (hasDiscount && discountedPrice !== null && originalPrice) {
    discountPercentage = Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
  }

  const pathNamesIphone = [
    '/proizvodi/iphone/iP17P/apple-iphone-17-pro',
    '/proizvodi/iphone/iP17PM/apple-iphone-17-pro-max',
  ];

  const isIphone = pathNamesIphone.some((path) =>
    location.pathname.toLowerCase().includes(path.toLowerCase())
  );

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(productVariantId).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    } else {
      // Fallback for older browsers:
      const textArea = document.createElement('textarea');
      textArea.value = productVariantId;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error(err);
      }
      document.body.removeChild(textArea);
    }
  };
  return (
    <>
      <div className="rounded-[32px] bg-white/90 p-6 shadow-[0_30px_80px_rgba(15,15,15,0.05)] backdrop-blur">
        {!shouldDisplayPreOrder && (
          <div className="mb-5 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.05em] text-gray-500">
            <span className="whitespace-nowrap text-[0.65rem] font-semibold">
              {t('productId')}
            </span>
            <div className="flex items-center gap-3 rounded-full bg-gray-100/60 px-3 py-1 text-[0.7rem] tracking-normal text-gray-600">
              <span className="font-semibold">{productVariantId}</span>
              <button
                aria-label="Copy product variant ID"
                className={`flex size-7 items-center justify-center rounded-full border border-transparent transition ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-white text-gray-500 hover:border-gray-300 hover:text-gray-900'
                }`}
                type="button"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <ClipboardIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h1 className="font-regular text-3xl tracking-tight text-gray-900 sm:text-3xl">
            {name}
          </h1>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <div className="flex flex-wrap items-end gap-4">
            <Price
              className="text-4xl font-semibold tracking-tight text-gray-900"
              value={finalPrice}
            />
            {hasDiscount && (
              <div className="flex flex-row items-center gap-3">
                <Price
                  className="text-base font-medium text-gray-400 line-through"
                  value={originalPrice}
                />
                {discountPercentage !== null && (
                  <span className="font-regular text-xs uppercase tracking-[0.02em] text-green-600">
                    {discountPercentage}% povoljnije
                  </span>
                )}
              </div>
            )}
          </div>
          {!shouldDisplayPreOrder && finalPrice > 399 && (
            <span className="text-md text-gray-600">
              ili samo{' '}
              <strong className="font-semibold text-gray-900">
                {Math.round((finalPrice * 1.1) / 24)} KM
              </strong>{' '}
              mjesečno uz 24 rate.
            </span>
          )}
        </div>

        {!shouldDisplayPreOrder && isIphone && (
          <div className="mt-6 py-4 text-sm text-[#3577E5]">
            Zbog ograničenih količina savjetujemo da svoju kupovinu osigurate na
            vrijeme. Ukoliko je proizvod trenutačno dostupan, rok isporuke je od
            2-3 radna dana. Za uređaje koji nisu dostupni, očekivani rok
            isporuke je 20 dana, uz mogućnost ranijeg ili kasnijeg roka isporuke
            od navedenog.
          </div>
        )}
      </div>
    </>
  );
}
