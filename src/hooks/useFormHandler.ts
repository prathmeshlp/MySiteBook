import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useFormHandler = <T extends object>(
  initialValues: T,
  validationSchema: Yup.ObjectSchema<T>,
  submitHandler: (values: T) => Promise<T>,
) => {
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<T | null>(null);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setSubmitting,
    resetForm,
    handleSubmit,
  } = useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await submitHandler(values);
        setResponse(response);
        resetForm();
        setError(null);
      } catch (error) {
        const errorMessage =
          (error as Error)?.message || 'An error occurred. Please try again!';
        setError(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    response,
    error,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};

export default useFormHandler;
