import { IconProps } from '@/lib/types';

export default function IconNews({
  size = 24,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 31 27"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_3278_371)">
        <path
          d="M2.09375 13.5V23.25C2.09375 25.0781 3.92188 26.9062 5.75 26.9062H25.25C27.0781 26.9062 28.9062 25.0781 28.9062 23.25V13.5M2.09375 13.5H8.79688C8.79688 13.5 10.0156 17.7656 15.5 17.7656C20.9844 17.7656 22.2031 13.5 22.2031 13.5H28.9062M2.09375 13.5V17.7656M2.09375 13.5L3.3125 7.40625M28.9062 13.5L27.6875 7.40625M12.4531 4.96875H18.5469M12.4531 9.84375H18.5469M7.57812 9.84375V0.09375H23.4219V9.84375"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3278_371">
          <rect
            fill="currentColor"
            height="26.8125"
            transform="translate(0.5 0.09375)"
            width="30"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
