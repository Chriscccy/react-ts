// src/pages/Layout/Setting.tsx
import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";

import { getSettingMenuItems } from "@/router/menuList";
import { Header } from "antd/es/layout/layout";

const { Content, Sider } = Layout;

const Setting: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location: any = useLocation().pathname;

  // 处理菜单点击事件
  const handleSettingMenuClick: MenuProps["onClick"] = (path) => {
    navigate(path.key);
  };

  return (
    <Layout
      style={{
        padding: "24px 0",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Sider style={{ background: colorBgContainer }} width={200}>
        <Menu
          // mode="inline"
          mode="vertical"
          // mode="horizontal"
          style={{ height: "100%" }}
          selectedKeys={[location]}
          // items={settingMenuItems}
          items={getSettingMenuItems}
          onClick={handleSettingMenuClick}
        />
      </Sider>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Setting;
