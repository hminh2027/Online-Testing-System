import * as yup from 'yup';
import { errorMessages } from '@/constants/errorMessage';

export const logInSchema = yup.object({
  email: yup
    .string()
    .email('Vui lòng nhập đúng định dạng email')
    .trim()
    .required(errorMessages.required),
  password: yup.string().trim().required(errorMessages.required),
});
