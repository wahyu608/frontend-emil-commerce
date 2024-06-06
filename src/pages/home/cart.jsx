// Cart.js
import React, { useEffect, useState } from "react";
import Header from "../../component/fragment/header";
import Footer from "../../component/fragment/footer";
import useFetchCart from "../../store/useFetchCart";
import axiosInstance from "../../lib/login";

const Cart = () => {
  const { productAdded, cartItems, cart, fetchCartItems, setCartItems } =
    useFetchCart();

  useEffect(() => {
    fetchCartItems();
    console.log(cartItems);
  }, [productAdded]);

  const handleIncreaseQuantity = (id) => {
    setCartItems(id, "add");
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(id, "subtract");
  };

  const handleBuy = async () => {
    // Reacuring stock
    for (const cartItem of cartItems) {
      await axiosInstance.post("cart/reaqcuire/:cartDetailId");
    }
  };

  const totalAmount = cart.priceTotal ?? 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col mx-auto py-12 px-6 w-[600px] min-h-[100vh]">
        <h2 className="text-2xl font-bold text-center mb-8">Keranjang</h2>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4 p-4 border rounded-lg shadow-sm"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item.productName}</h3>
                  <p className="text-gray-600">
                    Rp. {item.price.toLocaleString("id-ID")},00
                  </p>
                </div>
                <div className="flex items-center">
                  {item.status == "ready" ? (
                    <button
                      onClick={() => handleDecreaseQuantity(item.productId)}
                      className="px-2 py-1 border rounded-l-lg bg-gray-300 hover:bg-gray-400"
                    >
                      -
                    </button>
                  ) : (
                    ""
                  )}
                  <input
                    type="text"
                    value={item.status == "ready" ? item.qty : "Stok habis"}
                    readOnly
                    className="w-max text-center border-t border-b py-1 "
                  />
                  {item.status == "ready" ? (
                    <button
                      onClick={() => handleIncreaseQuantity(item.productId)}
                      className="px-2 py-1 border rounded-r-lg bg-gray-300 hover:bg-gray-400"
                    >
                      +
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-8 border-t pt-4">
              <div className="text-right">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-2xl font-bold">
                  Rp. {totalAmount.toLocaleString("id-ID")},00
                </p>
              </div>
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg">
                Beli
              </button>
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
