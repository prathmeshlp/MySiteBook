import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Label from '../../components/Label';
import Input from '../../components/Input';
import ErrorMsg from '../../components/ErrorMsg';
import Button from '../../components/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { AuthFormProps, LoginCredentialsType } from '../../types/login';
import useFormHandler from '../../hooks/useFormHandler';
import * as Yup from 'yup';
import { loginUser } from '../../api/auth';
import { FormikValues } from 'formik';

const validationSchema: Yup.ObjectSchema<LoginCredentialsType> = Yup.object({
  countryCode: Yup.string(),
  mobileNumber: Yup.string()
    .required('Contact number is required')
    .matches(/^\d{10}$/, 'Contact number must be 10 digits'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

const AuthForm: React.FC<AuthFormProps> = ({ logoUrl }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginCredentials: FormikValues = {
    countryCode: '+91',
    mobileNumber: '',
    password: '',
  };

  const {
    response,
    error,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormHandler(loginCredentials, validationSchema, loginUser);

  useEffect(() => {
    if (response) {
      const { data } = response;
      const { securityToken } = data;
      localStorage.setItem('token', securityToken);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/app/projects?type=active');
    }
  }, [response]);

  const handleContinue = useCallback(async () => {
    try {
      if (values.mobileNumber && !errors.mobileNumber) {
        await loginUser(values);
        setShowPasswordField(true);
      }
    } catch (error) {
      const errorMessage = (error as Error)?.message;
      setErrorMessage(errorMessage);
      setShowPasswordField(false);
    }
  }, [values, errors.mobileNumber]);

  useEffect(() => {
    if (
      values.mobileNumber === '' ||
      touched.mobileNumber ||
      values.password === '' ||
      touched.password
    ) {
      setErrorMessage('');
    }
  }, [
    values.mobileNumber,
    touched.mobileNumber,
    values.password,
    touched.password,
  ]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <section className="login-form-section sm:w-1/2 w-full h-full flex-column-center bg-lightGray">
      <div className="small-screen-header sm:hidden h-[60%] flex-column-center">
        <img src={logoUrl} alt="mySiteBookLogo" className="sm:w-28 w-40" />
      </div>
      <div className="login-main sm:w-[70%] w-full sm:h-1/2 h-full p-3 flex flex-col justify-center sm:justify-center">
        <h1 className="font-bold sm:text-2xl text-xl">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex-column-center w-full"
        >
          <div className="contact-details w-full">
            <Label
              htmlFor="mobile-number"
              className="sm:text-sm text-xs font-medium text-textGray mb-2"
            >
              Contact Number
            </Label>
            <div className="contact-input flex gap-1 ">
              <Input
                type="text"
                value={values.countryCode}
                disabled
                name="countryCode"
                className="items-center px-3 text-sm text-textGray bg-lightGray border border-textColor sm:w-24 lg:w-1/4 w-14 sm:h-10 h-12"
                autoComplete="off"
              />
              <Input
                type="number"
                id="mobile-number"
                name="mobileNumber"
                className={`w-full border active:border-primaryBlue focus:border-primaryBlue sm:h-10 h-12 text-textGray ${
                  errors.mobileNumber || errorMessage
                    ? ' border-dangerRed'
                    : 'border-textColor'
                }`}
                placeholder="Enter your contact number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobileNumber}
                autoComplete="off"
              />
            </div>
            {touched.mobileNumber && errors.mobileNumber && (
              <ErrorMsg
                className="mt-1 ml-16 sm:ml-28 lg:ml-36"
                message={
                  typeof errors.mobileNumber === 'string'
                    ? errors.mobileNumber
                    : ''
                }
              />
            )}
          </div>
          {!error && !showPasswordField && (
            <ErrorMsg className="mt-1" message={errorMessage}></ErrorMsg>
          )}
          {!showPasswordField && (
            <div className="sign-up-link-container mt-6">
              <p className="text-xs text-center">
                Don&#39;t have an account?
                <Link className="text-primaryBlue" to="/">
                  Sign up for free
                </Link>
              </p>
            </div>
          )}

          {showPasswordField ? (
            <>
              <div className="password-input mt-4 relative w-full">
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-textGray mb-2"
                >
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primaryBlue hover:underline absolute top-2 right-0"
                >
                  Forgot Password?
                </Link>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`w-full border active:border-primaryBlue focus:border-primaryBlue sm:h-10 h-12 text-textGray ${
                      errors.password ? ' border-dangerRed' : 'border-textColor'
                    }`}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    autoComplete="off"
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {touched.password && errors.password && (
                  <ErrorMsg
                    className="mt-1 ml-1 sm:ml-1"
                    message={
                      typeof errors.password === 'string' ? errors.password : ''
                    }
                  />
                )}
                {errorMessage && showPasswordField && (
                  <ErrorMsg className="mt-1" message={errorMessage}></ErrorMsg>
                )}
              </div>
              <Button
                type="submit"
                className="sm:w-28 w-full rounded-2xl h-10 btn-primary mt-10 sm:mt-6"
                disabled={!values.password || !!errors.password}
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={handleContinue}
              className="sm:w-28 w-full rounded-2xl  sm:h-10 btn-primary sm:mt-6 mt-10"
            >
              Continue
            </Button>
          )}
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
