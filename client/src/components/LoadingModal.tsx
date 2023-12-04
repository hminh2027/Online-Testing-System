import { Spin } from 'antd';
import { createPortal } from 'react-dom';

export function LoadingModal() {
  return createPortal(<Spin style={{ opacity: 0.5 }} spinning={true} fullscreen />, document.body);
}
