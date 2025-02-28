import React from "react";
import { Menu, Drawer } from "antd";
import { getMenuItems } from "./MenuList"; // 导入菜单项配置
import { useLocation, useNavigate } from "react-router-dom";

const MenuComponent: React.FC<{
  isMobile: boolean;
  drawerVisible: boolean;
  toggleDrawer: () => void;
}> = ({ isMobile, drawerVisible, toggleDrawer }) => {
  const menuItems = getMenuItems(); // 获取动态生成的菜单项

  const navigate = useNavigate();
  const onMenuClick = (route: any) => {
    const path = route.key;
    navigate(path);
  };
  const location: any = useLocation().pathname;

  if (isMobile) {
    return (
      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        open={drawerVisible} // 使用 `open` 替代 `visible`
        styles={{ body: { padding: 0 } }} // 使用 `styles.body` 替代 `bodyStyle`
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location]}
          items={menuItems}
          onClick={toggleDrawer}
        />
      </Drawer>
    );
  } else {
    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location]}
        items={menuItems}
        onClick={onMenuClick}
      />
    );
  }
};

export default MenuComponent;
