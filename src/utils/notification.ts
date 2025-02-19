// notification.ts

import { notification } from "antd";

const errNotify = (message: string, description: string) => {
  notification.error({
    message,
    description,
    style: {
      backgroundColor: "#ffccc7", // 你可以设置你想要的背景颜色
      borderRadius: "8px",
    },
  });
};
const okNotify = (message: string, description: string) => {
  notification.success({
    message,
    description,
    style: {
      backgroundColor: "##f6ffed", // 你可以设置你想要的背景颜色
      borderRadius: "8px",
    },
  });
};

export { errNotify, okNotify };
