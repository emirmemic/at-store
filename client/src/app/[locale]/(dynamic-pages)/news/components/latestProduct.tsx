import { StrapiImage } from '@/components';
import { cn } from '@/lib/utils/utils';

import { ProductItem } from '../types';

export default function LatestProduct({
  title,
  description,
  image,
  index,
}: Readonly<ProductItem>) {
  const reverseRow = index % 2 !== 0;
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-9 md:gap-11 lg:flex-row',
        reverseRow && 'lg:flex-row-reverse'
      )}
    >
      <div className="h-full w-full max-w-80 transition-transform duration-300 hover:scale-[1.02] md:max-w-96 lg:max-w-80">
        <StrapiImage
          priority
          alt={image?.alternativeText || image?.name || null}
          className="size-80 w-full rounded-2xl object-cover md:size-96 lg:size-80"
          height={600}
          sizes="(max-width: 768px) 80vw, 520px"
          src={image?.url ?? ''}
          width={600}
        />
      </div>

      <div
        className={cn(
          'flex flex-col items-center text-center text-white lg:w-1/2',
          reverseRow
            ? 'lg:mr-auto lg:items-start lg:text-left'
            : 'lg:ml-auto lg:items-end lg:text-right'
        )}
      >
        <h2 className="pb-7 heading-2 md:pb-12 lg:pb-5">{title}</h2>
        <p className="bullet-1">{description}</p>
      </div>
    </div>
  );
}
