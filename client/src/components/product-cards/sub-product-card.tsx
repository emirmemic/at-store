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
    <div className="group relative mx-auto w-full max-w-[1000px] overflow-hidden rounded-2xl bg-[#F5F5F7] transition-all duration-500">
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8">
        {/* Image Section */}
        <div className="relative flex items-center justify-center p-8 md:p-10">
          <div className="absolute inset-0" />
          <div className="relative w-full max-w-[200px]">
            {image ? (
              <StrapiImage
                alt={image.alternativeText ?? title}
                className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-105"
                height={200}
                sizes="(max-width: 768px) 60vw, 30vw"
                src={image?.url ?? ''}
                width={200}
              />
            ) : (
              <div className="aspect-square w-full" />
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center gap-4 p-6 md:gap-5 md:p-8">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 md:text-3xl">
              {title}
            </h3>
            {specifications && specifications.length > 0 ? (
              <ul className="space-y-1.5">
                {specifications.map((spec, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-blue-500" />
                    {spec}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                {shortDescription ?? ''}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            {onClick ? (
              <Button
                className="w-full justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={onClick}
              >
                {buttonText}
              </Button>
            ) : (
              <>
                {hasModalContent && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Saznaj više
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[min(92vw,800px)] max-w-[800px] overflow-hidden rounded-2xl border-none bg-white p-0 shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                      <DialogTitle className="sr-only">
                        {`Saznaj više o ${title}`}
                      </DialogTitle>
                      <DialogDescription className="sr-only">
                        {title}
                      </DialogDescription>
                      <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
                        <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur-xl">
                          <h3 className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
                            {title}
                          </h3>
                        </div>
                        <div className="px-6 py-6">
                          {modalText && (
                            <StrapiBlocks
                              className="prose prose-base max-w-none text-gray-600"
                              content={modalText}
                            />
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <Button
                  asChild
                  className="w-full justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <Link href={link}>{buttonText}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
