import { Card, Form, Input, Button, Flex } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import useAuthStore from "@/stores/authStore"; // 确保路径正确
import { errNotify } from "@/utils/notification";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Setup2fa: React.FC = () => {
  const fetchLogin = useAuthStore((state) => state.fetchLogin);
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    try {
      const success = await fetchLogin(values);
      if (success) {
        navigate("/"); // 仅在登录成功时执行跳转
      }
    } catch (error: any) {
      errNotify("Login failed!", error);
    }
  };

  return (
    <Flex className="login" align="center" justify="center">
      <Card className="login-container">
        {/* <img className="login-logo" src={logo} alt="logo" /> */}
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item<FieldType>
            name="username"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              { min: 3, message: "Username must be at least 3 characters!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              size="large"
              type="text"
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            hasFeedback
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 3, message: "Password must be at least 3 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button size="large" type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default Setup2fa;
