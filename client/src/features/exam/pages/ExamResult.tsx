import { Col, Row } from 'antd';
import { useAsync } from 'react-use';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ResultTable from '../components/Table/ResultTable/ResultTable';
import { useResult } from '../hooks/useResult';
import type { Attempt } from '@/features/attempt/types';
import { ResultCard } from '../components';

export default function ExamResult() {
  const { fetchResultByExamId, extractResult } = useResult();
  const { id } = useParams();

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<Attempt | null>(null);

  useAsync(async () => {
    const { content: results } = await fetchResultByExamId(id as string);

    setAttempts(results);
  });

  useEffect(() => {
    if (selectedAttempt) extractResult(selectedAttempt);
  }, [extractResult, selectedAttempt]);

  return (
    <Row gutter={24}>
      <Col span={8}>
        <ResultCard attempts={attempts} value={selectedAttempt} setValue={setSelectedAttempt} />
      </Col>
      <Col span={16}>
        <ResultTable attempt={selectedAttempt} />
      </Col>
    </Row>
  );
}
