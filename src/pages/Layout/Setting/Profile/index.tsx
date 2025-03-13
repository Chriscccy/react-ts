// const Profile = () => {
//   return <div>this is Profile</div>;
// };

// export default Profile;

import React, { useState } from "react";

import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Collapse,
  Space,
  Flex,
} from "antd";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const componentDisabled = true;

const languageOption = [
  { value: "English", label: "English" },
  { value: "Chinese", label: "Chinese" },
];

const Profile: React.FC = () => {
  const PersonalInfo = (
    <Flex>
      <Form
        labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ width: "100%", maxWidth: 600 }}
      >
        <Form.Item label="Name">
          <Input value="Name" />
        </Form.Item>
        <Form.Item label="Email">
          <Input value="user@email.com" />
        </Form.Item>
        <Form.Item label="Language">
          <Select defaultValue="English" options={languageOption} />
        </Form.Item>

        <Form.Item label="Dob">
          <DatePicker defaultValue={dayjs("2015/01/01")} />
        </Form.Item>
      </Form>
    </Flex>
  );

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Collapse
        defaultActiveKey={["1"]}
        items={[
          {
            key: "1",
            label: "General Information",
            children: PersonalInfo,
            showArrow: true,
          },
        ]}
      />
    </Space>
  );
};

export default Profile;
