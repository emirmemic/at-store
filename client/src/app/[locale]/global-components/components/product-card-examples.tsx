'use client';
import {
  InchSelectionTab,
  MacAccessoriesBar,
} from '@/components/product-cards';

export default function ProductCardExamples() {
  const inchOptions = [
    {
      id: '13',
      name: '13-inch',
    },
    {
      id: '14',
      name: '14-inch',
    },
    {
      id: '15',
      name: '15-inch',
    },
    {
      id: '16',
      name: '16-inch',
    },
  ];
  const handleSelectInch = (id: string) => {
    // eslint-disable-next-line no-console
    console.log('Selected inch:', id);
  };
  return (
    <>
      <div className="h-[2px] w-full bg-grey"></div>
      <h2 className="display">Product Cards</h2>
      <div className="h-[2px] w-full bg-grey"></div>
      <h3 className="heading-2">Mac dodaci bar</h3>
      <div className="h-[2px] w-full bg-grey"></div>
      <MacAccessoriesBar />
      <div className="h-[2px] w-full bg-grey"></div>
      <div className="flex w-full flex-wrap gap-4">
        {/* SubProductCard and InchSelectionTab are used together and should have the same width according to the design. That's why the max width is controlled by the parent element, rather than each component individually. */}
        <div className="flex h-fit w-full max-w-[400px] flex-col gap-4 md:max-w-[572px] lg:max-w-[766px]">
          <InchSelectionTab
            options={inchOptions}
            onSelectInch={handleSelectInch}
          />
        </div>
      </div>
      {/* <div className="flex w-full flex-col gap-2">
        <AnimateList
          getKey={(item) => item.productVariantId}
          items={cartItems}
          renderItem={(item) => (
            <ProductCartTableItem
              key={item.productVariantId}
              product={item}
              onQuantityChange={handleQuantityChange}
              onRemove={removeFromCart}
            />
          )}
        />
      </div> */}
    </>
  );
}
