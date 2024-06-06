import { create } from "zustand";
import axiosInstance from "../lib/login";

const useFetchCart = create((set) => ({
  cart: {},
  cartItems: [],
  loading: false,
  error: null,
  productAdded: 0,

  addProduct: (qty) =>
    set((state) => ({
      productAdded: (state.productAdded += qty),
    })),
  fetchCart: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`cart`);
      const cartEntry =
        response.data && response.data.data && response.data.data.cartEntry
          ? response.data.data.cartEntry
          : [];
      console.log("API Response:", response);
      set({
        cart: cartEntry ?? {},
        loading: false,
        error: null,
        productAdded: cartEntry.qtyTotal ?? 0,
      });
    } catch (error) {
      set({
        error: error.response
          ? error.response?.data.error ?? "Ada yang salah."
          : error.message,
        loading: false,
      });
      console.log(error);
    }
  },
  fetchCartItems: async () => {
    set({ loading: true });
    try {
      let response = await axiosInstance.get(`cart/list`);

      const cartEntries =
        response.data && response.data.data && response.data.data.cartEntries
          ? response.data.data.cartEntries
          : [];

      set({ cartItems: cartEntries ?? [] });
    } catch (error) {
      set({
        error: error.response
          ? error.response?.data.error ?? "Ada yang salah."
          : error.message,
        loading: false,
      });
      console.log(error);
    }
  },
  setCartItems: async (productId, type) => {
    console.log(productId);
    const requestData = {
      product_id: productId,
      qty: 1,
    };

    if (type == "subtract") {
      try {
        set({ loading: true });
        await axiosInstance.post("cart/subtract", requestData);
        set((state) => ({
          productAdded: (state.productAdded - 1),
        }));
        set({ loading: false });
      } catch (error) {
        set({ loading: false, error });
      }
      return;
    }

    try {
      set({ loading: true });
      await axiosInstance.post("cart/add", requestData);
      set((state) => ({
        productAdded: (state.productAdded + 1),
      }));
      set({ loading: false });
    } catch (e) {
      set({ loading: false, error });
    }    
  },
}));

export default useFetchCart;
