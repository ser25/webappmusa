import React from 'react';
import { useChat } from '../../hooks/useChat';

interface HomeScreenProps {
  onChat: () => void;
  onMeditation: () => void;
}

const EMOTIONAL_STATES = [
  { id: 'ok', label: 'В порядке', message: 'Я чувствую себя в порядке сегодня.' },
  { id: 'anxious', label: 'Тревожно', message: 'Я чувствую тревогу сейчас.' },
  { id: 'sad', label: 'Грустно', message: 'Мне грустно сегодня.' },
  { id: 'empty', label: 'Пусто', message: 'Я чувствую пустоту внутри.' },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ onChat, onMeditation }) => {
  const { sendMessage } = useChat();

  const handleEmotionalState = async (message: string) => {
    await sendMessage(message);
    onChat(); // Переходим к чату после выбора состояния
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-lg font-semibold">
              M
            </div>
            <h1 className="ml-3 text-xl font-semibold text-gray-800">MUSE</h1>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Здравствуй</h2>
        <p className="text-gray-600 text-sm">
          {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })} • Новый день для тебя
        </p>
      </header>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-5">
          <div className="bg-purple-600 rounded-xl p-5 text-white shadow-lg">
            <h3 className="font-semibold mb-1">Как ты себя чувствуешь сейчас?</h3>
            <p className="text-purple-100 text-sm mb-4">Проверь себя. Тебе не нужно притворяться здесь.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {EMOTIONAL_STATES.map((state) => (
                <button
                  key={state.id}
                  onClick={() => handleEmotionalState(state.message)}
                  className="bg-white bg-opacity-20 py-2 px-4 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all"
                >
                  {state.label}
                </button>
              ))}
            </div>
            <button 
              onClick={onChat}
              className="w-full py-3 bg-white text-purple-700 rounded-xl font-medium hover:bg-opacity-90 transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Поговорить с Музой
            </button>
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
                <span className="text-lg">🎵</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">5-минутная медитация присутствия</h4>
                <p className="text-xs text-gray-500">Идеально для начала дня</p>
              </div>
            </div>
            <button 
              onClick={onMeditation}
              className="w-full py-2 border border-purple-600 text-purple-600 rounded-xl font-medium text-sm hover:bg-purple-50 transition-all"
            >
              Начать практику
            </button>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-between">
          <button 
            onClick={onChat}
            className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors"
          >
            <span>Чат</span>
          </button>
          <button 
            onClick={onMeditation}
            className="flex flex-col items-center text-gray-400 hover:text-purple-600 transition-colors"
          >
            <span>Медитации</span>
          </button>
          <button className="flex flex-col items-center text-purple-600">
            <span>Главная</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen; 