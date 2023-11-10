export function useExcelTranformation() {
  const transformToApiFormat = (input: string[][]) => {
    const endIndex = input.findIndex((r) => r[0]?.toLowerCase() === '!end');
    const rows = input.slice(1, endIndex);

    // const map = new Map<TempMeta, Answer[]>();
    let temp = null;
    const map = new Map();

    rows.forEach((row) => {
      const question = row[0];
      const explanation = row[1];
      const point = row[2];
      const answer = row[3];
      const isCorrect = row[4];

      // Eliminate empty row
      if ((!question && !answer) || row.length === 0) return;

      // Running thru answer
      if (!question && answer) {
        const answers = map.get(temp);

        const newAns = [
          ...answers,
          {
            content: answer,
            isCorrect,
          },
        ];

        map.set(temp, newAns);

        return;
      }

      // Assign temp to store question
      if (question && !answer) {
        temp = {
          question,
          explanation,
          point,
        };

        map.set(temp, []);

        return;
      }

      // First row with answer
      if (question && answer) {
        temp = {
          question,
          explanation,
          point,
        };

        map.set(temp, [
          {
            content: answer,
            isCorrect,
          },
        ]);
      }
    });

    return Array.from(map).map((ques) => ({
      ...ques[0],
      content: ques[0].question,
      answers: ques[1],
    }));
    // .filter(
    //   (ques) =>
    //     !!ques.content && ques.answers.length >= 2 && ques.answers.some((ans) => ans.isCorrect),
    // );
  };

  const transformToTableFormat = (value: []) => {
    const rs = [];

    value.forEach((ques) => {
      ques.answers.forEach((ans, index) => {
        rs.push({
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

    return rs;
  };

  return {
    transformToApiFormat,
    transformToTableFormat,
  };
}
