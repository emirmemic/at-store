export default function ProductListTitle({ title }: { title: string }) {
  return (
    <div className="border-b border-grey-darker pb-4">
      <h1 className="heading-4 md:heading-3">{title}</h1>
    </div>
  );
}
