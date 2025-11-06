'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StrapiBlocks, StrapiImage } from '@/components/strapi/components';

import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { Button } from '../ui/button';
import { ImageProps } from '@/lib/types';
import Link from 'next/link';

interface SubProductCardProps {
  title: string;
  image?: ImageProps | null;
  specifications?: string[];
  link: string;
  buttonText: string;
  onClick?: () => void;
  shortDescription?: string | null;
  modalText?: BlocksContent | null;
}
export default function SubProductCard({
  title,
  image,
  specifications,
  link,
  buttonText,
  onClick,
  shortDescription,
  modalText,
}: SubProductCardProps) {
  const hasModalContent = Array.isArray(modalText) && modalText.length > 0;
  return (
    <div className="mb-12 flex justify-center">
      <div className="group relative flex w-full max-w-[1100px] flex-col overflow-hidden rounded-[32px] bg-[rgba(255,255,255,0.55)] px-6 py-8 shadow-[0_24px_60px_rgba(15,15,15,0.12)] backdrop-blur-2xl md:flex-row md:items-center md:gap-16 md:px-12 md:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/25 to-transparent opacity-100"
        />
        <div className="relative z-10 flex w-full justify-center md:w-56">
          <div className="flex h-40 w-full max-w-[220px] items-center justify-center overflow-hidden rounded-[28px] bg-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl md:h-48 md:max-w-[240px]">
            {image ? (
              <StrapiImage
                alt={image.alternativeText ?? title}
                className="h-full w-full object-contain drop-shadow-[0_18px_35px_rgba(15,15,15,0.18)]"
                height={240}
                sizes="(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 26vw"
                src={image?.url ?? ''}
                width={260}
              />
            ) : (
              <div className="h-full w-full" />
            )}
          </div>
        </div>
        <div className="relative z-10 mt-6 flex flex-1 flex-col gap-4 text-center text-neutral-900 md:mt-0 md:text-left">
          <p className="text-2xl font-semibold tracking-tight md:text-[28px]">
            {title}
          </p>
          {specifications && specifications.length > 0 ? (
            <ul className="flex flex-col gap-2 text-sm text-neutral-600 md:text-[15px]">
              {specifications.map((spec, index) => (
                <li
                  key={index}
                  className="rounded-[22px] bg-white/45 px-5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md"
                >
                  {spec}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] font-medium leading-relaxed text-neutral-700">
              {shortDescription ?? ''}
            </p>
          )}
        </div>
        <div className="relative z-10 mt-8 flex items-center justify-center md:mt-0 md:justify-end">
          {onClick ? (
            <Button
              className="w-fit rounded-full bg-[#0a84ff] px-7 py-2.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(10,132,255,0.35)] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              size={'md'}
              variant={'filled'}
              onClick={onClick}
            >
              {buttonText}
            </Button>
          ) : (
            <div className="flex w-full flex-col gap-3">
              <Button
                asChild
                className="w-full rounded-2xl bg-[#0a84ff] px-7 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                size={'md'}
                variant={'filled'}
              >
                <Link href={link}>{buttonText}</Link>
              </Button>
              {hasModalContent ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full rounded-2xl border-none bg-[#111] px-7 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                      size={'md'}
                      variant={'filled'}
                    >
                      Saznaj više
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[min(90vw,640px)] max-w-[640px] overflow-hidden rounded-[28px] border-none bg-white p-0 shadow-[0_24px_60px_rgba(15,15,15,0.12)]">
                    <DialogTitle className="sr-only">
                      {`Saznaj više o ${title}`}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      {title}
                    </DialogDescription>
                    <div className="max-h-[70vh] overflow-y-auto px-6 py-6 custom-scrollbar">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {title}
                      </h3>
                      {modalText && (
                        <StrapiBlocks
                          className="mt-4 text-neutral-700"
                          content={modalText}
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button
                  asChild
                  className="w-full rounded-2xl border-none bg-[#111] px-7 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  size={'md'}
                  variant={'filled'}
                >
                  <Link href={link}>Saznaj više</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
