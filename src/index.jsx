import { useEffect } from "react"
import pngwing from "./assets/pngwing.png"
import Button from "./component/element/button.jsx"
// import { axiosInstance } from "./lib/login.jsx"
import { fetchProduk } from "./feature/produk/fetchProduk.jsx"
export default function Index() {

  const {data, isLoading } = fetchProduk();

  return (
    <>
    <div className="w-100% flex-row h-screen justify-center  bg-white sm:flex sm:justify-center overflow-hidden">
      <div className="w-full flex justify-around items-center h-14  bg-qhitw">
        <div className="flex flex-col items-center">
        <h1 className="text-custom-coklat pl-2 font-bold" >EMIL</h1>
        <p className="text-custom-coklat">Furniture</p>
        </div>
        <nav>
          <ul className="flex gap-16">
            <li><a href="/" className="text-custom-coklat">Beranda</a></li>
            <li><a href="/about" className="text-custom-coklat">Produk</a></li>
            <li><a href="/contact" className="text-custom-coklat">Kategori</a></li>
            <li><a href="/contact" className="text-custom-coklat">Tentang Kami</a></li>
            <li><a href="/contact" className="text-custom-coklat">Kontak Kami</a></li>
          </ul>
        </nav>
        <h1 className="text-custom-coklat ">keranjang</h1>
      </div>
    </div>
    </>
  )
}

