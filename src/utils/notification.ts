// notification.ts

import { notification } from "antd";

const openErrorNotification = (message: string, description: string) => {
  notification.error({
    message,
    description,
  });
};
const errNotify = (message: string, description: string) => {
  notification.error({
    message,
    description,
  });
};
const okNotify = (message: string, description: string) => {
  notification.success({
    message,
    description,
  });
};

export { openErrorNotification, errNotify, okNotify };
