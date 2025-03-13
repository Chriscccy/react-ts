import {
  UserOutlined,
  VideoCameraOutlined,
  QrcodeOutlined,
  LockOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

export const allMenuItems = [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/article",
    icon: <VideoCameraOutlined />,
    label: "Article",
  },
  {
    key: "/carousel",
    icon: <VideoCameraOutlined />,
    label: "Carousel",
    role: "admin",
  },
  {
    key: "/manage",
    icon: <VideoCameraOutlined />,
    label: "User 1",
    role: "admin",
    children: [
      {
        key: "/manage/userlist",
        icon: <VideoCameraOutlined />,
        label: "User 2",
        role: "admin",
      },
    ],
  },
];

export const settingMenuItems = [
  {
    key: "/setting/profile",
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: "/setting/updatepsw",
    icon: <LockOutlined />,
    label: "Update Password",
  },
  {
    key: "/setting/setup2fa",
    icon: <QrcodeOutlined />,
    label: "Setup 2FA",
  },
];

const nullMenuItems = [
  {
    key: "not-found",
    icon: null,
    label: "Not Found",
  },
];

const getAllMenuItems = (role: "admin" | "user" | null) => {
  if (role === "admin" || role === "user") {
    return allMenuItems.filter((items) => !items.role || items.role === role);
  } else {
    return nullMenuItems;
  }
};

const getSettingMenuItems = settingMenuItems;

export { getAllMenuItems, getSettingMenuItems };
