import { IconProps } from '@/lib/types/base';

export default function IconClose({
  size = 24,
  className = '',
  ...props
}: IconProps) {
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
      <rect
        height="23"
        rx="11.5"
        stroke="currentColor"
        width="23"
        x="0.5"
        y="0.5"
      />
      <path
        d="M16.6464 6.64649L12 11.2929L7.35355 6.64645L7 7L6.64645 7.35355L11.2929 12L6.64649 16.6464L7.00004 17L7.35359 17.3536L12 12.7071L16.6464 17.3536L17 17L17.3536 16.6464L12.7071 12L17.3536 7.35359L17 7.00004L16.6464 6.64649Z"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}
