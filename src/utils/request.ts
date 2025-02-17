// axios封装处理

import axios from "axios";
import { notification } from "antd";

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

// 初始化 notification API
const [api] = notification.useNotification();

// 用于显示错误通知的函数
const openErrorNotification = (message: string, description: string) => {
  api.error({
    message,
    description,
  });
};

// 请求拦截器
// 发请求之前，先处理发送的参数
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 返回 status 为 200 的数据
    return res.data;
  },
  (error) => {
    // 返回 status 为 非 200 的数据，显示错误通知
    openErrorNotification(
      "Request Error",
      error.message || "An error occurred during the request."
    );
    return Promise.reject(error);
  }
);

export { request };
