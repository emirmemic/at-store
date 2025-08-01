'use client';

import { Button } from '../ui/button';
import { ImageProps } from '@/lib/types';
import Link from 'next/link';
import { StrapiImage } from '@/components/strapi/components';

interface SubProductCardProps {
  title: string;
  image?: ImageProps | null;
  specifications?: string[];
  link: string;
  buttonText: string;
  onClick?: () => void;
}
export default function SubProductCard({
  title,
  image,
  specifications,
  link,
  buttonText,
  onClick,
}: SubProductCardProps) {
  return (
    <div className="mb-3 flex justify-center">
      <div className="flex w-full max-w-[1100px] flex-col items-center justify-between gap-3 rounded-3xl border border-gray-200 bg-[#f5f5f7] px-4 pb-6 pt-4 shadow-md transition-all hover:shadow-lg md:flex-row-reverse md:items-center md:gap-4 md:px-4 md:py-6 lg:px-6">
        <div className="h-36 w-40 md:mr-[5px]">
          {image ? (
            <StrapiImage
              alt={image.alternativeText ?? title}
              className="h-full w-full object-contain"
              height={230}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={image?.url ?? ''}
              width={260}
            />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>
        <div className="flex flex-col items-center gap-3 md:items-start md:justify-between md:pt-3">
          {specifications && specifications.length > 0 ? (
            <>
              <p className="text-lg font-semibold tracking-tight text-neutral-900">
                {title}
              </p>
              <ul className="mb-7 flex flex-col gap-0.5 text-sm font-medium text-neutral-700">
                {specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mb-7 text-lg font-semibold tracking-tight text-neutral-900">
              {title}
            </p>
          )}

          {onClick ? (
            <Button
              className="w-fit rounded-3xl bg-blue px-4 py-2 text-sm text-white transition-colors hover:bg-blue-900"
              size={'md'}
              variant={'filled'}
              onClick={onClick}
            >
              {buttonText}
            </Button>
          ) : (
            <Button
              asChild
              className="w-fit rounded-3xl bg-blue px-4 py-2 text-sm text-white transition-colors hover:bg-blue-900"
              size={'md'}
              variant={'filled'}
            >
              <Link href={link}>{buttonText}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
