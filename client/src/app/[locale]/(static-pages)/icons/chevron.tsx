import { IconProps } from '@/lib/types';

export default function IconChevron({
  size = 16,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      className={className}
      fill="currentColor"
      height={size}
      viewBox="0 0 15 8"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M0.439829 0.853003C1.02463 0.39771 1.97378 0.396934 2.55981 0.85127L7.50123 4.68222L12.4323 0.843202C13.0171 0.387909 13.9662 0.387134 14.5522 0.84147C15.1383 1.29581 15.1393 2.0332 14.5545 2.4885L8.56456 7.1519C7.97976 7.60719 7.03061 7.60797 6.44458 7.15363L0.442059 2.50003C-0.143974 2.04569 -0.144972 1.3083 0.439829 0.853003Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
