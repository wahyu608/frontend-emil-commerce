import axios from "axios";
import Cookies from "js-cookie";
import useAuthStore from "../store/useAuthStore";

const ONE_HOUR = 1 * 60 * 60 * 1000;
const FOURTY_FIVE_MINUTES = 45 * 60 * 1000;

const axiosInstance = axios.create({
  baseURL: "https://wily-rafaelia-aryantara-e4e3f18c.koyeb.app",
});

async function renewToken() {
  try {
    const response = await axiosInstance.get("auth/renew", {
      withCredentials: true,
      headers: { Authorization: `${Cookies.get("accessToken")}` },
    });
    const { accessToken } = response.data.data;
    Cookies.set("accessToken", accessToken, {
      expires: new Date(Date.now() + ONE_HOUR + FOURTY_FIVE_MINUTES),
    });
  } catch (error) {
    console.error("Renew token error:", error);
    Cookies.remove("accessToken");
  }
}

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = Cookies.get("accessToken");

    if (!token && config.url !== "auth/renew") {
      await renewToken();
      token = Cookies.get("accessToken");
    }

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
      const newToken = Cookies.get("accessToken");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
