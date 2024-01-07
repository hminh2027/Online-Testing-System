import * as yup from 'yup';
import { errorMessages } from '@/constants/errorMessage';

export const examSchema = yup.object({
  title: yup.string().trim().required(errorMessages.required),
  description: yup.string().trim().required(errorMessages.required),
  duration: yup.string().trim().required(errorMessages.required),
  attemptLimit: yup.number().integer().nullable(),
  isProctoring: yup.boolean().default(false).required(errorMessages.required),
  isShuffleQuestion: yup.boolean().default(false).required(errorMessages.required),
  isShowAnswer: yup.boolean().default(false).required(errorMessages.required),
  isResumeAllowed: yup.boolean().default(false).required(errorMessages.required),
  classCode: yup.string().trim().nullable(),
});
