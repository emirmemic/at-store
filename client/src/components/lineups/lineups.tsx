'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LineupItem, LineupProduct } from '@/lib/types';

import Image from 'next/image';
import Link from 'next/link';
import { StrapiBlocks } from '@/components/strapi/components';
import { formatPrice } from '@/lib/formatters';
import { makeProductLink } from '@/lib/utils/link-helpers';

interface LineupsProps {
  lineups: LineupItem[];
  categorySlug: string;
}

interface ProductCardProps {
  product: LineupProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const finalPrice =
    product.product?.discountedPrice ?? product.product?.originalPrice ?? 0;
  const originalPrice = product.product?.originalPrice ?? 0;
  const discountedPrice = product.product?.discountedPrice;

  // Calculate discount percentage
  const discountPercentage =
    discountedPrice && originalPrice
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  // Generate product link from relation
  const productLink = product.product
    ? makeProductLink(
        product.product.category?.link || '',
        product.product.productTypeId,
        product.product.productLink
      )
    : '#';

  return (
    <div className="group relative mb-8 flex h-fit flex-col">
      {/* Product Image - Above card with rounded corners */}
      <div className="relative mx-auto mb-4 aspect-square min-h-[350px] w-full overflow-hidden rounded-2xl">
        <Image
          // src={imageUrl}
          src="https://www.apple.com/v/iphone/home/cg/images/overview/select/iphone_air__f0t56fef3oey_large_2x.jpg"
          alt={product.image?.alternativeText || product.productName}
          fill
          className="object-cover transition-transform duration-500"
          priority={true}
        />
      </div>

      {/* Card Content */}
      <div className="flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300">
        {/* Content */}
        <div className="flex flex-1 flex-col items-center px-8 pt-2 text-center">
          <div className="w-full">
            {/* Available Colors */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div className="mb-3 flex items-center justify-center gap-2">
                {product.availableColors.map((color, index) => (
                  <div
                    key={`${color.hexCode}-${index}`}
                    className="group/color relative"
                    title={color.colorName}
                  >
                    <div
                      className={`h-4 w-4 shadow-sm transition-transform duration-200 hover:scale-125`}
                      style={{
                        backgroundColor: color.hexCode,
                        borderTop: `4px solid ${color.hexCode}`,
                        borderRadius: '8px',
                        boxShadow: `0 -2px 6px ${color.hexCode}40`, // 40 adds transparency
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Product Name */}
            <h4 className="line-clamp-2 min-h-[2rem] text-lg font-semibold text-neutral-900 md:text-2xl">
              {product.productName}
            </h4>

            {/* Description */}
            {product.description && (
              <p className="mt-2 line-clamp-2 text-sm text-gray-600 md:text-lg">
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="space-y-0.5 pt-4">
              {discountPercentage > 0 && (
                <p className="text-sm text-neutral-500 line-through">
                  {formatPrice(originalPrice)} KM
                </p>
              )}
              <p className="text-2xl font-semibold text-neutral-900">
                {formatPrice(finalPrice)} KM
              </p>
              <p className="text-sm font-thin text-neutral-900">
                ili samo {(originalPrice / 24).toFixed(0)} KM na 24 mjeseca
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex w-full flex-row gap-2">
              <Link
                href={productLink}
                className="h-fit w-full rounded-full bg-[#0071e3] px-2 py-2 text-sm font-semibold text-white transition-all hover:bg-[#0077ED]"
              >
                Kupi
              </Link>

              {product.subCategory?.modalText ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="h-fit w-full rounded-full bg-[#111] px-2 py-2 text-sm font-semibold text-white transition-all hover:bg-[#333]">
                      Saznaj više
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[min(92vw,800px)] max-w-[800px] overflow-hidden rounded-2xl border-none bg-white p-0 shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                    <DialogTitle className="sr-only">
                      {`Saznaj više o ${product.productName}`}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      {product.productName}
                    </DialogDescription>
                    <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
                      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur-xl">
                        <h3 className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
                          {product.productName}
                        </h3>
                      </div>
                      <div className="px-6 py-6">
                        {Array.isArray(product.subCategory.modalText) &&
                        product.subCategory.modalText.length > 0 ? (
                          <StrapiBlocks
                            className="prose prose-base max-w-none text-gray-600"
                            content={product.subCategory.modalText}
                          />
                        ) : (
                          <p className="text-gray-600">No content available.</p>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Link
                  href={productLink}
                  className="h-fit w-full rounded-full bg-[#111] px-2 py-2 text-sm font-semibold text-white transition-all hover:bg-[#333]"
                >
                  Saznaj više
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LineupSectionProps {
  lineup: LineupItem;
}

function LineupSection({ lineup }: LineupSectionProps) {
  if (!lineup.products || lineup.products.length === 0) {
    return null;
  }

  const productCount = lineup.products.length;
  // On desktop, only enable drag if 4+ items. On mobile, always enable
  const dragFreeOnDesktop = productCount >= 4;

  return (
    <section className="mb-2 ml-10 w-full py-8 md:ml-0 md:py-8">
      {/* Lineup Header */}
      <div className="mb-8 text-left md:mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
          {lineup.lineupName}
        </h2>
        {lineup.description && (
          <div className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            {lineup.description}
          </div>
        )}
      </div>

      {/* Products Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: false,
          slidesToScroll: 1,
          containScroll: 'trimSnaps',
          dragFree: true,
          breakpoints: {
            '(min-width: 768px)': {
              dragFree: dragFreeOnDesktop,
            },
          },
        }}
        className="mx-auto w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-0">
          {lineup.products.map((product, index) => (
            <CarouselItem
              key={product.id}
              className="basis-[85%] pl-4 sm:basis-[60%] md:basis-1/3 lg:basis-[25%]"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default function Lineups({ lineups, categorySlug }: LineupsProps) {
  if (!lineups || lineups.length === 0) {
    return null;
  }

  return (
    <div className="mb-2">
      {lineups.map((lineup) => (
        <LineupSection key={lineup.id} lineup={lineup} />
      ))}
    </div>
  );
}
