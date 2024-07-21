import * as yup from 'yup';

export const styleValidationSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Должна быть строка')
    .min(3, 'Минимальная длина поля - 3 символа')
    .required('Поле 1 обязательно'),
  description: yup.string().typeError('Должна быть строка'),
  code: yup
    .string()
    .typeError('Должна быть строка')
    .min(3, 'Минимальная длина поля - 3 символа')
    .required('Поле 3 обязательно'),
});
