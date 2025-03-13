import { Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify2faDevice from "@/pages/Verify2faDevice";
import Err404 from "@/pages/404";
import Err403 from "@/pages/403";
// Pages Layout
import Article from "@/pages/Layout/Article";
import Setting from "@/pages/Layout/Setting";
import Profile from "@/pages/Layout/Setting/Profile";
import Setup2FA from "@/pages/Layout/Setting/Setup2FA";
import CarouselManagement from "@/pages/Layout/Bo/Carousel";
// Store
import UpdatePsw from "@/pages/Layout/Setting/UpdatePassword";
import Dashboard from "@/pages/Layout/Dashboard";
import UserList from "@/pages/Layout/Bo/UserList";

// 所有路由（包含公共路由、管理员路由和普通用户路由）
const allRoutes = [
  { index: true, element: <Dashboard /> }, // 首页
  { path: "/dashboard", element: <Navigate to="/" replace /> }, // 重定向到首页
  { path: "/article", element: <Article /> }, // 文章页
  {
    path: "/manage",
    element: <UserList />,
    role: "admin",
    children: [
      { index: true, element: <UserList /> },
      { path: "userlist", element: <UserList /> },
    ],
  },
  { path: "/carousel", element: <CarouselManagement />, role: "admin" },
  {
    path: "/setting",
    element: <Setting />,
    children: [
      { index: true, element: <Navigate to="/setting/profile" replace /> }, // 默认子路由
      { path: "profile", element: <Profile /> }, // 个人资料页
      { path: "updatepsw", element: <UpdatePsw /> }, // 修改密码页
      { path: "setup2fa", element: <Setup2FA /> }, // 设置 2FA 页
    ],
  },
];

const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/register", element: <Register /> },
  { path: "/auth/verifydevice", element: <Verify2faDevice /> },
  { path: "*", element: <Err404 /> },
  { path: "/403", element: <Err403 /> },
];

const nullRoutes = [{ path: "*", element: <Err404 /> }];

const getRoutes = (role: "admin" | "user" | null) => {
  if (role === "admin" || role === "user") {
    return allRoutes.filter((route) => !route.role || route.role === role);
  } else {
    return nullRoutes;
  }
};

export { getRoutes, publicRoutes };
