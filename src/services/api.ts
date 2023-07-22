import axios from "axios";
import { useTokensStore } from "../store/tokens";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};

    const accessToken = useTokensStore.getState().token;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
