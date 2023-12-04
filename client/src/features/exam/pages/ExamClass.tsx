import { useParams } from 'react-router-dom';
import { useListExam } from '../hooks/useExam';
import { ExamList } from '../components';
import { LoadingModal } from '@/components';

export default function ExamClass() {
  const { code } = useParams();
  const { data: examData, isLoading } = useListExam({ classCode: code });
  const exams = examData?.content;

  if (isLoading) return <LoadingModal />;

  return (
    <div>
      <ExamList dataSource={exams} />
    </div>
  );
}
