'use client';

import { ChevronDown, MapPin, Share2, Shield, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';

import Buttons from './buttons';
import { GOOGLE_MAPS_LOCATIONS } from '@/lib/constants';
import ImagesSlider from './images-slider';
import Link from 'next/link';
import NamePrice from './name-price';
import Options from './options';
import { ProductDetailsPopup } from '@/components/popup';
import { StrapiImage } from '@/components';
import { useProductVariants } from '@/app/providers/product-variants-provider';

export default function ProductDetails() {
  const { productOptions, selectedVariant } = useProductVariants();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visibleMaps, setVisibleMaps] = useState(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStickyBanner, setShowStickyBanner] = useState(false);
  const [renderStickyBanner, setRenderStickyBanner] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(
    new Set(['preuzimanje'])
  );
  const shouldDisplayPreOrder = false;

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pogledaj ovo!',
          text: '',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Greška pri dijeljenju:', err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link je kopiran u clipboard jer dijeljenje nije podržano.');
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = '';
      if (isAnimating) {
        // Allow animation to complete before removing animating state
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen, isAnimating]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBanner(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showStickyBanner) {
      setRenderStickyBanner(true);
      return;
    }

    const timeout = setTimeout(() => setRenderStickyBanner(false), 300);
    return () => clearTimeout(timeout);
  }, [showStickyBanner]);

  const toggleMap = (storeId: number) => {
    const newVisibleMaps = new Set(visibleMaps);
    if (newVisibleMaps.has(storeId)) {
      newVisibleMaps.delete(storeId);
    } else {
      newVisibleMaps.add(storeId);
    }
    setVisibleMaps(newVisibleMaps);
  };

  const openSidebar = () => {
    setIsAnimating(true);
    // Use requestAnimationFrame to ensure the sidebar is rendered before animating
    requestAnimationFrame(() => {
      setSidebarOpen(true);
    });
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const {
    details,
    name,
    originalPrice,
    displayName,
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
      <div className="hidden lg:flex lg:h-full">
        {/* Left side - Fixed Images (40% width, non-scrollable) */}
        <div className="sticky top-0 h-full w-1/2 overflow-hidden">
          <div className="flex h-fit flex-col">
            <ImagesSlider className="h-fit" images={images} tag={tag} />
          </div>
          {details && (
            <div className="mb-8 h-full md:mt-10">
              <div className="mb-6 h-fit w-full"></div>
              <ProductDetailsPopup
                className=""
                shouldDisplayPreOrder={shouldDisplayPreOrder}
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
          <div className="mt-4 flex items-center gap-4 px-8">
            <button
              className="flex items-center gap-2 text-grey-dark transition-colors hover:text-black"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
              <span className="text-sm">Podijeli</span>
            </button>
          </div>
          <div className="p-8 pb-32">
            {/* Product Header */}
            <div className="mb-8">
              <NamePrice
                discountedPrice={discountedPrice}
                name={displayName}
                shouldDisplayPreOrder={shouldDisplayPreOrder}
                originalPrice={originalPrice}
                productVariantId={productVariantId}
              />
            </div>

            {/* Options */}
            <div className="mb-8">
              <Options finalPrice={finalPrice} options={productOptions} />
            </div>

            {/* Buy Now Button */}
            <div className="mb-8">
              <Buttons
                product={selectedVariant}
                shouldDisplayPreOrder={shouldDisplayPreOrder}
              />
            </div>

            {/* Find More Stores  - DESKTOP */}
            <div className="mb-8">
              <span className="text-md font-bold text-black">
                Besplatno preuzimanje u poslovnici
              </span>
              {!shouldDisplayPreOrder ? (
                <button
                  className="mt-3 flex items-center gap-2 pb-1 text-blue transition-all duration-200 hover:border-grey-dark hover:text-grey-dark"
                  onClick={openSidebar}
                >
                  <MapPin className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
                  <span className="text-md border-b border-grey-light font-medium text-blue">
                    Pogledajte dostupnost
                  </span>
                </button>
              ) : (
                <></>
              )}
            </div>

            {/* Delivery and Payment Info - Always visible, grey background */}
            <div className="mb-8 space-y-6 rounded-xl bg-grey-almost-white p-4">
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
            {/* Nacini placanja */}
            <div className="border-t border-gray-200/60 py-2">
              <button
                onClick={() => toggleAccordion('preuzimanje')}
                className="group flex w-full cursor-pointer items-center justify-between py-4 text-left transition-all duration-300 hover:opacity-80"
              >
                <span className="text-[17px] font-semibold text-gray-900">
                  Preuzimanje
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-all duration-500 ease-out ${
                    openAccordions.has('preuzimanje')
                      ? 'rotate-180 text-blue'
                      : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openAccordions.has('preuzimanje')
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 pb-4 pr-8 text-[15px] leading-relaxed text-gray-600">
                  <p>
                    Pri checkoutu odaberite besplatnu dostavu na kućnu adresu za
                    sve porudžbe preko 400 KM ili odaberite besplatno
                    preuzimanje u željenoj poslovnici.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200/60 py-2">
              <button
                onClick={() => toggleAccordion('nacini-placanja')}
                className="group flex w-full cursor-pointer items-center justify-between py-4 text-left transition-all duration-300 hover:opacity-80"
              >
                <span className="text-[17px] font-semibold text-gray-900">
                  Načini plaćanja
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-all duration-500 ease-out ${
                    openAccordions.has('nacini-placanja')
                      ? 'rotate-180 text-blue'
                      : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openAccordions.has('nacini-placanja')
                    ? 'max-h-[800px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 pb-4 pr-8 text-[15px] leading-relaxed text-gray-600">
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
                    <strong>Online plaćanje na rate:</strong> Online plaćanje na
                    rate moguće je samo ukoliko koristite UniCredit Shopping
                    Card i da je narudžba veća od 399 KM.
                  </p>
                  <p className="text-sm text-grey-dark">
                    <strong>Kreditiranje Mikrofina:</strong> Online zahtjev za
                    brzi kredit bez odlaska u poslovnicu.
                  </p>
                  <p className="text-sm text-grey-dark">
                    <strong>Kontakt:</strong> prodaja@atstore.ba / +387 33 956
                    188
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200/60 py-2">
              <button
                onClick={() => toggleAccordion('povrat-reklamacija')}
                className="group flex w-full cursor-pointer items-center justify-between py-4 text-left transition-all duration-300 hover:opacity-80"
              >
                <span className="text-[17px] font-semibold text-gray-900">
                  Povrat i reklamacija
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-all duration-500 ease-out ${
                    openAccordions.has('povrat-reklamacija')
                      ? 'rotate-180 text-blue'
                      : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openAccordions.has('povrat-reklamacija')
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 pb-4 pr-8 text-[15px] leading-relaxed text-gray-600">
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
              </div>
            </div>
            {/* STARO ZA NOVO */}
            <div className="border-t border-gray-200/60 py-2">
              <button
                onClick={() => toggleAccordion('trade-in')}
                className="group flex w-full cursor-pointer items-center justify-between py-4 text-left transition-all duration-300 hover:opacity-80"
              >
                <span className="text-[17px] font-semibold text-gray-900">
                  Trade-in u poslovnici
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-all duration-500 ease-out ${
                    openAccordions.has('trade-in')
                      ? 'rotate-180 text-blue'
                      : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openAccordions.has('trade-in')
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 pb-4 pr-8 text-[15px] leading-relaxed text-gray-600">
                  <p>
                    Zamijeni svoj stari uređaj i preuzmi bilo koji naš proizvod
                    po povoljnijoj cijeni!
                  </p>
                </div>
              </div>
            </div>
            {/* MIKROFIN FINANSIRANJE */}
            <div className="border-t border-gray-200/60 py-2">
              <button
                onClick={() => toggleAccordion('mikrofin')}
                className="group flex w-full cursor-pointer items-center justify-between py-4 text-left transition-all duration-300 hover:opacity-80"
              >
                <span className="text-[17px] font-semibold text-gray-900">
                  Mikrofin finansiranje
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-all duration-500 ease-out ${
                    openAccordions.has('mikrofin')
                      ? 'rotate-180 text-blue'
                      : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openAccordions.has('mikrofin')
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 pb-4 pr-8 text-[15px] leading-relaxed text-gray-600">
                  <p>
                    -Koristite kredit kompanije Mikrofin. Nema potrebe da više
                    gubite vrijeme na dolazak u poslovnice.
                  </p>
                  <p>
                    - Informišite se o našim proizvodima putem web stranice, a
                    zatim podnesite online zahtjev za kredit.
                    <span>
                      <Link
                        href="/mikrofin-invoice"
                        className="text-blue-600 hover:underline"
                      >
                        Saznaj više
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Layout: Info Block Always Visible */}
      <div className="flex flex-col gap-8 lg:hidden">
        {/* 1. ImagesSlider at the top */}
        <ImagesSlider images={images} tag={tag} />

        {/* 2. NamePrice and Action buttons */}
        <div className="flex flex-col gap-5">
          <NamePrice
            discountedPrice={discountedPrice}
            name={displayName}
            shouldDisplayPreOrder={shouldDisplayPreOrder}
            originalPrice={originalPrice}
            productVariantId={productVariantId}
          />
          {details && (
            <>
              <div className="h-0.5 w-full bg-grey-light"></div>
              <ProductDetailsPopup
                className=""
                details={details}
                shouldDisplayPreOrder={shouldDisplayPreOrder}
                finalPrice={finalPrice}
                image={image}
                name={name}
              />
            </>
          )}
          {/* Action buttons */}
          <div className="flex items-center gap-4">
            {/* <button className="flex items-center gap-2 text-grey-dark transition-colors hover:text-black">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Omiljeno</span>
            </button> */}

            <button
              className="flex items-center gap-2 text-grey-dark transition-colors hover:text-black"
              onClick={handleShare}
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
            <Buttons
              product={selectedVariant}
              shouldDisplayPreOrder={shouldDisplayPreOrder}
            />
          </div>

          {/* Find More Stores  - MOBILE*/}
          <div className="w-full">
            <span className="text-md px-2 font-medium text-black">
              Besplatno preuzimanje u poslovnici
            </span>
            {shouldDisplayPreOrder ? (
              <></>
            ) : (
              <button
                className="mt-2 flex items-center gap-2 px-2 pb-1 text-blue transition-all duration-200 hover:border-grey-dark hover:text-grey-dark"
                onClick={openSidebar}
              >
                <MapPin className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
                <span className="text-md border-b border-grey-light font-medium text-blue">
                  Pogledajte dostupnost
                </span>
              </button>
            )}
          </div>
          {/* Delivery and Payment Information Block: always visible, responsive */}
          <div className="flex w-full flex-col gap-6">
            <div className="rounded-lg bg-grey-almost-white p-6">
              <h3 className="mb-4 text-lg font-semibold">
                Dostava i garancija
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
                    <p className="font-medium text-blue">1 godine garancije</p>
                    <p className="text-sm text-grey-dark">
                      Garancija dostupna na sve proizvode. Na iPhone uređaje 2
                      godine garancije
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Dostava */}
            <div className="rounded-lg bg-grey-almost-white p-6">
              <button
                onClick={() => toggleAccordion('preuzimanje-mobile')}
                className="group flex w-full cursor-pointer items-center justify-between text-left transition-all duration-300 hover:opacity-80"
              >
                <span className="text-[17px] font-semibold text-gray-900">
                  Preuzimanje
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-all duration-500 ease-out ${
                    openAccordions.has('preuzimanje-mobile')
                      ? 'rotate-180 text-blue'
                      : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openAccordions.has('preuzimanje-mobile')
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 pt-4 text-[15px] leading-relaxed text-gray-600">
                  <p>
                    Pri checkoutu odaberite besplatnu dostavu na kućnu adresu za
                    sve porudžbe <strong>preko 400 KM</strong> ili odaberite
                    besplatno preuzimanje u željenoj poslovnici.
                  </p>
                </div>
              </div>
            </div>
            {/* Načini plaćanja */}
            <div className="rounded-lg bg-grey-almost-white p-6">
              <button
                onClick={() => toggleAccordion('nacini-placanja-mobile')}
                className="group flex w-full cursor-pointer items-center justify-between text-left transition-all duration-300 hover:opacity-80"
              >
                <span className="text-[17px] font-semibold text-gray-900">
                  Načini plaćanja
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-all duration-500 ease-out ${
                    openAccordions.has('nacini-placanja-mobile')
                      ? 'rotate-180 text-blue'
                      : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openAccordions.has('nacini-placanja-mobile')
                    ? 'max-h-[800px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 pt-4 text-[15px] leading-relaxed text-gray-600">
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
                    <strong>Kontakt:</strong> prodaja@atstore.ba / +387 33 956
                    188
                  </p>
                </div>
              </div>
            </div>
            {/* Povrat i reklamacija */}
            <div className="rounded-lg bg-grey-almost-white p-6">
              <button
                onClick={() => toggleAccordion('povrat-reklamacija-mobile')}
                className="group flex w-full cursor-pointer items-center justify-between text-left transition-all duration-300 hover:opacity-80"
              >
                <span className="text-[17px] font-semibold text-gray-900">
                  Povrat i reklamacija
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-all duration-500 ease-out ${
                    openAccordions.has('povrat-reklamacija-mobile')
                      ? 'rotate-180 text-blue'
                      : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openAccordions.has('povrat-reklamacija-mobile')
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 pt-4 text-[15px] leading-relaxed text-gray-600">
                  <p>
                    - Ukoliko niste zadovoljni proizvodom, imate pravo na povrat
                    ili zamjenu u roku od 7 dana od dana prijema.
                  </p>
                  <p>
                    - Proizvod mora biti nekorišten, neoštećen i u originalnom
                    pakovanju.
                  </p>
                  <p>
                    - Za pokretanje postupka povrata kontaktirajte nas putem
                    emaila ili telefona navedenog na stranici za kontakt.
                  </p>
                  <p>
                    - Reklamacije se rješavaju u najkraćem mogućem roku,
                    najčešće unutar 7 radnih dana.
                  </p>
                </div>
              </div>
            </div>
            {/* Trade-in u poslovnici */}
            <div className="rounded-lg bg-grey-almost-white p-6">
              <button
                onClick={() => toggleAccordion('trade-in-mobile')}
                className="group flex w-full cursor-pointer items-center justify-between text-left transition-all duration-300 hover:opacity-80"
              >
                <span className="text-[17px] font-semibold text-gray-900">
                  Trade-in u poslovnici
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-all duration-500 ease-out ${
                    openAccordions.has('trade-in-mobile')
                      ? 'rotate-180 text-blue'
                      : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openAccordions.has('trade-in-mobile')
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 pt-4 text-[15px] leading-relaxed text-gray-600">
                  <p>
                    Zamijeni svoj stari uređaj i preuzmi bilo koji naš proizvod
                    po povoljnijoj cijeni!
                  </p>
                </div>
              </div>
            </div>
            {/* Mikrofin finansiranje */}
            <div className="rounded-lg bg-grey-almost-white p-6">
              <button
                onClick={() => toggleAccordion('mikrofin-mobile')}
                className="group flex w-full cursor-pointer items-center justify-between text-left transition-all duration-300 hover:opacity-80"
              >
                <span className="text-[17px] font-semibold text-gray-900">
                  Mikrofin finansiranje
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-all duration-500 ease-out ${
                    openAccordions.has('mikrofin-mobile')
                      ? 'rotate-180 text-blue'
                      : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openAccordions.has('mikrofin-mobile')
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 pt-4 text-[15px] leading-relaxed text-gray-600">
                  <p>
                    -Koristite kredit kompanije Mikrofin. Nema potrebe da više
                    gubite vrijeme na dolazak u poslovnice.
                  </p>
                  <p>
                    - Informišite se o našim proizvodima putem web stranice, a
                    zatim podnesite online zahtjev za kredit.
                    <span>
                      <Link
                        href="/mikrofin-invoice"
                        className="text-blue-600 hover:underline"
                      >
                        Saznaj više
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar overlay for store availability */}
      {(sidebarOpen || isAnimating) && (
        <div className="fixed inset-0 z-[1000] flex">
          {/* Overlay backdrop with fade animation */}
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-out ${
              sidebarOpen ? 'opacity-50' : 'opacity-0'
            }`}
            onClick={closeSidebar}
          />

          {/* Sidebar panel with slide animation */}
          <aside
            className={`fixed right-0 top-0 z-[1000] flex h-screen w-full max-w-md transform flex-col overflow-hidden bg-white shadow-2xl transition-all duration-300 ease-out ${
              sidebarOpen
                ? 'translate-x-0 opacity-100'
                : 'translate-x-full opacity-0'
            }`}
          >
            {/* Sticky close button with fade-in delay */}
            <div
              className={`sticky top-0 z-10 flex justify-end border-b border-gray-100 bg-white p-4 transition-all delay-100 duration-300 ${
                sidebarOpen
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-2 opacity-0'
              }`}
            >
              <button
                aria-label="Zatvori"
                className="text-2xl text-gray-600 transition-all duration-200 hover:rotate-90 hover:scale-110 hover:text-gray-800"
                onClick={closeSidebar}
              >
                ✕
              </button>
            </div>

            {/* Sidebar content with staggered animation */}
            <div
              className={`duration-400 flex flex-1 flex-col overflow-y-auto p-6 pt-2 transition-all delay-150 ${
                sidebarOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              <h2 className="mb-4 text-2xl font-bold">
                Dostupnost u poslovnicama
              </h2>

              {image && (
                <div
                  className={`mb-4 flex items-center gap-4 transition-all delay-200 duration-500 ${
                    sidebarOpen
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-4 opacity-0'
                  }`}
                >
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

              <hr
                className={`delay-250 mb-4 transition-all duration-500 ${
                  sidebarOpen
                    ? 'scale-x-100 opacity-100'
                    : 'scale-x-0 opacity-0'
                }`}
              />

              <p
                className={`mb-4 text-sm text-gray-600 transition-all delay-300 duration-500 ${
                  sidebarOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-2 opacity-0'
                }`}
              >
                {stores.filter((storeItem) => storeItem.quantity > 0).length}{' '}
                rezultata
              </p>

              <div className="scrollbar-hide space-y-6 overflow-y-auto pr-2">
                {stores
                  .filter((storeItem) => {
                    const storeName = storeItem.store.name;
                    return (
                      [
                        'AT Store (ALTA)',
                        'AT Store (SCC)',
                        'AT Store (DELTA)',
                      ].includes(storeName) && storeItem.quantity > 0
                    );
                  })
                  .map((storeItem, index) => {
                    let location = null;
                    if (storeItem.store.name === 'AT Store (ALTA)')
                      location = GOOGLE_MAPS_LOCATIONS.SARAJEVO_ALTA;
                    else if (storeItem.store.name === 'AT Store (SCC)')
                      location = GOOGLE_MAPS_LOCATIONS.SARAJEVO_SCC;
                    else if (storeItem.store.name === 'AT Store (DELTA)')
                      location = GOOGLE_MAPS_LOCATIONS.BANJA_LUKA_DELTA;

                    const isMapVisible = visibleMaps.has(storeItem.id);
                    const quantity = storeItem.quantity;

                    return (
                      <div
                        key={storeItem.id}
                        className={`flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-500 hover:shadow-md ${
                          sidebarOpen
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-4 opacity-0'
                        }`}
                        style={{
                          transitionDelay: sidebarOpen
                            ? `${350 + index * 100}ms`
                            : '0ms',
                        }}
                      >
                        <h4 className="mb-2 text-lg font-semibold">
                          {location?.storeName || storeItem.store.name}
                        </h4>

                        {location?.storeAddress && (
                          <p className="mb-2 text-sm text-gray-700">
                            {location.storeAddress}
                          </p>
                        )}
                        {/* Phone number directly below name */}
                        {location?.storePhone && (
                          <p className="pb-2 text-sm text-grey-darker">
                            {location.storePhone}
                          </p>
                        )}

                        {/* Stock status */}
                        {quantity === 1 ? (
                          <span className="font-medium text-red-500">
                            Posljednji komad
                          </span>
                        ) : quantity > 1 ? (
                          <span className="font-medium text-blue-500">
                            Na stanju
                          </span>
                        ) : (
                          <span className="font-medium text-gray-500">
                            Nema na stanju
                          </span>
                        )}

                        {/* Clickable button to show/hide map */}
                        {location?.embedUrl && (
                          <button
                            className="mt-3 flex items-center justify-center gap-2 rounded-md border border-blue bg-white px-4 py-2 text-blue transition-all duration-200 hover:scale-[1.02] hover:bg-blue hover:text-white hover:shadow-md"
                            onClick={() => toggleMap(storeItem.id)}
                          >
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {isMapVisible ? 'Sakrij mapu' : 'Prikaži na mapi'}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-300 ${
                                isMapVisible ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        )}

                        {/* Animated map container */}
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isMapVisible
                              ? 'mt-3 max-h-[250px] opacity-100'
                              : 'mt-0 max-h-0 opacity-0'
                          }`}
                        >
                          {location?.embedUrl && (
                            <div className="flex flex-1 flex-col">
                              <iframe
                                className="w-full rounded-md border border-gray-200 transition-all duration-300 hover:shadow-sm"
                                height="200"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src={location.embedUrl}
                                title={`Map for ${location.storeName}`}
                                width="100%"
                              ></iframe>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Sticky Bottom Banner - appears after scrolling */}
      {renderStickyBanner && (
        <div className="pointer-events-none fixed inset-x-0 bottom-8 z-[999] hidden justify-center px-6 lg:flex">
          <div
            className={`pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-6 rounded-[32px] border border-white/20 bg-gradient-to-r from-white/60 via-white/35 to-white/60 px-8 py-5 shadow-[0_25px_80px_rgba(15,23,42,0.18)] ring-1 ring-white/30 backdrop-blur-3xl ${
              showStickyBanner
                ? 'duration-500 ease-out animate-in fade-in slide-in-from-bottom-5'
                : 'duration-300 ease-in animate-out fade-out slide-out-to-bottom-5'
            }`}
          >
            <div className="flex flex-1 items-center gap-5">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl shadow-[0_5px_15px_rgba(15,23,42,0.12)] backdrop-blur-3xl">
                {image && (
                  <StrapiImage
                    alt={image.alternativeText || name}
                    className="h-full w-full object-contain"
                    height={64}
                    sizes="64px"
                    src={image.url}
                    width={64}
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 break-words text-lg font-semibold text-black">
                  {name}
                </h3>
                {!shouldDisplayPreOrder && (
                  <p className="text-xl font-semibold text-black">
                    {finalPrice.toFixed(2)} KM
                    {discountedPrice && originalPrice && (
                      <span className="ml-2 text-sm text-grey-dark line-through">
                        {originalPrice.toFixed(2)} KM
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.05em] text-grey-dark">
                  Preuzimanje
                </span>
                <p className="text-sm font-medium text-black">
                  Besplatno preuzimanje u poslovnici
                </p>
                {!shouldDisplayPreOrder && (
                  <button
                    className="mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold text-blue transition-all duration-200"
                    onClick={openSidebar}
                  >
                    <MapPin className="h-4 w-4" />
                    Pogledajte dostupnost
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-1 justify-end">
              <Buttons
                isModal={true}
                product={selectedVariant}
                shouldDisplayPreOrder={shouldDisplayPreOrder}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
