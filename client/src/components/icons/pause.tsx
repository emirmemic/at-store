import { IconProps } from '@/lib/types';

export default function IconPause({
  size = 24,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 32 32"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.6667 25.3334V6.66675H24V25.3334H18.6667ZM8 25.3334V6.66675H13.3333V25.3334H8Z"
        fill="currentColor"
      />
    </svg>
  );
}
