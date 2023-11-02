import { Modal, Flex, Typography, Button, Image } from 'antd';
import { useToggle } from 'react-use';
import { CustomCard } from '@/components';
import type { ClassRoom } from '@/features/class/types';
import DefaultImage from '@/assets/default.jpeg';

interface ClassCardProps {
  classRoom: ClassRoom;
}

export function ClassCard({ classRoom }: ClassCardProps) {
  const [isModalOpen, setIsModalOpen] = useToggle(false);

  return (
    <>
      <Modal closable onCancel={setIsModalOpen} open={isModalOpen} />
      <CustomCard hasShadow bodyStyle={{ padding: 0 }}>
        <Flex vertical justify="space-between">
          <Image
            style={{ objectFit: 'cover' }}
            height={130}
            onClick={setIsModalOpen}
            preview={false}
            src={classRoom.imageUrl || DefaultImage}
          />
          <Flex
            vertical
            justify="space-between"
            style={{
              width: '80%',
              margin: '1rem auto',
            }}
            gap={12}
          >
            <Typography.Text ellipsis>{classRoom.name}</Typography.Text>
            <Button type="primary">Giao bài</Button>
          </Flex>
        </Flex>
      </CustomCard>
    </>
  );
}
