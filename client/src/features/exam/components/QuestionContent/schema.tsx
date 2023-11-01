import * as yup from 'yup';

export const errorMessages = {
  required: 'Vui lòng điền giá trị vào ô trống',
};

export const questionSchema = yup.object().shape({
  imageUrl: yup.string().required(errorMessages.required),
  content: yup.string().required(errorMessages.required),
  score: yup.number().required(errorMessages.required),
  explanation: yup.string().notRequired(),
  isPointPerCorrection: yup.boolean(),
});
