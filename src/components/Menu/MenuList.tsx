import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import useAuthStore from "@/stores/authStore";

const adminMenuItems = [
  {
    key: "/",
    icon: <UserOutlined />,
    label: "Admin Dashboard",
  },
  {
    key: "/article",
    icon: <VideoCameraOutlined />,
    label: "Article",
  },
  {
    key: "/publish",
    icon: <VideoCameraOutlined />,
    label: "Publish",
  },
];

const userMenuItems = [
  {
    key: "/",
    icon: <UserOutlined />,
    label: "User Dashboard",
  },
  {
    key: "/article",
    icon: <VideoCameraOutlined />,
    label: "Profile",
  },
];

export const getMenuItems = () => {
  const role = useAuthStore((state) => state.authState.role);

  return role === "admin" ? adminMenuItems : userMenuItems;
};
