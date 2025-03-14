import Image from 'next/image';

import { ImageProps, LinkProps } from '@/lib/types/base';

import { Button } from './ui/button';

interface HomePageCardProps {
  homePageCard: HomePageCard;
}

interface HomePageCard {
  title: string;
  subtitle: string;
  image: ImageProps;
  buyNowLink: LinkProps;
  readMoreLink: LinkProps;
}

export default function HomePageCard(props: Readonly<HomePageCardProps>) {
  const { title, subtitle, image, buyNowLink, readMoreLink } =
    props.homePageCard;
  return (
    <div className="relative inline-block">
      <Image
        alt={image.alternativeText ?? ''}
        className="h-[356px] w-[414px] rounded-2xl object-cover shadow-large-black md:h-[400px] md:w-[332px] lg:h-[474px] lg:w-[600px]"
        height={474}
        sizes="(max-width: 768px) 414px, (max-width: 1024px) 332px, 600px"
        src={image.url}
        width={600}
      />
      <div className="absolute inset-0 top-8 text-center text-white">
        <h3 className="heading-3">{title}</h3>
        <h3 className="heading-4">{subtitle}.</h3>
        <Button className="mr-14" size={'sm'} variant={'transparent'}>
          {readMoreLink.label}
        </Button>
        <Button size={'sm'} variant={'filled'}>
          {buyNowLink.label}
        </Button>
      </div>
    </div>
  );
}
