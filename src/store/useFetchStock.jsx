import { create } from "zustand";
import axiosInstance from "../lib/login";

const useFetchStock = create((set) => ({
  produk: [],
  loading: false,
  error: null,
  fetchStock: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("stock/list");
      const produkData = response.data && response.data.data && response.data.data.stockEntries ? response.data.data.stockEntries : [];
      console.log('API Response:', response.data);
      set({ produk: produkData, loading: false, error: null });
      console.log(produkData);
    } catch (error) {
      set({
        error: error.response ? error.response.data.error : error.message,
        loading: false,
      });
      console.log(error);
    }
  },
  updateStock: async (stockId, newData) => {
    try {
      const response = await axiosInstance.put(`stock/update/${stockId}`, newData);
     
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  deleteStock: async (stockId) => {
    try {
      const response = await axiosInstance.delete(`stock/delete/${stockId}`);
     
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  stockOut: async (data) => {
    try {
      const response = await axiosInstance.post(`stock/out`, data);
     
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  commitStock: async (stockId) => {
    try {
      const response = await axiosInstance.put(`stock/commit/${stockId}`);
      
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  stockIn: async (data) => {
    try {
      const response = await axiosInstance.post(`stock/in`, data);
    
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useFetchStock;
