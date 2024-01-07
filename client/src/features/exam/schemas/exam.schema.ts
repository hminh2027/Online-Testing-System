import * as yup from 'yup';

export const examSchema = yup.object({
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
  duration: yup.string().trim().optional(),
  attemptLimit: yup.number().integer().optional(),
  isProctoring: yup.boolean().default(false).required(),
  isShuffleQuestion: yup.boolean().default(false).required(),
  isShowAnswer: yup.boolean().default(false).required(),
  isResumeAllowed: yup.boolean().default(false).required(),
  classCode: yup.string().trim().optional(),
});
