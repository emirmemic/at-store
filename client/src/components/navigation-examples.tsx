'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import IconHeart from '@/components/icons/heart';
import FavoritesHeart from '@/components/ui/favorites-heart';
import Loader from '@/components/ui/loader';
import NavigationArrow from '@/components/ui/navigation-arrow';
import PaginationPages from '@/components/ui/pagination-pages';
import PlayPause from '@/components/ui/play-pause';
import ProductsSliderPagination from '@/components/ui/products-slider-pagination';
import ProgressBar from '@/components/ui/progress-bar';
import { useRouter, usePathname } from '@/i18n/routing';

export default function NavigationExamples() {
  const t = useTranslations('navigation');
  const totalPages = 12;
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    setActivePage(page);
    router.push({ pathname, query: { page } });
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActivePage((prev) => (prev === totalPages ? 1 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <>
      <div className="h-[2px] w-full bg-grey"></div>
      <h3 className="display">Navigation</h3>
      <div className="h-[2px] w-full bg-grey"></div>
      <div className="flex items-center gap-2">
        Products slider pagination dots
        <ProductsSliderPagination
          total={totalPages}
          currentPage={activePage}
          onDotClick={(page) => setActivePage(page)}
        />
      </div>
      <div className="flex items-center gap-2">
        Products slider pagination dots disabled
        <ProductsSliderPagination
          total={totalPages}
          currentPage={activePage}
          disabled
          onDotClick={(page) => setActivePage(page)}
        />
      </div>
      <div className="flex items-center gap-2">
        Slider Progress Bar Light:
        <ProgressBar
          total={totalPages}
          currentPage={activePage}
          variant="light"
          onDotClick={(page) => setActivePage(page)}
        />
      </div>
      <div className="flex items-center gap-2">
        Slider Progress Bar Dark:
        <ProgressBar
          total={totalPages}
          currentPage={activePage}
          variant="dark"
          onDotClick={(page) => setActivePage(page)}
        />
      </div>
      <div className="flex items-center gap-2">
        Slider Progress Bar Disabled:
        <ProgressBar
          total={totalPages}
          currentPage={activePage}
          variant="light"
          disabled
          onDotClick={(page) => setActivePage(page)}
        />
      </div>
      <div className="flex items-center gap-2">
        Slider Navigation Arrows:
        <NavigationArrow
          aria-label={t('previous')}
          title={t('previous')}
          type="button"
          direction={'left'}
        />
        <NavigationArrow
          type="button"
          direction={'right'}
          aria-label={t('next')}
          title={t('next')}
        />
        <NavigationArrow type="button" direction={'top'} />
        <NavigationArrow type="button" direction={'bottom'} />
        <NavigationArrow type="button" size={'lg'} />
        Disabled small:
        <NavigationArrow disabled variant={'black'} />
        Disabled large:
        <NavigationArrow disabled variant={'black'} size={'lg'} />
      </div>
      <div className="flex items-center gap-2 rounded-md bg-black px-2 py-1 text-white">
        Slider Navigation Arrow with white color:
        <NavigationArrow variant={'white'} size={'lg'} />
        Disabled: <NavigationArrow disabled variant={'white'} size={'lg'} />
      </div>
      <PaginationPages
        total={totalPages}
        currentPage={activePage}
        onPageChange={handlePageChange}
      />
      <div className="flex items-center gap-2">
        Add To Favorites:
        <FavoritesHeart
          className="w-fit"
          isInFavorites={isInFavorites}
          onClick={() => setIsInFavorites(!isInFavorites)}
        />
      </div>
      <div className="flex items-center gap-2">
        <PlayPause
          isPlaying={isPlaying}
          onClick={() => setIsPlaying(!isPlaying)}
          variant="light"
        />
        <PlayPause
          isPlaying={isPlaying}
          onClick={() => setIsPlaying(!isPlaying)}
          variant="dark"
        />
        <PlayPause
          isPlaying={isPlaying}
          onClick={() => setIsPlaying(!isPlaying)}
          variant="dark"
          disabled
        />
      </div>
      <div className="flex items-center gap-2">
        <Loader />
        <Loader className="stroke-grey-darkest text-grey-dark" />
        <Loader size={24} />
      </div>
      <div className="flex items-center gap-2">
        Example Icon Usage with tailwind classes:
        <IconHeart size={30} filled className="text-grey-dark" />
        <IconHeart size={30} className="text-blue-primary" />
      </div>
    </>
  );
}
