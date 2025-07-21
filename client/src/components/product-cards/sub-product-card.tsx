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
    <div className="flex w-full flex-col justify-between gap-5 rounded-3xl border border-gray-100 bg-white px-6 pb-6 pt-4 shadow-md transition-all hover:shadow-lg md:flex-row-reverse md:gap-6 md:px-6 md:py-6 lg:px-12">
      <div className="h-48 w-52">
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
      <div className="flex flex-col items-center gap-6 md:items-start md:justify-between md:pt-3">
        <p className="text-3xl font-semibold tracking-tight text-neutral-900">
          {title}
        </p>
        {specifications && specifications.length > 0 && (
          <ul className="flex flex-col gap-0.5 text-base font-medium text-neutral-700">
            {specifications.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        )}

        {onClick ? (
          <Button
            className="w-fit rounded-xl bg-black px-5 py-2.5 text-white transition-colors hover:bg-neutral-900"
            size={'md'}
            variant={'filled'}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        ) : (
          <Button
            asChild
            className="w-fit rounded-xl bg-black px-5 py-2.5 text-white transition-colors hover:bg-neutral-900"
            size={'md'}
            variant={'filled'}
          >
            <Link href={link}>{buttonText}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
