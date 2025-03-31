'use client';
import { useState } from 'react';

import { ProductCard } from '@/components/product-cards';
import { dummyMacProducts } from '@/data/dummy-data';

export default function ProductList() {
  const [products, setProducts] = useState(dummyMacProducts);
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
    <div className="flex grid-cols-2 flex-col flex-wrap items-center gap-8 py-11 md:flex-row md:items-start md:justify-center">
      {products.map((product) => (
        <ProductCard
          key={product.product_variant_id}
          className="self-stretch"
          product={product}
          onToggleFavorite={() => toggleFavorite(product.product_variant_id)}
        />
      ))}
    </div>
  );
}
