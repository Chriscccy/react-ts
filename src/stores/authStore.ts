import { create } from "zustand";
import { persist } from "zustand/middleware";
import { encrypt, decrypt } from "@/utils/crypto"; // 导入加密工具函数

import { errNotify, okNotify } from "@/utils";
import { loginAPI, verifyDeviceAPI } from "@/apis/user"; // 确保从 user API 导入 verifyDeviceAPI
import useUserStore from "@/stores/userStore"; // 导入 userStore

interface InitialAuth {
  token: string | null;
  role: string | null;
  d2fa: boolean;
  verify_device: boolean;
}

interface AuthState {
  authState: InitialAuth;
  clearAllState: () => void;
  fetchLogin: (values: FieldType) => Promise<boolean>;
  fetchVerifyDevice: (values: VerifyType) => Promise<boolean>;
}

interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}

interface VerifyType {
  token_2fa?: string;
}

const initialAuthState: InitialAuth = {
  token: null,
  role: null,
  d2fa: false,
  verify_device: false,
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authState: initialAuthState,

      clearAllState: () => {
        const state = useAuthStore.getState();
        state.authState = initialAuthState;
        useUserStore.getState().clearState();
        localStorage.clear();
      },

      fetchLogin: async (values: FieldType) => {
        try {
          const res = await loginAPI(values);
          const { authorization: token } = res.headers;
          const { status, role, d2fa, verify_device } = res.data;

          if (status !== 0) {
            errNotify("登录失败", "登录失败，请检查用户名和密码");
            return false;
          }

          set({
            authState: {
              token,
              role,
              d2fa,
              verify_device,
            },
          });

          okNotify("登录成功", "您已成功登录！");

          return true;
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "登录时发生错误。";
          errNotify("登录失败", errorMessage);
          return false;
        }
      },

      fetchVerifyDevice: async (values: VerifyType) => {
        try {
          const res = await verifyDeviceAPI(values);
          const { authorization: token } = res.headers;
          const { status, role, d2fa, verify_device } = res.data;

          if (status !== 0) {
            errNotify("验证错误", "验证失败，请检查TOTP");
            return false;
          }

          set({
            authState: {
              token,
              role,
              d2fa,
              verify_device,
            },
          });
          okNotify("验证成功", "您已成功验证登入！");
          return true;
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "验证时发生错误。";
          errNotify("验证失败", errorMessage);
          return false;
        }
      },
    }),
    {
      name: "auth-storage", // 存储键名
      storage: {
        getItem: (name) => {
          const data = localStorage.getItem(name);
          if (data) {
            try {
              const decryptedData = decrypt(data);
              const parsed = JSON.parse(decryptedData);
              return parsed;
            } catch (error: any) {
              // console.log("解密失败: ", error.message);
              return null;
            }
          }
          return null;
        },
        setItem: (name, value) => {
          const stringValue = JSON.stringify(value);
          const encryptedValue = encrypt(stringValue);
          localStorage.setItem(name, encryptedValue);
        },
        removeItem: (name) => localStorage.removeItem(name),
      }, // 使用 localStorage 作为存储介质
      partialize: (state) => ({
        authState: state.authState,
        clearAllState: () => {}, // 占位函数
        fetchLogin: async () => false, // 占位函数
        fetchVerifyDevice: async () => false, // 占位函数
      }), // 返回完整的 AuthState 对象
    }
  )
);

export default useAuthStore;
