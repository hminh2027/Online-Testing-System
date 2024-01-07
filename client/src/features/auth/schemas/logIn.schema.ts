import * as yup from 'yup';

export const logInSchema = yup.object({
  email: yup.string().email('Vui lòng nhập đúng định dạng email').trim().required(),
  password: yup.string().trim().required(),
});
