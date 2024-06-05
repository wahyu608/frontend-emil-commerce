import MainHeader from "../../component/fragment/mainHeader"
import useFetchStock from "../../store/useFetchStock"
import { useEffect } from "react";
export default function Stock() {
  const { produk, fetchStock } = useFetchStock((state) => ({ produk: state.produk, fetchStock: state.fetchStock }));

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);
    return (
      <div>
        <div className="px-4 py-6 w-full flex flex-col items-center">
          <MainHeader Judul="Manajemen Stok" SubJudul="Cek stok dulu" />
        </div>
        <div className="w-full flex justify-center pb-5">
          <div className="w-5/6 overflow-x-hidden flex justify-between">
            <input className="bg-custom-coklat h-10 border border-gray-300 rounded-3xl text-center text-white placeholder-white  placeholder: opacity-50 focus:opacity-100 outline-none" type="search" placeholder="Cari Disini" />
            <div>
            <button className="bg-custom-coklat h-10 w-32 border mr-5 rounded-3xl text-white border-gray-300 placeholder: opacity-50 focus:opacity-100 outline-none">Publish</button>
            <button className="bg-custom-coklat h-8 w-8 border rounded-3xl text-white border-gray-300 opacity-50 hover:opacity-100 outline-none">+</button>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-hidden border-t flex justify-center">
          <table className="w-5/6 first-letter: bg-white">
            <thead className="bg-gray-200 border-b-2 text-custom-coklat">
              <tr className="border-b-2 border-opacity-40  border-custom-coklat">
                <th className="text-left py-3 pl-4 uppercase text-custom-coklat font-bold text-sm">No.</th>
                <th className="text-left py-3 pl-3 uppercase text-custom-coklat font-bold text-sm">foto</th>
                <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Nama</th>
                <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Masuk</th>
                <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Keluar</th>
                <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Total</th>
                <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-custom-coklat bg-gray-200">
              <tr>
                <td className="text-left py-3 pl-4">Lian</td>
                <td className="text-left py-3 pl-3">Smith</td>
                <td className="text-left py-3 px-4">
                  <a className="hover:text-blue-500" href="tel:622322662">Wahyu</a>
                </td>
                <td className="text-left py-3 pl-4">2</td>
                <td className="text-left py-3 pl-4">1</td>
                <td className="text-left py-3 pl-4">1</td>
                <td className="text-left py-3 pl-4">Aksi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}