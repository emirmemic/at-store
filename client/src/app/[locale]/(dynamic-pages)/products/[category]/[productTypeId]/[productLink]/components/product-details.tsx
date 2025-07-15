'use client';

import { useProductVariants } from '@/app/providers/product-variants-provider';
import { ProductDetailsPopup } from '@/components/popup';

import Buttons from './buttons';
import ImagesSlider from './images-slider';
import NamePrice from './name-price';
import Options from './options';

export default function ProductDetails() {
  const { productOptions, selectedVariant } = useProductVariants();

  const {
    details,
    name,
    originalPrice,
    discountedPrice,
    tag,
    images,
    productVariantId,
  } = selectedVariant;
  const finalPrice = discountedPrice ?? originalPrice;
  const image = selectedVariant.images?.[0] || null;
  return (
    <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="order-1 flex flex-col gap-5 md:order-2">
        <NamePrice
          discountedPrice={discountedPrice}
          name={name}
          originalPrice={originalPrice}
          productVariantId={productVariantId}
        />
        <div className="hidden w-full gap-14 md:flex md:flex-col">
          <Options finalPrice={finalPrice} options={productOptions} />
          <Buttons product={selectedVariant} />
        </div>
      </div>
      <div className="order-2 flex flex-col items-start gap-12 md:order-1">
        <ImagesSlider className="mb-5" images={images} tag={tag} />
        {details && (
          <>
            <div className="h-0.5 w-full bg-grey-light"></div>
            <ProductDetailsPopup
              className=""
              details={details}
              finalPrice={finalPrice}
              image={image}
              name={name}
            />
          </>
        )}
        <div className="flex w-full flex-col gap-14 md:hidden">
          <Options finalPrice={finalPrice} options={productOptions} />
          <Buttons product={selectedVariant} />
        </div>
      </div>
    </div>
  );
}
