import { IconProps } from '@/lib/types';

export default function IconSearch({
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
      <path
        d="M18.3089 17.5873C18.13 17.7849 18.1376 18.088 18.326 18.2765L23.4897 23.4402C23.5034 23.4539 23.5034 23.4761 23.4897 23.4897C23.4761 23.5034 23.4539 23.5034 23.4402 23.4897L18.2765 18.326C18.088 18.1376 17.7849 18.13 17.5873 18.3089C15.7726 19.952 13.3668 20.9522 10.7261 20.9522C5.07839 20.9522 0.5 16.3738 0.5 10.7261C0.5 5.07839 5.07839 0.5 10.7261 0.5C16.3738 0.5 20.9522 5.07839 20.9522 10.7261C20.9522 13.3668 19.952 15.7726 18.3089 17.5873ZM10.7261 0.570064C5.11708 0.570064 0.570064 5.11708 0.570064 10.7261C0.570064 16.3351 5.11708 20.8822 10.7261 20.8822C16.3351 20.8822 20.8822 16.3351 20.8822 10.7261C20.8822 5.11708 16.3351 0.570064 10.7261 0.570064Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
