import { create } from "zustand";
import axiosInstance from "../lib/login";

const useFetchProdukDetail = create((set) => ({
  produk: null,
  loading: false,
  error: null,
  fetchProdukDetail: async (productId) => {
    set((state) => ({ loading: true }));
    try {
      const response = await axiosInstance.get(`/product/detail/${productId}`);
      const produkData = response.data && response.data.data && response.data.data.productEntry ? response.data.data.productEntry : null;
      console.log('API Response:', response.data);
      set((state) => ({ produk: produkData, loading: false, error: null }));
      console.log(produkData);
    } catch (error) {
      set((state) => ({  error: error.response ? error.response.data.error : error.message, loading: false }));
      console.log(error);
    }
  },
}));

export default useFetchProdukDetail;
