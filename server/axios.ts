import axios from "axios";

/** قراءة الـ cookie مباشرة من document.cookie (يشتغل دائماً على client side) */
function getClientCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|;\\s*)" + name + "=([^;]+)")
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

const axiosInstance = axios.create({
  // Use the local Next.js proxy (/api/*) to avoid CORS issues.
  // next.config.ts rewrites /api/* → NEXT_PUBLIC_API/*
  baseURL: "/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getClientCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Let Axios handle Content-Type automatically for FormData (multipart/form-data + boundary)
    // Only set JSON manually when the body is NOT FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

import { deleteCookie } from "cookies-next";

// Response Interceptor
// - 401: التوكن منتهي أو غير موجود → سجّل خروج وأعد للـ login
// - 403: التوكن صالح لكن المستخدم لا يملك الصلاحية → لا تعمل logout،
//         فقط أعد رفض الـ promise وسيتعامل معه withRoles أو الـ component
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("الجلسة انتهت، يرجى تسجيل الدخول مجدداً");
      if (typeof window !== "undefined") {
        deleteCookie("token");
        window.location.href = "/login";
      }
    }
    // 403 = ممنوع لكن مصادق عليه — لا تعمل logout
    return Promise.reject(error);
  },
);

export default axiosInstance;
