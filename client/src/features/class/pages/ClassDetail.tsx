import { ClassDetailLayout, MainLayout } from '@/layouts/';

interface ClassDetailProps {}
export default function ClassDetail({}: ClassDetailProps) {
  return (
    <MainLayout>
      <ClassDetailLayout>ClassDetail</ClassDetailLayout>
    </MainLayout>
  );
}
