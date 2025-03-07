import { IconProps } from '@/lib/types/base';

export function IconMenu({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <rect width="24" height="2" fill="white" />
      <rect y="11" width="24" height="2" fill="white" />
      <rect y="22" width="24" height="2" fill="white" />
    </svg>
  );
}
