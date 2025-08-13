import { getTranslations } from 'next-intl/server';
import React from 'react';

import { ACCESSORY_CATEGORY_LINK } from '@/lib/constants';

import { Content } from '../components';

const normalizeLink = (subcategory: string) => {
  const words = subcategory.replace(/-/g, ' ').trim().split(/\s+/);
  if (words.length === 0) return '';

  const formatFirst = (w: string) => {
    const lower = (w || '').toLowerCase();
    if (!lower) return '';
    if (lower === 'tv') {
      return 'TV';
    }
    // Ako počinje na "i" => i + VelikoSljedeće + ostatak mala
    if (lower.startsWith('i') && lower.length > 1) {
      // Step 1: i + capitalized second letter + rest lowercase
      let result = 'i' + lower[1].toUpperCase() + lower.slice(2);
      // Step 2: If the word contains 't', change all 't' to 'T'
      result = result
        .split('')
        .map((ch) => (ch === 't' ? 'T' : ch))
        .join('');
      // Step 3: For the "iPhone" style, keep first letter lowercase 'i'
      return result;
    }
    // Step 2: If the word contains 't', change all 't' to 'T'
    let intermediate = lower;
    if (intermediate.includes('t')) {
      intermediate = intermediate
        .split('')
        .map((ch) => (ch === 't' ? 'T' : ch))
        .join('');
    }
    // Step 3: Ensure first character is uppercase (unless handled by the 'i' case above)
    if (intermediate.length > 0) {
      intermediate = intermediate[0].toUpperCase() + intermediate.slice(1);
    }
    return intermediate;
  };

  const formatOther = (w: string) => {
    const lower = (w || '').toLowerCase();
    if (!lower) return '';
    if (lower === 'tv') return 'TV';
    if (lower === 'dodaci') return 'dodaci';
    return lower[0].toUpperCase() + lower.slice(1);
  };

  const first = formatFirst(words[0]);
  const rest = words.slice(1).map(formatOther);
  return [first, ...rest].join(' ');
};

interface GenerateMetadataParams {
  params: Promise<{ locale: string; subcategory: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale, subcategory } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metaData.accessories',
  });

  return {
    title: subcategory
      ? `${normalizeLink(subcategory)} | AT Store`
      : t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{
    subcategory: string;
  }>;
}) {
  const { subcategory } = await params;
  const normalizedSubcategory = normalizeLink(subcategory);

  return (
    <Content
      categoryLink={ACCESSORY_CATEGORY_LINK}
      pageTitle={normalizedSubcategory}
      subCategoryLink={subcategory}
    />
  );
}
