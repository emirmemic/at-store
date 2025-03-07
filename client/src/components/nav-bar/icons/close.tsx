import { IconProps } from '@/lib/types/base';

export function IconClose({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="11.5" stroke="white" />
      <path
        d="M7 17L11.5578 11.65L11.2687 12.4054V11.9619L7.03401 7H8.42857L12.017 11.255H12.5697L11.7789 11.6015L15.6735 7H17L12.6888 12.0035V12.4401L12.3997 11.6916L16.932 17H15.5459L11.9745 12.7658H11.4218L12.2126 12.4262L8.31803 17H7Z"
        fill="white"
      />
    </svg>
  );
}
