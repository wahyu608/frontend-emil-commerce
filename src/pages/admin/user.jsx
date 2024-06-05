import MainHeader from "../../component/fragment/mainHeader"
import { Outlet, Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
export default function Users() {
  const location = useLocation();
  const isDashboardRoute = location.pathname === '/admin/users';
  console.log(isDashboardRoute)
    return (
      <div>
        <div className="px-4 py-6 w-full flex flex-col items-center">
          <MainHeader Judul="Manajemen User" SubJudul="Lihat data User dulu yuk" margin="mb-7" />
        </div>
        <div className="w-full flex justify-center pb-5">
          <div className="w-5/6 overflow-x-hidden flex flex-col gap-y-10 ">
            <div className="flex gap-4">
            <Link to="../users" className={`mb-1 h-10 border w-32 flex items-center justify-center rounded-3xl outline-none ${isDashboardRoute === true ? "text-white bg-custom-coklat" : "text-custom-coklat opacity-75 hover:opacity-100 bg"}`}>User</Link>
            <Link to="admin" className={`mb-1 h-10 border w-32 flex items-center justify-center rounded-3xl outline-none ${isDashboardRoute === false ? "text-white bg-custom-coklat" : "text-custom-coklat opacity-75 hover:opacity-100 bg"}`}>Admin</Link>
            </div>
            <input className="bg-custom-coklat h-10 border w-72 border-gray-300 rounded-3xl text-center text-white placeholder-white  placeholder: opacity-50 focus:opacity-100 outline-none" type="search" placeholder="Cari Disini" />
          </div>
        </div>
        <div className="w-full overflow-x-hidden border-t flex justify-center">
          {isDashboardRoute ? (
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
              <tr>
                <td className="text-left py-3 pl-4">Lian</td>
                <td className="text-left py-3 pl-3">Smith</td>
                <td className="text-left py-3 px-4">
                  <a className="hover:text-blue-500" href="tel:622322662">Wahyu</a>
                </td>
                <td className="text-left py-3 pl-4">Rp. 100.000,00</td>
                <td className="text-left py-3 pl-4">Murah Meriah</td>
                <td className="text-left py-3 pl-4">Manusia</td>
                <td className="text-left py-3 pl-4">Aksi</td>
              </tr>
            </tbody>
          </table>
          ) : (
            <Outlet />
          )
          }
        </div>
      </div>
    )
  }