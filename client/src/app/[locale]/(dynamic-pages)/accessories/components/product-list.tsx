import { ProductCard } from '@/components/product-cards';
import { ProductResponse } from '@/lib/types';

interface ProductListProps {
  products: ProductResponse[];
  className?: string;
}

export default function ProductList({
  products,
  className = '',
}: ProductListProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-8 ${className}`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.productVariantId}
          className="self-stretch"
          product={product}
          variant={'accessories'}
        />
      ))}
    </div>
  );
}
