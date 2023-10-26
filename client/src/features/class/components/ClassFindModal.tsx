import { Flex, Modal } from 'antd';
import { useState } from 'react';
import PinInput from 'react-pin-input';
import { useClass } from '../hooks/useClass';
import { ClassFindForm } from './ClassFindForm';

interface ClassFindModalProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
}
export function ClassFindModal({ open, setIsOpen }: ClassFindModalProps) {
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
          onComplete={handleOnComplete}
          autoSelect={true}
          focus={true}
        />
        {classCode.length === 6 && classRoom && <ClassFindForm classRoom={classRoom} />}
      </Flex>
    </Modal>
  );
}
