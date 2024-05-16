// import { axiosInstance } from "../../lib/login";
import { useQuery } from "@tanstack/react-query";
export const loginAdmin = () => {
  const {data, isLoading } = useQuery({
    queryFn: async () => { 
      const userResponse = await axiosInstance.get('/auth/login');
      return userResponse;
    },
  });
  return{
    data,
    isLoading,
  }
}