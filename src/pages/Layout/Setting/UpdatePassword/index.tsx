import { Input, Space, Button, Form, Flex, Card, Typography } from "antd";
import useAuthStore from "@/stores/authStore";
import { errNotify, okNotify } from "@/utils";

const { Title } = Typography;

type FieldType = {
  oldPwd?: string;
  newPwd?: string;
  repNewPwd?: string;
};

const UpdatePsw: React.FC = () => {
  const fetchUpdatePsw = useAuthStore.getState().fetchUpdatePsw;
  const onFinish = async (values: FieldType) => {
    try {
      const success = await fetchUpdatePsw(values);
      if (success) {
      }
    } catch (error: any) {
      errNotify("Login failed!", error);
    }
  };

  return (
    <Flex justify="center">
      <Card className="card-container">
        <Space
          direction="vertical"
          size="middle"
          align="center"
          style={{ display: "flex" }}
        >
          <Title level={5}>Update Password</Title>

          <Form onFinish={onFinish} validateTrigger="onBlur" autoComplete="off">
            <Form.Item<FieldType>
              name="oldPwd"
              hasFeedback
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 3, message: "Password must be at least 3 characters!" },
              ]}
            >
              <Input.Password
                // prefix={<LockOutlined />}
                size="large"
                placeholder="Password"
                style={{ width: "300px" }}
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="newPwd"
              hasFeedback
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 3, message: "Password must be at least 3 characters!" },
              ]}
            >
              <Input.Password
                // prefix={<LockOutlined />}
                size="large"
                placeholder="New Password"
                style={{ width: "300px" }}
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="repNewPwd"
              dependencies={["newPwd"]}
              hasFeedback
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 3, message: "Password must be at least 3 characters!" },
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    if (!value || getFieldValue("newPwd") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                // prefix={<LockOutlined />}
                size="large"
                placeholder="Repeat New Password"
                style={{ width: "300px" }}
              />
            </Form.Item>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </Flex>
  );
};

export default UpdatePsw;
