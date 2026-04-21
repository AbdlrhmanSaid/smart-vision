import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: للتعامل مع انتهاء صلاحية التوكين (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // هنا يمكنك توجيه المستخدم لصفحة Login أو مسح التوكين المنتهي
      console.error("الجلسة انتهت، يرجى تسجيل الدخول مجدداً");
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
