import { useTranslations } from 'next-intl';

import Description from '@/components/footer/components/description';
import FooterPayment from '@/components/footer/components/payment';
import SectionDesktop from '@/components/footer/components/section-desktop';
import SectionMobile from '@/components/footer/components/section-mobile';
import FooterSocial from '@/components/footer/components/social';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Pathname } from '@/i18n/routing';

import { FooterSectionType } from './types/footer-types';

export default function Footer() {
  const t = useTranslations('footer');

  const descriptionItems = [
    'description1',
    'description2',
    'description3',
    'description4',
    'description1',
    'description2',
    'description3',
    'description4',
    'description1',
    'description2',
    'description3',
    'description4',
  ];

  const footerSections: FooterSectionType[] = [
    {
      id: 'categories',
      title: t('categories.title'),
      items: [
        {
          name: t('categories.mac'),
          path: PAGE_NAMES.MAC,
        },
        {
          name: t('categories.ipad'),
          path: PAGE_NAMES.IPAD,
        },
        {
          name: t('categories.iphone'),
          path: PAGE_NAMES.IPHONE,
        },
        {
          name: t('categories.watch'),
          path: PAGE_NAMES.WATCH,
        },
        {
          name: t('categories.airPods'),
          path: PAGE_NAMES.AIRPODS,
        },
        {
          name: t('categories.accessories'),
          path: PAGE_NAMES.ACCESSORIES,
        },
      ],
    },
    {
      id: 'services',
      title: t('services.title'),
      items: [
        {
          name: t('services.support'),
          path: PAGE_NAMES.SUPPORT,
        },
        {
          name: t('services.b2b'),
          path: PAGE_NAMES.B2B,
        },
        {
          name: t('services.microfinEstimate'),
          path: PAGE_NAMES.MICROFIN_INVOICE,
        },
        {
          name: t('services.complaints'),
          path: PAGE_NAMES.COMPLAINTS,
        },
        {
          name: t('services.educationalDiscount'),
          path: PAGE_NAMES.EDUCATIONAL_DISCOUNT,
        },
      ],
    },
    {
      id: 'companies',
      title: t('companies.title'),
      items: [
        {
          name: t('companies.aboutUs'),
          path: PAGE_NAMES.ABOUT,
        },
        {
          name: t('companies.findStore'),
          path: PAGE_NAMES.FIND_STORE,
        },
        {
          name: t('companies.career'),
          path: PAGE_NAMES.CAREERS,
        },
        {
          name: t('companies.news'),
          path: PAGE_NAMES.NEWS,
        },
        {
          name: t('companies.atSoft'),
          path: 'https://www.atsofts.com' as Pathname,
          target: '_blank',
        },
      ],
    },
    {
      id: 'information',
      title: t('information.title'),
      items: [
        {
          name: t('information.promo'),
          path: PAGE_NAMES.PROMO,
        },
        {
          name: t('information.privacyPolicy'),
          path: PAGE_NAMES.PRIVACY_POLICY,
        },
        {
          name: t('information.delivery'),
          path: PAGE_NAMES.DELIVERY,
        },
        {
          name: t('information.newsletter'),
          path: PAGE_NAMES.NEWSLETTER,
        },
      ],
    },
    {
      id: 'help',
      title: t('help.title'),
      items: [
        {
          name: t('help.paymentMethods'),
          path: PAGE_NAMES.PAYMENT_METHODS,
        },
        {
          name: t('help.orderCancellation'),
          path: PAGE_NAMES.ORDER_CANCELLATION,
        },
        {
          name: t('help.contactUs'),
          path: PAGE_NAMES.CONTACT_US,
        },
        {
          name: t('help.termsOfPurchase'),
          path: PAGE_NAMES.TERMS_OF_PURCHASE,
        },
        {
          name: t('help.cookiePrivacy'),
          path: PAGE_NAMES.COOKIE_PRIVACY,
        },
      ],
    },
  ];

  return (
    <footer className="bg-black py-5 md:py-9">
      <div className="flex flex-col gap-3 text-white container-max-width md:gap-6">
        <Description
          className="hidden max-w-screen-lg md:block"
          items={descriptionItems}
        />
        <div className="w-full justify-between gap-7 md:flex lg:gap-28">
          <div className="md:hidden">
            {footerSections.map((section) => (
              <SectionMobile key={section.id} section={section} />
            ))}
          </div>
          <div className="hidden justify-between gap-4 md:flex md:grow">
            {footerSections.map((section) => (
              <SectionDesktop key={section.id} section={section} />
            ))}
          </div>
          <FooterSocial />
        </div>
        <FooterPayment />
      </div>
    </footer>
  );
}
