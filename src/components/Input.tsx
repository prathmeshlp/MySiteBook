import React, { InputHTMLAttributes } from 'react';

interface InputLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  className?: string;
}

const Input: React.FC<InputLabelProps> = ({ label, className, ...props }) => {
  return (
    <>
      {label && (
        <label className="block text-sm font-medium text-grey mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`px-3 py-2 text-sm rounded-sm ${className || null}`}
      />
    </>
  );
};

export default Input;
