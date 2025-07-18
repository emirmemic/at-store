'use client';

import { Heart, MapPin, RotateCcw, Share2, Shield, Truck } from 'lucide-react';

import Buttons from './buttons';
import ImagesSlider from './images-slider';
import NamePrice from './name-price';
import Options from './options';
import { ProductDetailsPopup } from '@/components/popup';
import { StrapiImage } from '@/components';
import { useProductVariants } from '@/app/providers/product-variants-provider';
import { useRouter } from 'next/navigation';

export default function ProductDetails() {
  const { productOptions, selectedVariant } = useProductVariants();
  const router = useRouter();

  const {
    details,
    name,
    originalPrice,
    discountedPrice,
    stores,
    tag,
    images,
    productVariantId,
  } = selectedVariant;

  const finalPrice = discountedPrice ?? originalPrice;
  const image = selectedVariant.images?.[0] || null;

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:h-screen">
        {/* Left side - Fixed Images (40% width, non-scrollable) */}
        <div className="h-full w-1/2 overflow-hidden">
          <div className="flex h-fit flex-col">
            <ImagesSlider className="h-fit" images={images} tag={tag} />
          </div>
          {details && (
            <div className="mb-8 md:mt-10">
              <div className="mb-6 h-0.5 w-full bg-grey-light"></div>
              <ProductDetailsPopup
                className=""
                details={details}
                finalPrice={finalPrice}
                image={image}
                name={name}
              />
            </div>
          )}
        </div>

        {/* Right side - Scrollable Content (60% width) */}
        <div className="h-full w-1/2 overflow-y-auto">
          <div className="p-8 pb-32">
            {/* Product Header */}
            <div className="mb-8">
              <NamePrice
                discountedPrice={discountedPrice}
                name={name}
                originalPrice={originalPrice}
                productVariantId={productVariantId}
              />

              {/* Action buttons */}
              <div className="mt-4 flex items-center gap-4">
                <button
                  className="flex items-center gap-2 text-grey-dark transition-colors hover:text-black"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                >
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">Podijeli</span>
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="mb-8">
              <Options finalPrice={finalPrice} options={productOptions} />
            </div>

            {/* Buy Now Button */}
            <div className="mb-8">
              <Buttons product={selectedVariant} />
            </div>

            {/* Find More Stores */}
            <div className="mb-8">
              <button
                className="flex items-center gap-2 border-b border-grey-light pb-1 text-black transition-colors hover:text-grey-dark"
                onClick={() => {
                  router.push('/find-store');
                }}
              >
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Pronađi više prodavnica
                </span>
              </button>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">
                  Dostupno u sljedećim poslovnicama:
                </p>
                <ul className="list-disc pl-5 text-sm">
                  {stores
                    .filter((storeItem) => storeItem.quantity > 0)
                    .map((storeItem) => (
                      <li key={storeItem.id} className="text-[#22c55e]">
                        {storeItem.store.name}
                      </li>
                    ))}
                  {stores
                    .filter((storeItem) => storeItem.quantity === 0)
                    .map((storeItem) => (
                      <li
                        key={storeItem.id}
                        className="text-[#ef4444] line-through"
                      >
                        {storeItem.store.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mb-8 overflow-hidden rounded-xl border border-grey-light shadow-sm">
              <details className="group transition-all duration-300 [&[open]]:bg-grey-almost-white">
                <summary className="flex cursor-pointer select-none items-center justify-between px-6 py-5 text-lg font-semibold transition-colors hover:bg-grey-light">
                  <span>Besplatna dostava i povrat</span>
                  <span className="transition-transform group-open:rotate-180">
                    ⌄
                  </span>
                </summary>
                <div className="mt-3 space-y-4 px-6 pb-6 pt-0">
                  <div className="flex items-start gap-3">
                    <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-dark" />
                    <div>
                      <p className="font-medium">Dostupno za 2-3 dana</p>
                      <p className="text-sm text-grey-dark">
                        Besplatna standardna dostava uz članstvo
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-dark" />
                    <div>
                      <p className="font-medium">Besplatan povrat</p>
                      <p className="text-sm text-grey-dark">
                        Možete vratiti narudžbu besplatno, u roku od 30 dana
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-dark" />
                    <div>
                      <p className="font-medium">2 godine garancije</p>
                      <p className="text-sm text-grey-dark">
                        Garancija dostupna na sve proizvode
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              <details className="group border-t border-grey-light transition-all duration-300 [&[open]]:bg-grey-almost-white">
                <summary className="flex cursor-pointer select-none items-center justify-between px-6 py-5 text-lg font-semibold transition-colors hover:bg-grey-light">
                  <span>Načini plaćanja</span>
                  <span className="transition-transform group-open:rotate-180">
                    ⌄
                  </span>
                </summary>
                <div className="mt-3 space-y-2 px-6 pb-6 pt-0 text-sm text-grey-dark">
                  <p>- Gotovinsko plaćanje prilikom preuzimanja</p>
                  <p>
                    - Online Plaćanje karticama putem Monri servisa (Visa,
                    MasterCard)
                  </p>
                  <p>- Mikrofin kreditiranje</p>
                </div>
              </details>
            </div>

            {/* Leave a Review Section */}
            {/* <div className="mb-8">
              <div className="mb-6 h-0.5 w-full bg-grey-light"></div>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">
                    Customer Reviews
                  </h3>


                  <div className="mb-6 rounded-lg bg-grey-almost-white p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold">
                        4.5 out of 5
                      </span>
                    </div>
                    <p className="text-sm text-grey-dark">
                      Based on 127 reviews
                    </p>
                  </div>


                  <button className="mb-6 w-full rounded-lg border border-black bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-black hover:text-white">
                    Write a Review
                  </button>


                  <div className="space-y-4">
                    <div className="border-b border-grey-light pb-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">John D.</span>
                        <span className="text-sm text-grey-dark">
                          • 2 days ago
                        </span>
                      </div>
                      <p className="text-sm text-grey-dark">
                        Great quality and fast delivery. Exactly as described!
                      </p>
                    </div>

                    <div className="border-b border-grey-light pb-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <Star className="h-4 w-4 text-grey-light" />
                        </div>
                        <span className="text-sm font-medium">Sarah M.</span>
                        <span className="text-sm text-grey-dark">
                          • 1 week ago
                        </span>
                      </div>
                      <p className="text-sm text-grey-dark">
                        Good product, but shipping took longer than expected.
                      </p>
                    </div>

                    <button className="border-b border-grey-light pb-1 text-sm text-black transition-colors hover:text-grey-dark">
                      View all reviews
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col gap-8 lg:hidden">
        {/* 1. ImagesSlider at the top */}
        <ImagesSlider images={images} tag={tag} />

        {/* 2. NamePrice and Action buttons */}
        <div className="flex flex-col gap-5">
          <NamePrice
            discountedPrice={discountedPrice}
            name={name}
            originalPrice={originalPrice}
            productVariantId={productVariantId}
          />
          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-grey-dark transition-colors hover:text-black">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Omiljeno</span>
            </button>
            <button
              className="flex items-center gap-2 text-grey-dark transition-colors hover:text-black"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <Share2 className="h-5 w-5" />
              <span className="text-sm">Podijeli</span>
            </button>
          </div>
        </div>

        {/* 3. Options, Buttons, Store Availability, Delivery Info, Details */}
        <div className="flex flex-col items-start gap-12">
          {/* Options and Buy Now */}
          <div className="flex w-full flex-col gap-14">
            <Options finalPrice={finalPrice} options={productOptions} />
            <Buttons product={selectedVariant} />
          </div>

          {/* Find More Stores */}
          <div className="w-full">
            <button
              className="flex items-center gap-2 border-b border-grey-light pb-1 text-black transition-colors hover:text-grey-dark"
              onClick={() => {
                router.push('/find-store');
              }}
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">
                Pronađi više prodavnica
              </span>
            </button>
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">
                Dostupno u sljedećim poslovnicama:
              </p>
              <ul className="list-disc pl-5 text-sm">
                {stores
                  .filter((storeItem) => storeItem.quantity > 0)
                  .map((storeItem) => (
                    <li key={storeItem.id} className="text-[#22c55e]">
                      {storeItem.store.name}
                    </li>
                  ))}
                {stores
                  .filter((storeItem) => storeItem.quantity === 0)
                  .map((storeItem) => (
                    <li
                      key={storeItem.id}
                      className="text-[#ef4444] line-through"
                    >
                      {storeItem.store.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="rounded-lg bg-grey-almost-white p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Besplatna dostava i povrat
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-dark" />
                <div>
                  <p className="font-medium">Dostupno za 2-3 dana</p>
                  <p className="text-sm text-grey-dark">
                    Besplatna standardna dostava uz članstvo
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-dark" />
                <div>
                  <p className="font-medium">Besplatan povrat</p>
                  <p className="text-sm text-grey-dark">
                    Možete vratiti narudžbu besplatno, u roku od 30 dana
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-dark" />
                <div>
                  <p className="font-medium">2 godine garancije</p>
                  <p className="text-sm text-grey-dark">
                    Garancija dostupna na sve proizvode
                  </p>
                </div>
              </div>
            </div>
          </div>

          {details && (
            <>
              <div className="h-0.5 w-full bg-grey-light"></div>
              <ProductDetailsPopup
                className=""
                details={details}
                finalPrice={finalPrice}
                image={image}
                name={name}
              />
            </>
          )}
        </div>
      </div>

      {/* Sticky Bottom Banner - Always visible on desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-50 hidden border-t border-grey-light bg-white shadow-lg lg:block">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-grey-almost-white">
              {image && (
                <div className="h-full w-full">
                  <StrapiImage
                    alt={image.alternativeText || name}
                    className="h-full w-full object-contain"
                    height={64}
                    sizes="64px"
                    src={image.url}
                    width={64}
                  />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-lg font-semibold">
                {finalPrice.toFixed(2)} KM
                {discountedPrice && originalPrice && (
                  <span className="ml-2 text-sm text-grey-dark line-through">
                    {originalPrice.toFixed(2)} KM
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Buttons isModal={true} product={selectedVariant} />
          </div>
        </div>
      </div>
    </>
  );
}
