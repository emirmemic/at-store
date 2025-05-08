import { IconProps } from '@/lib/types';

interface IconCartProps extends IconProps {
  itemsInCart?: number;
}

export default function IconCart({
  size = 18,
  className = '',
  itemsInCart = 0,
  ...props
}: IconCartProps) {
  return (
    <span className="relative">
      {itemsInCart > 0 && (
        <span className="absolute bottom-0 left-0 right-0 top-1 flex items-center justify-center rounded-full text-current paragraph-3">
          {itemsInCart}
        </span>
      )}
      <svg
        className={className}
        fill="none"
        height={size}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M7.71053 4.09756V4.59756H8.21053H15.7895H16.2895V4.09756C16.2895 2.18856 14.3546 0.670732 12 0.670732C9.64536 0.670732 7.71053 2.18856 7.71053 4.09756ZM6.94737 4.59756H7.44737V4.09756C7.44737 2.13291 9.46397 0.5 12 0.5C14.5361 0.5 16.5526 2.13291 16.5526 4.09756V4.59756H17.0526H21.4737C22.6293 4.59756 23.5 5.4571 23.5 6.43902V21.6585C23.5 22.6405 22.6293 23.5 21.4737 23.5H2.52632C1.37075 23.5 0.5 22.6405 0.5 21.6585V6.43902C0.5 5.45711 1.37076 4.59756 2.52632 4.59756H6.94737ZM2.52632 4.76829C1.58901 4.76829 0.763158 5.48121 0.763158 6.43902V21.6585C0.763158 22.6164 1.58902 23.3293 2.52632 23.3293H21.4737C22.411 23.3293 23.2368 22.6164 23.2368 21.6585V6.43902C23.2368 5.48122 22.411 4.76829 21.4737 4.76829H2.52632Z"
          stroke="currentColor"
        />
      </svg>
    </span>
  );
}
