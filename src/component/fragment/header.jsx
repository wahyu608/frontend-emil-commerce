import { Link } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Search, Cart, Person } from "react-bootstrap-icons";
import useFetchCart from "../../store/useFetchCart";

export default function Header() {
  const navigate = useNavigate();
  console.log("Menyerah", useFetchCart());
  const { cart, fetchCart, productAdded } = useFetchCart();
  const { token, logout, checkAuth } = useAuthStore((state) => ({
    token: state.token,
    logout: state.logout,
    checkAuth: state.checkAuth,
  }));

  useEffect(() => {
    checkAuth();
    fetchCart();
  }, [checkAuth, productAdded]);

  const handleLogout = () => {
    logout();
    navigate("/loginUser");
  };

  return (
    <header className="bg-white text-custom-coklat py-4">
      <div className="container-lg mx-auto flex justify-between items-center w-full px-10">
        <div className="flex items-center justify-center flex-col h-10 ">
          <h1 className="text-3xl font-bold">EMIL</h1>
          <p>Furniture</p>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/home" className="hover:text-gray-400">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="produk" className="hover:text-gray-400">
                Produk
              </Link>
            </li>
            <li>
              <Link to="kategori" className="hover:text-gray-400">
                Kategori
              </Link>
            </li>
            <li>
              <Link to="tentang-kami" className="hover:text-gray-400">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link to="transaksi" className="hover:text-gray-400">
                Transaksi
              </Link>
            </li>
          </ul>
        </nav>
        {token ? (
          <div className="flex space-x-4">
            <Link to="#search" className="hover:text-gray-400 mx-2">
              <Search className="text-[24px]" />
            </Link>
            <Link to="/cart" className="hover:text-gray-400 mx-2">
              <div className="flex w-[50px] justify-between">
                {" "}
                <Cart className="text-[24px]" /> <p class="font-bold">{cart.qtyTotal ?? 0}</p> 
              </div>
            </Link>
            <Link to="#user" className="hover:text-gray-400 mx-2">
              <Person className="text-[24px]" />
            </Link>
            <button
              className="text-white bg-custom-coklat rounded-xl w-max p-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/loginUser" className="hover:text-gray-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-400">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
