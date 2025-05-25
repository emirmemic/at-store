import { getTranslations } from 'next-intl/server';
import qs from 'qs';

import { CardBlock, StrapiImage } from '@/components';
import { IconApple, IconAtStoreLogo } from '@/components/icons';
import { ActionLink } from '@/components/strapi/components';
import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import LatestProduct from './components/latestProduct';
import { NewsPageResponse } from './types';
interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData.news' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}

const newsPageQuery = qs.stringify(
  {
    populate: {
      latestProducts: {
        populate: {
          image: {
            fields: STRAPI_IMAGE_FIELDS,
          },
        },
      },
      hotItem: {
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
  const path = '/api/news-page';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = newsPageQuery;
  const res = await fetchAPI<NewsPageResponse>(url.href, {
    method: 'GET',
    isAuth: false,
  });

  if (!res.data) {
    return { latestProducts: null, hotItem: null };
  }
  const data = res.data.data;
  return data;
}
export default async function Page() {
  const data = await loader();
  if (!data)
    return <div>Fetch is successful, but there is no data for this page</div>;
  const t = await getTranslations();

  const { latestProducts, hotItem } = data;

  return (
    <main className="py-12 container-max-width md:py-16">
      <section className="flex flex-col-reverse items-center justify-between gap-12 md:flex-row md:gap-10">
        <div className="w-full max-w-2xl text-balance text-center md:text-start">
          <h1 className="pb-2 heading-1"> {t('newsPage.title')}</h1>
          <p className="paragraph-1">{t('newsPage.description')}</p>
        </div>
        <IconAtStoreLogo className="h-20 w-80 shrink-0 lg:w-[380px]" />
      </section>
      {latestProducts && latestProducts.length > 0 && (
        <section className="mt-16 flex flex-col gap-24 rounded-2xl bg-blue-steel p-11 px-6 py-14 shadow-popup-black md:gap-32 md:px-28 md:py-16 lg:gap-24 lg:px-10 lg:py-11">
          {latestProducts.map((latestProduct, index) => (
            <LatestProduct
              {...latestProduct}
              key={latestProduct.id}
              index={index}
            />
          ))}
        </section>
      )}
      {hotItem && (
        <section className="pt-12 md:pt-16">
          <h2 className="pb-12 text-center heading-2 md:pb-14 md:heading-1">
            {hotItem?.title || ''}
          </h2>
          <div
            className={
              'flex w-full flex-col items-center rounded-2xl bg-blue-steel px-9 py-5 shadow-popup-black md:flex-row md:px-4 md:py-[72px] lg:px-11 lg:py-12'
            }
          >
            <StrapiImage
              priority
              alt={
                hotItem?.productImage?.alternativeText ||
                hotItem?.productImage?.name ||
                null
              }
              className="h-full max-h-32 w-full max-w-72 object-contain md:max-w-56 lg:max-w-80"
              height={500}
              src={hotItem?.productImage?.url ?? ''}
              width={500}
            />
            <p className="mb-7 flex-1 text-white heading-4 md:mb-0 lg:heading-3">
              {hotItem?.caption ?? 'Image not available'}
            </p>
            {hotItem.actionLink && (
              <ActionLink
                actionLink={hotItem.actionLink}
                size={'lg'}
                variant={'filled'}
              >
                {hotItem.actionLink.linkText || t('common.buyNow')}
              </ActionLink>
            )}
          </div>
        </section>
      )}
      <section className="flex flex-col items-center justify-between gap-12 pt-16 text-center md:flex-row md:gap-20 md:pt-14 lg:gap-60">
        <div className="order-1">
          <CardBlock
            asChild
            Icon={IconApple}
            bgColor="bg-blue"
            className="w-[310px] px-5 py-7"
            iconClasses="size-36"
            textClasses="paragraph-1"
            title={t('newsPage.appleBrand')}
          />
        </div>
        <div className="flex flex-col gap-12 md:order-1 md:max-w-md md:flex-1 md:gap-5 md:pb-12 md:text-right lg:gap-9">
          <h3 className="heading-3">{t('newsPage.appleNumber1')}</h3>
          <p className="paragraph-1">{t('newsPage.appleStreak')}</p>
        </div>
      </section>
    </main>
  );
}
