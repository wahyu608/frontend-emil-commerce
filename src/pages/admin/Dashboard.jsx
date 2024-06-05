import React from 'react';
import AdminSidebar from '../../component/fragment/adminSidebar';
import AdminHeader from '../../component/fragment/adminHeader';
import { Outlet, useLocation } from "react-router-dom";
import MainHeader from '../../component/fragment/mainHeader';

export default function Dashboard() {
  const location = useLocation();
  const isDashboardRoute = location.pathname === '/admin';

  return (  
    <div className="bg-gray-200 font-poppins flex">
      <AdminSidebar />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <AdminHeader />
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6 ">
            {isDashboardRoute ? (
              <div>
                <div className="px-4 py-6 w-full flex flex-col items-center">
                  <MainHeader Judul="Dashboard" SubJudul="Lihat data lebih cepat yuk" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-48">
                  <div className=" p-6 rounded-lg ">
                    <h2 className="text-2xl font-semibold w-full flex justify-center text-custom-coklat">Manajemen Produk</h2>
                      <div className='flex flex-row justify-center items-center mt-10 mr-14 '>
                        <p className="text-7xl font-bold text-custom-coklat">10</p>
                        <p className='text-xl w-2 ml-5'>Total Produk</p>
                      </div>
                  </div>
                  <div className=" p-6 rounded-lg ">
                    <h2 className="text-2xl font-semibold w-full flex justify-center text-custom-coklat">Manajemen Stok</h2>
                    <div className='flex flex-row justify-evenly items-center mt-10 mr-14 '>
                      <div className='flex'>
                        <p className="text-7xl font-bold text-custom-coklat">3</p>
                        <p className='text-xl w-2 ml-5 mt-2'>Produk Masuk</p>
                      </div>
                      <div className='flex'>
                        <p className="text-7xl font-bold text-custom-coklat">3</p>
                        <p className='text-xl w-2 ml-5 mt-2'>Produk Keluar</p>
                      </div>
                    </div>
                  </div>
                  <div className=" p-6 rounded-lg ">
                    <h2 className="text-2xl font-semibold w-full flex justify-center text-custom-coklat">Manajemen Transaksi</h2>
                      <div className='flex flex-row justify-center items-center mt-10 mr-14 '>
                        <p className="text-7xl font-bold text-custom-coklat">3</p>
                        <p className='text-xl w-2 ml-5'>Total Transaksi</p>
                      </div>
                  </div>
                  <div className=" p-6 rounded-lg ">
                    <h2 className="text-2xl font-semibold w-full flex justify-center text-custom-coklat">Manajemen User</h2>
                      <div className='flex flex-row justify-center items-center mt-10 mr-14 '>
                        <p className="text-7xl font-bold text-custom-coklat">15</p>
                        <p className='text-xl w-2 ml-5'>Total User</p>
                      </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-200 font-poppins">
                <Outlet />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
