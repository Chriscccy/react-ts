import "./index.scss";
import { Card, Form, Input, Button, Checkbox, Flex } from "antd";
import logo from "@/assets/images/react.svg";
import { request } from "@/utils";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const onFinish = (values: FieldType) => {
    // 执行相应操作
    console.log(values);
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
              // { pattern: /^1[3-9]\d{5}$/, message: "请输入正确的手机号" },
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
