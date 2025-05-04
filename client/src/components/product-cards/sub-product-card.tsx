'use client';

import Link from 'next/link';

import { StrapiImage } from '@/components/strapi/components';
import { ImageProps } from '@/lib/types';

import { Button } from '../ui/button';

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
    <div className="flex w-full flex-col justify-between gap-3 rounded-2xl border border-grey-extra-light bg-grey-almost-white px-8 pb-8 pt-4 shadow-popup-black md:flex-row-reverse md:justify-between md:gap-8 md:px-6 md:py-8 lg:px-14">
      <div className="aspect-1/1 w-full max-w-56">
        {image && (
          <StrapiImage
            alt={image.alternativeText ?? title}
            className="h-full w-full object-contain"
            height={250}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={image?.url ?? ''}
            width={276}
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-7 md:items-start md:justify-between md:pt-3">
        <p className="heading-3">{title}</p>
        {specifications && specifications.length > 0 && (
          <ul className="flex flex-col gap-1 text-grey-darker paragraph-1">
            {specifications.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        )}

        {onClick ? (
          <Button
            className="w-fit py-3"
            size={'md'}
            variant={'filled'}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        ) : (
          <Button asChild className="w-fit py-3" size={'md'} variant={'filled'}>
            <Link href={link}>{buttonText}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
