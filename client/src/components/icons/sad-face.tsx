import { IconProps } from '@/lib/types/base';

export default function IconSadFace({
  size = 276,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      fill="none"
      height={size}
      viewBox="0 0 276 276"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
    >
      <path
        d="M137.667 274.667C213.146 274.667 274.333 213.479 274.333 138C274.333 62.5211 213.146 1.33337 137.667 1.33337C62.1878 1.33337 1 62.5211 1 138C1 213.479 62.1878 274.667 137.667 274.667Z"
        stroke="black"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M81.375 196.001C88.1127 190.166 96.9823 185.956 106.549 183.196C116.677 180.361 127.151 178.949 137.668 179C148.41 179 159.125 180.408 168.787 183.196C178.354 185.956 187.237 190.166 193.961 196.001"
        stroke="black"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M96.6654 127.75C106.1 127.75 113.749 120.102 113.749 110.667C113.749 101.232 106.1 93.5834 96.6654 93.5834C87.2305 93.5834 79.582 101.232 79.582 110.667C79.582 120.102 87.2305 127.75 96.6654 127.75Z"
        fill="black"
        stroke="black"
        strokeLinecap="round"
        strokeWidth="0.5"
      />
      <path
        d="M178.665 127.75C188.1 127.75 195.749 120.102 195.749 110.667C195.749 101.232 188.1 93.5834 178.665 93.5834C169.231 93.5834 161.582 101.232 161.582 110.667C161.582 120.102 169.231 127.75 178.665 127.75Z"
        fill="black"
        stroke="black"
        strokeLinecap="round"
        strokeWidth="0.5"
      />
    </svg>
  );
}
