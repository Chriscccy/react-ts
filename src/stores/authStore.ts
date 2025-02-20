import { create } from "zustand";
import { request } from "@/utils"; // 使用配置好的 axios 实例
import { setToken as _setToken, getToken, removeToken } from "@/utils";
import { setRole, getRole, removeRole } from "@/utils";
import { API_PATHS } from "@/apis/apiConfig"; // 导入配置

import { errNotify, okNotify } from "@/utils";

interface AuthState {
  token: string | null;
  role: string | null;
  clearToken: () => void;
  fetchLogin: (values: FieldType) => Promise<boolean>; // 返回布尔值表示登录是否成功
}

interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}

const useAuthStore = create<AuthState>((set) => ({
  token: getToken() || null,
  role: getRole() || null,
  clearToken: () => {
    set({ token: null });
    removeToken();
    removeRole();
  },
  fetchLogin: async (values: FieldType) => {
    try {
      const res = await request.post(API_PATHS.LOGIN, values);
      const authHeader = res.headers["authorization"];
      const status = res.data.status;
      if (status !== 0) {
        errNotify("登录失败", "登录失败，请检查用户名和密码");
        return false; // 返回 false 表示登录失败
      }
      const token = authHeader;
      const role = res.data.role;
      set({ token }); // 更新 Zustand 状态
      _setToken(token);
      setRole(role);

      okNotify("登录成功", "您已成功登录！");
      return true; // 返回 true 表示登录成功
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "登录时发生错误。";
      errNotify("登录失败", errorMessage);
      return false; // 返回 false 表示登录失败
    }
  },
}));

export default useAuthStore;
