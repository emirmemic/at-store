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
    <div className="mb-6 flex justify-center">
      <div className="flex w-full max-w-[1100px] flex-col gap-3 rounded-2xl border border-[#d2d2d7] bg-white px-4 pb-6 pt-4 shadow-sm ring-1 ring-inset ring-[#f5f5f7] transition-all hover:shadow-md md:flex-row md:items-center md:px-6 md:py-6">
        <div className="h-36 w-40 md:ml-[5px]">
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
        <div className="flex flex-1 flex-col justify-center gap-3">
          {specifications && specifications.length > 0 ? (
            <>
              <p className="text-center text-[17px] font-medium tracking-tight text-neutral-900 md:text-left">
                {title}
              </p>
              <ul className="mb-6 flex w-full flex-col text-[13px] font-normal text-neutral-700">
                {specifications.map((spec, index) => (
                  <li
                    key={index}
                    className="border-b border-[#e5e5ea] px-1.5 py-1.5 text-center last:border-b-0 md:text-left"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mb-7 text-center text-lg font-semibold tracking-tight text-neutral-900 md:text-left">
              {title}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center md:justify-end">
          {onClick ? (
            <Button
              className="w-fit rounded-full bg-[#0071e3] px-6 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#005bb5]"
              size={'md'}
              variant={'filled'}
              onClick={onClick}
            >
              {buttonText}
            </Button>
          ) : (
            <Button
              asChild
              className="w-fit rounded-full bg-[#0071e3] px-6 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#005bb5]"
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
