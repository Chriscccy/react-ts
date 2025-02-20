import { Menu, Drawer } from "antd";
import { getMenuItems } from "./MenuList"; // 导入菜单项配置
import { useNavigate } from "react-router-dom";

const MenuComponent: React.FC<{
  isMobile: boolean;
  drawerVisible: boolean;
  toggleDrawer: () => void;
}> = ({ isMobile, drawerVisible, toggleDrawer }) => {
  const menuItems = getMenuItems(); // 获取动态生成的菜单项

  // const role = useUserStore.getState().userInfo.role;
  const navigate = useNavigate();
  const onMenuClick = (route: any) => {
    const path = route.key;
    // console.log(role);

    navigate(path);
  };

  if (isMobile) {
    return (
      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
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
        defaultSelectedKeys={["1"]}
        items={menuItems}
        onClick={onMenuClick}
      />
    );
  }
};

export default MenuComponent;
