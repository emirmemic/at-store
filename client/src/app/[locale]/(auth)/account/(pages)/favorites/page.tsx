'use client';

import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { UserContext } from '@/app/providers';
import { IconHeart } from '@/components/icons';

import { EmptyContent } from '../../components';

import { FavoriteProductCard } from './components';

export default function Page() {
  const t = useTranslations();
  const userProvider = useContext(UserContext);
  const favorites = userProvider.user?.favoriteProducts;

  if (!favorites || favorites.length === 0) {
    return (
      <EmptyContent
        Icon={IconHeart}
        buttonAction={() => {
          // TODO: Implement the button action
        }}
        buttonText={t('common.add')}
        emptyText={t('accountPage.favorites.noFavorites')}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {favorites &&
        favorites.map((product) => (
          <FavoriteProductCard key={product.documentId} product={product} />
        ))}
    </div>
  );
}
