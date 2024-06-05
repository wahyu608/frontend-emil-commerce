import MainHeader from "../../component/fragment/mainHeader"
import AddProdukModal from "../../component/fragment/addProdukModal";
import { useEffect, useState } from "react";
import useFetchProduk from "../../store/useFetchProduk.jsx";
export default function Product() {
  const { produk, fetchProduk } = useFetchProduk((state) => ({ produk: state.produk, fetchProduk: state.fetchProduk }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const HandleAddProduk = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  useEffect(() => {
    fetchProduk();
  }, [fetchProduk]);

  
    return (
      <div>
        <div className="px-4 py-6 w-full flex flex-col items-center">
          <MainHeader Judul="Manajemen Produk" SubJudul="Lihat data produk dulu yuk"/>
        </div>
        <div className="w-full flex justify-center pb-5">
          <div className="w-5/6 overflow-x-hidden flex justify-between">
            <input className="bg-custom-coklat h-10 border border-gray-300 rounded-3xl text-center text-white placeholder-white  placeholder: opacity-50 focus:opacity-100 outline-none" type="search" placeholder="Cari Disini" />
            <button className="bg-custom-coklat h-10 w-11 border rounded-3xl text-white border-gray-300 placeholder: opacity-50 focus:opacity-100 outline-none" onClick={HandleAddProduk}>+</button>
          </div>
        </div>
        <div className="w-full overflow-x-hidden border-t flex justify-center">

          <table className="w-5/6 first-letter: bg-white">
            <thead className="bg-gray-200 border-b-2 text-custom-coklat">
              <tr className="border-b-2 border-opacity-40  border-custom-coklat">
                <th className="text-left py-3 pl-4 uppercase text-custom-coklat font-bold text-sm">No.</th>
                <th className="text-left py-3 pl-3 uppercase text-custom-coklat font-bold text-sm">foto</th>
                <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Nama</th>
                <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Harga</th>
                <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Deskripsi</th>
                <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Kategori</th>
                <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-custom-coklat bg-gray-200">
              {produk.map((item, index) => (
              <tr key={item.id}>
                <td className="text-left py-3 pl-4">{index + 1}</td>
                <td className="text-left py-3 pl-3">
                  <img src={item.image} alt={item.name} className="h-10 bg-gray-300 mb-4" />
                </td>
                <td className="text-left py-3 px-4">
                  <a className="hover:text-blue-500" href={`tel:${item.contactNumber}`}>{item.name}</a> 
                </td>
                <td className="text-left py-3 pl-4">{item.price}</td>
                <td className="text-left py-3 pl-4">{item.description}</td>
                <td className="text-left py-3 pl-4">{item.categories.map(category => category.name )}</td>
                <td className="text-left py-3 pl-4">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline ml-2">Delete</button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
          <AddProdukModal 
          isOpen={isModalOpen}
          isClose={handleCloseModal}
          />

        </div>
      </div>
    )
}