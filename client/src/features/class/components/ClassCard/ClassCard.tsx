import { CustomCard } from '@/components/CustomCard';

interface ClassCardProps {
  thumbnail: string;
  name: string;
  teacherName: string;
  isActive: boolean;
}
export default function ClassCard({ isActive, name, teacherName, thumbnail }: ClassCardProps) {
  return <CustomCard>ClassCard</CustomCard>;
}
