import { create } from "zustand";
import { errNotify } from "@/utils/notification";
import { bo_getUserListAPI, bo_getUserDetailsAPI } from "@/apis/bo/bo_user"; // 确保导入 bo_getUserDetailsAPI

interface IdType {
  email: string;
}

interface UserBasicInfoType {
  username: string;
  email: string;
  nickname: string;
  active: string;
  d2fa: string;
}

interface UserDetailsType extends UserBasicInfoType {
  regDate?: string;
  lastMineDate?: string;
  hashRate?: number;
}

interface BoUserState {
  userList: UserBasicInfoType[];
  userDetails: Record<string, UserDetailsType>;
  fetchUserList: () => Promise<void>;
  fetchUserDetails: (email: string) => Promise<void>; // 按需获取用户详情
  clearState: () => void;
}

const useBoUserStore = create<BoUserState>((set, get) => ({
  userList: [],
  userDetails: {},

  fetchUserList: async () => {
    try {
      const res = await bo_getUserListAPI();
      const status = res.data.status;
      if (status !== 0) {
        return errNotify("获取用户列表失败", "获取用户列表失败");
      }

      const data: UserBasicInfoType[] = res.data.data;
      set({
        userList: data,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "获取用户列表时发生错误。";
      errNotify("获取用户列表失败", errorMessage);
    }
  },

  fetchUserDetails: async (email: string) => {
    const { userDetails } = get();
    if (userDetails[email]) return;

    try {
      const res = await bo_getUserDetailsAPI({ email });
      const status = res.data.status;
      if (status !== 0) {
        return errNotify("获取用户信息失败", "获取用户信息失败");
      }

      // 获取用户详细信息并更新 store
      const newUserDetails = { ...userDetails, [email]: res.data.data };
      set({
        userDetails: newUserDetails,
      });
      console.log(newUserDetails);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "获取用户信息时发生错误。";
      errNotify("获取用户信息失败", errorMessage);
    }
  },

  clearState: () => {
    set({
      userList: [],
      userDetails: {},
    });
  },
}));

export default useBoUserStore;
