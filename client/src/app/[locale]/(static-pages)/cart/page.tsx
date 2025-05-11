'use client';
import { useTranslations } from 'next-intl';

import { useCartProvider } from '@/app/providers';
import { InfoBlock } from '@/components';
import { getInfoBlocksData } from '@/lib/data';

import { MostSoldSection } from '../components';
import PageTitle from '../components/page-title';

import { CartItemsList, EmptyCart, TotalPriceSection } from './components';

export default function CartPage() {
  const t = useTranslations();
  const { cart } = useCartProvider();

  const infoBlocks = getInfoBlocksData(t);

  return (
    <main className="flex flex-col py-12 container-max-width">
      <PageTitle title={t('cartPage.title')} />
      {cart && cart.length > 0 ? (
        <>
          <CartItemsList />
          <TotalPriceSection />
        </>
      ) : (
        <EmptyCart />
      )}
      <MostSoldSection />
      <div className="mt-20 flex flex-col items-center justify-center gap-8">
        {infoBlocks.map((infoBlock) => (
          <InfoBlock
            key={infoBlock.id}
            actionLink={infoBlock.actionLink}
            className="w-full md:max-w-[688px] lg:max-w-[1058px]"
            description={infoBlock.description}
            isFavorites={infoBlock.isFavorites}
            title={infoBlock.title}
          />
        ))}
      </div>
    </main>
  );
}
