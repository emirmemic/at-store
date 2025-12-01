'use client';

import { Filters, Models, Sort } from '.';
import { ModelResponse, ProductResponse } from '@/lib/types';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { IconLoader } from '@/components/icons';
import PaginationPages from '@/components/ui/pagination-pages';
import { ProductsList } from '@/components/product-cards';
import { fetchProducts } from '../actions/actions';
import { parseFiltersFromSearchParams } from '../actions/parse-filters';
import { useDebounceValue } from '@/lib/hooks';
import { useTranslations } from 'next-intl';

export default function Content({
  pageTitle,
  subCategoryLink,
  categoryLink,
}: {
  pageTitle: string;
  subCategoryLink?: string;
  categoryLink: string;
}) {
  // React hooks and initialization
  // Get the router and search parameters
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialPage = +(searchParams.get('page') ?? 1);
  const initialSort = searchParams.get('sort') || 'latest';
  const initialModelId = searchParams.get('model') || null;
  const t = useTranslations();

  // State variables
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [total, setTotal] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>(initialSort);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedModel, setSelectedModel] = useState<ModelResponse | null>({
    id: Number(initialModelId),
    name: '',
    displayName: '',
  });

  // Handlers for sorting and pagination
  const handleSortChange = (newSort: string) => {
    setSortOption(newSort);
    setPage(1);
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('sort', newSort);
    currentParams.set('page', '1');
    const newRoute = `${pathname}?${currentParams.toString()}`;
    router.push(newRoute);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('page', page.toString());
    const newRoute = `${pathname}?${currentParams.toString()}`;
    router.push(newRoute);
  };
  const handleModelChange = (model: ModelResponse) => {
    if (model.id === selectedModel?.id) {
      setSelectedModel(null);
      setPage(1);
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.delete('model');
      currentParams.set('page', '1');
      const newRoute = `${pathname}?${currentParams.toString()}`;
      router.push(newRoute);
      return;
    }
    setSelectedModel(model);
    setPage(1);
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('model', model.id.toString());
    currentParams.set('page', '1');
    const newRoute = `${pathname}?${currentParams.toString()}`;
    router.push(newRoute);
  };

  // Lifecycle hook to fetch products with debouncing
  const debouncedSearchParams = useDebounceValue(searchParams, 500);
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);

      const {
        colorFilters,
        brandFilters,
        materialFilters,
        page,
        sort,
        modelId,
      } = parseFiltersFromSearchParams(debouncedSearchParams);

      const response = await fetchProducts({
        sortOption: sort,
        page,
        colorFilters,
        brandFilters,
        materialFilters,
        categoryLink,
        subCategoryLink,
        modelId,
      });
      setProducts(response?.data?.data || []);
      setTotal(response?.data?.meta.pagination.pageCount || 0);
      setIsLoading(false);
    }

    loadProducts();
  }, [debouncedSearchParams, categoryLink, subCategoryLink]);

  return (
    <div className="relative flex flex-col gap-12 py-6 md:py-12">
      <div className="border-b border-grey-dark pb-4 container-max-width">
        <h1 className="heading-3">{pageTitle}</h1>
      </div>
      <Models
        categoryLink={categoryLink}
        selectedModel={selectedModel}
        subCategoryLink={subCategoryLink}
        onSelectModel={handleModelChange}
      />
      <div className="bg-[#F5F5F7]">
        <div className="relative flex min-h-[400px] flex-col gap-4 py-4 container-max-width">
          {isLoading && (
            <div
              aria-busy="true"
              className="backdrop-blur-xs absolute inset-0 z-10 flex justify-center bg-white bg-opacity-50 py-24"
            >
              <IconLoader className="h-16 w-16" />
            </div>
          )}
          <Sort sortOption={sortOption} onSortChange={handleSortChange} />
          <div className="flex flex-col items-start gap-4 md:grid md:grid-cols-[200px_1fr] md:gap-8">
            <Filters
              categoryLink={categoryLink}
              className="w-full"
              isLoading={isLoading}
              subCategoryLink={subCategoryLink}
            />
            {products.length === 0 && !isLoading ? (
              <p className="text-grey paragraph-2">
                {t('common.noProductsAvailable')}
              </p>
            ) : (
              <ProductsList
                productCardVariant="accessories"
                products={products}
              />
            )}
          </div>
        </div>
        <PaginationPages
          currentPage={page}
          total={total}
          onPageChange={handlePageChange}
          className="py-10"
        />
      </div>
    </div>
  );
}
