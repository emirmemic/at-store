'use client';
// TODO Implement the section with product cards once the products are done
// TODO Add function to kupi Sada Button

import {
  atBusinessMac,
  iPadMiniAtBusiness,
  macBookAirEducationalDiscount,
} from '@/assets/images';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import EducationalDiscountForm from './components/form';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const t = useTranslations();
  const router = useRouter();
  const macItems = [
    {
      title: 'MacBook Air',
      subtitle: 'M4 čip',
      description:
        'Od 2.569 KM ili 118 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/mbam4.png',
      icon: '🎓',
      route:
        '/proizvodi/mac/mbam4-13/apple-mba-136-midnight-m4-10c-cpu-8c-gpu-16gb-256gb-cro-97647071?key=color',
    },
    {
      title: 'MacBook Pro',
      subtitle: 'M4 čip',
      description:
        'Od 4.169 KM ili 191 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/mbpm4.png',
      icon: '🎓',
      route:
        '/proizvodi/mac/mbpm4-14/apple-mbp-14-silver-m4-10c-m4-10c-gpu-16gb-512gb-zee-97647011?key=memory',
    },
    {
      title: 'MacBook Air M3',
      subtitle: 'Tanji. Brži. Efikasniji.',
      description:
        'Od 2.429 KM ili 111 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/mba.M3.png',
      icon: '🎓',
      route:
        '/proizvodi/macbook-air/mbam3-13/apple-mba-136-silver-m3-8c-gpu-16gb-256gb-cro-95024404?key=color',
    },
    {
      title: 'MacBook Pro M3',
      subtitle: 'Snaga za kreativce',
      description:
        'Od 3.829 KM ili 176 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/mbpm3.png',
      icon: '🎓',
      route:
        '/proizvodi/mac/mbpm3-14/apple-mbp-14-space-grey-m3-8c-10c-gpu-8gb-512gb-zee-95024364?key=memory',
    },
    {
      title: 'iMac 24"',
      subtitle: 'Savršen za rad od kuće ili učionicu.',
      description:
        'Od 3.329 KM ili 153 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/imac.png',
      icon: '🎓',
      route:
        '/proizvodi/mac/imc24-2024/apple-imac-24-silver-m4-8c-cpu-8c-gpu-16gb-256gb-cro-95024415?key=color',
    },
    {
      title: 'Mac Studio',
      subtitle: 'Napredna snaga. M4 Max.',
      description:
        'Od 5.199 KM ili 238 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/macstudio.png',
      icon: '🎓',
    },
    {
      title: 'Mac mini',
      subtitle: 'Kompaktan i moćan',
      description:
        'Od 1.619 KM ili 74 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/macmini.png',
      icon: '🎓',
      route:
        '/proizvodi/mac/MM-2024/apple-mac-mini-m4-10c-cpu-10c-gpu-16gb-256gb-roc-95024392',
    },
    {
      title: 'Studio Display',
      subtitle: 'Novo iskustvo',
      description:
        'Od 3.709 KM ili 170 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/studiodisplay.png',
      icon: '🎓',
      route:
        '/proizvodi/mac/STD/apple-studio-display-standard-glass-tilt-adjustable-stand-9507',
    },
  ];

  const ipadItems = [
    {
      title: 'iPad Air M3',
      subtitle: '11 inči',
      description: 'Od 1.539 KM ili 71 KM/mjesec. na 24 mjeseca.',
      image: '/assets/images/ipad_air_m3_11.png',
      icon: '',
      route:
        '/proizvodi/ipad/ipam3-11/apple-11-inch-ipad-air-m3-wi-fi-128gb-blue-97647118?key=color',
    },
    {
      title: 'iPad Air M3',
      subtitle: '13 inčni',
      description: 'Od 2.079 KM ili 95 KM/mjesec. na 24 mjeseca.',
      image: '/assets/images/ipad_air_m3_13.png',
      icon: '',
      route:
        '/proizvodi/ipad/IPAM3-13/apple-13-inch-ipad-air-m3-wi-fi-128gb-blue-97647058',
    },
    {
      title: 'iPad Pro M4',
      subtitle: '11 inčni',
      description: 'Od 2.669 KM ili 122 KM/mjesec. na 24 mjeseca.',
      image: '/assets/images/ipad_pro_m4_11.png',
      icon: '',
      route:
        '/proizvodi/ipad/ippm4-11/apple-11-inch-ipad-pro-m4-cellular-256gb-with-standard-glass-silver-91044?key=wifiModel',
    },
    {
      title: 'iPad Pro M4',
      subtitle: '13 inčni',
      description: 'Od 3.439 KM ili 158 KM/mjesec. na 24 mjeseca.',
      image: '/assets/images/ipad_pro_13.png',
      icon: '',
      route:
        '/proizvodi/ipad/ippm4-13/tablet-apple-13-inch-ipad-pro-m4-wifi-256gb-with-standard-glass-silver-95033?key=wifiModel',
    },
    {
      title: 'iPad',
      subtitle: '(A16)',
      description: 'Od 949 KM ili 71 KM/mjesec. na 24 mjeseca.',
      image: '/assets/images/ipad_a16.png',
      icon: '',
      route:
        '/proizvodi/ipad/ip11th25a16/apple-11-inch-ipad-a16-wi-fi-128gb-pink-97647050?key=color',
    },
    {
      title: 'iPad Mini',
      subtitle: 'A17 Pro',
      description: 'Od 1.339 KM ili 61 KM/mjesec. na 24 mjeseca.',
      image: '/assets/images/ipadmini.png',
      icon: '',
      route:
        '/proizvodi/ipad/ipm7th24/apple-ipad-mini-a17-pro-wi-fi-128gb-space-grey-95024380?key=color',
    },
    {
      title: 'iPad (10.gen)',
      subtitle: '10.9 inčni',
      description: 'Od 899 KM ili 41 KM/mjesec. na 24 mjeseca.',
      image: '/assets/images/ipad_10.png',
      icon: '',
      route:
        '/proizvodi/ipad/IP10TH22/tablet-apple-109-inch-ipad-10th-cellular-256gb-blue-91251',
    },
    {
      title: 'iPad (9. gen)',
      subtitle: '10.2 inčni',
      description: 'Od 699 KM ili 32 KM/mjesec. na 24 mjeseca.',
      image: '/assets/images/ipad_9.png',
      icon: '',
      route:
        '/proizvodi/ipad/IP9TH21/tablet-apple-102-inch-ipad-9-wi-fi-64gb-silver-5953',
    },
  ];

  const benefitsItems = [
    {
      icon: '🎓',
      title: 'Popust za studente',
      description:
        'Uživajte u posebnim cijenama na Mac uređaje uz dokaz o obrazovanju.',
      image: '/assets/images/popust-studenti.png',
      route: '/obrazovni-popust',
    },
    {
      icon: '💡',
      title: 'Podrška pri izboru uređaja',
      description:
        'Naše osoblje vam pomaže odabrati uređaj koji najbolje odgovara vašim potrebama.',
      image: '/assets/images/odabir.png',
      route: '/obrazovni-popust',
    },
    {
      icon: '📦',
      title: 'Brza isporuka',
      description:
        'Naručite online i dobijte uređaj na kućnu adresu u najkraćem roku.',
      image: '/assets/images/memoji.png',
      route: '/dostava',
    },
    {
      icon: '💳',
      title: 'Fleksibilno finansiranje',
      description: 'Prilagođene opcije finansiranja za vaše potrebe.',
      image: '/assets/images/card.png',
      route: '/nacini-placanja',
    },
    {
      icon: '🛍️',
      title: 'Ekskluzivne ponude',
      description: 'Iskoristi posebne akcije i popuste koje AT Store nudi.',
      image: '/assets/images/multi_offer.png',
      route: '/promo',
    },
    {
      icon: '🌍',
      title: 'Dostupnost širom BiH',
      description:
        'Bilo da si u Sarajevu, Mostaru, Banjoj Luci ili bilo gdje drugo — AT Store obrazovne pogodnosti su ti nadohvat ruke, online ili u poslovnicama.',
      image: '/assets/images/dostupnost.png',
      route: '/pronadi-store',
    },
    {
      icon: '📚',
      title: 'Prilagođeno obrazovanju',
      description:
        'Po potrebi je moguća instalacija obrazovnih programa koje pomažu u učenju, istraživanju i kreativnosti – savršeno za školu, fakultet ili online kurseve.',
      image: '/assets/images/mbp_edu.png',
      route: '/podrska',
    },
  ];
  const imgSection = [
    {
      title: t('educationalDiscountPage.item1.title'),
      description: t('educationalDiscountPage.item1.description'),
      name: 'Mac',
      image: atBusinessMac,
      id: 1,
    },
    {
      title: t('educationalDiscountPage.item2.title'),
      description: t('educationalDiscountPage.item2.description'),
      name: 'IPhone',
      image: macBookAirEducationalDiscount,
      id: 2,
    },
    {
      title: t('educationalDiscountPage.item3.title'),
      description: t('educationalDiscountPage.item3.description'),
      name: 'IPad',
      image: iPadMiniAtBusiness,
      id: 3,
    },
  ];

  // For dynamic hero width and animation on scroll with direct style manipulation
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const prevScrollTop = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollTop = window.scrollY;
      // Always apply transition for both expanding and shrinking
      heroRef.current.style.transition =
        'width 0.5s ease-in-out, border-radius 0.5s ease-in-out';
      if (scrollTop > 100) {
        heroRef.current.style.width = '90%';
        heroRef.current.style.borderRadius = '1.5rem';
      } else {
        heroRef.current.style.width = '100%';
        heroRef.current.style.borderRadius = '0';
      }
      prevScrollTop.current = scrollTop;
    };
    // Debounce/throttle using setTimeout for about 50ms
    const onScroll = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(handleScroll, 50);
    };
    window.addEventListener('scroll', onScroll);
    // Initial check
    handleScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <main className="w-full py-12 md:py-16 lg:py-16">
      <div className="w-full py-10">
        <div className="flex flex-col gap-6 px-4 container-max-width md:flex-row md:items-center md:justify-between md:px-0">
          <div className="text-left">
            <h1 className="text-3xl font-bold md:text-5xl">
              <span className="text-teal-700">Obrazovni popust.</span> <br></br>
              <span className="text-gray-900">Učenje bez granica.</span>{' '}
            </h1>
          </div>
          <div className="mt-2 flex flex-col gap-2 md:mt-0 md:flex-col">
            {/* Pomoć pri kupovini */}
            <div className="flex items-start gap-3">
              <div>
                <span className="flex h-6 w-6 items-center justify-center rounded-full">
                  🎓
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Potrebna pomoć
                </h3>
                <a
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                  href="mailto:at@atstore.ba"
                >
                  Kontaktirajte nas
                </a>
              </div>
            </div>
            {/* Pronađite poslovnicu */}
            <div className="flex items-start gap-3">
              <div>
                <span className="text-sm text-blue-600 hover:text-blue-800">
                  📍
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Posjeti AT Store
                </h3>
                <Link
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                  href="/find-store"
                >
                  Pronađi poslovnicu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Novi slider za Pogodnosti uređaje */}
      <section className="w-full py-12 pb-6 pl-[10%] pr-0">
        <h2 className="mb-6 pl-4 text-2xl font-bold md:text-4xl">Pogodnosti</h2>
        <div className="relative w-full pl-0 pr-0">
          <div
            className="scrollbar-hide flex snap-x snap-mandatory space-x-6 overflow-x-auto scroll-smooth pr-6"
            id="benefits-slider"
          >
            {benefitsItems.map((item, i) => (
              <div
                key={i}
                className="relative flex h-[460px] min-w-[360px] max-w-[360px] flex-shrink-0 cursor-pointer snap-center flex-col justify-between rounded-2xl bg-[#f7f7f7] p-6"
                onClick={() => {
                  if (item.route) {
                    router.push(item.route);
                  }
                }}
              >
                <div className="mb-2 text-ellipsis text-sm font-semibold uppercase text-orange-700">
                  Podrška obrazovanju u <br></br>svakom koraku.
                </div>
                <h3 className="mb-1 h-[52px] overflow-hidden text-ellipsis text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <div className="mb-3 h-[60px] overflow-hidden text-ellipsis text-sm text-gray-700">
                  {item.description}
                </div>
                <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                  <Image
                    fill
                    alt={item.title}
                    className="object-cover"
                    priority={i === 0}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={item.image}
                  />
                </div>
                <div className="absolute right-4 top-4 text-2xl">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-16 grid w-full gap-12 pb-10 pl-[10%] pr-[10%] md:grid-cols-3">
        {imgSection.map(({ id, title, description, image, name }) => (
          <motion.div
            key={id}
            className="group flex flex-col rounded-3xl bg-white p-6 shadow-lg transition-transform hover:scale-[1.03] hover:shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl">
              <Image
                fill
                alt={name}
                className="object-cover transition-transform group-hover:scale-105"
                priority={id === 1}
                sizes="(min-width: 768px) 33vw, 100vw"
                src={image}
              />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        ))}
      </section>
      <div
        ref={heroRef}
        className={
          'relative mx-auto mt-20 overflow-hidden bg-cover bg-center bg-no-repeat py-16 pl-[10%] pr-[10%] text-gray-800 md:py-20'
        }
        style={{
          width: '100%',
          borderRadius: '0',
          maxWidth: '100%',
          margin: '0 auto',
          transition: 'width 0.5s ease-in-out, border-radius 0.5s ease-in-out',
        }}
      >
        <img
          alt="Hero Background"
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/images/mac.1.jpg"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-white md:text-xl">
            Registrirajte svoj profil, prijavite se i odmah počnite štedjeti.
          </p>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Step 1 */}
            <motion.div
              className="flex w-full min-w-full flex-col items-center rounded-xl bg-blue-50 p-10 text-center shadow-md transition hover:shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mb-4 text-5xl font-extrabold text-blue-500">
                1
              </div>
              <h3 className="mb-3 text-xl font-semibold text-blue-700">
                Registruj se
              </h3>
              <p className="max-w-xs text-gray-800">
                Napravi svoj korisnički nalog na našem sajtu.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="flex w-full min-w-full flex-col items-center rounded-xl bg-blue-50 p-10 text-center shadow-md transition hover:shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mb-4 text-5xl font-extrabold text-blue-500">
                2
              </div>
              <h3 className="mb-3 text-xl font-semibold text-blue-700">
                Prikači
              </h3>
              <p className="max-w-xs text-gray-800">
                Prikači scan tvog indeksa ili potvrdu o zaposlenju pri nekoj
                obrazovnoj instituciji.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="flex w-full min-w-full flex-col items-center rounded-xl bg-blue-50 p-10 text-center shadow-md transition hover:shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mb-4 text-5xl font-extrabold text-blue-500">
                3
              </div>
              <h3 className="mb-3 text-xl font-semibold text-blue-700">
                Uštedi
              </h3>
              <p className="max-w-xs text-gray-800">
                Izaberi savršen Mac za tebe, unesi kod kupona u korpu i cijena
                će biti umanjena.
              </p>
            </motion.div>
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/register">
              <Button size="lg" variant="filled">
                Registriraj se
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Novi slider za Mac uređaje */}
      <section className="w-full py-12 pb-6 pl-[10%] pr-0">
        <h2 className="mb-6 pl-4 text-2xl font-bold md:text-4xl">
          Mac za obrazovanje
        </h2>
        <div className="relative w-full pl-0 pr-0">
          <div
            className="scrollbar-hide flex snap-x snap-mandatory space-x-6 overflow-x-auto scroll-smooth pr-6"
            id="mac-slider"
          >
            {macItems.map((item, i) => (
              <div
                key={i}
                className="relative flex h-[460px] min-w-[360px] max-w-[360px] flex-shrink-0 cursor-pointer snap-center flex-col justify-between rounded-2xl bg-[#f7f7f7] p-6"
                onClick={() => {
                  if (item.route) {
                    router.push(item.route);
                  }
                }}
              >
                <div className="mb-2 text-ellipsis text-sm font-semibold uppercase text-orange-700">
                  Obrazovni popust
                </div>
                <h3 className="mb-1 h-[52px] overflow-hidden text-ellipsis text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <div className="mb-1 text-ellipsis text-sm font-medium text-blue-600">
                  {item.subtitle}
                </div>
                <div className="mb-3 h-[60px] overflow-hidden text-ellipsis text-sm text-gray-700">
                  {item.description}
                </div>
                <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                  <Image
                    fill
                    alt={item.title}
                    className="object-cover"
                    priority={i === 0}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={item.image}
                  />
                </div>
                <div className="absolute right-4 top-4 text-2xl">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Novi slider za iPad uređaje */}
      <section className="w-full py-12 pb-6 pl-[10%] pr-0">
        <h2 className="mb-6 pl-4 text-2xl font-bold md:text-4xl">
          iPad za kreativne
        </h2>
        <div className="relative w-full pl-0 pr-0">
          <div
            className="scrollbar-hide flex snap-x snap-mandatory space-x-6 overflow-x-auto scroll-smooth pr-6"
            id="ipad-slider"
          >
            {ipadItems.map((item, i) => (
              <div
                key={i}
                className="relative flex h-[460px] min-w-[360px] max-w-[360px] flex-shrink-0 cursor-pointer snap-center flex-col justify-between rounded-2xl bg-[#f7f7f7] p-6"
                onClick={() => {
                  if (item.route) {
                    router.push(item.route);
                  }
                }}
              >
                <div className="mb-2 text-ellipsis text-sm font-semibold uppercase text-orange-700">
                  Izdvojena ponuda
                </div>
                <h3 className="mb-1 h-[52px] overflow-hidden text-ellipsis text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <div className="mb-1 text-ellipsis text-sm font-medium text-blue-600">
                  {item.subtitle}
                </div>
                <div className="mb-3 h-[60px] overflow-hidden text-ellipsis text-sm text-gray-700">
                  {item.description}
                </div>
                <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                  <Image
                    fill
                    alt={item.title}
                    className="object-cover"
                    priority={i === 0}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={item.image}
                  />
                </div>
                <div className="absolute right-4 top-4 text-2xl">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative mb-12 mt-12 h-[400px] w-full">
        <Image
          fill
          priority
          alt="Promotivni banner"
          className="object-cover brightness-75"
          sizes="100vw"
          src={'/assets/images/appleeducation.jpg'}
        />
        <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 text-white md:px-24">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Iskoristi pogodnosti obrazovanja
          </h2>
          <p className="max-w-xl text-lg md:text-xl">
            Popust od 5% važi za studente, za profesore i zaposlene u obrazovnim
            institucijama.
          </p>
        </div>
      </section>
      <section className="w-full py-10 pl-[10%] pr-[10%] md:py-14">
        <div className="flex flex-col gap-12 md:flex-row">
          {/* Lijevi blok: Forma */}
          <div className="mx-auto max-w-lg flex-1 rounded-3xl bg-white p-10 shadow-lg md:mx-0">
            <EducationalDiscountForm />
          </div>

          {/* Desni blok: Tri kartice */}
          <motion.div
            className="flex flex-1 flex-col justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {[
              {
                title: 'Obrazovni popust.',
                description:
                  'Obrazovni popust važi za studente, profesore i zaposlene u obrazovnim institucijama.',
                button: undefined,
              },
              {
                title: 'Najbolji u klasi. Na fakultetu i dalje.',
                description:
                  'Šta god da vam koledž baci na put, Mac i iPad vam čuvaju leđa.',
                button: undefined,
              },
              {
                title: 'Škola? Sjajno.',
                description:
                  'Popust od 5% važi za studente, za profesore i zaposlene u obrazovnim institucijama.',
                button: undefined,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="group flex max-h-[150px] flex-1 cursor-pointer flex-col justify-between rounded-3xl border border-gray-200 bg-white/20 p-6 shadow-md backdrop-blur-xl transition-all duration-500 hover:shadow-xl"
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h3 className="mb-2 text-2xl font-semibold text-blue-800 transition group-hover:text-blue-900">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.description}</p>
                {item.button && (
                  <button className="mt-6 rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">
                    {item.button}
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="w-full bg-white px-[10%] py-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Često postavljana pitanja
        </h2>
        <div className="ml-0 space-y-6">
          <details className="group rounded-xl border p-6 transition">
            <summary className="cursor-pointer text-lg font-medium text-gray-800 group-open:text-teal-700">
              Kako mogu da iskoristim EDU popust?
            </summary>
            <p className="mt-2 text-gray-600">
              Popust mogu da ostvare studenti, profesori ili zaposleni pri
              obrazovnim institucijama. Neophodno je da u svoj korisnički nalog
              priložite skeniranu kopiju indeksa sa overenom tekućom godinom
              studiranja ili potvrdu o zaposlenju pri obrazovnoj instituciji.
            </p>
          </details>
          <details className="group rounded-xl border p-6 transition">
            <summary className="group-open:tex-teal-700 cursor-pointer text-lg font-medium text-gray-800">
              Na koje proizvode mogu ostvariti EDU popust?
            </summary>
            <p className="mt-2 text-gray-600">
              Popust važi za sve Mac modele, uključujući i modele koji već imaju
              snižene cijene.
            </p>
          </details>
          <details className="group rounded-xl border p-6 transition">
            <summary className="cursor-pointer text-lg font-medium text-gray-800 group-open:text-teal-700">
              Da li EDU popust važi za Mac modele specifične konfiguracije?
            </summary>
            <p className="mt-2 text-gray-600">
              Da, EDU popust važi za Mac modele specifične konfiguracije koji se
              proizvode po pojedinačnom upitu.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
