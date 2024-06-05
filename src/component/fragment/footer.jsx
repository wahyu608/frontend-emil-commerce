export default function Footer() {
    return (
    <footer className="bg-custom-coklat text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">EMIL Furniture</p>
          <nav className="mb-4">
            <ul className="flex justify-center space-x-4">
              <li><a href="#home" className="hover:text-gray-400">Home</a></li>
              <li><a href="#produk" className="hover:text-gray-400">Produk</a></li>
              <li><a href="#kategori" className="hover:text-gray-400">Kategori</a></li>
              <li><a href="#tentang-kami" className="hover:text-gray-400">Tentang Kami</a></li>
              <li><a href="#kontak-kami" className="hover:text-gray-400">Kontak Kami</a></li>
            </ul>
          </nav>
          <p>&copy; 2024 EMIL Furniture. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#facebook" className="hover:text-gray-400">📘</a>
            <a href="#instagram" className="hover:text-gray-400">📸</a>
            <a href="#twitter" className="hover:text-gray-400">🐦</a>
            <a href="#whatsapp" className="hover:text-gray-400">💬</a>
          </div>
        </div>
      </footer>
    )
}