import Image from 'next/image';
// TODO - Change the Link import from next-intl while building the product details page
// eslint-disable-next-line no-restricted-imports
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { CURRENCY } from '@/lib/constants';
import { ProductType } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface ProductCardProps {
  product: ProductType;
  onAddToCart: (productId: string) => void;
}
export default function PovezaniDodaciCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const t = useTranslations('common');
  const { name, original_price, image, product_link, discounted_price } =
    product;
  const finalPrice = discounted_price ? discounted_price : original_price;
  return (
    <div
      className={cn(
        'relative flex w-full max-w-72 flex-col items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-povezani-dodaci transition-all hover:shadow-povezani-dodaci-hover'
      )}
    >
      {product_link && (
        <Link className="z-1 absolute inset-0" href={product_link}>
          <span className="sr-only">
            {t('view_details', { productName: name })}
          </span>
        </Link>
      )}
      <div className="h-40 w-full">
        <Image
          alt={image?.alternativeText || name}
          className="h-full w-full object-contain"
          height={168}
          src={image.url}
          width={168}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="flex min-h-16 items-center justify-center text-center heading-4">
          {name}
        </p>
        <p className="text-center paragraph-1">{`${finalPrice} ${CURRENCY}`}</p>
      </div>
      <Button
        className="relative z-10"
        size={'md'}
        variant={'filled'}
        onClick={() => onAddToCart(product.product_variant_id)}
      >
        {t('buyNow')}
      </Button>
    </div>
  );
}
