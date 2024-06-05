// Cart.js
import React, { useState } from 'react';
import Header from '../../component/fragment/header';
import Footer from '../../component/fragment/footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Meja makan asik cuyyy', price: 100000, quantity: 1 },
    { id: 2, name: 'Meja makan asik cuyyy', price: 100000, quantity: 1 },
    { id: 3, name: 'Meja makan asik cuyyy', price: 100000, quantity: 1 },
  ]);

  const handleIncreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Keranjang</h2>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between mb-4 p-4 border rounded-lg shadow-sm">
                <img src="path/to/your/image.jpg" alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Rp. {item.price.toLocaleString('id-ID')},00</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleDecreaseQuantity(item.id)} className="px-2 py-1 border rounded-l-lg bg-gray-300 hover:bg-gray-400">-</button>
                  <input type="text" value={item.quantity} readOnly className="w-12 text-center border-t border-b py-1" />
                  <button onClick={() => handleIncreaseQuantity(item.id)} className="px-2 py-1 border rounded-r-lg bg-gray-300 hover:bg-gray-400">+</button>
                </div>
                <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 ml-4">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center mt-8 border-t pt-4">
              <button onClick={handleClearCart} className="bg-gray-800 text-white px-6 py-2 rounded-lg">Hapus Semua</button>
              <div className="text-right">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-2xl font-bold">Rp. {totalAmount.toLocaleString('id-ID')},00</p>
              </div>
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg">Beli</button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Keranjang anda kosong.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
