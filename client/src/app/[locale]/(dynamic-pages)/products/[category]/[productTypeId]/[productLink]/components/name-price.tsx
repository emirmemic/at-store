/* eslint-disable no-console */
'use client';

import { CheckIcon, ClipboardIcon } from 'lucide-react';
import React, { useState } from 'react';

import Price from '@/components/ui/price';
import { useTranslations } from 'next-intl';

interface NamePriceProps {
  name: string;
  discountedPrice: number | null;
  originalPrice: number;
  productVariantId: string;
}

export default function NamePrice({
  name,
  discountedPrice,
  originalPrice,
  productVariantId,
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
      <div>
        <div className="mb-2 flex items-center gap-2">
          <p className="text-grey-dark">{`${t('productId')}: ${productVariantId}`}</p>
          <button
            aria-label="Copy product variant ID"
            className={`flex items-center justify-center rounded-md px-3 py-1 text-sm font-semibold transition ${
              copied
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800'
            }`}
            type="button"
            onClick={copyToClipboard}
          >
            {copied ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <ClipboardIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <h1 className="mb-2 heading-4">{name}</h1>
        <div className="flex flex-col">
          <div className="flex items-center gap-5">
            <Price className="heading-4" value={finalPrice} />
            {hasDiscount && (
              <>
                <Price
                  className="text-grey-darker line-through paragraph-1"
                  value={originalPrice}
                />
                {discountPercentage !== null && (
                  <span className="text-green-dark heading-5">
                    {discountPercentage}% jeftinije
                  </span>
                )}
              </>
            )}
          </div>
          {finalPrice > 399 && (
            <span className="mt-2 text-[1rem] font-thin">
              ili samo {Math.round((finalPrice * 1.1) / 24)} KM na 24 rate.
            </span>
          )}
        </div>
      </div>
    </>
  );
}
