import { IconProps } from '@/lib/types/base';

const IconWallet = ({ size = 24, className = '', ...props }: IconProps) => {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 53 50"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.33301 25C1.33301 15.5725 1.33301 10.8575 4.26301 7.93C7.19301 5.0025 11.9055 5 21.333 5H31.333C40.7605 5 45.4755 5 48.403 7.93C51.3305 10.86 51.333 15.5725 51.333 25C51.333 34.4275 51.333 39.1425 48.403 42.07C45.473 44.9975 40.7605 45 31.333 45H21.333C11.9055 45 7.19051 45 4.26301 42.07C1.33551 39.14 1.33301 34.4275 1.33301 25Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M21.333 35H11.333M31.333 35H27.583M1.33301 20H51.333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default IconWallet;
