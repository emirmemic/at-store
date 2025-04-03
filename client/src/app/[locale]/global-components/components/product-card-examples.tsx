'use client';
import { useState } from 'react';

import {
  MacAccessoriesBar,
  ProductCard,
  RelatedProductAccessories,
  SubProductCard,
  InchSelectionTab,
  ProductCartTableItem,
} from '@/components/product-cards';
import { AnimateList } from '@/components/transitions';
import { dummyProducts, placeholderCart } from '@/data/dummy-data';
export default function ProductCardExamples() {
  const [products, setProducts] = useState(dummyProducts);
  const [cartItems, setCartItems] = useState(placeholderCart);
  const toggleFavorite = (id: string) => {
    const updatedProducts = products.map((product) => {
      if (product.product_variant_id === id) {
        return { ...product, is_favorite: !product.is_favorite };
      }
      return product;
    });
    setProducts(updatedProducts);
  };
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
  const removeFromCart = (productId: string) => {
    const updatedCart = cartItems.filter(
      (product) => product.product_variant_id !== productId
    );
    setCartItems(updatedCart);
  };
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const updatedCart = cartItems.map((product) => {
      if (product.product_variant_id === productId) {
        return { ...product, quantity_in_cart: newQuantity };
      }
      return product;
    });
    setCartItems(updatedCart);
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
      <h3 className="heading-2">Product Cards </h3>
      <div className="h-[2px] w-full bg-grey"></div>
      <div className="flex w-full flex-wrap gap-4">
        <div className="flex h-fit flex-col gap-4">
          <p className="paragraph-2">Product Card Standard: </p>
          <ProductCard
            product={products[0]}
            onToggleFavorite={toggleFavorite}
          />
        </div>
        <div className="flex h-fit flex-col gap-4">
          <p className="paragraph-2">Product Card Accessory: </p>
          <ProductCard
            product={products[2]}
            variant="accessories"
            onToggleFavorite={toggleFavorite}
          />
        </div>
        <div className="flex h-fit flex-col gap-4">
          <p className="paragraph-2">Related Product Accessories: </p>
          <RelatedProductAccessories
            product={products[2]}
            onAddToCart={() => {}}
          />
        </div>
        {/* SubProductCard and InchSelectionTab are used together and should have the same width according to the design. That's why the max width is controlled by the parent element, rather than each component individually. */}
        <div className="flex h-fit w-full max-w-[400px] flex-col gap-4 md:max-w-[572px] lg:max-w-[766px]">
          <SubProductCard product={dummyProducts[0]} onClick={() => {}} />
          <InchSelectionTab
            options={inchOptions}
            onSelectInch={handleSelectInch}
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <AnimateList
          getKey={(item) => item.product_variant_id}
          items={cartItems}
          renderItem={(item) => (
            <ProductCartTableItem
              key={item.product_variant_id}
              product={item}
              onQuantityChange={handleQuantityChange}
              onRemove={removeFromCart}
            />
          )}
        />
      </div>
    </>
  );
}
