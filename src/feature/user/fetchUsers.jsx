// import { axiosInstance } from "../../lib/login.jsx";
import { useQuery } from "@tanstack/react-query";
export const fetchUsers = () => {
  const {data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => { 
      const userResponse = await axiosInstance.get('/user');
      return userResponse;
    },
  });
  return{
    data,
    isLoading,
  }
}