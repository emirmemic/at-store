/* eslint-disable no-restricted-imports */
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils/utils';

interface ImgSectionProps {
  title: string;
  content: { text: string; path?: string }[];
  name: string;
  image: StaticImageData;
  id: number;
}

export default function ImgSection({
  title,
  content,
  name,
  image,
  id,
}: Readonly<ImgSectionProps>) {
  const isEven = id % 2 === 0;
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-12 lg:flex-row',
        isEven && 'lg:flex-row-reverse'
      )}
    >
      <div className="w-full max-w-[300px] transition-transform duration-300 hover:scale-[1.02] md:max-w-[520px]">
        <Image
          alt={name}
          className="h-auto w-full rounded-2xl"
          height={303}
          sizes="(max-width: 768px) 80vw, 520px"
          src={image}
          width={520}
        />
      </div>

      <section
        className={cn(
          'flex flex-col items-center text-white',
          isEven ? 'lg:mr-auto lg:items-start' : 'lg:ml-auto lg:items-end'
        )}
      >
        <h2 className="pb-3 heading-2 md:pb-12 lg:pb-6">{title}</h2>
        {content.map((item, index) => (
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
      </section>
    </div>
  );
}
