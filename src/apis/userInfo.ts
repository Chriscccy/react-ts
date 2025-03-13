import { request } from "@/utils";
import { API_PATHS } from "@/apis/apiConfig";

interface UpdatePswType {
  oldPwd?: string;
  newPwd?: string;
  repNewPwd?: string;
}

export function getUserInfoAPI() {
  return request({
    url: API_PATHS.GET_USER_INFO,
    method: "GET",
  });
}

export function updatePasswordAPI(formData: UpdatePswType) {
  return request({
    url: API_PATHS.UPDATE_PASSWORD,
    method: "POST",
    data: formData,
  });
}

export function getCarouselImagesAPI() {
  return request({
    url: API_PATHS.GET_CAROUSEL_IMAGES,
    method: "GET",
  });
}
