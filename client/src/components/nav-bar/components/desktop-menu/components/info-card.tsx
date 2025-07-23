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
  link,
}: InfoCardProps) {
  return (
    <Link className="no-underline" href={link || '/'} replace={false}>
      <div
        className="flex h-28 w-full transform cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-2 text-center transition duration-300 ease-in-out lg:opacity-80 lg:hover:scale-[1.02] lg:hover:opacity-100"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '1rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <span className="text-xl">{icon}</span>
        <div className="flex flex-col items-center justify-center">
          <p className="text-xs font-semibold text-gray-900">{title}</p>
          <p className="text-[10px] text-gray-700">{description}</p>
        </div>
      </div>
    </Link>
  );
}
