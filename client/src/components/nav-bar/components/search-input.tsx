'use client';

import { DYNAMIC_PAGES, PAGE_NAMES } from '@/i18n/page-names';
import { useEffect, useRef, useState } from 'react';

import { AnimateHeight } from '@/components/transitions';
import { ArrowRightCircle } from 'lucide-react';
import { IconSearch } from '../icons';
import Link from 'next/link';
import { ProductResponse } from '@/lib/types';
import { cn } from '@/lib/utils/utils';
import { getSearchResults } from '../actions';
import { useDebounceValue } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function SearchInput({ onClick }: { onClick?: () => void }) {
  const t = useTranslations('navbar');
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const debouncedQuery = useDebounceValue(query, 300);
  const router = useRouter();
  const listRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    setTimeout(() => {
      setQuery('');
      setFocusedIndex(-1);
      if (onClick) {
        onClick();
      }
    }, 200);
  };

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setProducts([]);
      setFocusedIndex(-1);
      return;
    }

    const fetchResults = async () => {
      const data = await getSearchResults(debouncedQuery);
      if (data) {
        setProducts(data);
        setFocusedIndex(-1);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (products.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % products.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (focusedIndex <= 0) {
          setFocusedIndex(-1);
          inputRef.current?.focus();
        } else {
          setFocusedIndex((prev) => prev - 1);
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0) {
          const selectedProduct = products[focusedIndex];
          const productLink = makeProductLink(selectedProduct);
          router.push(productLink);
          handleClick();
        } else {
          router.push(`${PAGE_NAMES.SEARCH}?query=${query}`);
          handleClick();
        }
        break;
      default:
        break;
    }
  };
  const makeProductLink = (product: ProductResponse) => {
    const categoryLink = product.category?.link;
    const subCategoryLink = product.productTypeId;
    const productLink = product.productLink;
    // Triple encode dots - Next.js decodes multiple times during routing
    const encodedProductTypeId = encodeURIComponent(subCategoryLink).replace(
      /\./g,
      '%25252E'
    );
    const encodedProductLink = encodeURIComponent(productLink).replace(
      /\./g,
      '%25252E'
    );
    return `${DYNAMIC_PAGES.PRODUCTS}/${categoryLink}/${encodedProductTypeId}/${encodedProductLink}`;
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="w-full rounded-2xl bg-white">
      <div className="relative w-full">
        <input
          ref={inputRef}
          className={cn(
            'flex h-12 w-full rounded-2xl border-2 border-transparent bg-white py-3 pl-14 pr-4 !font-normal text-black shadow-standard-black paragraph-2 placeholder:text-opacity-50 focus-visible:border-grey-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
          )}
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (debouncedQuery.trim().length > 2) {
              setFocusedIndex(-1);
            }
          }}
          onKeyDown={handleKeyDown}
        />
        <IconSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-darkest" />
        <button
          className="absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 text-grey-darkest"
          title={t('search')}
          type="button"
          onClick={() => {
            if (query.trim().length > 0) {
              router.push(`${PAGE_NAMES.SEARCH}?query=${query}`);
              handleClick();
            }
          }}
        >
          <span className="sr-only">Search</span>
          <ArrowRightCircle />
        </button>
      </div>
      <AnimateHeight
        className="overflow-hidden rounded-2xl"
        isVisible={debouncedQuery.trim().length > 2}
      >
        {products.length === 0 ? (
          <div className="flex h-16 w-full items-center justify-center text-grey paragraph-2">
            {t('noResults')}
          </div>
        ) : (
          <ul
            ref={listRef}
            className="flex max-h-[420px] flex-col gap-1 overflow-y-auto px-1 py-2 text-black"
          >
            {products.map((product, index) => (
              <li key={product.id} className="w-full">
                <Link
                  className={`block w-full rounded-lg p-2 footer-text hover:bg-grey-extra-light ${
                    index === focusedIndex ? 'bg-grey-extra-light' : ''
                  }`}
                  href={makeProductLink(product)}
                  onClick={handleClick}
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </AnimateHeight>
    </div>
  );
}
