import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils/utils';

interface ImgSectionProps {
  title: string;
  content?: { text: string; path?: string }[];
  name: string;
  image: StaticImageData;
  index: number;
  description?: string;
}

export default function ImgSection({
  title,
  content,
  name,
  description,
  image,
  index,
}: Readonly<ImgSectionProps>) {
  const reverseRow = index % 2 !== 0;
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-9 md:gap-11 lg:flex-row',
        reverseRow && 'lg:flex-row-reverse'
      )}
    >
      <div
        className={cn(
          'w-full max-w-[300px] transition-transform duration-300 hover:scale-[1.02] md:max-w-[520px]',
          description && 'w-full max-w-80 md:max-w-96 lg:max-w-80'
        )}
      >
        <Image
          priority
          alt={name}
          className={cn(
            'h-44 w-full rounded-2xl object-cover md:h-80',
            description && 'size-80 md:size-96 lg:size-80'
          )}
          sizes="(max-width: 768px) 80vw, 520px"
          src={image}
        />
      </div>

      <div
        className={cn(
          'flex flex-col items-center text-white',
          reverseRow
            ? 'lg:mr-auto lg:items-start lg:text-left'
            : 'lg:ml-auto lg:items-end lg:text-right',
          description && 'text-center lg:w-1/2'
        )}
      >
        <h2
          className={cn(
            'pb-3 heading-2 md:pb-12 lg:pb-6',
            description && 'pb-7 heading-2 lg:pb-5'
          )}
        >
          {title}
        </h2>
        {description && <p className="bullet-1">{description}</p>}
        {content &&
          content.map((item, index) => (
            <p key={index} className="bullet-1 md:paragraph-1">
              {item.path ? (
                <Link className="text-grey underline" href={item.path}>
                  {item.text}
                </Link>
              ) : (
                item.text
              )}
            </p>
          ))}
      </div>
    </div>
  );
}
