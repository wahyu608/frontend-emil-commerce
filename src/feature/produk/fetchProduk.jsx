import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/login.jsx";
import useAuthStore from "../../store/useAuthStore.jsx";
const fetchProduk = async () => {
  const token = useAuthStore.getState().token;
  const response = await axiosInstance.get('produk', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export default fetchProduk