import * as yup from 'yup';

export const logInSchema = yup.object({
  email: yup.string().email().trim().required(),
  password: yup.string().trim().required(),
});
