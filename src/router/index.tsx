import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Layout/Home";
import Article from "@/pages/Layout/Article";
import Publish from "@/pages/Layout/Publish";
import Err404 from "@/pages/404";
import Err403 from "@/pages/403";
import Setting from "@/pages/Layout/Setting";
import Profile from "@/pages/Layout/Profile";
import Register from "@/pages/Register";
import Verify2faDevice from "@/pages/Verify2faDevice";
import Setup2fa from "@/pages/Setup2fa";
import AuthRoute from "@/components/AuthRoute";

const AppRouter: React.FC = () => {
  const role = useAuthStore((state) => state.authState.role);

  const adminRoutes = [
    { index: true, element: <Home /> },
    { path: "/home", element: <Navigate to="/" replace /> },
    { path: "/article", element: <Article /> },
    { path: "/publish", element: <Publish /> },
    { path: "/setting", element: <Setting /> },
    { path: "/profile", element: <Profile /> },
  ];

  const userRoutes = [
    { index: true, element: <Home /> },
    { path: "/home", element: <Navigate to="/" replace /> },
    { path: "/article", element: <Article /> },
    { path: "/setting", element: <Setting /> },
    { path: "/profile", element: <Profile /> },
  ];

  const nullRoutes = [{ path: "*", element: <Err404 /> }];

  const routes =
    role === "admin" ? adminRoutes : role === "user" ? userRoutes : nullRoutes;

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
    { path: "/register", element: <Register /> },
    { path: "/auth/setup2fa", element: <Setup2fa /> },
    { path: "/auth/verifydevice", element: <Verify2faDevice /> },
    {
      path: "*",
      element: <Err404 />,
    },
    {
      path: "/403",
      element: <Err403 />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
