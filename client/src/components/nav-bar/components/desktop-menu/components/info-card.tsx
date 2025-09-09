import Link from 'next/link';

type InfoCardProps = {
  icon: string;
  title: string;
  description: string;
  link?: string;
};

export default function DesktopInfoCard({
  icon,
  title,
  description,
  link = '/',
}: InfoCardProps) {
  return (
    <Link
      className="no-underline"
      href={'https://atstore.ba/' + link}
      replace={true}
    >
      <div
        className="flex h-16 w-full cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition duration-300 ease-in-out hover:shadow-md"
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <span className="flex-shrink-0 text-2xl text-gray-700">{icon}</span>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="mt-0.5 text-xs text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
