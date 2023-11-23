import { Flex, Modal, Typography } from 'antd';
import { useState, useEffect } from 'react';
import PinInput from 'react-pin-input';
import { useBoolean } from 'react-use';
import { useClass } from '../hooks/useClass';
import { ClassFindForm } from './ClassFindForm';
import { useListUserClass } from '@/features/userClass/hooks/useUserClass';

interface ClassFindModalProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
}
export function ClassFindModal({ open, setIsOpen }: ClassFindModalProps) {
  const [classCode, setClassCode] = useState('');
  const [isRequested, setIsRequested] = useBoolean(false);

  const { data, error, isError } = useClass(classCode, {
    enabled: !!classCode,
    retry: false,
  });

  const { data: requestData } = useListUserClass({ classCode }, { enabled: !!classCode });

  const requests = requestData?.content;
  const classRoom = data?.content;

  const handleOnComplete = (value: string) => setClassCode(value);

  useEffect(() => {
    if (!requests) return;
    if (requests?.length > 0) setIsRequested(true);
  }, [requests, setIsRequested]);

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
        {isError && <Typography.Title level={4}>{error as string}</Typography.Title>}
        {classCode.length === 6 &&
          classRoom &&
          (isRequested ? (
            <Typography.Title level={5}>
              Bạn đã gửi yêu cầu tham gia lớp học này. Vui lòng chờ duyệt
            </Typography.Title>
          ) : (
            <ClassFindForm toggleModal={setIsOpen} classRoom={classRoom} />
          ))}
      </Flex>
    </Modal>
  );
}
