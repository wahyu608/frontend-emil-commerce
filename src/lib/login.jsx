import axios from "axios";
import Cookies from "js-cookie";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const ONE_HOUR = 1 * 60 * 60 * 1000;
const FOURTY_FIVE_MINUTES = 45 * 60 * 1000;

const axiosInstance = axios.create({
  baseURL: "https://wily-rafaelia-aryantara-e4e3f18c.koyeb.app",
  withCredentials: true
});

async function renewToken() {
  try {
    const response = await fetch("https://wily-rafaelia-aryantara-e4e3f18c.koyeb.app/auth/renew", {
      credentials: "include"
    });
    const { accessToken } = response.data.data;
    Cookies.set("accessToken", accessToken, {
      expires: new Date(Date.now() + ONE_HOUR + FOURTY_FIVE_MINUTES),
    });
  } catch (error) {
    console.error("Renew token error:", error);
    Cookies.remove("accessToken");
    window.location.href = "/loginUser";
  }
}

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = Cookies.get("accessToken");

    if (!token && config.url !== "auth/renew" && config.url !== "auth/login" && config.url !== "auth/register") {
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

export default axiosInstance;
