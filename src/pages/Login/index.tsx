import "./index.scss";
import { Card, Form, Input, Button, Checkbox, Flex } from "antd";
import logo from "@/assets/images/react.svg";
import useAuthStore from "@/stores/authStore"; // 确保路径正确
import { errNotify } from "@/utils/notification";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
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
        <img className="login-logo" src={logo} alt="logo" />
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item<FieldType>
            label={null}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input size="large" type="text" placeholder="username" />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" placeholder="password" />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember me</Checkbox>
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

export default Login;
