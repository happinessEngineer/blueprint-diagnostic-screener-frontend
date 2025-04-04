import React from 'react';

interface HeaderProps {
  displayName: string;
  fullName: string;
}

const Header: React.FC<HeaderProps> = ({ displayName, fullName }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <i className="bi bi-clipboard-pulse text-primary-600 text-2xl mr-2"></i>
          <div>
            <h1 className="text-lg font-semibold text-primary-700">{displayName}</h1>
            <p className="text-sm text-gray-500">{fullName}</p>
          </div>
        </div>
        <div className="text-primary-600">
          <i className="bi bi-shield-check text-xl"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
