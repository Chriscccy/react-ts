import { create } from "zustand";
import { errNotify } from "@/utils/notification";
import { getUserInfoAPI } from "@/apis/user";

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
  clearState: () => void; // 添加 clearState 方法
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
      const res = await getUserInfoAPI();
      const status = res.data.status;
      if (status !== 0) {
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
  clearState: () => {
    // set({ userInfo: initialUserInfo, loading: false }); // 清除用户状态
    const state = useUserStore.getState();
    state.userInfo = initialUserInfo;
    state.loading = false;
  },
}));

export default useUserStore;
