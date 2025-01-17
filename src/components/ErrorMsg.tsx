import React from 'react';

interface ErrorProps {
  message: string | null;
  className?: string;
}

const ErrorMsg: React.FC<ErrorProps> = ({ message, className }) => {
  return <div className={`error text-xs ${className || null}`}>{message}</div>;
};

export default ErrorMsg;
