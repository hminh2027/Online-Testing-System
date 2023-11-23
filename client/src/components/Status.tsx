import type { BadgeProps } from 'antd';
import { Badge } from 'antd';
import { CLASS_STATUS, EXAM_STATUS } from '@/constants';
import type { REQUEST_STATUS } from '@/constants';

interface StatusProps {
  status: REQUEST_STATUS | EXAM_STATUS | CLASS_STATUS;
}
export function Status({ status }: StatusProps) {
  const getColor = (): BadgeProps['status'] => {
    if (status === EXAM_STATUS.AVAILABLE || status === CLASS_STATUS.ACTIVE) return 'success';
    if (status === EXAM_STATUS.NOT_AVAILABLE) return 'error';
    if (status === EXAM_STATUS.OUT_OF_ATTEMPT) return 'error';
    if (status === EXAM_STATUS.ATTEMPTED || status === CLASS_STATUS.PENDING) return 'warning';
    if (status === EXAM_STATUS.NOT_ATTEMPTED) return 'warning';

    return 'default';
  };

  return <Badge status={getColor()} text={status} />;
}
