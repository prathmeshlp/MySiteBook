export interface LoginCredentialsType {
  countryCode?: string;
  mobileNumber: string;
  password?: string;
}
export interface LoginProps {
  BrandingComponent?: React.ComponentType;
  AuthFormComponent?: React.ComponentType;
}

export interface AuthFormProps {
  logoUrl: string;
}
