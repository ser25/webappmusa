import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}

interface NavigationProps {
  items: NavItem[];
}

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
      <div className="flex justify-around items-center h-16 px-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${
              item.isActive ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {item.icon && (
              <div className={`mb-1 ${item.isActive ? 'text-purple-600' : 'text-gray-500'}`}>
                {item.icon}
              </div>
            )}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 