import { create } from "zustand";
import { errNotify, okNotify } from "@/utils/notification";
import {
  get2faQrAPI,
  verify2faSetupAPI,
  verifyDeviceAPI,
} from "@/apis/userAuth";
import useAuthStore from "@/stores/authStore"; // 导入 authStore

interface VerifyType {
  token_2fa?: string;
}

interface U2faState {
  qr_encrypt: string | null;
  fetch2faQR: () => Promise<void>;
  fetch2faSetup: (values: VerifyType) => Promise<boolean>;
  clearState: () => void; // 添加 clearState 方法
}

const useAuth2faStore = create<U2faState>((set) => ({
  qr_encrypt: null,
  fetch2faQR: async () => {
    try {
      const res = await get2faQrAPI();
      const status = res.data.status;
      if (status !== 0) {
        return errNotify("获取QR失败", "获取用户QR失败");
      }
      const data = res.data;

      set({
        qr_encrypt: data.qr_encrypt,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "获取用户QR时发生错误。";
      errNotify("获取QR失败", errorMessage);
    }
  },

  fetch2faSetup: async (values: VerifyType) => {
    try {
      const res = await verify2faSetupAPI(values);
      const { authorization: token } = res.headers;
      const { status, role, d2fa, verify_device } = res.data;

      if (status !== 0) {
        errNotify("验证失败", "2FA码验证失败，请再次尝试");
        return false;
      }

      // 更新 authStore 的状态
      useAuthStore.getState().setAuthState({
        token,
        role,
        d2fa,
        verify_device,
      });

      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "验证时发生错误。";
      errNotify("验证失败", errorMessage);
      return false;
    }
  },

  //   fetchVerifyDevice: async (values: VerifyType) => {
  //     try {
  //       const res = await verifyDeviceAPI(values);
  //       const { authorization: token } = res.headers;
  //       const { status, role, d2fa, verify_device } = res.data;

  //       if (status !== 0) {
  //         errNotify("验证错误", "验证失败，请检查TOTP");
  //         return false;
  //       }

  //       okNotify("验证成功", "您已成功验证登入！");
  //       return true;
  //     } catch (error: any) {
  //       const errorMessage =
  //         error.response?.data?.message || error.message || "验证时发生错误。";
  //       errNotify("验证失败", errorMessage);
  //       return false;
  //     }
  //   },

  clearState: () => {
    // set({ userInfo: initialUserInfo, loading: false }); // 清除用户状态
    const state = useAuth2faStore.getState();
    state.qr_encrypt = "";
  },
}));

export default useAuth2faStore;
