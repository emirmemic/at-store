// TODO: ADD choose your mac component
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import {
  macBookAirBrandAwareness,
  macFamilyScreen,
  whyMacDevices,
} from '@/assets/images';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('whyMac.title'),
    description: t('whyMac.description'),
    openGraph: {
      title: t('whyMac.title'),
      description: t('whyMac.description'),
    },
  };
}
export default function Page() {
  const t = useTranslations();
  return (
    <main className="py-12 container-max-width md:py-16">
      <h1 className="text-center heading-2 md:heading-1">
        {t('whyMacPage.title')}
      </h1>
      <div className="mb-12 mt-6 h-40 self-center md:my-16 md:h-64 lg:h-96">
        <Image
          alt="Mac Family Screen"
          className="h-full w-full object-contain"
          height={406}
          src={macFamilyScreen}
          width={1192}
        />
      </div>
      <section className="rounded-2xl bg-pink-soft px-3 py-12 shadow-popup-black md:px-8 md:py-16 lg:py-12">
        <h2 className="mb-8 text-center heading-3 md:heading-2 lg:mb-11">
          {t('whyMacPage.switchToMac.text1')}
          <br />
          <span>{t('whyMacPage.switchToMac.text2')}</span>
        </h2>
        <p className="pb-12 text-center bullet-1 md:paragraph-1">
          {t('whyMacPage.whyBuyMac')}
        </p>
        <div className="h-56 w-full overflow-hidden md:h-[420px] lg:h-[636px]">
          <Image
            priority
            alt="MacBook Air Brand Awareness"
            className="h-full w-full object-contain"
            height={636}
            src={whyMacDevices}
            width={1192}
          />
        </div>
      </section>
      <section className="my-12 md:my-16">
        <h2 className="mb-9 text-center heading-3 md:mb-8 md:heading-2 lg:mb-9 lg:heading-1">
          {t('whyMacPage.macCanDoIt')}
        </h2>
        <p className="text-center bullet-1 md:paragraph-1">
          {t('whyMacPage.switchToMacText')}
        </p>
      </section>
      <section className="flex flex-col items-center justify-center gap-x-16 gap-y-12 rounded-2xl bg-blue-light px-3 py-12 shadow-popup-black md:px-6 md:py-16 lg:flex-row lg:py-9">
        <div className="flex-1 lg:max-w-[346px]">
          <h2 className="pb-6 text-center heading-4 md:pb-8 lg:pb-20">
            {t('whyMacPage.deviceCompatibility')}
          </h2>
          <p className="text-center md:paragraph-2">
            {t('whyMacPage.deviceCompatibilityText')}
          </p>
        </div>
        <div className="h-48 w-full max-w-96 md:h-80 md:max-w-[600px]">
          <Image
            alt="Why Mac Devices"
            className="h-full w-full object-contain"
            height={636}
            src={macBookAirBrandAwareness}
            width={1192}
          ></Image>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <h2 className="text-center heading-2 lg:heading-1">
          {t('whyMacPage.chooseYourMac')}
        </h2>
      </section>
      <div className="flex flex-col items-center justify-between gap-y-9 rounded-2xl bg-blue-steel px-9 py-12 shadow-popup-black md:flex-row md:px-11 md:py-14">
        <h3 className="text-center text-white heading-4">
          {t('whyMacPage.viewAll')}
        </h3>
        <div>
          <Button asChild size={'lg'} typography={'button1'} variant={'filled'}>
            <Link href={PAGE_NAMES.MAC}>{t('common.view')}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
