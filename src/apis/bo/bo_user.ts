import { request } from "@/utils";
import { API_PATHS } from "@/apis/apiConfig";

interface IdType {
  email: string;
}

export function bo_getUserListAPI() {
  return request({
    url: API_PATHS.BO_GET_USER_LIST,
    method: "GET",
  });
}

export function bo_getUserDetailsAPI(email: IdType) {
  return request({
    url: API_PATHS.BO_GET_USER_DETAILS,
    method: "POST",
    data: email,
  });
}
