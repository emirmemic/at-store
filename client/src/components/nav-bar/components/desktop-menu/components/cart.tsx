'use client';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { useCartProvider } from '@/app/providers';
import { useUserProvider } from '@/app/providers/user-provider';
import {
  IconClose,
  IconShoppingCart,
  IconTrash,
  IconX,
} from '@/components/icons';
import { IconCart } from '@/components/nav-bar/icons';
import { StrapiImage } from '@/components/strapi/components';
import { AnimateHeight } from '@/components/transitions';
import { Button } from '@/components/ui/button';
import Price from '@/components/ui/price';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import useClickOutside from '@/lib/hooks/use-onclick-outside';
import { ShoppingCartItem } from '@/lib/types';

const NoItems = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center justify-center gap-4 px-6 pb-14 pt-4">
    <p className="heading-4">{text}</p>
    <IconShoppingCart size={88} />
  </div>
);

const ListItem = ({ item }: { item: ShoppingCartItem }) => {
  const t = useTranslations('productPage');
  const { product, quantity } = item;
  const finalPrice = product.discountedPrice ?? product.originalPrice;
  const totalPrice = finalPrice * quantity;
  const image = product?.images?.[0] ?? null;
  const { updateCart } = useCartProvider();

  const handleRemove = () => {
    updateCart({ ...item, quantity: 0 });
  };

  return (
    <div className="relative flex items-center gap-2 border-b border-grey-extra-light px-6 py-4">
      <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
        {image ? (
          <StrapiImage
            alt={product.name}
            className="h-full w-full object-contain"
            height={100}
            src={image?.url ?? ''}
            width={100}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-grey-almost-white p-4 text-grey-medium paragraph-4">
            {t('noImagesAvailable')}
          </div>
        )}
        {quantity > 1 && (
          <span className="absolute right-1 top-1 flex items-center justify-center gap-0.5 rounded-full bg-blue px-2 py-0.5 text-sm text-white paragraph-2">
            <span>
              <IconX className="h-2 w-2"></IconX>
            </span>
            <span>{quantity}</span>
          </span>
        )}
      </div>
      <div className="flex grow flex-col gap-2">
        <p className="paragraph-2">{product.name}</p>
        <div className="flex items-center gap-2">
          <Price value={totalPrice} />
        </div>
      </div>
      <Button
        className="group absolute bottom-1 right-1 p-2"
        onClick={handleRemove}
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
  const { user } = useUserProvider();
  const isOrganization = user?.accountDetails.role?.type === 'organization';

  const t = useTranslations('navbar');
  const buttonText = isOrganization
    ? t('seeCartAndRequestInvoice')
    : t('seeCart');
  return (
    <div className="relative pb-40">
      <div className="flex max-h-[calc(100vh-20rem)] flex-col gap-2 overflow-y-auto custom-scrollbar">
        {cart.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-4 bg-grey-extra-light px-8 pb-8 pt-5">
        <Button
          asChild
          className="w-full whitespace-normal"
          size={'md'}
          transparentVariant={'black'}
          variant={'transparent'}
          onClick={onClickButton}
        >
          <Link href={PAGE_NAMES.CART}>{buttonText}</Link>
        </Button>
        {!isOrganization && (
          <Button
            asChild
            className="w-full whitespace-normal"
            size={'md'}
            variant={'filled'}
            onClick={onClickButton}
          >
            <Link href={PAGE_NAMES.CHECKOUT}>{t('payment')}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default function DesktopCart() {
  const t = useTranslations('navbar');
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => setIsOpen(false);
  const togglePopup = () => setIsOpen(!isOpen);
  const outsideRef = useRef<HTMLDivElement>(null);
  useClickOutside(outsideRef, closePopup);
  const { cart } = useCartProvider();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div ref={outsideRef} className="flex items-center gap-2">
      <button
        className="group h-full p-1 text-white"
        title={t('account')}
        type="button"
        onClick={togglePopup}
      >
        <span className="sr-only">{t('account')}</span>
        <IconCart
          className="transition-colors duration-300 group-hover:text-grey-medium"
          itemsInCart={cartCount}
          size={18}
        />
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
