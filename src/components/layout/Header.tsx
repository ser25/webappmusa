import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-white border-b border-gray-100 px-5 py-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default Header; 