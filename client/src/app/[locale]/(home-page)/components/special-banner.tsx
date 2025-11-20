'use client';

import Image from 'next/image';
import Link from 'next/link';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { cn } from '@/lib/utils/utils';

interface SpecialBannerProps {
  image: {
    url: string;
    alternativeText: string | null;
  };
  backgroundColor?: string;
  title: string;
  subtitle: string;
  subSubtitle?: string;
  buttonText: string;
  buttonUrl: string;
  textColor?: string;
  className?: string;
}

export default function SpecialBanner({
  image,
  backgroundColor = '#f1f5f9',
  title,
  subtitle,
  subSubtitle,
  buttonText,
  buttonUrl,
  textColor = '#1e293b',
  className,
}: SpecialBannerProps) {
  const imageUrl = `${STRAPI_BASE_URL}${image.url}`;

  return (
    <section
      className={cn('relative w-full overflow-hidden', className)}
      style={{ backgroundColor }}
    >
      <div className="px-3 py-12 container-max-width-xl md:px-6 md:py-16">
        <div className="flex flex-col items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-6 text-center md:text-center">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={imageUrl}
                alt={image.alternativeText || title}
                fill
                className="mx-auto object-contain"
                priority
              />
            </div>
            <div className="!mt-16">
              <h2
                className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
                style={{ color: textColor }}
              >
                {title}
              </h2>
              <p
                className="mt-5 text-lg md:text-xl"
                style={{ color: textColor, opacity: 0.8 }}
              >
                {subtitle}
              </p>
            </div>
            <div className="flex justify-center md:justify-center">
              <Link
                href={buttonUrl}
                className="inline-flex items-center justify-center rounded-full bg-[#3577E5] px-8 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-[#2a5db8] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3577E5] focus:ring-offset-2"
              >
                {buttonText}
              </Link>
            </div>
            {subSubtitle && (
              <p
                className="md:text-md mt-3 text-base"
                style={{ color: textColor, opacity: 0.6 }}
              >
                {subSubtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
