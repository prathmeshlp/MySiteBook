import { FormikValues } from 'formik';

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const loginUser = async (values: FormikValues) => {
  const requestBody: {
    countryCode: string;
    mobileNumber: number;
    password?: string;
  } = {
    countryCode: values.countryCode,
    mobileNumber: Number(values.mobileNumber),
  };

  if (values.password) {
    requestBody.password = values.password;
  }

  const response = await fetch('https://app.mysitebook.io/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...values,
      mobileNumber: Number(values.mobileNumber),
    }),
  });
  if (!response.ok) {
    throw new Error('Enter a valid login ID / password.');
  }

  const result = await response.json();
  return result;
};
