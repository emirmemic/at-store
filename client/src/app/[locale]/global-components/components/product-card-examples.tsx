'use client';
import { useState } from 'react';

import {
  MacAccessoriesBar,
  ProductCard,
  RelatedProductAccessories,
} from '@/components/product-cards';
import { dummyProducts } from '@/data/dummy-data';
export default function ProductCardExamples() {
  const [products, setProducts] = useState(dummyProducts);
  const toggleFavorite = (id: string) => {
    const updatedProducts = products.map((product) => {
      if (product.product_variant_id === id) {
        return { ...product, is_favorite: !product.is_favorite };
      }
      return product;
    });
    setProducts(updatedProducts);
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
            variant="dodaci"
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
      </div>
    </>
  );
}
