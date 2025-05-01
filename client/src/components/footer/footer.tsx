'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import {
  Description,
  FooterPayment,
  FooterSocial,
  SectionDesktop,
  SectionMobile,
} from '@/components/footer/components';
import { FooterSectionType } from '@/components/footer/types';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Pathname } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');
  const [activeSectionId, setActiveSection] = useState<string | null>(null);

  const handleSectionToggle = (sectionId: string) => {
    setActiveSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const descriptionItems = [
    'description1',
    'description2',
    'description3',
    'description4',
    'description5',
    'description6',
    'description7',
    'description8',
    'description9',
    'description10',
  ];

  const footerSections: FooterSectionType[] = [
    {
      id: 'categories',
      title: t('categories.title'),
      items: [
        {
          id: 'mac',
          name: t('categories.mac'),
          path: PAGE_NAMES.MAC,
        },
        {
          id: 'ipad',
          name: t('categories.ipad'),
          path: PAGE_NAMES.IPAD,
        },
        {
          id: 'iphone',
          name: t('categories.iphone'),
          path: PAGE_NAMES.IPHONE,
        },
        {
          id: 'watch',
          name: t('categories.watch'),
          path: PAGE_NAMES.WATCH,
        },
        {
          id: 'tv',
          name: t('categories.airPods'),
          path: PAGE_NAMES.AIRPODS,
        },
        {
          id: 'accessories',
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
          id: 'support',
          name: t('services.support'),
          path: PAGE_NAMES.SUPPORT,
        },
        {
          id: 'b2b',
          name: t('services.b2b'),
          path: PAGE_NAMES.B2B,
        },
        {
          id: 'mikrofinEstimate',
          name: t('services.mikrofinEstimate'),
          path: PAGE_NAMES.MIKROFIN_INVOICE,
        },
        {
          id: 'complaints',
          name: t('services.complaints'),
          path: PAGE_NAMES.COMPLAINTS,
        },
        {
          id: 'payment',
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
          id: 'aboutUs',
          name: t('companies.aboutUs'),
          path: PAGE_NAMES.ABOUT,
        },
        {
          id: 'findStore',
          name: t('companies.findStore'),
          path: PAGE_NAMES.FIND_STORE,
        },
        {
          id: 'globalComponents',
          name: t('companies.career'),
          path: PAGE_NAMES.CAREERS,
        },
        {
          id: 'atSoft',
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
          id: 'promo',
          name: t('information.promo'),
          path: PAGE_NAMES.PROMO,
        },
        {
          id: 'privacyPolicy',
          name: t('information.privacyPolicy'),
          path: PAGE_NAMES.PRIVACY_POLICY,
        },
        {
          id: 'delivery',
          name: t('information.delivery'),
          path: PAGE_NAMES.DELIVERY,
        },
        {
          id: 'newsletter',
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
          id: 'paymentMethods',
          name: t('help.paymentMethods'),
          path: PAGE_NAMES.PAYMENT_METHODS,
        },
        {
          id: 'orderCancellation',
          name: t('help.orderCancellation'),
          path: PAGE_NAMES.ORDER_CANCELLATION,
        },
        {
          id: 'termsOfPurchase',
          name: t('help.termsOfPurchase'),
          path: PAGE_NAMES.TERMS_OF_PURCHASE,
        },
        {
          id: 'cookiePolicy',
          name: t('help.cookiePolicy'),
          path: PAGE_NAMES.COOKIE_POLICY,
        },
      ],
    },
  ];

  return (
    <footer className="bg-black py-5 md:py-9">
      <div className="flex flex-col gap-3 text-white container-max-width md:gap-6">
        <Description className="hidden md:block" items={descriptionItems} />
        <div className="w-full justify-between gap-7 md:flex lg:gap-28">
          <div className="mb-4 md:hidden">
            {footerSections.map((section) => (
              <SectionMobile
                key={section.id}
                isActive={activeSectionId === section.id}
                section={section}
                onToggle={() => handleSectionToggle(section.id)}
              />
            ))}
          </div>
          <div className="hidden justify-between gap-6 md:flex md:grow">
            {footerSections.map((section) => (
              <SectionDesktop key={section.id} {...section} />
            ))}
          </div>
          <FooterSocial />
        </div>
        <FooterPayment />
      </div>
    </footer>
  );
}
