import { IconProps } from '@/lib/types/base';

export function IconMenu({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect fill="white" height="2" width="24" />
      <rect fill="white" height="2" width="24" y="11" />
      <rect fill="white" height="2" width="24" y="22" />
    </svg>
  );
}
