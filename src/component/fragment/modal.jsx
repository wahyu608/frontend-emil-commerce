import React from 'react';

const Modal = ({ isOpen, onClose, product, quantity, onIncrease, onDecrease, onAddressChange, address, onConfirm }) => {
  if (!isOpen || !product) return null; // Periksa apakah product tidak valid

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/3">
        <div className="p-4 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
            &times;
          </button>
          <div className="flex flex-col items-center">
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.price}</p>
            <div className="flex items-center mb-4">
              <button onClick={onDecrease} className="px-4 py-2 border rounded-l-lg bg-gray-300 hover:bg-gray-400">-</button>
              <input type="text" value={quantity} readOnly className="w-12 text-center border-t border-b py-2" />
              <button onClick={onIncrease} className="px-4 py-2 border rounded-r-lg bg-gray-300 hover:bg-gray-400">+</button>
            </div>
            <input
              type="text"
              value={address}
              onChange={onAddressChange}
              placeholder="Masukkan alamat"
              className="w-full mb-4 p-2 border rounded-lg"
            />
            <button onClick={onConfirm} className="bg-gray-800 text-white px-6 py-2 rounded-lg">Beli</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
