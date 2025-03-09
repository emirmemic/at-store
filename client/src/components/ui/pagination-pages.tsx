import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import NavigationArrow from '@/components/ui/navigation-arrow';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationButton,
  PaginationItem,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils/utils';

export interface PaginationPagesProps {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PaginationPages: React.FC<PaginationPagesProps> = ({
  total,
  currentPage,
  onPageChange,
  className,
}) => {
  const t = useTranslations('navigation');
  if (total <= 1) {
    return null;
  }

  const handlePageClick = (page: number) => {
    if (page < 1 || page > total) return;
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const pages: (number | 'ellipsis')[] = [];
  let ellipsisAdded = false;
  for (let page = 1; page <= total; page++) {
    // Always show the first and last pages, and show pages that are within 2 of the current page.
    if (page === 1 || page === total || Math.abs(page - currentPage) <= 2) {
      pages.push(page);
      ellipsisAdded = false;
    } else if (!ellipsisAdded) {
      pages.push('ellipsis');
      ellipsisAdded = true;
    }
  }

  return (
    <Pagination className={cn('mx-auto', className)}>
      <PaginationContent>
        <PaginationItem className="mr-6 md:mr-12">
          <NavigationArrow
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label={t('previous')}
            title={t('previous')}
            className="flex items-center justify-center"
            direction="left"
            variant="black"
            size="lg"
          />
        </PaginationItem>
        <AnimatePresence mode="popLayout">
          {pages.map((item, index) => (
            <motion.div
              key={typeof item === 'number' ? item : `ellipsis-${index}`}
              layout
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {item === 'ellipsis' ? (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem>
                  <PaginationButton
                    isActive={item === currentPage}
                    onClick={() => {
                      handlePageClick(item);
                    }}
                    title={t('page', { pageNumber: item })}
                    aria-label={t('page', { pageNumber: item })}
                  >
                    {item}
                  </PaginationButton>
                </PaginationItem>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <PaginationItem className="ml-6 md:ml-12">
          <NavigationArrow
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === total}
            aria-label={t('next')}
            title={t('next')}
            className="flex items-center justify-center"
            direction="right"
            variant="black"
            size="lg"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationPages;
