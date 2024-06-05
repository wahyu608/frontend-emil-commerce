import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchProdukDetail from '../../store/useFetchProdukDetail';
import Modal from '../../component/fragment/modal';
import Header from '../../component/fragment/header';
import Footer from '../../component/fragment/footer';

// Import statements

// Import statements

const DetailProduk = () => {
  const { productId } = useParams();
  const { produk, loading, error, fetchProdukDetail } = useFetchProdukDetail();
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState('');

  console.log(productId)
  // Panggil fetchProdukDetail saat komponen dimount dan productId berubah
  useEffect(() => {
    if (productId) {
      fetchProdukDetail(productId);
    }
  }, [fetchProdukDetail, productId]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleConfirm = () => {
    // Logic untuk konfirmasi pembelian
    console.log('Pembelian dikonfirmasi:', { produk, quantity, address });
    setIsModalOpen(false);
  };

  // Render konten sesuai dengan status loading dan error


  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render konten detail produk jika data produk tersedia
  return (
    <>
      <div className="flex flex-col min-h-full pb-40">
        <main className="flex-grow max-h-full pt-16">
          <section id="detail-produk" className="container mx-auto py-12 px-6">
            <h2 className="text-2xl font-bold text-center mb-8">Detail Produk</h2>
            {loading ? (
              <div className="flex w-full justify-center items-center min-h-full pb-80 pt-3.5">Loading...</div>
            ) : (
            <div className="flex flex-col md:flex-row items-center ">
              {produk && produk.image && (
                <img src={produk.image} alt={produk.name} className="w-full md:w-1/2 rounded-lg mb-6 md:mb-0 md:mr-6" />
              )}
              <div className="md:w-1/2">
                {produk && produk.name && (
                  <h2 className="text-3xl font-bold mb-4">{produk.name}</h2>
                )}
                {produk && produk.description && (
                  <p className="text-gray-700 mb-4">{produk.description}</p>
                )}
                {produk && produk.price && (
                <p className="text-2xl font-bold text-gray-900 mb-4">{produk.price}</p>
                )}
                <div className="flex items-center mb-6">
                  <button onClick={decreaseQuantity} className="px-4 py-2 border rounded-l-lg bg-gray-300 hover:bg-gray-400">-</button>
                  <input type="text" value={quantity} readOnly className="w-12 text-center border-t border-b py-2" />
                  <button onClick={increaseQuantity} className="px-4 py-2 border rounded-r-lg bg-gray-300 hover:bg-gray-400">+</button>
                </div>
                <button onClick={handleBuyClick} className="bg-gray-800 text-white px-6 py-2 rounded-lg">Beli</button>
              </div>
            </div>
            )}

            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              product={produk}
              quantity={quantity}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onAddressChange={handleAddressChange}
              address={address}
              onConfirm={handleConfirm}
            />
          </section>
        </main>
      </div>
    </>
  );
};

export default DetailProduk;
