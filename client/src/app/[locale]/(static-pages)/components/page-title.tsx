export default function PageTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <header>
      <h1 className={`pb-16 text-center heading-1 md:display ${className}`}>
        {title}
      </h1>
    </header>
  );
}
