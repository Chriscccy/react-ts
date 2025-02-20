import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
import Home from "@/pages/Layout/Home";
import Article from "@/pages/Layout/Article";
import Publish from "@/pages/Layout/Publish";
import Err404 from "@/pages/404";

import useAuthStore from "@/stores/authStore";

const role = useAuthStore.getState().role;

const adminRoutes = [
  { index: true, element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/article", element: <Article /> },
  { path: "/publish", element: <Publish /> },
];

const userRoutes = [
  { index: true, element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/article", element: <Article /> },
];

let routes;
if (role === "admin") {
  routes = adminRoutes;
} else {
  routes = userRoutes;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: routes,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*", // 捕获所有未匹配的路径并跳转到404页面
    element: <Err404 />,
  },
]);

export default router;
