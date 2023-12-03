import * as yup from 'yup';

const MAX_FILE_SIZE = 100 * 1024;

const SUPPORTED_FILE_FORMATS = ['image/png', 'image/jpeg'];

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/(^[A-Z])/, { message: 'First letter should be uppercased' })
    .required(),
  age: yup
    .number()
    .typeError('Age should be number')
    .required()
    .min(0, 'Age should be positive number'),
  email: yup.string().required().email(),
  password: yup
    .string()
    .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d]).{4,}$/, {
      message:
        'Password should contain: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character',
    }),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  gender: yup.string().required(),
  acceptTC: yup.string().required(),
  imgFile: yup
    .mixed()
    .required()
    .test(
      'file-size',
      'Size of file should be under 100kb',
      (value) => value instanceof File && value.size <= MAX_FILE_SIZE
    )
    .test(
      'file-type',
      'Format of file should be .png or .jpeg',
      (value) =>
        value instanceof File && SUPPORTED_FILE_FORMATS.includes(value.type)
    ),
  country: yup.string().required(),
});
