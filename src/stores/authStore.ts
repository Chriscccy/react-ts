import { create } from "zustand";
import { request } from "@/utils/request"; // 使用配置好的 axios 实例
import { API_PATHS } from "@/apis/apiConfig"; // 导入配置

import { errNotify, okNotify } from "@/utils/notification";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  login: (values: FieldType) => Promise<void>;
}

interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token: string) => set({ token }),
  clearToken: () => set({ token: null }),
  login: async (values: FieldType) => {
    try {
      const res = await request.post(API_PATHS.LOGIN, values);
      const authHeader = res.headers["authorization"];
      const status = res.data.status;
      if (status !== 0) {
        return errNotify("登录失败", "登录失败，请检查用户名和密码");
      }
      const token = authHeader;
      set({ token });
      okNotify("登录成功", "您已成功登录！");
    } catch (error: any) {
      //   console.error("登录失败:", error); // 输出完整的错误对象
      const errorMessage =
        error.response?.data?.message || error.message || "登录时发生错误。";
      errNotify("登录失败", errorMessage);
      throw error;
    }
  },
}));

export default useAuthStore;
