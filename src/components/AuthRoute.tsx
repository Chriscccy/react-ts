import { ReactNode, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useUserStore from "@/stores/userStore";
import useAuthStore from "@/stores/authStore";

interface AuthRouteProps {
  children: ReactNode;
}

export function AuthRoute({ children }: AuthRouteProps) {
  const token = useAuthStore((state) => state.authState.token);
  const username = useUserStore((state) => state.userInfo.username);
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
  const d2fa = useAuthStore((state) => state.authState.d2fa);
  const verifyDevice = useAuthStore((state) => state.authState.verify_device);
  const navigate = useNavigate();
  // const role = useAuthStore((state) => state.role);

  // if (token && d2fa === "true" && !verifyDevice) {
  //   return <Navigate to="/auth/verifydevice" replace />;
  // }

  if (!token || token === "" || token === undefined) {
    return <Navigate to="/login" replace />;
  }

  if (token && d2fa && !verifyDevice) {
    // console.log("AuthRoute ");
    // console.log("AuthRoute : ", token, d2fa, verifyDevice);
    return <Navigate to="/auth/verifydevice" replace />;
    // navigate("/auth/verifydevice");
  }

  useEffect(() => {
    if (token && !username) {
      fetchUserInfo();
    }
  }, [token, username, fetchUserInfo]);

  return <>{children}</>;
}

export default AuthRoute;
