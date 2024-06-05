import { create } from "zustand";
import axiosInstance from "../lib/login";

export const useFetchUser = create((set) => ({
  userEntries: [],
  userCount: 0,
  page: 1,
  limit: 10,
  orderColumn: "id",
  orderType: "asc",
  loading: false,
  error: null,  
  input: null,
  fetchUser: async (
    orderColumn = "id",
    orderType = "asc",
    page = 1,
    limit = 2,
    query = null
  ) => {
    try {
      set({ loading: true });
      console.log(query);
      const response = await axiosInstance.get(
        `/user/list?orderColumn=${orderColumn}&orderType=${orderType}&page=${page}&limit=${limit}&filter.fullname=${
          query ?? ""
        }`,
        { withCredentials: true }
      );

      const { data } = response.data;
      const { userEntries, userCount } = data;

      set({
        orderColumn,
        orderType,
        limit,
        page,
        userEntries,
        userCount,
        loading: false,
        query,
      });
    } catch (error) {
      console.log(error);
      set({
        error: error.response ? error.response.data.error : error.message,
        loading: false,
      });
    }
  },
  setQuery: (name) => {
    set({ query: name });
  },
}));
