import { IconProps } from '@/lib/types/base';

export function IconSearch({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M16 15.5L12.4167 11.9167M14.3333 7.16667C14.3333 10.8486 11.3486 13.8333 7.66667 13.8333C3.98477 13.8333 1 10.8486 1 7.16667C1 3.48477 3.98477 0.5 7.66667 0.5C11.3486 0.5 14.3333 3.48477 14.3333 7.16667Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
