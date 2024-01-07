import { Badge, Flex, Select, Typography } from 'antd';
import { CustomCard } from '@/components';
import type { Attempt } from '@/features/attempt/types';
import { transformToAntdSelectOptions } from '@/utils';
import type { Result } from '../../hooks/useResult';

interface ResultCardProps {
  meta?: Result['meta'];
  setValue: (attempt: Attempt) => void;
  attempts: Attempt[];
}
export function ResultCard({ meta, setValue, attempts }: ResultCardProps) {
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
      {meta ? (
        <Flex vertical gap={12}>
          <Flex justify="space-between">
            <Typography.Text strong>Tổng điểm:</Typography.Text>
            <span>{meta.totalPoint}/{meta.examTotalPoint}</span>
          </Flex>
          <Flex justify="space-between">
            <Typography.Text strong>Bắt đầu lúc:</Typography.Text>
            <span>{meta.startedAt}</span>
          </Flex>
          <Flex justify="space-between">
            <Typography.Text strong>Hoàn thành lúc:</Typography.Text>
            <span>{meta.endedAt}</span>
          </Flex>
          <Flex justify="space-between">
            <Typography.Text strong>Thời gian (phút):</Typography.Text>
            <span>{meta.timeSpent}</span>
          </Flex>
          <Flex justify="space-between">
            <Typography.Text strong>Số lần nhấp ra ngoài màn hình:</Typography.Text>
            <span>{meta.numberOfMouseLeave}</span>
          </Flex>
          <Flex justify="space-between">
            <Typography.Text strong>
              <Badge text="Số câu đúng:" color="green" />
            </Typography.Text>
            <span>{meta.correct}</span>
          </Flex>
          <Flex justify="space-between">
            <Typography.Text strong>
              <Badge text="Số câu sai:" color="red" />
            </Typography.Text>
            <span>{meta.inCorrect}</span>
          </Flex>
          <Flex justify="space-between">
            <Typography.Text strong>
              <Badge text="Chưa làm:" color="gold" />
            </Typography.Text>
            <span>{meta.blank}</span>
          </Flex>
        </Flex>
      ) : (
        <Typography.Text strong>Vui lòng chọn lần làm bài để hiển thị</Typography.Text>
      )}
    </CustomCard>
  );
}
