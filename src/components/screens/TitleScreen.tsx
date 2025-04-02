import React, { useEffect, useState } from 'react';
import Button from '../common/Button';

interface TitleScreenProps {
  onStart: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Анимация появления
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 text-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className={`flex flex-col items-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {/* Логотип */}
          <div className="relative w-32 h-32 mb-12">
            <div className="absolute inset-0 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm"></div>
            <div className="absolute inset-2 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-purple-600 text-6xl font-bold">M</span>
            </div>
          </div>
          
          {/* Заголовок */}
          <h1 className="text-6xl font-bold mb-6 text-center text-white">MUSE</h1>
          <p className="text-xl text-center text-purple-100 mb-12 max-w-md leading-relaxed">
            Внутренняя тишина в мире эмоционального шума
          </p>
          
          {/* Кнопка */}
          <div className="w-full max-w-xs">
            <button 
              onClick={onStart}
              className="w-full px-8 py-4 text-lg font-semibold bg-white rounded-xl text-purple-600 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:text-purple-700 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Начать исцеление
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen; 