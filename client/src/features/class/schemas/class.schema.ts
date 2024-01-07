import * as yup from 'yup';
import { errorMessages } from '@/constants/errorMessage';

export const classSchema = yup.object({
  name: yup.string().trim().required(errorMessages.required),
  description: yup.string().trim().required(errorMessages.required),
  imageUrl: yup.string().trim().nullable(),
  isStudentApprovalEnter: yup.boolean().default(false).required(errorMessages.required),
  isStudentApprovalLeave: yup.boolean().default(false).required(errorMessages.required),
  isStudentPostAllowed: yup.boolean().default(false).required(errorMessages.required),
  password: yup.string().trim().nullable(),
});
