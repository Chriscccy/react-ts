import "./index.scss";
import { Card, Form, Input, Button, Checkbox, Flex } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import logo from "@/assets/images/react.svg";
import useAuthStore from "@/stores/authStore"; // 确保路径正确
import { errNotify } from "@/utils/notification";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  repassword?: string;
  email?: string;
};

const Register: React.FC = () => {
  const fetchRegister = useAuthStore((state) => state.fetchLogin);
  const navigate = useNavigate();
  const backHandle = () => {
    navigate("/login");
  };
  const onFinish = async (values: FieldType) => {
    try {
      const success = await fetchRegister(values);
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
        <h2 style={{ textAlign: "center" }}>Register</h2>
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
              size="large"
              type="text"
              placeholder="Username"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            hasFeedback
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="repassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm Password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="email"
            hasFeedback
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input size="large" placeholder="Email" prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>

          <Flex align="center" justify="center">
            <Button type="link" onClick={backHandle}>
              Back to Login
            </Button>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
};

export default Register;
