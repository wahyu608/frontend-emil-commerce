import { create } from "zustand";
import axiosInstance from "../lib/login";

const useFetchProduk = create((set) => ({
  user: [],
  loading: false,
  error: null,
  fetchProduk: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("auth/register");
      const user = response.data && response.data.data && response.data.data.productEntries ? response.data.data.productEntries : [];
      console.log('API Response:', response.data);
      set({ user: user, loading: false, error: null });
      console.log(produkData);
    } catch (error) {
      set({
        error: error.response ? error.response.data.error : error.message,
        loading: false,
      });
      console.log(error);
    }
  },
}));

export default useFetchProduk;
