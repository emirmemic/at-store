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
        d="M0.5 8.50684C0.495573 6.72071 1.06875 5.04618 2.10547 3.74609L2.31934 3.49121C3.48374 2.16676 5.0192 1.4502 6.63477 1.4502C8.15362 1.4502 9.60287 2.08468 10.7422 3.26074L10.9658 3.50293L11.6318 4.26074L12.0078 4.6875L12.3828 4.26074L13.0391 3.51465C14.2086 2.18433 15.7447 1.46778 17.3652 1.46777C18.9864 1.46777 20.5164 2.17897 21.6855 3.50879C22.7832 4.75733 23.4217 6.39788 23.4932 8.16895L23.5 8.52441V8.52539C23.5 10.4311 22.8475 12.2098 21.6768 13.542L12.1006 24.3936V24.3945C12.0622 24.4382 12.0198 24.4502 11.9922 24.4502C11.9791 24.4501 11.9506 24.4445 11.918 24.4199L11.8848 24.3887L2.3291 13.5195C1.15723 12.1864 0.500082 10.4135 0.5 8.50879V8.50684Z"
        fill={fillColor}
        stroke={strokeColor}
      />
    </svg>
  );
}
