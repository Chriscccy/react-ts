// /apis/apiConfig.ts
const API_BASE_URL = "http://localhost:3007";

// 定义 API 路径
const API_PATHS = {
  // /api
  REGISTER: "/api/reguser",
  LOGIN: "/api/login",

  // /my
  GET_USER_INFO: "/my/getuserinfo",
};

export { API_BASE_URL, API_PATHS };
