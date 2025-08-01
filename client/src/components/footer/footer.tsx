'use client';

import {
  Description,
  FooterPayment,
  FooterSocial,
  SectionDesktop,
  SectionMobile,
} from '@/components/footer/components';
import { FooterSectionType, LinkHref } from '@/components/footer/types';

import { NavMenuItem } from '@/components/nav-bar/types';
import { PAGE_NAMES } from '@/i18n/page-names';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FooterProps {
  categoryItems: NavMenuItem[];
}
export default function Footer({ categoryItems }: FooterProps) {
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
      items: [],
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
          id: 'educationalDiscount',
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
          id: 'atSoft',
          name: t('companies.atSoft'),
          path: PAGE_NAMES.AT_SOFT,
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

  const updatedFooterSections = footerSections.map((section, index) =>
    index === 0
      ? {
          ...section,
          items: categoryItems.map((item) => ({
            id: item.id,
            name: item.displayName || item.name,
            path: item.link as LinkHref,
          })),
        }
      : section
  );

  return (
    <footer className="bg-[#F5F5F7] py-5 md:py-9">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-3 md:gap-6">
        <Description className="hidden md:block" items={descriptionItems} />
        <div className="w-full justify-between gap-7 text-gray-500 md:flex lg:gap-28">
          <div className="mb-4 md:hidden">
            {updatedFooterSections.map((section) => (
              <SectionMobile
                key={section.id}
                isActive={activeSectionId === section.id}
                section={section}
                onToggle={() => handleSectionToggle(section.id)}
              />
            ))}
          </div>
          <div className="hidden justify-between gap-6 md:flex md:grow">
            {updatedFooterSections.map((section) => (
              <SectionDesktop key={section.id} {...section} />
            ))}
          </div>
          <FooterSocial />
        </div>
        <FooterPayment />
        <div className="ml-4 md:ml-0">
          <p className="text-left text-xs text-gray-500">
            Developed by AT Soft, Sarajevo
          </p>
        </div>
      </div>
    </footer>
  );
}
