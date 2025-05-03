import { ProductDetailsPopup } from '@/components/popup';
import { ProductResponse, ProductTypeResponse } from '@/lib/types';

import Buttons from './buttons';
import ImagesSlider from './images-slider';
import NamePrice from './name-price';
import Options from './options';

interface ContentProps {
  productData: ProductResponse;
  productOptions: ProductTypeResponse;
}
export default function Content({ productData, productOptions }: ContentProps) {
  const { details, name, originalPrice, discountedPrice } = productData;
  const finalPrice = discountedPrice ?? originalPrice;
  const image = productData.images?.[0] || null;
  return (
    <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="order-1 flex flex-col gap-5 md:order-2">
        <NamePrice
          discountedPrice={discountedPrice}
          name={name}
          originalPrice={originalPrice}
        />
        <div className="hidden w-full gap-14 md:flex md:flex-col">
          <Options
            finalPrice={finalPrice}
            options={productOptions}
            productData={productData}
          />
          <Buttons product={productData} />
        </div>
      </div>
      <div className="order-2 flex flex-col items-start gap-5 md:order-1">
        <ImagesSlider
          className="mb-5"
          images={productData.images}
          tag={productData.tag}
        />
        {details && (
          <ProductDetailsPopup
            className=""
            details={details}
            finalPrice={finalPrice}
            image={image}
            name={name}
          />
        )}
        <div className="flex w-full flex-col gap-14 md:hidden">
          <Options
            finalPrice={finalPrice}
            options={productOptions}
            productData={productData}
          />
          <Buttons product={productData} />
        </div>
      </div>
    </div>
  );
}
