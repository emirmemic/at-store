import { IconProps } from '@/lib/types';

export default function IconHeart({
  size = 30,
  className = '',
  pathClassName = '',
  filled,
  ...props
}: IconProps) {
  const fillColor = filled ? 'currentColor' : 'none';
  const strokeColor = filled ? 'none' : 'currentColor';

  return (
    <svg
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 25"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className={pathClassName}
        d="M0.599609 8.50684C0.595182 6.74212 1.16183 5.09 2.18359 3.80859L2.39453 3.55664C3.54145 2.25228 5.05036 1.5498 6.63477 1.5498C8.12424 1.54981 9.548 2.17212 10.6699 3.33008L10.8906 3.56836L11.5566 4.32715C11.6706 4.45672 11.8353 4.53027 12.0078 4.53027C12.1801 4.53022 12.3441 4.45649 12.458 4.32715L13.1143 3.58008C14.2664 2.26959 15.7757 1.56739 17.3652 1.56738C18.9555 1.56738 20.4597 2.26432 21.6113 3.57422C22.6928 4.80439 23.3229 6.42328 23.3936 8.17285L23.4004 8.52441V8.52539C23.4004 10.4086 22.7554 12.1637 21.6016 13.4766L12.0254 24.3271V24.3281C12.0098 24.3459 11.9969 24.348 11.9932 24.3486H11.9922L11.96 24.3223L2.4043 13.4541C1.24914 12.1402 0.599692 10.3907 0.599609 8.50879V8.50684Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}
