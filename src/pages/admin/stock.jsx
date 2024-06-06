import MainHeader from "../../component/fragment/mainHeader";
import useFetchStock from "../../store/useFetchStock";
import { useEffect, useState } from "react";

export default function Stock() {
  const { produk, fetchStock, updateStock, deleteStock, commitStock, stockIn, stockOut } = useFetchStock((state) => ({
    produk: state.produk,
    fetchStock: state.fetchStock,
    updateStock: state.updateStock,
    deleteStock: state.deleteStock,
    commitStock: state.commitStock,
    stockIn: state.stockIn,
    stockOut: state.stockOut,
  }));

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  const handleUpdateStock = async (stockId, newData) => {
    await updateStock(stockId, newData);
    fetchStock(); 
  };

  const handleDeleteStock = async (stockId) => {
    await deleteStock(stockId);
    fetchStock(); 
  };

  const handleCommitStock = async (stockId) => {
    await commitStock(stockId);
    fetchStock(); 
  };

  const handleStockIn = async (data) => {
    await stockIn(data);
    fetchStock(); 
  };

  const handleStockOut = async (data) => {
    await stockOut(data);
    fetchStock(); 
  };


  return (
    <div>
      <div className="px-4 py-6 w-full flex flex-col items-center">
        <MainHeader Judul="Manajemen Stok" SubJudul="Cek stok dulu" />
      </div>
      <div className="w-full flex justify-center pb-5">
        <div className="w-5/6 overflow-x-hidden flex justify-between">
          <input
            className="bg-custom-coklat h-10 border border-gray-300 rounded-3xl text-center text-white placeholder-white placeholder-opacity-50 focus:opacity-100 outline-none"
            type="search"
            placeholder="Cari Disini"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            
          />
          <div>
            <button
              className="bg-custom-coklat h-10 w-32 border mr-5 rounded-3xl text-white border-gray-300 placeholder-opacity-50 focus:opacity-100 outline-none"
              onClick={() => console.log("Publish clicked")}
            >
              Publish
            </button>
            <button
              className="bg-custom-coklat h-8 w-8 border rounded-3xl text-white border-gray-300 opacity-50 hover:opacity-100 outline-none"
              onClick={() => console.log("Add clicked")}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-hidden border-t flex justify-center">
        <table className="w-5/6 first-letter:bg-white">
          <thead className="bg-gray-200 border-b-2 text-custom-coklat">
            <tr className="border-b-2 border-opacity-40 border-custom-coklat">
              <th className="text-left py-3 pl-4 uppercase text-custom-coklat font-bold text-sm">
                No.
              </th>
              <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                Masuk
              </th>
              <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                Keluar
              </th>
              <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                Total
              </th>
              <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="text-custom-coklat bg-gray-200">
            {produk.map((product, index) => (
              <tr key={index}>
                <td className="text-left py-3 pl-4">{index + 1}</td>
                <td className="text-left py-3 px-4">{product.qtyIn}</td>
                <td className="text-left py-3 pl-4">{product.qtyOut}</td>
                <td className="text-left py-3 pl-4">{product.qtyFinal}</td>
                <td className="text-left py-3 pl-4">
                  <button onClick={() => handleUpdateStock(product.id, updatedData)}>
                    edit
                  </button>
                  <button onClick={() => handleDeleteStock(product.id)}>delete</button>
                  <button onClick={() => handleCommitStock(product.id)}>Commit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
