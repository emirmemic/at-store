import { IconProps } from '@/lib/types/base';

export default function IconPlay({
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
        d="M10.6665 6.85327V25.5199L25.3332 16.1866L10.6665 6.85327Z"
        fill="currentColor"
      />
    </svg>
  );
}
