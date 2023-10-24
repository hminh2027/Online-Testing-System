import { message } from 'antd';

message.config({
  duration: 4,
  maxCount: 3,
  prefixCls: 'toast',
});

export function CustomMessage() {}

CustomMessage.success = message.success;
CustomMessage.error = message.error;
CustomMessage.info = message.info;
CustomMessage.warning = message.warning;
