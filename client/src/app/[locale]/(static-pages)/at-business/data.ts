import {
  atBusinessMac,
  iPadMiniAtBusiness,
  iPhoneAtBusiness,
} from '@/assets/images';

export const getImgSectionInfo = (t: (key: string) => string) => [
  {
    title: t('atBusinessPage.content1.title'),
    description: t('atBusinessPage.content1.description'),
    name: 'Mac',
    image: atBusinessMac,
    id: 1,
  },
  {
    title: t('atBusinessPage.content2.title'),
    description: t('atBusinessPage.content2.description'),
    name: 'IPhone',
    image: iPhoneAtBusiness,
    id: 2,
  },
  {
    title: t('atBusinessPage.content3.title'),
    description: t('atBusinessPage.content3.description'),
    name: 'IPad',
    image: iPadMiniAtBusiness,
    id: 3,
  },
];
