'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { AnimateAppearance } from '@/components/transitions';
import { Button } from '@/components/ui/button';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ColorResponse, IdentificationResponse } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

import FilterItem from './filter-item';

interface FiltersProps {
  className?: string;
  isLoading: boolean;
  categoryLink: string;
  subCategoryLink?: string;
}
export default function Filters({
  className,
  isLoading,
  categoryLink,
  subCategoryLink,
}: FiltersProps) {
  const [colors, setColors] = useState<ColorResponse[]>([]);
  const [brands, setBrands] = useState<IdentificationResponse[]>([]);
  const [materials, setMaterials] = useState<IdentificationResponse[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('accessoriesPage');

  // Sync state with URL on load
  useEffect(() => {
    const initialColors =
      searchParams.get('color')?.split(',').filter(Boolean) || [];
    const initialBrands =
      searchParams.get('brand')?.split(',').filter(Boolean) || [];
    const initialMaterials =
      searchParams.get('material')?.split(',').filter(Boolean) || [];
    setSelectedColors(initialColors);
    setSelectedBrands(initialBrands);
    setSelectedMaterials(initialMaterials);
  }, [searchParams]);

  useEffect(() => {
    const makePath = (endpoint: string) => {
      let path;
      if (subCategoryLink) {
        path = `${STRAPI_BASE_URL}/api/${endpoint}/by-sub-category-link/${subCategoryLink}`;
      } else {
        path = `${STRAPI_BASE_URL}/api/${endpoint}/by-category-link/${categoryLink}`;
      }
      return path;
    };

    async function fetchFilters() {
      const colorsPath = makePath('colors');
      const brandsPath = makePath('brands');
      const materialsPath = makePath('materials');

      const fetchOptions = { method: 'GET' as const, isAuth: false };

      const [colorsRes, brandsRes, materialsRes] = await Promise.all([
        fetchAPI<ColorResponse[]>(colorsPath, fetchOptions),
        fetchAPI<IdentificationResponse[]>(brandsPath, fetchOptions),
        fetchAPI<IdentificationResponse[]>(materialsPath, fetchOptions),
      ]);

      setColors(colorsRes?.data || []);
      setBrands(brandsRes?.data || []);
      setMaterials(materialsRes?.data || []);
    }

    fetchFilters();
  }, [categoryLink, subCategoryLink]);

  const handleFilterChange = (
    filterType: 'color' | 'brand' | 'material',
    filterName: string
  ) => {
    let updatedFilters: string[];
    let setFilterState: React.Dispatch<React.SetStateAction<string[]>>;

    switch (filterType) {
      case 'color':
        updatedFilters = selectedColors.includes(filterName)
          ? selectedColors.filter((c) => c !== filterName)
          : [...selectedColors, filterName];
        setFilterState = setSelectedColors;
        break;
      case 'brand':
        updatedFilters = selectedBrands.includes(filterName)
          ? selectedBrands.filter((b) => b !== filterName)
          : [...selectedBrands, filterName];
        setFilterState = setSelectedBrands;
        break;
      case 'material':
        updatedFilters = selectedMaterials.includes(filterName)
          ? selectedMaterials.filter((m) => m !== filterName)
          : [...selectedMaterials, filterName];
        setFilterState = setSelectedMaterials;
        break;
      default:
        return;
    }

    setFilterState(updatedFilters);
    updateQueryParams(filterType, updatedFilters);
  };

  const updateQueryParams = (
    key: 'color' | 'brand' | 'material',
    values: string[]
  ) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      currentParams.set(key, values.join(','));
    } else {
      currentParams.delete(key);
    }

    currentParams.set('page', '1'); // reset page
    if (!currentParams.has('sort')) {
      currentParams.set('sort', 'latest');
    }

    const newRoute = `${pathname}?${currentParams.toString()}`;
    router.push(newRoute);
  };
  const resetFilters = () => {
    setSelectedColors([]);
    setSelectedBrands([]);
    setSelectedMaterials([]);

    const resetParams = new URLSearchParams();
    resetParams.set('page', '1');
    resetParams.set('sort', 'latest');

    const newRoute = `${pathname}?${resetParams.toString()}`;
    router.push(newRoute);
  };

  return (
    <aside
      className={cn(
        'flex h-fit flex-col gap-2 border-b border-black px-2 pb-2 md:rounded-2xl md:border md:pb-12 md:pt-5',
        className
      )}
    >
      {/* Reset button */}
      <AnimateAppearance
        className="flex w-full justify-center"
        isVisible={
          selectedColors.length > 0 ||
          selectedBrands.length > 0 ||
          selectedMaterials.length > 0
        }
      >
        <Button
          size="sm"
          transparentVariant="blue_black"
          variant="transparent"
          onClick={resetFilters}
        >
          {t('resetFilters')}
        </Button>
      </AnimateAppearance>

      <div className="flex w-full flex-wrap justify-between gap-2 md:flex-col">
        {/* Colors */}
        <FilterItem
          className="w-36 md:w-full"
          isLoading={isLoading}
          items={colors}
          selectedItems={selectedColors}
          title={t('color')}
          onFilterChange={(name) => handleFilterChange('color', name)}
        />

        {/* Brands */}
        <FilterItem
          className="w-36 md:w-full"
          isLoading={isLoading}
          items={brands}
          selectedItems={selectedBrands}
          title={t('brand')}
          onFilterChange={(name) => handleFilterChange('brand', name)}
        />

        {/* Materials */}
        <FilterItem
          className="w-36 md:w-full"
          isLoading={isLoading}
          items={materials}
          selectedItems={selectedMaterials}
          title={t('material')}
          onFilterChange={(name) => handleFilterChange('material', name)}
        />
      </div>
    </aside>
  );
}
