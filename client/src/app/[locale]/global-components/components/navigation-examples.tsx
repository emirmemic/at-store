'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { IconHeart } from '@/components/icons';
import FavoritesHeart from '@/components/ui/favorites-heart';
import Loader from '@/components/ui/loader';
import NavigationArrow from '@/components/ui/navigation-arrow';
import PaginationPages from '@/components/ui/pagination-pages';
import PlayPause from '@/components/ui/play-pause';
import ProductsSliderPagination from '@/components/ui/products-slider-pagination';
import ProgressBar from '@/components/ui/progress-bar';
import { PAGE_NAMES } from '@/i18n/page-names';
import { useRouter } from '@/i18n/routing';

export default function NavigationExamples() {
  const t = useTranslations('navigation');
  const totalPages = 12;
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const router = useRouter();

  const handlePageChange = (page: number) => {
    setActivePage(page);
    router.push({ pathname: PAGE_NAMES.GLOBAL_COMPONENTS, query: { page } });
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
          currentPage={activePage}
          total={totalPages}
          onDotClick={(page) => setActivePage(page)}
        />
      </div>
      <div className="flex items-center gap-2">
        Products slider pagination dots disabled
        <ProductsSliderPagination
          disabled
          currentPage={activePage}
          total={totalPages}
          onDotClick={(page) => setActivePage(page)}
        />
      </div>
      <div className="flex items-center gap-2">
        Slider Progress Bar Light:
        <ProgressBar
          currentPage={activePage}
          total={totalPages}
          variant="light"
          onDotClick={(page) => setActivePage(page)}
        />
      </div>
      <div className="flex items-center gap-2">
        Slider Progress Bar Dark:
        <ProgressBar
          currentPage={activePage}
          total={totalPages}
          variant="dark"
          onDotClick={(page) => setActivePage(page)}
        />
      </div>
      <div className="flex items-center gap-2">
        Slider Progress Bar Disabled:
        <ProgressBar
          disabled
          currentPage={activePage}
          total={totalPages}
          variant="light"
          onDotClick={(page) => setActivePage(page)}
        />
      </div>
      <div className="flex items-center gap-2">
        Slider Navigation Arrows:
        <NavigationArrow
          aria-label={t('previous')}
          direction={'left'}
          title={t('previous')}
          type="button"
        />
        <NavigationArrow
          aria-label={t('next')}
          direction={'right'}
          title={t('next')}
          type="button"
        />
        <NavigationArrow direction={'top'} type="button" />
        <NavigationArrow direction={'bottom'} type="button" />
        <NavigationArrow size={'lg'} type="button" />
        Disabled small:
        <NavigationArrow disabled variant={'black'} />
        Disabled large:
        <NavigationArrow disabled size={'lg'} variant={'black'} />
      </div>
      <div className="flex items-center gap-2 rounded-md bg-black px-2 py-1 text-white">
        Slider Navigation Arrow with white color:
        <NavigationArrow size={'lg'} variant={'white'} />
        Disabled: <NavigationArrow disabled size={'lg'} variant={'white'} />
      </div>
      <PaginationPages
        currentPage={activePage}
        total={totalPages}
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
          variant="light"
          onClick={() => setIsPlaying(!isPlaying)}
        />
        <PlayPause
          isPlaying={isPlaying}
          variant="dark"
          onClick={() => setIsPlaying(!isPlaying)}
        />
        <PlayPause
          disabled
          isPlaying={isPlaying}
          variant="dark"
          onClick={() => setIsPlaying(!isPlaying)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Loader />
        <Loader className="stroke-grey-darkest text-grey-dark" />
        <Loader size={24} />
      </div>
      <div className="flex items-center gap-2">
        Example Icon Usage with tailwind classes:
        <IconHeart filled className="text-grey-dark" size={30} />
        <IconHeart className="text-blue" size={30} />
      </div>
    </>
  );
}
