import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import qs from 'qs';

import {
  atBusinessMac,
  iPadMiniAtBusiness,
  macBookAirEducationalDiscount,
} from '@/assets/images';
import { StrapiImage } from '@/components';
import { ProductsList } from '@/components/product-cards';
import { Button } from '@/components/ui/button';
import { DYNAMIC_PAGES } from '@/i18n/page-names';
import { Link as RoutingLink } from '@/i18n/routing';
import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ProductResponse } from '@/lib/types';

import { ImgSection } from '../../(static-pages)/components';

import EducationalDiscountForm from './components/form';
import { EducationalPageResponse } from './types';

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

const educationalDiscountPageQuery = qs.stringify(
  {
    populate: {
      product1: {
        populate: {
          images: {
            fields: STRAPI_IMAGE_FIELDS,
          },
        },
      },
      product2: {
        populate: {
          images: {
            fields: STRAPI_IMAGE_FIELDS,
          },
        },
      },
      product3: {
        populate: {
          images: {
            fields: STRAPI_IMAGE_FIELDS,
          },
        },
      },
      chooseYourMac: {
        populate: {
          productImage: {
            fields: STRAPI_IMAGE_FIELDS,
          },
          actionLink: true,
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

async function loader() {
  const path = '/api/educational-discount-page';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = educationalDiscountPageQuery;
  const res = await fetchAPI<EducationalPageResponse>(url.href, {
    method: 'GET',
    isAuth: false,
  });
  const data = res.data?.data;
  if (!data) {
    return {};
  }
  const { product1, product2, product3, chooseYourMac } = data;

  const rawProducts = [product1, product2, product3];
  const products: ProductResponse[] = rawProducts.filter(
    (p): p is ProductResponse => p !== null
  );

  return { products, chooseYourMac };
}

export default async function Page() {
  const { products, chooseYourMac } = await loader();
  const t = await getTranslations();
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
      <section className="my-16 flex flex-col gap-24 rounded-2xl bg-blue-steel p-11 px-6 py-14 shadow-popup-black md:gap-32 md:px-28 md:py-16 lg:gap-24 lg:px-10 lg:py-11">
        {imgSection.map((img, index) => (
          <ImgSection key={img.id} index={index} {...img}></ImgSection>
        ))}
      </section>

      {chooseYourMac && (
        <section className="pb-12 md:pb-16">
          <h2 className="pb-12 text-center heading-2 md:pb-14 md:heading-1">
            {chooseYourMac?.title || ''}
          </h2>
          <div
            className={
              'flex w-full flex-col items-center rounded-2xl bg-blue-steel px-9 py-5 shadow-popup-black md:flex-row md:px-4 md:py-[72px] lg:px-11 lg:py-12'
            }
          >
            <StrapiImage
              priority
              alt={
                chooseYourMac?.productImage?.alternativeText ||
                chooseYourMac?.productImage?.name ||
                null
              }
              className="h-full max-h-32 w-full max-w-72 object-contain md:max-w-56 lg:max-w-80"
              height={500}
              src={chooseYourMac?.productImage?.url ?? ''}
              width={500}
            />
            <p className="mb-7 flex-1 text-white heading-4 md:mb-0 lg:heading-3">
              {chooseYourMac?.caption ?? 'Image not available'}
            </p>

            {chooseYourMac.actionLink && (
              <Button asChild size={'lg'} variant={'filled'}>
                <Link
                  aria-label={
                    chooseYourMac?.actionLink?.linkText || t('common.buyNow')
                  }
                  href={chooseYourMac?.actionLink?.linkUrl || ''}
                  rel={
                    chooseYourMac?.actionLink?.isExternal
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  target={
                    chooseYourMac?.actionLink?.isExternal ? '_blank' : undefined
                  }
                  title={
                    chooseYourMac?.actionLink?.linkText || t('common.buyNow')
                  }
                >
                  {t('common.buyNow')}
                </Link>
              </Button>
            )}
          </div>
        </section>
      )}
      <EducationalDiscountForm />
      {products && products.length > 0 && (
        <section className="py-12 md:py-16">
          <h2 className="pb-12 text-center heading-1 md:pb-14">
            {t('educationalDiscountPage.chooseMac')}
          </h2>
          <ProductsList products={products}></ProductsList>
        </section>
      )}
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
              <RoutingLink
                href={{
                  pathname: DYNAMIC_PAGES.CATEGORY_PAGE,
                  params: {
                    category: 'mac',
                  },
                }}
              >
                {t('common.view')}
              </RoutingLink>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
