import * as yup from 'yup';
import { errorMessages } from '@/constants/errorMessage';

export const signUpSchema = yup.object({
  email: yup.string().email(errorMessages.email).trim().required(errorMessages.required),
  password: yup.string().trim().required(),
  confirmPassword: yup.string().trim().required(errorMessages.required),
  isTeacher: yup.boolean().default(false).required(errorMessages.required),
  fullname: yup.string().max(50).trim().required(errorMessages.required),
  studentId: yup.string().trim().optional(),
  phone: yup.string().trim().optional(),
  birth: yup.date().optional(),
  school: yup.string().trim().optional(),
});
