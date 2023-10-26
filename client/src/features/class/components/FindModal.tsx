import { Button, Flex, Input, Modal } from 'antd';
import { useState } from 'react';
import PinInput from 'react-pin-input';
import { useClass } from '../hooks/useClass';
import { ClassCard } from './ClassCard';

interface FindModalProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
}
export function FindModal({ open, setIsOpen }: FindModalProps) {
  const [classCode, setClassCode] = useState('');

  const { data } = useClass(classCode, { enabled: !!classCode });

  const classRoom = data?.content;

  const handleOnComplete = (value: string) => setClassCode(value);

  return (
    <Modal
      destroyOnClose
      closable
      maskClosable
      onCancel={() => setIsOpen(false)}
      title="Nhập mã lớp học"
      open={open}
      footer={false}
    >
      <Flex vertical gap={20} align="center">
        <PinInput
          length={6}
          secret
          type="custom"
          inputStyle={{
            border: 'none',
            borderBottom: '1px solid black',
            margin: '0 .5rem',
          }}
          inputFocusStyle={{ borderColor: 'blue' }}
          onComplete={handleOnComplete}
          autoSelect={true}
          focus={true}
        />
        {classCode.length === 6 && classRoom && <ClassCard classRoom={classRoom} />}
        <Input.Password />
        <Button block>Gửi yêu cầu</Button>
      </Flex>
    </Modal>
  );
}
