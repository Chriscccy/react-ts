import { ReactNode, useEffect } from "react";
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";
import useUserStore from "@/stores/userStore";

interface AuthRouteProps {
  children: ReactNode;
}

export function AuthRoute({ children }: AuthRouteProps) {
  const token = getToken();
  const username = useUserStore((state) => state.userInfo.username);
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);

  useEffect(() => {
    if (token && !username) {
      fetchUserInfo();
    }
  }, [token, username, fetchUserInfo]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default AuthRoute;
