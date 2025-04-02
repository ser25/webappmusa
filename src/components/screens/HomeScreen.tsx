import React from 'react';
import Header from '../layout/Header';
import Navigation from '../layout/Navigation';
import Button from '../common/Button';
import { ChatBubbleLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface HomeScreenProps {
  onChat: () => void;
  onMeditation: () => void;
}

const emotionalStates = [
  { id: 'good', label: 'В порядке', color: 'bg-green-500' },
  { id: 'anxious', label: 'Тревожно', color: 'bg-yellow-500' },
  { id: 'sad', label: 'Грустно', color: 'bg-blue-500' },
  { id: 'empty', label: 'Пусто', color: 'bg-gray-500' },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ onChat, onMeditation }) => {
  const navItems = [
    { id: 'chat', label: 'Чат', icon: <ChatBubbleLeftIcon className="w-6 h-6" />, onClick: onChat, isActive: false },
    { id: 'meditation', label: 'Медитации', icon: <SparklesIcon className="w-6 h-6" />, onClick: onMeditation, isActive: false },
    { id: 'home', label: 'Главная', onClick: () => {}, isActive: true },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        title="MUSE"
        subtitle={`${new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })} • Новый день для тебя`}
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-5">
          <div className="bg-purple-600 rounded-xl p-5 text-white shadow-lg">
            <h3 className="font-semibold mb-1">Как ты себя чувствуешь сейчас?</h3>
            <p className="text-purple-100 text-sm mb-4">Проверь себя. Тебе не нужно притворяться здесь.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {emotionalStates.map((state) => (
                <button
                  key={state.id}
                  className="bg-white bg-opacity-20 py-2 px-4 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all duration-200"
                >
                  {state.label}
                </button>
              ))}
            </div>
            <Button 
              onClick={onChat}
              variant="primary"
              className="w-full bg-white text-purple-700 hover:bg-purple-50"
            >
              Поговорить с Музой
            </Button>
          </div>
        </div>
        
        <div className="px-5 mb-20">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Практики для тебя</h3>
            <button className="text-sm text-purple-600 font-medium">Все</button>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                <SparklesIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">5-минутная медитация присутствия</h4>
                <p className="text-xs text-gray-500">Идеально для начала дня</p>
              </div>
            </div>
            <Button
              onClick={onMeditation}
              variant="outline"
              className="w-full"
            >
              Начать практику
            </Button>
          </div>
        </div>
      </div>
      
      <Navigation items={navItems} />
    </div>
  );
};

export default HomeScreen; 