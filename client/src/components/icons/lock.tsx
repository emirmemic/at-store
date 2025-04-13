import { IconProps } from '@/lib/types';

export default function IconLock({ className = '', ...props }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height="84"
      viewBox="0 0 77 84"
      width="77"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M66.4937 38.0111H10.5078C6.09059 38.0111 2.50977 41.592 2.50977 46.0091V74.0021C2.50977 78.4192 6.09059 82.0001 10.5078 82.0001H66.4937C70.9108 82.0001 74.4916 78.4192 74.4916 74.0021V46.0091C74.4916 41.592 70.9108 38.0111 66.4937 38.0111Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M18.5059 38.0111V22.0151C18.5009 17.0565 20.3385 12.273 23.6621 8.59315C26.9856 4.91328 31.5579 2.5996 36.4914 2.10128C41.4248 1.60295 46.3674 2.95552 50.3597 5.89642C54.352 8.83731 57.1092 13.1567 58.0959 18.0161"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
}
