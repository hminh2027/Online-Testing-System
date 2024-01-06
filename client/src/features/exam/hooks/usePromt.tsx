import axios from 'axios';
import { useToggle } from 'react-use';
import type { Exam } from '../types';

const chatGptApiKey = import.meta.env.VITE_CHAT_GPT_API_KEY as string;

interface PromtResult {
  question: string;
  answers: {
    content: string;
    isCorrect: boolean;
  }[];
}

type PromtInput = {
  role: string;
  content: string;
}[];

export const usePromt = () => {
  const [isPromting, setIsPromting] = useToggle(false);

  const promtConstructor = (questions: string[], examDetail: Exam): string => {
    const { title, description: examDesc } = examDetail;

    const promtString = `Tạo ra 1 câu hỏi và 4 đáp án (format JSON) (phải có 1 đáp án đúng) cho một bài kiểm tra với các điều kiện sau:
    \n - câu hỏi mới không được trùng với các câu hỏi trước đó
    \n - dữ liệu trả về theo định dạng JSON: { "question": string, "answers": [{content: string, isCorrect: boolean}] }
    \n - nội dung câu hỏi và đáp án phải phù hợp dựa theo những dữ liệu sau:
    \n \t 1. Tên bài kiểm tra: ${title}
    \n \t 2. Mô tả bài kiểm tra: ${examDesc} 
    \n \t 3. Những câu hỏi đã được tạo trước đó là: [${questions.map((q) => `"${q}"`).join(', ')}`;

    return promtString;
  };

  const handlePromt = async (userInput: PromtInput): Promise<string> => {
    try {
      setIsPromting(true);

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: userInput,
        },
        {
          headers: {
            Authorization: `Bearer ${chatGptApiKey}`,
          },
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const reply = response.data.choices[0].message.content as string;

      setIsPromting(false);

      return reply;
    } catch (error) {
      console.log(error);
      setIsPromting(false);

      return error as string;
    }
  };

  const handleResponse = async (response: string): Promise<PromtResult> => {
    const { answers, question } = (await JSON.parse(response)) as PromtResult;

    return {
      answers,
      question,
    };
  };

  return {
    promt: handlePromt,
    isPromting,
    promtConstructor,
    extract: handleResponse,
  };
};
