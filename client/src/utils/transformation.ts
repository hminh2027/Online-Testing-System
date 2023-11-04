interface Answer {
  content: string;
  isCorrect: boolean;
}

export const transformExcelQuestions = (rawData: []) => {
  const rows = rawData.splice(1);

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
      map.set(tempQuestion, []);
    } else {
      const answers = map.get(tempQuestion) as Answer[];

      answers.push({
        content: obj.answer,
        isCorrect: !!obj.isCorrect,
      });

      map.set(obj.question, answers);
    }
  });

  return Array.from(map).map((ques) => ({
    content: ques[0],
    answers: ques[1],
  }));
};
