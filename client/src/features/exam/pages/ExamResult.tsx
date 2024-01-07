import { Col, Row } from 'antd';
import { useAsync } from 'react-use';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ResultTable } from '../components/Table';
import type { Result } from '../hooks/useResult';
import { useResult } from '../hooks/useResult';
import type { Attempt } from '@/features/attempt/types';
import { ResultCard } from '../components';
import { useAuth } from '@/features/auth';

export default function ExamResult() {
  const { fetchResultByExamId, extractResult } = useResult();
  const { id } = useParams();
  const { user } = useAuth();

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<Attempt | null>(null);
  const [result, setResult] = useState<Result>();

  useAsync(async () => {
    const { content: results } = await fetchResultByExamId(id as string);

    const validResuls = results.filter((res) => !!res.endedAt);

    setAttempts(validResuls);
  });

  useEffect(() => {
    if (!selectedAttempt) return;
    const data = extractResult(selectedAttempt);

    setResult(data);
  }, [extractResult, selectedAttempt]);

  return (
    <Row gutter={24}>
      <Col span={6}>
        <ResultCard attempts={attempts} meta={result?.meta} setValue={setSelectedAttempt} />
      </Col>
      <Col span={18}>
        <ResultTable
          data={result?.list}
          isShowAnswer={result?.meta.isShowAnswer || user?.isTeacher}
        />
      </Col>
    </Row>
  );
}
