// App.js
import React from "react";
import Header from "../../component/fragment/header";
import Footer from "../../component/fragment/footer";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useFetchProduk from "../../store/useFetchProduk.jsx";
import useAuthStore from "../../store/useAuthStore.jsx";
import { useLocation, Link } from "react-router-dom";
import useFetchProdukDetail from "../../store/useFetchProdukDetail.jsx";
import ruangtamu from "../../assets/ruangtamu.webp";
import home from "../../assets/home.png";
import sofa from "../../assets/sofa.png";
import Cookies from "js-cookie";
export default function Home() {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/home";
  const navigate = useNavigate();
  const { token, checkAuth } = useAuthStore((state) => ({
    token: state.token,
    checkAuth: state.checkAuth,
  }));
  const {produk: product, fetchProdukDetail} = useFetchProdukDetail((state) => ({
    produk: state.produk,
    fetchProdukDetail: state.fetchProdukDetail
  }));
  const { produk, fetchProduk, loading, error } = useFetchProduk((state) => ({
    produk: state.produk,
    fetchProduk: state.fetchProduk,
    loading: state.loading,
    error: state.error,
  }));

  

  useEffect(() => {
    if (!Cookies.get("accessToken")) navigate("/loginUser");  
    
    fetchProduk(1, 10, "id", "asc");
  }, [token, checkAuth, fetchProduk, fetchProdukDetail]);
  console.log(product);
  return (
    <div className="font-poppins ">
      <div className="fixed top-0 w-full z-50 bg-white">
      <Header />
      </div>
      {isHomeRoute ? (
        <main className="pt-16">
          <section
            id="home"
            className="relative h-[68vh] bg-cover bg-center"
            style={{ backgroundImage: "url('" + home + "')" }}
          >
            
          </section>

          <section id="produk" className="container mx-auto py-12 px-6">
            <h2 className="text-3xl font-bold text-custom-coklat text-center pt-16">Produk</h2>
            <p className="text-lg opacity-70 text-custom-coklat text-center mb-8">Pilih yuk yang kalian mau</p>
            <div className={` h-0.5 my-14 mx-5 bg-custom-coklat opacity-40`}></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produk.map((item) => (
              item.id && (
                <Link to={`detail/${item.id}`} key={item.id}>
                  <div className="bg-white p-6 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 bg-gray-300 mb-4 rounded-md"
                    />
                    <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-700">{item.price}</p>
                  </div>
                </Link>
              )
            ))}
            </div>
          </section>
          <div className="container mx-auto py-12 px-6">
          <h2 className="text-3xl font-bold text-custom-coklat text-center pt-16">Tentang Kami</h2>
            <p className="text-lg opacity-70 text-custom-coklat text-center mb-8">Kenalan yuk sama kita</p>
            <div className={` h-0.5 my-14 mx-5 bg-custom-coklat opacity-40`}></div>
          </div>
          <section id="tentang-kami" className="bg-gray-100 py-12 ">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
              <img
                src={sofa}
                alt="Sofa"
                className="w-full md:w-1/2 rounded-lg mb-6 md:mb-0 md:mr-6"
              />
              <div className="md:w-1/2 ">
                <p className="text-gray-700">Emil Furniture adalah produsen furnitur yang menghadirkan desain elegan dan fungsionalitas unggul dalam setiap produknya. Dikenal karena kualitas tak tertandingi, setiap furnitur Emil tidak hanya mempercantik rumah Anda, tetapi juga meningkatkan kenyamanan sehari-hari.</p>
              </div>
            </div>
          </section>

          <section id="kontak-kami" className="container mx-auto py-12 px-6">
            <h2 className="text-2xl font-bold text-center mb-8">Kontak Kami</h2>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6">
                <h3 className="text-xl font-bold mb-2">Info</h3>
                <ul className="text-gray-700">
                  <li>
                    Email:{" "}
                    <a href="mailto:emil@gmail.com" className="text-blue-600">
                      emil@gmail.com
                    </a>
                  </li>
                  <li>Telepon: 085267722251</li>
                  <li>Jam Operasional: 09:00 - 18:00</li>
                </ul>
              </div>
              <form className="md:w-1/2">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700">
                    Pesan Anda
                  </label>
                  <textarea
                    id="message"
                    className="w-full px-4 py-2 border rounded-lg"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-custom-coklat text-white py-2 rounded-lg"
                >
                  Kirim
                </button>
              </form>
            </div>
          </section>
        </main>
      ) : (
        <Outlet />
      )}
      ;
      <Footer />
    </div>
  );
}
