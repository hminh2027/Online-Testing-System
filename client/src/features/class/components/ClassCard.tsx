import { Flex, Image, Typography } from 'antd';
import { CustomCard } from '@/components';
import type { ClassRoom } from '../types';

interface ClassCardProps {
  classRoom: ClassRoom;
}
export function ClassCard({ classRoom }: ClassCardProps) {
  return (
    <CustomCard>
      <Flex gap={12} vertical justify="center" align="center">
        <Image src={classRoom.imageUrl} />
        <Typography.Title level={5}>{classRoom.name}</Typography.Title>
        <Flex>
          {/* <Typography.Text level={5}>{classRoom.}</Typography.Text> */}
          {/* <Typography.Text level={5}>{classRoom.}</Typography.Text> */}
        </Flex>
      </Flex>
    </CustomCard>
  );
}
