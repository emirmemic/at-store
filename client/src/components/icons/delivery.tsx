import { IconProps } from '@/lib/types/base';

const IconDelivery = ({ size = 24, className = '', ...props }: IconProps) => {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 52 48"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.7531 32.642L28.1605 35.1112C28.1605 35.1112 46.679 31.4075 49.1481 31.4075C51.6173 31.4075 51.6173 33.8766 49.1481 36.3457C46.679 38.8149 38.037 46.2223 30.6296 46.2223C23.2222 46.2223 18.284 42.5186 13.3457 42.5186H1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M1 27.7038C3.46914 25.2346 8.40741 21.5309 13.3457 21.5309C18.284 21.5309 30.0123 26.4692 31.8642 28.9383C33.716 31.4075 28.1605 35.1112 28.1605 35.1112M15.8148 14.1235V4.24697C15.8148 3.59211 16.075 2.96408 16.538 2.50103C17.0011 2.03797 17.6291 1.77783 18.284 1.77783H47.9136C48.5684 1.77783 49.1965 2.03797 49.6595 2.50103C50.1226 2.96408 50.3827 3.59211 50.3827 4.24697V24.0001"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M26.9258 1.77783H39.2715V12.8889H26.9258V1.77783Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default IconDelivery;
