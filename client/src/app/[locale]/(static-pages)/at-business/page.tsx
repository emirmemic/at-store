import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { macBookAirM1AtBusiness } from '@/assets/images';
import { Button } from '@/components/ui/button';

import ImgSection from '../components/img-section';
import { IconAtBusiness } from '../icons';

import { getImgSectionInfo } from './data';
interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });
  return {
    title: t('atBusiness.title'),
    description: t('atBusiness.description'),
    openGraph: {
      title: t('atBusiness.title'),
      description: t('atBusiness.description'),
    },
  };
}
export default function AtBusinessPage() {
  const t = useTranslations();
  const imgSectionInfo = getImgSectionInfo(t);
  const sectionBaseStyles = 'rounded-2xl bg-blue-steel shadow-popup-black';
  return (
    <main className="flex flex-col py-16 container-max-width">
      <section className="flex flex-col-reverse items-center gap-12 md:flex-row md:gap-10">
        <div className="flex-1 text-balance text-center md:text-start">
          <h1 className="pb-12 heading-2 md:pb-6 md:heading-1">
            {t('atBusinessPage.title')}
          </h1>
          <p className="paragraph-1">{t('atBusinessPage.description')}</p>
        </div>
        <IconAtBusiness className="w-full max-w-80 md:max-w-[380px]"></IconAtBusiness>
      </section>
      <section
        className={`${sectionBaseStyles} mt-16 flex flex-col gap-24 p-11 px-6 py-14 md:gap-32 md:px-28 md:py-16 lg:gap-24 lg:px-10 lg:py-11`}
      >
        {imgSectionInfo.map((img, index) => (
          <ImgSection key={img.id} index={index} {...img}></ImgSection>
        ))}
      </section>
      <section className="py-16">
        <h3 className="pb-12 text-center heading-1 md:pb-16">
          {t('atBusinessPage.sectionTitle')}
        </h3>
        <div
          className={`${sectionBaseStyles} flex w-full flex-col items-center px-9 py-5 md:flex-row md:px-4 md:py-[72px] lg:px-11 lg:py-12`}
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
            {t('atBusinessPage.macBookAir')}
          </p>

          <Button size={'lg'} variant={'filled'}>
            {t('atBusinessPage.buttonText')}
          </Button>
        </div>
      </section>
      <section className="flex flex-col items-center justify-between gap-12 text-center md:flex-row md:items-start md:gap-20 lg:gap-60">
        <div className="order-1 flex flex-col gap-8 rounded-2xl bg-blue px-20 py-16 text-white shadow-popup-black">
          <p className="heading-4">Haris Dziko</p>
          <p className="paragraph-1">B2B Manager</p>
          <Link
            className="underline transition duration-300 paragraph-1 hover:text-grey-medium"
            href={'tel:+387 956 188'}
          >
            +387 956 188
          </Link>
        </div>
        <div className="flex flex-col gap-12 md:order-1 md:max-w-md md:flex-1 md:gap-5 md:text-right lg:gap-9">
          <h4 className="heading-4">{t('atBusinessPage.contactTitle')}</h4>
          <div className="flex flex-col">
            <Link
              className="text-blue transition duration-300 paragraph-1 hover:text-grey-medium"
              href={t('contact.atStoreBusinessTelephoneLink')}
            >
              {t('contact.atStoreBusinessTelephone')}
            </Link>
            <Link
              className="block text-blue transition duration-300 paragraph-1 hover:text-grey-medium"
              href={t('contact.atStoreBusinessEmailLink')}
            >
              {t('contact.atStoreBusinessEmail')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
