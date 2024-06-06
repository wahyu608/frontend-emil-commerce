import { create } from "zustand";
import axiosInstance from "../lib/login";

const useFetchProduk = create((set) => ({
  produk: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  orderColumn: "id",
  fetchProduk: async (
    limit = 2,
    page = 1,
    query = null,
    orderColumn = "id") => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`product/list?page=${page}&limit=${limit}&orderColumn=${orderColumn}&`);
      const produkData = response.data && response.data.data && response.data.data.productEntries ? response.data.data.productEntries : [];
      console.log('API Response:', response.data);
      set({ produk: produkData, loading: false, error: null, page, limit, orderColumn });
      console.log(produkData);
    } catch (error) {
      set({
        error: error.response ? error.response.data.error : error.message,
        loading: false,
      });
      console.log(error);
    }
  },
  deleteProduct: async (id) => {
    await axiosInstance.delete(`product/delete/${id}`);
    set((state) => ({
      produk: state.produk.filter((product) => product.id !== id),
    }));
  },
  setQuery : (name) => {
    set({ query: name });
  }
  
}));

export default useFetchProduk;
