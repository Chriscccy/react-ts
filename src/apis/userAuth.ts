import { request } from "@/utils";
import { API_PATHS } from "@/apis/apiConfig";

interface VerifyType {
  token_2fa?: string;
}

export function verifyDeviceAPI(formData: VerifyType) {
  return request({
    url: API_PATHS.VERIFY_DEVICE,
    method: "POST",
    data: formData,
  });
}

export function get2faQrAPI() {
  return request({
    url: API_PATHS.GET_2FA_QR,
    method: "GET",
  });
}

export function verify2faSetupAPI(formData: VerifyType) {
  return request({
    url: API_PATHS.VERIFY_2FA_SETUP,
    method: "POST",
    data: formData,
  });
}
