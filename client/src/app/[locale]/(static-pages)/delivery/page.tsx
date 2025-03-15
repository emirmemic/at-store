import { useTranslations } from 'next-intl';

import Section, {
  SectionProps,
} from '@/app/[locale]/(static-pages)/components/section';

export default function DeliveryPage() {
  const t = useTranslations('deliveryPage');
  const sections: Array<SectionProps> = [
    {
      title: t('item1.title'),
      listItems: [t('item1.listItem1')],
      sectionNumber: 1,
    },
    {
      title: t('item2.title'),
      listItems: [t('item2.listItem2'), t('item2.listItem3')],
      subTitle: t('item2.listItem1'),
      sectionNumber: 2,
    },
    {
      title: t('item3.title'),
      listItems: [t('item3.listItem1'), t('item3.listItem2')],
      sectionNumber: 3,
    },
    {
      title: t('item4.title'),
      listItems: [t('item4.listItem1')],
      sectionNumber: 4,
    },
    {
      title: t('item5.title'),
      listItems: [t('item5.listItem1')],
      sectionNumber: 5,
    },
    {
      title: t('item6.title'),
      listItems: [t('item6.listItem1')],
      sectionNumber: 6,
    },
    {
      title: t('item7.title'),
      listItems: [t('item7.listItem1')],
      sectionNumber: 7,
    },
  ];

  return (
    <div>
      <div className="w-full px-6 py-10 pt-12 md:px-14 md:py-[60px]">
        <h1 className="mb-9 text-center heading-1 md:mb-16">{t('title')}</h1>
        <div className="flex flex-col gap-5">
          {sections.map((section) => (
            <Section key={section.sectionNumber} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}
