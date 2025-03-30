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
      height={size}
      viewBox="0 0 29 29"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className={pathClassName}
        d="M2.4165 11.0406C2.4165 16.9167 7.274 20.0475 10.8289 22.8508C12.0832 23.8392 13.2915 24.7708 14.4998 24.7708C15.7082 24.7708 16.9165 23.8404 18.1708 22.8496C21.7269 20.0487 26.5832 16.9167 26.5832 11.0418C26.5832 5.16685 19.9373 0.996888 14.4998 6.64706C9.06234 0.996888 2.4165 5.16443 2.4165 11.0406Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
}
