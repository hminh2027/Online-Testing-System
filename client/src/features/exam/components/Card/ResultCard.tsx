import { Badge, Flex, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import { CustomCard } from '@/components';
import type { Attempt } from '@/features/attempt/types';
import { transformToAntdSelectOptions } from '@/utils';

interface ResultCardProps {
  value: Attempt;
  setValue: (attempt: Attempt) => void;
  attempts: Attempt[];
}
export function ResultCard({ value, setValue, attempts }: ResultCardProps) {
  const handleSelect = (attemptId: number) => {
    const selectedAtt = attempts.find((att) => att.id === attemptId);

    if (selectedAtt) setValue(selectedAtt);
  };

  return (
    <CustomCard
      hasShadow
      title={
        <Select
          onChange={handleSelect}
          style={{ width: '100%' }}
          options={transformToAntdSelectOptions(
            attempts,
            'id',
            'id',
            (_, index) => `Lần làm bài thứ ${index + 1}`,
          )}
        />
      }
    >
      {value ? (
        <Flex vertical gap={12}>
          <Flex justify="space-between">
            Tổng điểm: <span>{value.point}</span>
          </Flex>
          <Flex justify="space-between">
            Thời gian (phút): <span> {dayjs(value.endedAt).diff(value.startedAt, 'minutes')}</span>
          </Flex>
          <Flex justify="space-between">
            Số lần nhấp ra ngoài màn hình: <span>{value.numberOfMouseLeave}</span>
          </Flex>
          <Flex justify="space-between">
            <Badge text="Số câu đúng:" color="green" />
            <span>{value.numberOfMouseLeave}</span>
          </Flex>
          <Flex justify="space-between">
            <Badge text="Số câu sai:" color="red" />
            <span>{value.numberOfMouseLeave}</span>
          </Flex>
          <Flex justify="space-between">
            <Badge text="Chưa làm:" color="gold" />
            <span>{value.numberOfMouseLeave}</span>
          </Flex>
        </Flex>
      ) : (
        <Typography.Text strong>Vui lòng chọn lần làm bài để hiển thị</Typography.Text>
      )}
    </CustomCard>
  );
}
