import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY) || null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    !toast.isActive(res.data.message) &&
      res.data.message &&
      toast({
        id: res.data.message,
        description: res.data.message,
        status: "success",
        position: "top-right",
        isClosable: true,
        duration: 3000,
      });

    return res ? res.data.data : res;
  },
  (err) => {
    !toast.isActive(err.response.data.message) &&
      toast({
        id: err.response.data.message,
        description: err.response.data.message,
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 3000,
      });

    return Promise.reject(err);
  }
);
