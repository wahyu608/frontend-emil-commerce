export default function Kategori() {
  return (
    <section id="produk" className="container mx-auto py-12 px-6">
      <h2 className="text-2xl font-bold text-center mb-8">Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg">
              <div className="h-40 bg-gray-300 mb-4"></div>
              <h3 className="text-lg font-bold mb-2">Meja makan oak curvy</h3>
              <p className="text-gray-700">Rp. 100.000,00</p>
            </div>
          ))}
      </div>
    </section>
  );
}
