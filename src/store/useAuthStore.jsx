import { create } from "zustand";
import axiosInstance from "../lib/login";
import Cookies from "js-cookie";


const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  token: null,
  error: null,
  login: async (email, password) => {
    set({ loading: true });
    try {
      const loginResponse = await axiosInstance.post("auth/login", {
        email,
        password,
      });
      const { accessToken, user } = loginResponse.data.data;
      Cookies.set("accessToken", accessToken, { expires: 1000 });
      set({ user, token: accessToken, loading: false, error: null });
      scheduleTokenRenewal(accessToken);
    } catch (error) {
      console.error("Login error:", error);
      set({
        error: error.response ? error.response.data.success : error.message,
        loading: false,
      });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.get("auth/logout", {
        withCredentials: true,
        headers: { Authorization: ` ${Cookies.get("accessToken")}` },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    Cookies.remove("accessToken");
    set({ token: null, user: null });
  },
  checkAuth: () => {
    const token = Cookies.get("accessToken");
    if (token) {
      set({ token });
      scheduleTokenRenewal(token); 
    } else {

    }
  },
  renewToken: async () => {
    try {
      const response = await axiosInstance.get("auth/renew", {
        withCredentials: true,
        headers: { Authorization: `${Cookies.get("accessToken")}` },
      });
      const { accessToken } = response.data.data;
      Cookies.set("accessToken", accessToken, { expires: 720000 });
      set({ token: accessToken });
      scheduleTokenRenewal(accessToken);
    } catch (error) {
      console.error("Renew token error:", error);
      set({ token: null, user: null });
      Cookies.remove("accessToken");
    }
  },
}));

const scheduleTokenRenewal = (token) => {
  const expiresIn = 4 * 1000;
  setTimeout(() => {
    const { renewToken } = useAuthStore.getState();
    renewToken();
  }, expiresIn);
};

export default useAuthStore;
