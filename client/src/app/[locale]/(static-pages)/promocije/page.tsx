import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Metadata } from 'next';
import { ProductResponse } from '@/lib/types';
import { ProductsListForPromotions } from '@/components/product-cards';
import { fetchAPI } from '@/lib/fetch-api';
import { getTranslations } from 'next-intl/server';
import qs from 'qs';

interface ExclusivePromotion {
  id: number;
  title: string;
  subtitle: string | null;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  products: ProductResponse[];
}

interface ExclusivePromotionResponse {
  data: ExclusivePromotion;
}

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: GenerateMetadataParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'promocije' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

const promotionQuery = qs.stringify(
  {
    populate: {
      products: {
        populate: {
          images: {
            fields: STRAPI_IMAGE_FIELDS,
          },
          category: {
            fields: ['link', 'name'],
          },
          subCategory: {
            fields: ['name', 'link'],
          },
          brand: {
            fields: ['name'],
          },
          model: {
            fields: ['name', 'displayName'],
            populate: {
              icon: {
                fields: STRAPI_IMAGE_FIELDS,
              },
            },
          },
          color: {
            fields: ['name', 'hex'],
          },
          memory: {
            fields: ['value', 'unit'],
          },
          ram: {
            fields: ['value', 'unit'],
          },
          chip: {
            fields: ['name'],
          },
          stores: {
            populate: {
              store: {
                fields: ['name'],
              },
            },
          },
          favoritedBy: {
            fields: ['id'],
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

async function loader() {
  const path = '/api/exclusive-promotion';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = promotionQuery;

  const res = await fetchAPI<ExclusivePromotionResponse>(url.href, {
    method: 'GET',
    isAuth: false,
    next: {
      revalidate: 300,
    },
  });

  return res?.data?.data ?? null;
}

export default async function PromocijePage() {
  const promotion = await loader();
  const t = await getTranslations('promocije');

  // Use colors from Strapi or fallback to defaults
  const color1 = promotion?.color1 || '#2563eb';
  const color2 = promotion?.color2 || '#22d3ee';
  const color3 = promotion?.color3 || '#fde68a';
  const color4 = promotion?.color4 || '#fb923c';
  const gradientStyle = `linear-gradient(90deg,${color1},${color2},${color3},${color4})`;

  // Split subtitle by full stops for line break
  const subtitle = promotion?.subtitle || t('hero.subtitle');
  const subtitleLines = subtitle
    .split('.')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return (
    <main className="relative min-h-screen">
      {/* Gradient Bar with Spikes */}
      <div className="absolute left-0 right-0 top-0 -z-10">
        <div
          className="h-6 opacity-100 blur-lg"
          style={{ background: gradientStyle }}
        />
      </div>
      {/* Content Section */}
      <section className="px-3 py-16 container-max-width-xl md:px-6 md:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between text-center container-max-width md:flex-row">
          <h1
            className="bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl"
            style={{ backgroundImage: gradientStyle }}
          >
            {promotion?.title || t('hero.title')}
          </h1>
          <div className="flex flex-col gap-0">
            <div className="mb-6 text-center text-black md:text-end">
              {subtitleLines.map((line, index) => {
                const sizeClasses = [
                  'text-2xl md:text-3xl font-semibold mt-4 md:mt-0',
                  'text-lg md:text-xl font-normal mt-2',
                  'text-lg md:text-xl font-normal mt-2',
                ];
                const sizeClass = sizeClasses[index] || 'text-base md:text-lg';
                return (
                  <p key={index} className={sizeClass}>
                    {line}.
                  </p>
                );
              })}
            </div>
            <Link
              href="/find-store"
              className="pointer-cursor -mt-4 flex flex-row items-center justify-center gap-2 rounded-full py-3 text-black transition md:justify-end"
            >
              <MapPin className="h-4 w-4 text-black/80 transition-transform duration-200" />
              <span className="text-md border-b border-grey-light font-medium text-black/80">
                Pronađi poslovnicu
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <div className="px-12 py-12 container-max-width md:px-6 md:py-16">
        {!promotion ||
        !promotion.products ||
        promotion.products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-slate-600">{t('noPromotions')}</p>
          </div>
        ) : (
          <ProductsListForPromotions products={promotion.products} />
        )}
      </div>
    </main>
  );
}
