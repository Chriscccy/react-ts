import React, { useEffect, useState } from "react";
import {
  Input,
  QRCode,
  Space,
  Button,
  Form,
  Flex,
  Card,
  Typography,
  Alert,
} from "antd";
import useAuth2faStore from "@/stores/auth2faStore";
import useAuthStore from "@/stores/authStore";
import { decrypt } from "@/utils/crypto";
import { errNotify, okNotify } from "@/utils";

const { Title } = Typography;

type FieldType = {
  token_2fa?: string;
};

const Setup2FA: React.FC = () => {
  const fetch2faQR = useAuth2faStore((state) => state.fetch2faQR);
  const fetch2faSetup = useAuth2faStore((state) => state.fetch2faSetup);

  const qr_encrypt = useAuth2faStore((state) => state.qr_encrypt);
  const d2fa = useAuthStore((state) => state.authState.d2fa);

  const [qrDecrypt, setQrDecrypt] = useState<string | null>(null);

  useEffect(() => {
    if (qr_encrypt) {
      try {
        const decrypted = decrypt(qr_encrypt);
        // const decrypted = qr_encrypt;
        setQrDecrypt(decrypted);
      } catch (error: any) {
        errNotify("Failed to decrypt QR code:", error);
      }
    }
  }, [qr_encrypt]);

  const onFinish = async (values: FieldType) => {
    try {
      const success = await fetch2faSetup(values);
      if (success) {
        // console.log("Setup2FA UI 界面 : 2fa 验证成功");
        // return;
        okNotify("验证注册成功", "2FA 注册以及验证成功");
      }
    } catch (error: any) {
      errNotify("2fa 验证失败", error);
    }
  };

  return (
    // <Space direction="vertical" align="center">
    // {/* <Flex align="center" justify="center"> */}
    <Flex justify="center">
      <Card className="card-container">
        <Space
          direction="vertical"
          size="middle"
          align="center"
          style={{ display: "flex" }}
        >
          <Title level={5}>Activate 2FA</Title>
          {d2fa ? (
            <>
              <Alert message="Activated" type="success" showIcon />
              <QRCode value="Scanned" status="scanned" />
            </>
          ) : qrDecrypt ? (
            <QRCode value={qrDecrypt} />
          ) : (
            <QRCode value="Verified" status="expired" onRefresh={fetch2faQR} />
          )}
          <Form onFinish={onFinish} autoComplete="off" validateTrigger="onBlur">
            <Form.Item
              name="token_2fa"
              validateStatus="success"
              hasFeedback
              rules={[
                {
                  pattern: /^\d+$/,
                  message: "Please input only numbers!",
                },
                { required: true, message: "Please input your TOTP code!" },
              ]}
            >
              <Input.OTP size="middle" disabled={d2fa ? true : false} />
            </Form.Item>
            <Form.Item>
              <Button
                size="middle"
                type="primary"
                htmlType="submit"
                block
                disabled={d2fa ? true : false}
              >
                {d2fa ? "Verifired" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </Flex>
  );
};

export default Setup2FA;
