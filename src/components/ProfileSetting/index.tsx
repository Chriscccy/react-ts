import React from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space, Modal } from "antd";
import {
  SettingOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import useUserStore from "@/stores/userStore";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const ProfileSetting: React.FC = () => {
  const username = useUserStore((state) => state.userInfo.username); // 使用正确的 useUserStore 写法
  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().clearAllState();
    navigate("/login");
  };

  const confirmLogout = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to logout?",
      okText: "确认",
      cancelText: "取消",
      onOk: handleLogout,
    });
  };

  const onSettingClick = (route: any) => {
    const path = route.key;
    if (path === "/logout") {
      confirmLogout();
    } else {
      navigate(path);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: onSettingClick,
    },
    {
      key: "/setting",
      icon: <SettingOutlined />,
      label: "Setting",
      onClick: onSettingClick,
    },
    {
      type: "divider",
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: onSettingClick,
    },
  ];

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown menu={{ items }} placement="bottomRight">
          <Button className="Header-Setting-btn">
            {username}
            <UserOutlined />
          </Button>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default ProfileSetting;
