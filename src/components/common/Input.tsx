import React from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  label = '',
  error = '',
  disabled = false,
  className = '',
}) => {
  const baseStyles = 'w-full rounded-full px-4 py-2 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const inputStyles = error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500';

  const disabledStyles = disabled ? 'bg-gray-100 cursor-not-allowed' : '';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseStyles} ${inputStyles} ${disabledStyles}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input; 