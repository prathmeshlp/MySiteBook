import React from 'react';
import Branding from './Branding';
import AuthForm from './AuthForm';
import mySiteBookLogo from '../../assets/signUp-siteBook.png';
import { LoginProps } from '../../types/login';

const Login: React.FC<LoginProps> = ({
  BrandingComponent = Branding,
  AuthFormComponent = AuthForm,
}) => {
  return (
    <main className="main flex w-screen h-screen">
      <BrandingComponent logoUrl={mySiteBookLogo} />
      <AuthFormComponent logoUrl={mySiteBookLogo} />
    </main>
  );
};

export default Login;
