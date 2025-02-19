import useAuthStore from "@/stores/authStore";
import useUserStore from "@/stores/userStore";

const Layout: React.FC = () => {
  const clearToken = useAuthStore((state) => state.clearToken);
  const token = useAuthStore((state) => state.token);
  const userInfo = useUserStore((state) => state.userInfo);
  const updateUsername = useUserStore((state) => state.updateUsername);

  return (
    <div>
      <h1>Layout</h1>
      <h1>Token: {token}</h1>
      <h1>Username: {userInfo.username}</h1>
      <h1>Age: {userInfo.age}</h1>
      <h1>Email: {userInfo.email}</h1>
      <button onClick={clearToken}>Clear Token</button>
      <button onClick={() => updateUsername("")}>Clear Username</button>
    </div>
  );
};

export default Layout;
