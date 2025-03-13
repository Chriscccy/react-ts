import "./index.scss";
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Button, Layout as LayoutA, theme, Breadcrumb, Flex } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import MenuComponent from "@/components/Menu"; // 导入动态菜单组件
import ProfileSetting from "@/components/ProfileSetting";

import { allMenuItems, settingMenuItems } from "@/router/menuList";

const { Header, Sider, Content, Footer } = LayoutA;

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
    <LayoutA className="Layout">
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
          <MenuComponent
            isMobile={isMobile}
            drawerVisible={drawerVisible}
            toggleDrawer={toggleDrawer}
          />
        </Sider>
      )}
      <LayoutA>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 5px 15px -10px rgb(0 0 0 / 50%)",
          }}
        >
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
          <div className="Header-Setting">
            <ProfileSetting />
          </div>
        </Header>

        <Content>
          <Flex className="Layout-Content" vertical>
            <div style={{ padding: "0 24px" }}>
              {/* <Breadcrumb
                style={{ margin: "16px 0" }}
                items={generateBreadcrumbs()}
              /> */}
              <div style={{ margin: "24px 0" }} />
              <div>
                <Outlet />
              </div>
            </div>
            <Footer
              style={{
                textAlign: "center",
                // backgroundColor: "red",
                // marginTop: "16px",
              }}
            >
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Flex>
        </Content>
      </LayoutA>
    </LayoutA>
  );
};

export default Layout;
