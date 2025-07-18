'use client';

import { useEffect, useState } from 'react';

import { Heart, MapPin, RotateCcw, Share2, Shield, Truck } from 'lucide-react';

import Buttons from './buttons';
import ImagesSlider from './images-slider';
import NamePrice from './name-price';
import Options from './options';
import { ProductDetailsPopup } from '@/components/popup';
import { StrapiImage } from '@/components';
import { useProductVariants } from '@/app/providers/product-variants-provider';
import { useRouter } from 'next/navigation';
import { STRAPI_BASE_URL, GOOGLE_MAPS_LOCATIONS } from '@/lib/constants';
import { AboutPageResponse } from '@/app/[locale]/(static-pages)/about/types';
import { fetchAPI } from '@/lib/fetch-api';

export default function ProductDetails() {
  const { productOptions, selectedVariant } = useProductVariants();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

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

  console.log(stores);

  const finalPrice = discountedPrice ?? originalPrice;
  const image = selectedVariant.images?.[0] || null;

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:h-full">
        {/* Left side - Fixed Images (40% width, non-scrollable) */}
        <div className="sticky top-0 h-full w-1/2 overflow-hidden">
          <div className="flex h-fit flex-col">
            <ImagesSlider className="h-fit" images={images} tag={tag} />
          </div>
          {details && (
            <div className="mb-8 h-full md:mt-10">
              <div className="mb-6 h-fit w-full bg-grey-light"></div>
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
        <div className="h-full w-1/2 overflow-y-scroll">
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
              <span className="text-sm font-medium text-black">
                Besplatno preuzimanje u poslovnici
              </span>
              <button
                className="mt-3 flex items-center gap-2 border-b border-grey-light pb-1 text-blue transition-colors hover:text-grey-dark"
                onClick={() => setSidebarOpen(true)}
              >
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium text-blue">
                  Pogledajte dostupnost u poslovnicama
                </span>
              </button>
            </div>

            {/* Delivery and Payment Info - Always visible, grey background */}
            <div className="mb-8 space-y-6 rounded-xl bg-grey-almost-white p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dostava i garancija</h3>
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-dark" />
                  <div>
                    <p className="font-medium text-blue">
                      Dostupno za 24-48 sati
                    </p>
                    <p className="text-sm text-grey-dark">
                      Besplatna dostava za narudžbe preko 400 KM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-dark" />
                  <div>
                    <p className="font-medium text-blue">1 godine garancije</p>
                    <p className="text-sm text-grey-dark">
                      Garancija dostupna na sve proizvode. Na iPhone uređaje 2
                      godine garancije
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pb-8 pt-8">
              <details className="group">
                <summary className="group flex cursor-pointer list-none items-center justify-between text-lg font-medium">
                  <span>Načini plaćanja</span>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    ⌃
                  </span>
                </summary>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    Nudimo raznovrsne metode za jednostavnu i prilagođenu
                    kupovinu.
                  </p>
                  <p className="text-sm text-grey-dark">
                    <strong>Jednokratna plaćanja:</strong> Maestro, American
                    Express, Diners, Discover, Visa, MasterCard.
                  </p>
                  <p className="text-sm text-grey-dark">
                    <strong>Plaćanje na rate:</strong> Do 12 rata (Intesa, NLB,
                    Diners, Amex), do 24 rate (UniCredit, Raiffeisen), do 36
                    rata (ProCredit Bank).
                  </p>
                  <p className="text-sm text-grey-dark">
                    <strong>Dodatne opcije:</strong> Virman/internet bankarstvo,
                    pouzećem.
                  </p>
                  <p className="text-sm text-grey-dark">
                    <strong>Online plaćanja:</strong> Kartice MasterCard,
                    Maestro, Visa, rate putem UniCredit banke.
                  </p>
                  <p className="text-sm text-grey-dark">
                    <strong>Kreditiranje Mikrofina:</strong> Online zahtjev za
                    brzi kredit bez odlaska u poslovnicu.
                  </p>
                  <p className="text-sm text-grey-dark">
                    <strong>Kontakt:</strong> at@atstore.ba / +387 33 956 188
                  </p>
                </div>
              </details>
            </div>

            <div className="border-t border-gray-200 pb-8 pt-8">
              <details className="group">
                <summary className="group flex cursor-pointer list-none items-center justify-between text-lg font-medium">
                  <span>Povrat i reklamacija</span>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    ⌃
                  </span>
                </summary>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    -Ukoliko niste zadovoljni proizvodom, imate pravo na povrat
                    ili zamjenu u roku od 7 dana od dana prijema.
                  </p>
                  <p>
                    -Proizvod mora biti nekorišten, neoštećen i u originalnom
                    pakovanju.
                  </p>
                  <p>
                    -Za pokretanje postupka povrata kontaktirajte nas putem
                    emaila ili telefona navedenog na stranici za kontakt.
                  </p>
                  <p>
                    -Reklamacije se rješavaju u najkraćem mogućem roku, najčešće
                    unutar 7 radnih dana.
                  </p>
                </div>
              </details>
            </div>
            <div className="border-t border-gray-200 pb-8 pt-8">
              <details className="group">
                <summary className="group flex cursor-pointer list-none items-center justify-between text-lg font-medium">
                  <span>Mikrofin finansiranje</span>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    ⌃
                  </span>
                </summary>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    -Koristite kredit kompanije Mikrofin. Nema potrebe da više
                    gubite vrijeme na dolazak u poslovnice.
                  </p>
                  <p>
                    - Informišite se o našim proizvodima putem web stranice, a
                    zatim podnesite online zahtjev za kredit.
                  </p>
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
        <div className="flex flex-col items-start gap-6">
          {/* Options and Buy Now */}
          <div className="flex w-full flex-col gap-14">
            <Options finalPrice={finalPrice} options={productOptions} />
            <Buttons product={selectedVariant} />
          </div>

          {/* Find More Stores */}
          <div className="w-full">
            <span className="text-sm font-medium text-black">
              Besplatno preuzimanje u poslovnici
            </span>
            <button
              className="mt-2 flex items-center gap-2 border-b border-grey-light pb-1 text-blue transition-colors hover:text-grey-dark"
              onClick={() => setSidebarOpen(true)}
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium text-blue">
                Pogledajte dostupnost u poslovnicama
              </span>
            </button>
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
          {/* Delivery Information */}
          <div className="rounded-lg bg-grey-almost-white p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Besplatna dostava i povrat
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-dark" />
                <div>
                  <p className="font-medium text-blue">
                    Dostupno za 24-48 sati
                  </p>
                  <p className="text-sm text-grey-dark">
                    Besplatna dostava za narudžbe preko 400 KM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-grey-dark" />
                <div>
                  <p className="font-medium text-green">1 godine garancije</p>
                  <p className="text-sm text-grey-dark">
                    Garancija dostupna na sve proizvode. Na iPhone uređaje 2
                    godine garancije
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-lg bg-grey-almost-white p-6">
            <h3 className="text-lg font-semibold">Načini plaćanja</h3>
            <p className="text-sm text-grey-dark">
              Nudimo raznovrsne metode za jednostavnu i prilagođenu kupovinu.
            </p>
            <p className="text-sm text-grey-dark">
              <strong>Jednokratna plaćanja:</strong> Maestro, American Express,
              Diners, Discover, Visa, MasterCard.
            </p>
            <p className="text-sm text-grey-dark">
              <strong>Plaćanje na rate:</strong> Do 12 rata (Intesa, NLB,
              Diners, Amex), do 24 rate (UniCredit, Raiffeisen), do 36 rata
              (ProCredit Bank).
            </p>
            <p className="text-sm text-grey-dark">
              <strong>Dodatne opcije:</strong> Virman/internet bankarstvo,
              pouzećem.
            </p>
            <p className="text-sm text-grey-dark">
              <strong>Online plaćanja:</strong> Kartice MasterCard, Maestro,
              Visa, rate putem UniCredit banke.
            </p>
            <p className="text-sm text-grey-dark">
              <strong>Kreditiranje Mikrofina:</strong> Online zahtjev za brzi
              kredit bez odlaska u poslovnicu.
            </p>
            <p className="text-sm text-grey-dark">
              <strong>Kontakt:</strong> at@atstore.ba / +387 33 956 188
            </p>
          </div>

          <div className="space-y-3 rounded-lg bg-grey-almost-white p-6">
            <h3 className="text-lg font-semibold">Povrat i reklamacija</h3>
            <p className="text-sm text-grey-dark">
              -Ukoliko niste zadovoljni proizvodom, imate pravo na povrat ili
              zamjenu u roku od 7 dana od dana prijema.
            </p>
            <p className="text-sm text-grey-dark">
              -Proizvod mora biti nekorišten, neoštećen i u originalnom
              pakovanju.
            </p>
            <p className="text-sm text-grey-dark">
              -Za pokretanje postupka povrata kontaktirajte nas putem emaila ili
              telefona navedenog na stranici za kontakt.
            </p>
            <p className="text-sm text-grey-dark">
              -Reklamacije se rješavaju u najkraćem mogućem roku, najčešće
              unutar 7 radnih dana.
            </p>
          </div>

          <div className="space-y-3 rounded-lg bg-grey-almost-white p-6">
            <h3 className="text-lg font-semibold">Mikrofin finansiranje</h3>
            <p className="text-sm text-grey-dark">
              -Koristite kredit kompanije Mikrofin. Nema potrebe da više gubite
              vrijeme na dolazak u poslovnice.
            </p>
            <p className="text-sm text-grey-dark">
              - Informišite se o našim proizvodima putem web stranice, a zatim
              podnesite online zahtjev za kredit.
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar overlay for store availability */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[1000] flex">
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar panel (desktop and mobile identical) */}
          <aside className="fixed right-0 top-0 z-[1000] flex h-screen w-full max-w-md flex-col overflow-y-auto bg-white shadow-lg transition-transform duration-300">
            {/* Sticky close button */}
            <div className="sticky top-0 z-10 flex justify-end border-b border-gray-100 bg-white p-4">
              <button
                aria-label="Zatvori"
                className="text-2xl text-gray-600"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="flex flex-1 flex-col p-6 pt-2">
              {/* Header */}
              <h2 className="mb-4 text-2xl font-bold">
                Dostupnost u poslovnicama
              </h2>
              {/* Product info */}
              {image && (
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg">
                    <StrapiImage
                      alt={image.alternativeText || name}
                      className="object-cover"
                      height={64}
                      src={image.url}
                      width={64}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-sm">
                      Boja: {selectedVariant.color?.name}
                    </p>
                    <p className="text-sm">
                      Model: {selectedVariant.model?.name}
                    </p>
                    <p className="text-sm">
                      Storage: {selectedVariant.memory?.name}
                    </p>
                  </div>
                </div>
              )}
              <hr className="mb-4" />
              {/* Results count */}
              <p className="mb-4 text-sm text-gray-600">
                {stores.filter((storeItem) => storeItem.quantity > 0).length}{' '}
                rezultata
              </p>
              {/* Store list */}
              <div className="scrollbar-hide space-y-6 overflow-y-auto pr-2">
                {stores
                  // Only include relevant stores (Alta, SCC, Delta) and those with quantity > 0
                  .filter((storeItem) => {
                    const name = storeItem.store.name;
                    return (
                      (name === 'AT Store (ALTA)' ||
                        name === 'AT Store (SCC)' ||
                        name === 'AT Store (DELTA)') &&
                      storeItem.quantity > 0
                    );
                  })
                  // Only map over stores with quantity > 0
                  .filter((storeItem) => storeItem.quantity > 0)
                  .map((storeItem) => {
                    let location = null;
                    // Map store name to correct GOOGLE_MAPS_LOCATIONS key
                    if (storeItem.store.name === 'AT Store (ALTA)') {
                      location = GOOGLE_MAPS_LOCATIONS.SARAJEVO_ALTA;
                    } else if (storeItem.store.name === 'AT Store (SCC)') {
                      location = GOOGLE_MAPS_LOCATIONS.SARAJEVO_SCC;
                    } else if (storeItem.store.name === 'AT Store (DELTA)') {
                      location = GOOGLE_MAPS_LOCATIONS.BANJA_LUKA_DELTA;
                    }
                    return (
                      <div
                        key={storeItem.id}
                        className="flex flex-col rounded-xl border border-gray-200 bg-white p-4"
                      >
                        <h4 className="mb-2 text-lg font-semibold">
                          {location?.storeName || storeItem.store.name}
                        </h4>
                        {location?.storeAddress && (
                          <p className="mb-2 text-sm text-gray-700">
                            {location.storeAddress}
                          </p>
                        )}
                        <p className={`mt-1 text-xs text-[#22c55e]`}>
                          {`Stanje: ${storeItem.quantity}`}
                        </p>
                        {location?.embedUrl && (
                          <div className="mt-3 flex flex-1 flex-col">
                            <iframe
                              className="w-full rounded-md"
                              height="200"
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              src={location.embedUrl}
                              width="100%"
                            ></iframe>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Sticky Bottom Banner - Always visible on desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-[999] hidden border-t border-grey-light bg-white shadow-lg lg:block">
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
          <div className="mb-8">
            <span className="text-sm font-medium text-black">
              Besplatno preuzimanje u poslovnici
            </span>
            <button
              className="mt-3 flex items-center gap-2 border-b border-grey-light pb-1 text-blue transition-colors hover:text-grey-dark"
              onClick={() => setSidebarOpen(true)}
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium text-blue">
                Pogledajte dostupnost u poslovnicama
              </span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Buttons isModal={true} product={selectedVariant} />
          </div>
        </div>
      </div>
    </>
  );
}
