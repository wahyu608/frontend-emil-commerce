import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../../lib/login.jsx";
export const fetchProduk = () => {
  const {data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => { 
      const produkResponse = await axiosInstance.get('/products');
      return produkResponse;
    },
  });
  return{
    data,
    isLoading,
  }
}