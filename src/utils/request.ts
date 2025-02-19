// axios封装处理
import axios from "axios";
import { errNotify } from "@/utils/notification"; // 确保路径正确
import useAuthStore from "@/stores/authStore"; // 确保路径正确
import { API_BASE_URL } from "@/apis/apiConfig"; // 导入配置

const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // const token = useAuthStore.getState().token; // 在store获取 token
    const token = config.headers.Authorization; // 在header中获取 token
    if (token) {
      config.headers.Authorization = `${token}`; // 确保 token 被正确设置
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 返回 status 为 非 200 的数据，显示错误通知
    errNotify(
      "Request Error",
      error.message || "An error occurred during the request."
    );
    return Promise.reject(error);
  }
);

export { request };
