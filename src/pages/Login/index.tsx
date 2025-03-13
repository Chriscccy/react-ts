import "./index.scss";
import { Card, Form, Input, Button, Checkbox, Flex } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import logo from "@/assets/images/react.svg";
import useAuthStore from "@/stores/authStore"; // 确保路径正确
import { errNotify } from "@/utils/notification";
import { useNavigate, Navigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const fetchLogin = useAuthStore.getState().fetchLogin;
  const { token, verify_device, d2fa } = useAuthStore(
    (state) => state.authState
  );
  const navigate = useNavigate();

  if (token) {
    if (d2fa) {
      return verify_device ? (
        <Navigate to="/" replace />
      ) : (
        <Navigate to="/auth/verifydevice" replace />
      );
    }
    return <Navigate to="/" replace />;
  }

  const regHandle = () => {
    navigate("/register");
  };

  const onFinish = async (values: FieldType) => {
    try {
      const success = await fetchLogin(values);
      if (success) {
        if (d2fa) {
          navigate("/auth/verifydevice");
          return;
        }
        if (!d2fa) navigate("/");
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

          <Flex align="center" justify="center">
            <Button type="link" onClick={regHandle}>
              Register
            </Button>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
};

export default Login;
