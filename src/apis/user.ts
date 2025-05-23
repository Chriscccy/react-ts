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

interface UpdatePswType {
  oldPwd?: string;
  newPwd?: string;
  repNewPwd?: string;
}

export function loginAPI(formData: FieldType) {
  return request({
    url: API_PATHS.LOGIN,
    method: "POST",
    data: formData,
  });
}

export function updatePasswordAPI(formData: UpdatePswType) {
  return request({
    url: API_PATHS.UPDATE_PASSWORD,
    method: "POST",
    data: formData,
  });
}
