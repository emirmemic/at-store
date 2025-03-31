import ProductList from './components/product-list';

export default function Page() {
  return (
    <div className="pb-40 pt-10 container-max-width">
      <div className="border-b border-grey-dark pb-4">
        <h1 className="heading-3">Dodaci</h1>
      </div>
      <ProductList />
    </div>
  );
}
