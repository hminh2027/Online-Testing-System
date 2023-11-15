import { Checkbox, Flex, Radio } from 'antd';
import type { Answer } from '../../types';

const ALPHABETICAL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface ExamAnswerListProps {
  answers: Answer[];
}

export function ExamAnswerList({ answers }: ExamAnswerListProps) {
  const isMultiple = answers.filter((item) => item.isCorrect).length > 1;

  return isMultiple ? (
    <Checkbox.Group>
      <Flex gap={16} vertical style={{ width: '100%' }}>
        {answers.map((ans, index) => (
          <Checkbox
            key={ans.id}
            value={ans.id}
            style={{
              border: '1px solid grey',
              borderRadius: 8,
              padding: 12,
            }}
          >
            {ALPHABETICAL[index]}. {ans.content}
          </Checkbox>
        ))}
      </Flex>
    </Checkbox.Group>
  ) : (
    <Radio.Group>
      <Flex gap={16} vertical style={{ width: '100%' }}>
        {answers.map((ans, index) => (
          <Radio
            key={ans.id}
            value={ans.id}
            style={{
              border: '1px solid grey',
              borderRadius: 8,
              padding: 12,
            }}
          >
            {ALPHABETICAL[index]}. {ans.content}
          </Radio>
        ))}
      </Flex>
    </Radio.Group>
  );
}
