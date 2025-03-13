// /apis/apiConfig.ts
const API_BASE_URL = "http://localhost:3007";

// 定义 API 路径
const API_PATHS = {
  // /api
  REGISTER: "/api/reguser",
  LOGIN: "/api/login",

  // /my
  GET_USER_INFO: "/my/getuserinfo",
  UPDATE_PASSWORD: "/my/updatepwd",
  GET_CAROUSEL_IMAGES: "/my/getCarouselImages", // 获取轮播图列表

  // /auth
  VERIFY_DEVICE: "/auth/verify_device",
  GET_2FA_QR: "/auth/setup_2fa",
  VERIFY_2FA_SETUP: "/auth/verify_2fa_setup",

  // /bo
  BO_GET_USER_LIST: "/bo/getuserlist",
  BO_GET_USER_DETAILS: "/bo/getuserdetails",

  BO_GET_CAROUSEL_DETAILS: "/bo/getCarouselList",
  BO_ADD_CAROUSEL_IMAGE: "/bo/addCarouselImage", // 添加轮播图
  BO_UPDATE_CAROUSEL_IMAGE: "/bo/updateCarouselImage", // 更新轮播图
  BO_DELETE_CAROUSEL_IMAGE: "/bo/deleteCarouselImage", // 删除轮播图
  BO_BULK_UPDATE_CAROUSEL: "/bo/bulkUpdateCarousel",
  BO_BULK_DELETE_CAROUSEL: "/bo/bulkDeleteCarousel",
};

export { API_BASE_URL, API_PATHS };
