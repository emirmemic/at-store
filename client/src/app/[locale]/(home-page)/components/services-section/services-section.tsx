'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    id: 'personal-pickup',
    title: 'Lično preuzimanje.',
    description:
      'Svoju narudžbu možeš jednostavno preuzeti u najbližoj AT Store poslovnici – brzo, sigurno i bez dodatnih troškova.',
    details: 'Preuzmi gdje ti najviše odgovara i uštedi vrijeme.',
    image: '/assets/images/services/2image.webp',
    badge: null,
    href: '/find-store',
  },
  {
    id: 'visit-us',
    title: 'Posjeti nas',
    description:
      'Posjeti naše poslovnice i testiraj najnovije Apple proizvode uz stručnu pomoć i ekskluzivne ponude.',
    details: 'Doživi Apple iskustvo uživo u najbližem AT Storeu.',
    image: '/assets/images/services/1image.webp',
    badge: null,
    href: '/find-store',
  },
  {
    id: 'apple-experts',
    title: 'Stručno osoblje',
    description:
      'Naš tim stručnjaka stoji ti na raspolaganju za sva pitanja – od postavljanja uređaja do migracije podataka.',
    details: 'Uvijek spremni da ti pomognemo, brzo i profesionalno.',
    image: '/assets/images/services/4image.webp',
    badge: null,
    href: '/support',
  },
  {
    id: 'service',
    title: 'Podrška',
    description:
      'Ako imaš softverski problem na uređaju, plaćanjem na App Store-u ili blokiranim Apple ID-jem, naš tim podrške će ga riješiti.',
    details: 'Pouzdana podrška za sve Apple proizvode.',
    image: '/assets/images/services/3image.webp',
    badge: null,
    href: '/support',
  },
  {
    id: 'tradein',
    title: 'Staro za novo',
    description: 'Zamijeni. Nadogradi. Uštedi. Ili recikliraj besplatno.',
    details:
      'Zamijeni svoj stari uređaj i preuzmi bilo koji naš proizvod po povoljnijoj cijeni!',
    image: '/assets/images/services/5image.webp',
    badge: null,
    href: '/trade-in',
  },
];

export default function ServicesSection() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [showPrevNext, setShowPrevNext] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (api) {
        if (api.canScrollNext() || api.canScrollPrev()) {
          setShowPrevNext(true);
        } else {
          setShowPrevNext(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [api]);

  return (
    <section className="w-full py-12 md:py-16">
      <div className="px-4 container-max-width-xl md:px-6">
        <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight text-neutral-900 md:mb-12 md:text-4xl lg:text-5xl">
          Usluge koje nudimo u našim poslovnicama
        </h2>

        <Carousel
          opts={{
            loop: true,
            align: 'start',
          }}
          setApi={setApi}
        >
          <CarouselContent className="-ml-4 md:-ml-5">
            {services.map((service) => (
              <CarouselItem
                key={service.id}
                className="basis-1/2 pl-4 md:basis-1/2 md:pl-5 lg:basis-1/4"
              >
                <ServiceCard service={service} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {showPrevNext && (
            <div className="flex justify-end gap-3 py-6">
              <CarouselPrevious
                className="static translate-x-0 translate-y-0 rounded-full border-0 bg-neutral-100 hover:bg-neutral-200"
                size="lg"
                variant="black"
              />
              <CarouselNext
                className="static translate-x-0 translate-y-0 rounded-full border-0 bg-neutral-100 hover:bg-neutral-200"
                size="lg"
                variant="black"
              />
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
}: {
  service: {
    id: string;
    title: string;
    description: string;
    details: string;
    image: string;
    badge: string | null;
    href: string;
  };
}) {
  return (
    <Link
      href={service.href}
      className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:border-neutral-300 hover:shadow-md md:min-h-[430px]"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full flex-shrink-0 overflow-hidden bg-neutral-50 md:h-52">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 840px) 50vw, (max-width: 1200px) 50vw, 25vw"
        />
        {service.badge && (
          <div className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
            {service.badge}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold leading-snug text-neutral-900 md:text-xl">
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
            {service.description}
          </p>
        </div>
        <p className="text-xs leading-relaxed text-neutral-500 md:text-sm">
          {service.details}
        </p>
      </div>
    </Link>
  );
}
