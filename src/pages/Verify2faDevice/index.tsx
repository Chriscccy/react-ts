import { Card, Form, Input, Button, Flex } from "antd";
import "./index.scss";
import { errNotify } from "@/utils/notification";
import useAuthStore from "@/stores/authStore"; // 确保路径正确
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

interface FieldType {
  token_2fa?: string;
}

const Verify2faDevice: React.FC = () => {
  const fetchVerifyDevice = useAuthStore((state) => state.fetchVerifyDevice);
  const { token, d2fa, verify_device } = useAuthStore(
    (state) => state.authState
  );
  const navigate = useNavigate();

  if (!token || token === "" || token === undefined) {
    return <Navigate to="/login" replace />;
  } else if (d2fa && verify_device) {
    return <Navigate to="/" replace />;
  }

  const backLogin = () => {
    useAuthStore.getState().clearAllState();
    navigate("/login");
  };

  const onFinish = async (values: FieldType) => {
    try {
      const success = await fetchVerifyDevice(values);
      if (success) {
        navigate("/"); // 仅在验证成功时执行跳转
      }
    } catch (error: any) {
      errNotify("验证失败！", error.message);
    }
  };

  return (
    <Flex className="verifydevice" align="center" justify="center">
      <Card className="card-container">
        <h2 style={{ textAlign: "center" }}>验证设备</h2>
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="token_2fa"
            hasFeedback
            validateStatus="success"
            className="Form2fa"
          >
            <Input.OTP size="large" />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              提交
            </Button>
          </Form.Item>
        </Form>

        <Flex align="center" justify="center">
          <Button type="link" onClick={backLogin}>
            Back to Login
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Verify2faDevice;
