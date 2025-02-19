import { create } from "zustand";
import { request } from "@/utils/request"; // 使用配置好的 axios 实例
import { API_PATHS } from "@/apis/apiConfig"; // 导入配置
import useAuthStore from "./authStore"; // 导入 authStore
import { errNotify } from "@/utils/notification";

interface UserState {
  username: string | null;
  setUsername: (username: string) => void;
  fetchUserInfo: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  username: null,
  setUsername: (username: string) => set({ username }),
  fetchUserInfo: async () => {
    try {
      const token = useAuthStore.getState().token;
      if (!token) {
        throw new Error("Token not found");
      }
      // console.log(`Fetching user info with token: ${token}`);

      // 设置请求头，包含 Authorization 头
      const res = await request.get(API_PATHS.GET_USER_INFO, {
        headers: {
          Authorization: `Bearer ${token}`, // 确保包含 Bearer 前缀
        },
      });

      const status = res.data.status;
      if (status !== 0) {
        return errNotify("获取用户信息失败", "获取用户信息失败");
      }

      // 获取用户信息并更新 store
      const userInfo = res.data.data;
      set({ username: userInfo.username }); // 根据实际用户信息字段更新
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "登录时发生错误。";
      errNotify("获取用户信息失败", errorMessage);
    }
  },
}));

export default useUserStore;
