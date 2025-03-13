import { request } from "@/utils";
import { API_PATHS } from "@/apis/apiConfig";

interface UpdateCarouselType {
  id: number;
  image_url: string;
  is_active: number;
}

interface AddCarouselURL {
  image_url: string;
}

interface DeleteCarouselType {
  id: number;
}

interface BulkUpdateCarouselType {
  updates: {
    id: number;
    is_active: number;
  }[];
}

interface BulkDeleteCarouselType {
  delete: {
    id: number;
  }[];
}

// 获取轮播图列表
export function bo_getCarouselImagesAPI() {
  return request({
    url: API_PATHS.BO_GET_CAROUSEL_DETAILS,
    method: "GET",
  });
}

// 添加轮播图
export function bo_addCarouselImageAPI(formData: AddCarouselURL) {
  return request({
    url: API_PATHS.BO_ADD_CAROUSEL_IMAGE,
    method: "POST",
    data: formData, // 直接传递对象
  });
}

// 更新轮播图
export function bo_updateCarouselImageAPI(formData: UpdateCarouselType) {
  return request({
    url: API_PATHS.BO_UPDATE_CAROUSEL_IMAGE,
    method: "POST",
    data: formData,
  });
}

// 删除轮播图
export function bo_deleteCarouselImageAPI(formData: DeleteCarouselType) {
  return request({
    url: API_PATHS.BO_DELETE_CAROUSEL_IMAGE,
    method: "POST",
    data: formData,
  });
}

export function bo_bulkUpdateCarouselAPI(formData: BulkUpdateCarouselType) {
  return request({
    url: API_PATHS.BO_BULK_UPDATE_CAROUSEL,
    method: "POST",
    data: formData,
  });
}

export function bo_bulkDeleteCarouselAPI(formData: BulkDeleteCarouselType) {
  return request({
    url: API_PATHS.BO_BULK_DELETE_CAROUSEL,
    method: "POST",
    data: formData,
  });
}
