import { useEffect } from "react";
import useFetchProduk from "../../store/useFetchProduk";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Produk() {
  const { produk, page, limit, orderColumn, orderType, loading, fetchProduk } =
    useFetchProduk();

  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("accessToken")) navigate("/loginUser");

    fetchProduk(page, limit, orderColumn, orderType);
  }, [page, limit, orderColumn, orderType]);
  
  return (
    <section id="produk" className="container mx-auto py-12 px-6 pt-20">
      <h2 className="text-2xl font-bold text-center mb-8">Produk</h2>
      <div
        className={`${
          produk.length > 0 && !loading
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : ""
        } min-h-[100vh]`}
      >
        {loading && (
          <div className="bg-white p-6 rounded-lg w-100">
            <p className="text-gray-70 text-[24px] text-center">Loading...</p>
          </div>
        )}

        {!loading &&
          (produk.length > 0 ? (
            produk.map((item) => (
              <div
                key={item.id}
                className="bg-white h-max w-max p-6 hover:border-2 hover:shadow-lg hover:cursor-pointer"
                onClick={() => navigate(`/home/detail/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[280px] w-[300px] object-cover bg-gray-300 mb-4"
                />
                <h3 className="text-lg mb-2 text-custom-coklat">{item.name}</h3>
                <p className="font-bold text-gray-700">{item.price} IDR</p>
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg w-100">
              <p className="text-gray-70 text-[24px] text-center">
                Belum ada produk.
              </p>
            </div>
          ))}
      </div>
    </section>
  );
}
