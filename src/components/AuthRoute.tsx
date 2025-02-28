import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "@/stores/userStore";
import useAuthStore from "@/stores/authStore";

interface AuthRouteProps {
  children: ReactNode;
}

export function AuthRoute({ children }: AuthRouteProps) {
  const token = useAuthStore((state) => state.authState.token);
  const username = useUserStore((state) => state.userInfo.username);
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
  // const d2fa = useAuthStore((state) => state.d2fa);
  // const verifyDevice = useAuthStore((state) => state.verify_device);
  // const role = useAuthStore((state) => state.role);

  // if (token && d2fa === "true" && !verifyDevice) {
  //   return <Navigate to="/auth/verifydevice" replace />;
  // }

  if (!token || token === "" || token === undefined) {
    return <Navigate to="/login" replace />;
  }

  // if (token) {
  //   // return <Navigate to="/auth/verifydevice" replace />;
  //   return <Navigate to="/" replace />;
  // }

  useEffect(() => {
    if (token && !username) {
      fetchUserInfo();
    }
  }, [token, username, fetchUserInfo]);

  return <>{children}</>;
}

export default AuthRoute;
