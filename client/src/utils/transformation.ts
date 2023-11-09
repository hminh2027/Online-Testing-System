type Option<T> = { label: T | string | number; value: T | string | number };

interface Answer {
  content: string;
  isCorrect: boolean;
}

export const transformExcelQuestions = (rawData: string[][]) => {
  const endIndex = rawData.findIndex((r) => r[0]?.toLowerCase() === '!end');
  const rows = rawData.slice(1, endIndex);

  const map = new Map<string, Answer[]>();

  const mappedObject = rows.map((r) => ({
    question: r[0],
    answer: r[1],
    isCorrect: r[2],
  }));

  let tempQuestion = '';

  mappedObject.forEach((obj) => {
    if (obj.question) {
      tempQuestion = obj.question;
      map.set(
        tempQuestion,
        obj.answer
          ? [
              {
                content: obj.answer,
                isCorrect: !!obj.isCorrect,
              },
            ]
          : [],
      );
    } else {
      if (!obj.answer) return;
      const answers = map.get(tempQuestion) as Answer[];

      answers.push({
        content: obj.answer,
        isCorrect: !!obj.isCorrect,
      });

      map.set(obj.question, answers);
    }
  });

  return Array.from(map)
    .map((ques) => ({
      content: ques[0],
      answers: ques[1],
    }))
    .filter(
      (ques) =>
        !!ques.content && ques.answers.length >= 2 && ques.answers.some((ans) => ans.isCorrect),
    );
};

export function transformToAntdSelectOptions<T, K extends keyof T>(
  rawData: T[],
  label: K,
  value: K,
): Option<T[K]>[] {
  return rawData.map((item) => ({
    label: item[label],
    value: item[value],
  }));
}
