import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
  bio: yup
    .string()
    .max(200, ({max}) => `Bio can be only ${max} characters`)
    .required('Bio is Required*')
    .nullable(),
  contact: yup
    .string()
    .min(10, ({min}) => `Contact number must be ${min} characters`)
    .max(10, ({max}) => `Contact number can be only ${max} characters`)
    .required('Contact is Required*')
    .nullable(),
  dateofBirth: yup.string().required('Date of Birth is Required*').nullable(),
  gender: yup.string().required('Gender is Required*').nullable(),
  bloodGroup: yup.string().required('Blood Group is Required*').nullable(),
  country: yup.string().required('Country is Required*').nullable(),
  address: yup
    .string()
    .max(100, ({max}) => `Address can be only ${max} characters`)
    .required('Address is Required*')
    .nullable(),
  state: yup.string().required('State is Required*').nullable(),
});
