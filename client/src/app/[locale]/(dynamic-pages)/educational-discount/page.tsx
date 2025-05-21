// TODO Implement the section with product cards once the products are done
// TODO Add function to kupi Sada Button
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import {
  atBusinessMac,
  iPadMiniAtBusiness,
  macBookAirEducationalDiscount,
  macBookAirM1AtBusiness,
} from '@/assets/images';
import { Button } from '@/components/ui/button';
import { DYNAMIC_PAGES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';

import { ImgSection } from '../../(static-pages)/components';

import EducationalDiscountForm from './components/form';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('educationalDiscount.title'),
    description: t('educationalDiscount.description'),
    openGraph: {
      title: t('educationalDiscount.title'),
      description: t('educationalDiscount.description'),
    },
  };
}

export default function Page() {
  const t = useTranslations();
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

  return (
    <main className="py-12 container-max-width md:py-16 lg:py-16">
      <h1 className="text-center heading-2 md:display">
        {t('educationalDiscountPage.title')}
      </h1>
      <section
        className={
          'mt-16 flex flex-col gap-24 rounded-2xl bg-blue-steel p-11 px-6 py-14 shadow-popup-black md:gap-32 md:px-28 md:py-16 lg:gap-24 lg:px-10 lg:py-11'
        }
      >
        {imgSection.map((img, index) => (
          <ImgSection key={img.id} index={index} {...img}></ImgSection>
        ))}
      </section>
      <section className="py-16">
        <h3 className="pb-12 text-center heading-1 md:pb-16">
          {t('educationalDiscountPage.sectionTitle')}
        </h3>
        <div
          className={
            'flex w-full flex-col items-center rounded-2xl bg-blue-steel px-9 py-5 shadow-popup-black md:flex-row md:px-4 md:py-[72px] lg:px-11 lg:py-12'
          }
        >
          <div className="max-w-72 items-center md:max-w-56 md:flex-row lg:max-w-80">
            <Image
              priority
              alt="MacBook Air M1"
              className="flex-shrink-0"
              src={macBookAirM1AtBusiness}
            ></Image>
          </div>
          <p className="mb-7 flex-1 text-white heading-4 md:mb-0 lg:heading-3">
            {t('educationalDiscountPage.macBookAir')}
          </p>

          <Button size={'lg'} variant={'filled'}>
            {t('common.buyNow')}
          </Button>
        </div>
      </section>
      <EducationalDiscountForm />
      <section className="py-12 md:py-16">
        <h2 className="text-center heading-1">
          {t('educationalDiscountPage.chooseMac')}
        </h2>
      </section>
      <section className="pb-12 md:pb-16">
        <h2 className="pb-12 text-center heading-1 md:pb-14">
          {t('educationalDiscountPage.learnFromApple')}
        </h2>
        <div className="flex flex-col justify-between gap-y-6 rounded-2xl bg-blue-steel px-9 py-12 shadow-popup-black md:flex-row md:items-center md:px-12 md:py-6">
          <div>
            <p className="w-full text-center text-white md:max-w-md md:text-start md:heading-4 lg:max-w-2xl lg:heading-3">
              {t('educationalDiscountPage.learnFromAppleText')}
            </p>
          </div>
          <div className="self-center">
            <Button
              asChild
              size={'lg'}
              typography={'button1'}
              variant={'filled'}
            >
              <Link
                href={{
                  pathname: DYNAMIC_PAGES.CATEGORY_PAGE,
                  params: {
                    category: 'mac',
                  },
                }}
              >
                {t('common.view')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
