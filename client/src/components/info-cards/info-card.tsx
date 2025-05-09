import { useTranslations } from 'next-intl';

type InfoCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function InfoCard({ icon, title, description }: InfoCardProps) {
  const t = useTranslations();
  return (
    <div className="flex items-center gap-4">
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="font-bold">{t(title)}</p>
        <p className="text-sm text-grey-dark">{t(description)}</p>
      </div>
    </div>
  );
}
