import axios from "axios";
import Cookies from "js-cookie";
import useAuthStore from "../store/useAuthStore";

const axiosInstance = axios.create({
  baseURL: "https://wily-rafaelia-aryantara-e4e3f18c.koyeb.app",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { renewToken } = useAuthStore.getState();

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      await renewToken();
      const newToken = Cookies.get('accessToken');
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
