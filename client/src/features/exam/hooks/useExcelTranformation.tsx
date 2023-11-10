import type { Answer, ApiFormatData, TableFormatData } from '../types';

interface QuestionMeta {
  question: string;
  explanation: string;
  point: string;
}

export function useExcelTranformation() {
  const transformToApiFormat = (rawData: string[][]): ApiFormatData[] => {
    // Take rows which have index > "header" and index < "!end" keyword
    const endIndex = rawData.findIndex((r) => r[0]?.toLowerCase() === '!end');
    const rows = rawData.slice(1, endIndex);

    let prevQuestionMeta: QuestionMeta | null = null;
    const map = new Map<QuestionMeta, Omit<Answer, 'questionId'>[]>();

    // mapping data to Map object
    rows.forEach((row) => {
      const question = row[0];
      const explanation = row[1];
      const point = row[2];
      const answer = row[3];
      const isCorrect = row[4];

      // Eliminate empty rows
      if ((!question && !answer) || row.length === 0) return;
      // Have question -> First row of question
      if (question) {
        prevQuestionMeta = {
          question,
          explanation,
          point,
        };
        map.set(
          prevQuestionMeta,
          answer
            ? [
                {
                  content: answer,
                  isCorrect: +!!isCorrect,
                },
              ]
            : [],
        );
      } else if (!question) {
        // Without question -> rows of question's answers
        if (!prevQuestionMeta) return;
        if (answer) {
          const answers = map.get(prevQuestionMeta);

          const newAns = [
            ...(answers as []),
            {
              content: answer,
              isCorrect: +!!isCorrect,
            },
          ];

          map.set(prevQuestionMeta, newAns);
        }
      }
    });

    return Array.from(map).map((ques) => ({
      explanation: ques[0].explanation,
      point: +!!ques[0].point,
      content: ques[0].question,
      answers: ques[1],
    }));
  };

  const transformToTableFormat = (data: ApiFormatData[]): TableFormatData[] => {
    const tableFormatData: TableFormatData[] = [];

    data.forEach((ques) => {
      ques.answers.forEach((ans, index) => {
        tableFormatData.push({
          question: ques.content,
          answer: ans.content,
          point: ques.point,
          explanation: ques.explanation,
          isCorrect: ans.isCorrect,
          rowSpan: index === 0 ? ques.answers.length : 0,
          key: ques.content + ans.content,
        });
      });
    });

    return tableFormatData;
  };

  const validateData = (data: ApiFormatData[]): string => {
    let errorMsg = '';

    const isValid = data.every((item) => {
      errorMsg = `Câu hỏi "${item.content}" - `;

      if (item.answers.length < 2) {
        errorMsg += 'Cần ít nhất 2 đáp án';

        return false;
      }

      if (!item.answers.some((ans) => ans.isCorrect)) {
        errorMsg += 'Cần ít nhất 1 đáp án đúng';

        return false;
      }

      if (item.point === 0) {
        errorMsg += 'Thiếu điểm của câu hỏi';

        return false;
      }

      return true;
    });

    return isValid ? '' : errorMsg;
  };

  return {
    transformToApiFormat,
    transformToTableFormat,
    validateData,
  };
}
