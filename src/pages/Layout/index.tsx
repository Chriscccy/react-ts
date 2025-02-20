import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button, Layout as LayoutA, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./index.scss";
import MenuComponent from "@/components/Menu"; // 导入动态菜单组件
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = LayoutA;

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 }); // 检测是否为移动设备

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <LayoutA className="Layout" style={{ height: "100vh" }}>
      {isMobile ? (
        <>
          <MenuComponent
            isMobile={isMobile}
            drawerVisible={drawerVisible}
            toggleDrawer={toggleDrawer}
          />
          <Button
            type="text"
            icon={<MenuFoldOutlined />}
            onClick={toggleDrawer}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1000,
            }}
          />
        </>
      ) : (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <MenuComponent
            isMobile={isMobile}
            drawerVisible={drawerVisible}
            toggleDrawer={toggleDrawer}
          />
        </Sider>
      )}
      <LayoutA>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {!isMobile && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          )}
        </Header>
        <Outlet />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        ></Content>
      </LayoutA>
    </LayoutA>
  );
};

export default Layout;
