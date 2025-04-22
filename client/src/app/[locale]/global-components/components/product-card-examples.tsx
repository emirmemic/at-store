'use client';
import qs from 'qs';
import { useEffect, useState } from 'react';

import {
  InchSelectionTab,
  MacAccessoriesBar,
  ProductCard,
  ProductCartTableItem,
  RelatedProductAccessories,
  SubProductCard,
} from '@/components/product-cards';
import { AnimateList } from '@/components/transitions';
import { dummyProducts, placeholderCart } from '@/data/dummy-data';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { useLoader } from '@/lib/hooks';
import { getAuthToken } from '@/lib/services';
import { ProductBase, ProductResponse } from '@/lib/types';

const getProductsQuery = qs.stringify({
  populate: {
    brand: true,
    category: true,
    model: true,
    stores: true,
    color: true,
    memory: true,
    image: {
      fields: ['url', 'alternativeText'],
    },
    favoritedBy: {
      fields: ['id'],
    },
  },
});
export default function ProductCardExamples() {
  const products = dummyProducts;
  const [productsFromApi, setProductsFromApi] = useState<ProductBase[]>([]);
  const [cartItems, setCartItems] = useState(placeholderCart);

  const fetchProducts = async () => {
    const path = '/api/products?';
    const url = new URL(path, STRAPI_BASE_URL);
    url.search = getProductsQuery;

    const authToken = await getAuthToken();
    return fetchAPI<{ data: ProductResponse[] }>(url.href, {
      method: 'GET',
      authToken,
    });
  };

  const { execute, isLoading, error } = useLoader({
    apiCall: fetchProducts,
    onSuccess: (response) => {
      if (response?.data) {
        const convertedProducts = response.data.map(
          (product) =>
            ({
              ...product,
              specifications: [
                `${product.memory?.value ?? ''} ${product.memory?.unit ?? ''}`,
                `${product.color?.name ?? ''}`,
                `${product.material ?? ''}`,
                `${product.ancModel ?? ''}`,
                `${product.keyboard ?? ''}`,
                `${product.wifiModel ?? ''}`,
                `${product.accessoriesType ?? ''}`,
                `${product.braceletSize ?? ''}`,
              ],
              availabilityByStore: product.stores.reduce(
                (acc, store) => ({
                  ...acc,
                  [store.name]: store.products,
                }),
                {} as Record<
                  'Sarajevo SCC' | 'Sarajevo Alta' | 'Banja Luka',
                  number
                >
              ),
              chip: {
                id: 12,
                name: 'I am a chip',
              },
            }) as ProductBase
        );
        setProductsFromApi(convertedProducts);
      }
    },
  });

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <p className="text-lg font-semibold text-gray-500">
          Error: {error.message}
        </p>
      </div>
    );
  }
  // const [products, setProducts] = useState(dummyProducts);

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
      (product) => product.productVariantId !== productId
    );
    setCartItems(updatedCart);
  };
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const updatedCart = cartItems.map((product) => {
      if (product.productVariantId === productId) {
        return { ...product, quantityInCart: newQuantity };
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
      <h3 className="heading-2">Products from API</h3>
      <div className="h-[2px] w-full bg-grey"></div>
      <div className="flex flex-wrap gap-4">
        {productsFromApi.map((product) => (
          <ProductCard
            key={product.id}
            className="self-stretch"
            product={product}
          />
        ))}
      </div>
      <h3 className="heading-2">Mac dodaci bar</h3>
      <div className="h-[2px] w-full bg-grey"></div>
      <MacAccessoriesBar />
      <div className="h-[2px] w-full bg-grey"></div>
      <h3 className="heading-2">Product Cards </h3>
      <div className="h-[2px] w-full bg-grey"></div>
      <div className="flex w-full flex-wrap gap-4">
        <div className="flex h-fit flex-col gap-4">
          <p className="paragraph-2">Product Card Standard: </p>
          <ProductCard product={products[0]} />
        </div>
        <div className="flex h-fit flex-col gap-4">
          <p className="paragraph-2">Product Card Accessory: </p>
          <ProductCard product={products[2]} variant="accessories" />
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
      </div>
    </>
  );
}
