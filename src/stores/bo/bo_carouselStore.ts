import { create } from "zustand";
import { errNotify } from "@/utils/notification";
import {
  bo_getCarouselImagesAPI,
  bo_addCarouselImageAPI,
  bo_updateCarouselImageAPI,
  bo_deleteCarouselImageAPI,
  bo_bulkUpdateCarouselAPI,
  bo_bulkDeleteCarouselAPI,
} from "@/apis/bo/bo_carousel";

interface UpdateCarouselType {
  id: number;
  image_url: string;
  is_active: number;
}

interface CarouselDetailsType {
  id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  is_active: number;
}

interface AddCarouselURL {
  image_url: string;
  is_active: number;
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

interface BoCarouselState {
  carouselImagesListDetails: CarouselDetailsType[];

  fetchCarouselImagesDetails: () => Promise<void>;
  addCarouselImage: (formData: AddCarouselURL) => Promise<boolean>; // 添加轮播图
  updateCarouselImage: (formData: UpdateCarouselType) => Promise<boolean>; // 更新轮播图
  deleteCarouselImage: (formData: DeleteCarouselType) => Promise<boolean>; // 删除轮播图
  bulkUpdateCarousel: (formData: BulkUpdateCarouselType) => Promise<boolean>;
  bulkDeleteCarousel: (formData: BulkDeleteCarouselType) => Promise<boolean>;
  clearState: () => void; // 清空状态
}

const useBoCarouselStore = create<BoCarouselState>((set, get) => ({
  carouselImagesListDetails: [],

  fetchCarouselImagesDetails: async () => {
    try {
      const res = await bo_getCarouselImagesAPI();
      const status = res.data.status;

      if (status !== 0) {
        errNotify("获取轮播图失败", "获取轮播图列表失败");
        return;
      }

      // 确保返回的数据是 CarouselDetailsType[]
      set({ carouselImagesListDetails: res.data.data });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "获取轮播图列表时发生错误。";
      errNotify("获取轮播图失败", errorMessage);
    }
  },

  // 添加轮播图
  addCarouselImage: async (formData: AddCarouselURL) => {
    try {
      const res = await bo_addCarouselImageAPI(formData);
      const status = res.data.status;

      // 如果接口返回的状态码不是 0，表示失败
      if (status !== 0) {
        errNotify("添加轮播图失败", "添加轮播图失败");
        return false;
      }

      // 重新获取轮播图数据
      get().fetchCarouselImagesDetails();
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "添加轮播图时发生错误。";
      errNotify("添加轮播图失败", errorMessage);
      return false;
    }
  },

  // 更新轮播图
  updateCarouselImage: async (formData: UpdateCarouselType) => {
    try {
      const res = await bo_updateCarouselImageAPI(formData);
      const status = res.data.status;

      // 如果接口返回的状态码不是 0，表示失败
      if (status !== 0) {
        errNotify("更新轮播图失败", "更新轮播图失败");
        return false;
      }

      // 重新获取轮播图数据
      get().fetchCarouselImagesDetails();
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "更新轮播图时发生错误。";
      errNotify("更新轮播图失败", errorMessage);
      return false;
    }
  },

  // 删除轮播图
  deleteCarouselImage: async (formData: DeleteCarouselType) => {
    try {
      const res = await bo_deleteCarouselImageAPI(formData);
      const status = res.data.status;

      // 如果接口返回的状态码不是 0，表示失败
      if (status !== 0) {
        errNotify("删除轮播图失败", "删除轮播图失败");
        return false;
      }

      // 重新获取轮播图数据
      get().fetchCarouselImagesDetails();
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "删除轮播图时发生错误。";
      errNotify("删除轮播图失败", errorMessage);
      return false;
    }
  },

  bulkUpdateCarousel: async (formData: BulkUpdateCarouselType) => {
    try {
      const res = await bo_bulkUpdateCarouselAPI(formData);
      const status = res.data.status;

      // 如果接口返回的状态码不是 0，表示失败
      if (status !== 0) {
        errNotify("批量更新轮播图失败", "批量更新轮播图失败");
        return false;
      }

      // 重新获取轮播图数据
      get().fetchCarouselImagesDetails();
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "批量更新轮播图时发生错误。";
      errNotify("批量更新轮播图失败", errorMessage);
      return false;
    }
  },
  bulkDeleteCarousel: async (formData: BulkDeleteCarouselType) => {
    try {
      const res = await bo_bulkDeleteCarouselAPI(formData);
      const status = res.data.status;

      // 如果接口返回的状态码不是 0，表示失败
      if (status !== 0) {
        errNotify("批量删除轮播图失败", "批量删除轮播图失败");
        return false;
      }

      // 重新获取轮播图数据
      get().fetchCarouselImagesDetails();
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "批量删除轮播图时发生错误。";
      errNotify("批量删除轮播图失败", errorMessage);
      return false;
    }
  },

  // 清空状态
  clearState: () => {
    set({ carouselImagesListDetails: [] });
  },
}));

export default useBoCarouselStore;
