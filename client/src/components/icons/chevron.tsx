import { IconProps } from '@/lib/types/base';

export function IconChevron({
  size = 16,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 18 18"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M0.50898 3.75489C1.20146 3.03044 2.34033 3.01454 3.05271 3.71937L9.05955 9.66246L14.8985 3.55392C15.591 2.82947 16.7298 2.81356 17.4422 3.51839C18.1546 4.22322 18.1708 5.38187 17.4783 6.10632L10.3855 13.5266C9.69302 14.2511 8.55415 14.267 7.84176 13.5622L0.545031 6.34283C-0.167356 5.638 -0.183497 4.47934 0.50898 3.75489Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
