'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { IconClose, IconShoppingCart, IconTrash } from '@/components/icons';
import { IconCart } from '@/components/nav-bar/icons';
import { AnimateHeight } from '@/components/transitions';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import useClickOutside from '@/lib/hooks/use-onclick-outside';
import { ShoppingCartItem } from '@/lib/types';

const NoItems = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center justify-center gap-2 px-6 pb-14 pt-4">
    <p className="heading-3">{text}</p>
    <IconShoppingCart size={88} />
  </div>
);

const ListItem = ({ item }: { item: ShoppingCartItem }) => {
  const image = item.images?.[0] ?? null;
  return (
    <div className="relative flex items-center gap-2 border-b border-grey-extra-light px-6 py-4">
      <div className="flex h-32 w-36 items-center justify-center">
        {image && (
          <Image
            alt={item.name}
            className="h-full w-full object-contain"
            height={100}
            src={image?.url ?? ''}
            width={100}
          />
        )}
      </div>
      <div className="flex grow flex-col gap-2">
        <p className="paragraph-1">{item.name}</p>
        <p className="paragraph-1">
          {item.discountedPrice ?? item.originalPrice}
        </p>
      </div>
      <Button
        className="group absolute bottom-1 right-1 p-2"
        onClick={() => {}}
      >
        <IconTrash
          className="transition-colors duration-300 group-hover:text-grey-darker"
          size={24}
        />
      </Button>
    </div>
  );
};

interface ItemsInCartProps {
  cart: ShoppingCartItem[];
  onClickButton: () => void;
}
const ItemsInCart = ({ cart, onClickButton }: ItemsInCartProps) => {
  const t = useTranslations('navbar');
  return (
    <div className="relative pb-40">
      <div className="flex max-h-[calc(100vh-20rem)] flex-col gap-2 overflow-y-auto custom-scrollbar">
        {cart.map((item) => (
          <ListItem key={item.productVariantId} item={item} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-between gap-4 bg-grey-extra-light pb-8 pt-5">
        <Button
          asChild
          className="w-full max-w-48 whitespace-normal"
          size={'md'}
          transparentVariant={'black'}
          variant={'transparent'}
          onClick={onClickButton}
        >
          <Link href={PAGE_NAMES.CART}>{t('seeCart')}</Link>
        </Button>
        <Button
          asChild
          className="w-full max-w-48 whitespace-normal"
          size={'md'}
          variant={'filled'}
          onClick={onClickButton}
        >
          <Link href={PAGE_NAMES.PAYMENT}>{t('payment')}</Link>
        </Button>
      </div>
    </div>
  );
};

interface DesktopCartProps {
  cart: ShoppingCartItem[];
}
export default function DesktopCart({ cart }: DesktopCartProps) {
  const t = useTranslations('navbar');
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => setIsOpen(false);
  const togglePopup = () => setIsOpen(!isOpen);
  const outsideRef = useRef<HTMLDivElement>(null);
  useClickOutside(outsideRef, closePopup);

  return (
    <div ref={outsideRef} className="flex items-center gap-2">
      <button
        className="group h-full p-1 text-white"
        title={t('account')}
        type="button"
        onClick={togglePopup}
      >
        <span className="sr-only">{t('account')}</span>
        <IconCart className="transition-colors duration-300 group-hover:text-grey-medium" />
      </button>
      <AnimateHeight
        className="fixed right-0 top-nav-height w-96 rounded-l-2xl bg-white shadow-standard-black"
        isVisible={isOpen}
      >
        <div>
          <div className="item flex items-center gap-2 border-b border-grey-extra-light p-5">
            <Button
              aria-label={t('closeMenu')}
              className="group p-1"
              title={t('closeMenu')}
              onClick={closePopup}
            >
              <IconClose
                className="text-black transition-colors duration-300 group-hover:text-grey-darker"
                size={32}
              />
            </Button>
            <p className="flex grow items-center justify-center heading-4">
              {t('cart')}
            </p>
          </div>
          {cart.length > 0 ? (
            <ItemsInCart cart={cart} onClickButton={closePopup} />
          ) : (
            <NoItems text={t('noItems')} />
          )}
        </div>
      </AnimateHeight>
    </div>
  );
}
