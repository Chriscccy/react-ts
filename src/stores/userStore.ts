import { create } from "zustand";
import { request, removeToken } from "@/utils"; // 使用配置好的 axios 实例
import { API_PATHS } from "@/apis/apiConfig"; // 导入配置
import { errNotify } from "@/utils/notification";

interface UserInfo {
  username: string | null;
  age: number | null;
  email: string | null;
}

interface UserState {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  fetchUserInfo: () => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  updateUsername: (username: string) => void; // 添加 updateUsername 方法
}

const initialUserInfo: UserInfo = {
  username: null,
  age: null,
  email: null,
};

const useUserStore = create<UserState>((set, get) => ({
  userInfo: initialUserInfo,
  loading: false,
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  setLoading: (loading: boolean) => set({ loading }),
  fetchUserInfo: async () => {
    const { userInfo, loading, setLoading } = get();
    if (userInfo.username || loading) {
      return; // 如果 username 已经存在或正在加载，直接返回
    }

    setLoading(true); // 设置 loading 为 true

    try {
      const res = await request.get(API_PATHS.GET_USER_INFO);

      const status = res.data.status;
      if (status !== 0) {
        removeToken();
        return errNotify("获取用户信息失败", "获取用户信息失败");
      }

      // 获取用户信息并更新 store
      const data = res.data.data;
      set({
        userInfo: {
          username: data.username,
          age: data.age,
          email: data.email,
        },
      }); // 根据实际用户信息字段更新
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "获取用户信息时发生错误。";
      errNotify("获取用户信息失败", errorMessage);
    } finally {
      setLoading(false); // 请求结束后设置 loading 为 false
    }
  },
  updateUsername: (username: string) => {
    const { userInfo } = get();
    set({ userInfo: { ...userInfo, username } }); // 更新 username
  },
}));

export default useUserStore;
