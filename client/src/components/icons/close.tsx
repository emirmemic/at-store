import { IconProps } from '@/lib/types/base';

export default function IconClose({
  size = 24,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      className={className}
      height={size}
      width={size}
      {...props}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="31" rx="15.5" stroke="black" width="31" x="0.5" y="0.5" />
      <path
        d="M20.6464 10.6465L16 15.2929L11.3536 10.6464L11 11L10.6464 11.3536L15.2929 16L10.6465 20.6464L11 21L11.3536 21.3536L16 16.7071L20.6464 21.3536L21 21L21.3536 20.6464L16.7071 16L21.3536 11.3536L21 11L20.6464 10.6465Z"
        stroke="black"
        strokeLinecap="round"
      />
    </svg>
  );
}
