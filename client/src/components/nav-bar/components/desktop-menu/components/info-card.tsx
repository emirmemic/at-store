type InfoCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function DesktopInfoCard({
  icon,
  title,
  description,
}: InfoCardProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm text-grey-dark">{description}</p>
      </div>
    </div>
  );
}
