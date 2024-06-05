import useFetchProduk from "../../store/useFetchProduk";
export default function Produk() {
  const { produk } = useFetchProduk((state) => ({ produk: state.produk }));
  return (
    <section id="produk" className="container mx-auto py-12 px-6 pt-20">
      <h2 className="text-2xl font-bold text-center mb-8">Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produk.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="h-40 bg-gray-300 mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{item.name}</h3>
            <p className="text-gray-700">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
