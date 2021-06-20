import { notification } from "antd";
import React from "react";

const openNotification = (title,text) => {
    notification.info({
      message: title,
      description:text,
        placement:"bottomRight",
    });
  };

export default openNotification;