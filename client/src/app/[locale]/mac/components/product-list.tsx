import { ProductCard } from '@/components/product-cards';
import { dummyMacProducts } from '@/data/dummy-data';

export default function ProductList() {
  return (
    <div className="flex grid-cols-2 flex-col flex-wrap items-center gap-8 py-11 md:flex-row md:items-start md:justify-center">
      {dummyMacProducts.map((product) => (
        <ProductCard
          key={product.productVariantId}
          className="self-stretch"
          product={product}
        />
      ))}
    </div>
  );
}
