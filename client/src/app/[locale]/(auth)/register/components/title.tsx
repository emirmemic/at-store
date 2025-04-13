import { Link, Pathname } from '@/i18n/routing';

export default function Title({
  className,
  title,
  linkPath,
  subtitle,
  linkText,
}: {
  className?: string;
  title?: string;
  linkPath?: Pathname;
  subtitle?: string;
  linkText?: string;
}) {
  return (
    <div className={className}>
      <h1 className="heading-3">{title}</h1>
      <p className="paragraph-2">
        {`${subtitle} `}
        <Link className="text-blue hover:underline" href={linkPath || '/login'}>
          {linkText}
        </Link>
      </p>
    </div>
  );
}
