import useAuthStore from "@/stores/authStore";

const Layout: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const clearToken = useAuthStore((state) => state.clearToken);

  return (
    <div>
      <h1>Layout</h1>
      <h1>Token : {token}</h1>
      <button onClick={clearToken}>Clear Token</button>
    </div>
  );
};

export default Layout;
