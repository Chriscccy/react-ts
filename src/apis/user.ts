import { request } from "@/utils";
import { API_PATHS } from "@/apis/apiConfig";

interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}
interface VerifyType {
  token_2fa?: string;
}

export function loginAPI(formData: FieldType) {
  return request({
    url: API_PATHS.LOGIN,
    method: "POST",
    data: formData,
  });
}

export function getUserInfoAPI() {
  return request({
    url: API_PATHS.GET_USER_INFO,
    method: "GET",
  });
}

export function verifyDeviceAPI(formData: VerifyType) {
  return request({
    url: API_PATHS.VERIFYDEVICE,
    method: "POST",
    data: formData,
  });
}
