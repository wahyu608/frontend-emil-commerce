import { useLocation } from "react-router-dom";
import SidebarItem from "../element/sidebarItems";
import { Link } from "react-router-dom";  
export default function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="relative bg-custom-coklat h-screen w-1/5 hidden sm:block shadow-xl">
      <div className="flex pt-10 justify-center">
        <Link to="/admin" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
          Admin
        </Link>
      </div>
      <nav className="text-white text-base font-semibold py-10 relative right-2 pr-1">
        <SidebarItem to="/admin"  text="Dashboard" active={location.pathname === '/admin'} />
        <SidebarItem to="products"  text="Manajemen Produk" active={location.pathname === '/admin/products'} />
        <SidebarItem to="stock"  text="Manajemen Stok" active={location.pathname === '/admin/stock'} />
        <SidebarItem to="transaksi" text="Manajemen Transaksi" active={location.pathname === '/admin/transaksi'} />
        <SidebarItem to="users" text="Manajemen User" active={location.pathname === '/admin/users' | location.pathname === '/admin/users/admin'} />
        <SidebarItem to="/home" text="Lihat Web" active={location.pathname === '/home '} />
      </nav>
      <div className="absolute bottom-0 w-full p-4 text-center text-white text-sm">
        @Copyright2024. EMIL Furniture
      </div>
    </aside>
  );
} 