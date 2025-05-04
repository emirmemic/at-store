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
    <div className={`flex flex-wrap items-center gap-8 ${className}`}>
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
