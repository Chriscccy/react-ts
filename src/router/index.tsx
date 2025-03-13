import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute";
import Layout from "@/pages/Layout";
import useAuthStore from "@/stores/authStore";
import { getRoutes, publicRoutes } from "@/router/routes";

const AppRouter: React.FC = () => {
  const role = useAuthStore((state) => state.authState.role) as
    | "admin"
    | "user"
    | null;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthRoute>
          <Layout />
        </AuthRoute>
      ),
      children: getRoutes(role),
    },
    ...publicRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
