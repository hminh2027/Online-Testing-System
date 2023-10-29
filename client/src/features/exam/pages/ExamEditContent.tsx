import { ExamStepForm } from '../components';
import { useExam } from '../hooks/useExam';

interface ExamEditContentProps {}
export default function ExamEditContent({}: ExamEditContentProps) {
  const { data, isFetching } = useExam(1);

  const exam = data?.content;

  if (isFetching) return <>Loading</>;

  return <ExamStepForm exam={exam} />;
}
