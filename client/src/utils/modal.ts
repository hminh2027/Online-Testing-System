import { Modal } from 'antd';

export const showConfirmation = (onOk: () => void) =>
  Modal.confirm({
    title: 'Bạn có chắc chắn?',
    onOk,
    centered: true,
    content: 'Vui lòng bấm xác nhận để tiếp tục',
    okText: 'Xác nhận',
    cancelText: 'Hủy',
  });
