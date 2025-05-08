import { ProductCard } from '@/components/product-cards';
import { ProductResponse } from '@/lib/types';

interface ProductListProps {
  products: ProductResponse[];
  productCardVariant?: 'standard' | 'accessories';
  className?: string;
}

export default function ProductsList({
  products,
  productCardVariant = 'standard',
  className = '',
}: ProductListProps) {
  return (
    <div
      className={`grid grid-cols-2 items-center gap-4 md:grid-cols-3 ${className}`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          className="self-stretch"
          product={product}
          variant={productCardVariant}
        />
      ))}
    </div>
  );
}
