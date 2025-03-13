import React from "react";
import { Menu, Drawer } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import { getAllMenuItems } from "@/router/menuList";
import "./index.scss";
import logo from "@/assets/images/DeepSeek_logo.svg";
import logoIcon from "@/assets/images/DeepSeek_icon.svg";

const MenuComponent: React.FC<{
  isMobile: boolean;
  drawerVisible: boolean;
  toggleDrawer: () => void;
}> = ({ isMobile, drawerVisible, toggleDrawer }) => {
  const role = useAuthStore((state) => state.authState.role) as
    | "admin"
    | "user"
    | null;

  const menuItems = getAllMenuItems(role);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const onMenuClick = (route: any) => {
    const path = route.key;
    navigate(path);
    if (isMobile) {
      toggleDrawer();
    }
  };

  // 获取当前路径的父级路径来设置默认展开的菜单项
  const defaultOpenKeys = [pathname.split("/").slice(0, 2).join("/")];

  if (isMobile) {
    return (
      <Drawer
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        open={drawerVisible}
        width={250}
        styles={{ body: { padding: 0, backgroundColor: "#001529" } }}
      >
        <div className="Menu-Logo-Box">
          <img src={logo} alt="Logo" className="Menu-Logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={defaultOpenKeys}
          items={menuItems}
          onClick={onMenuClick}
        />
      </Drawer>
    );
  } else {
    return (
      <>
        <div className="Menu-Logo-Box">
          <img src={logo} alt="Logo" className="Menu-Logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={defaultOpenKeys}
          items={menuItems}
          onClick={onMenuClick}
        />
      </>
    );
  }
};

export default MenuComponent;
