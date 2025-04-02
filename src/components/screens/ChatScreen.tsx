import React, { useState } from 'react';
import { useChat } from '../../hooks/useChat';

interface ChatScreenProps {
  onBack: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onBack }) => {
  const [messageInput, setMessageInput] = useState('');
  const { messages, isLoading, error, sendMessage } = useChat();

  const handleSendMessage = async () => {
    if (messageInput.trim() === '') return;
    
    await sendMessage(messageInput);
    setMessageInput('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            Назад
          </button>
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-base font-semibold">
              M
            </div>
            <div className="ml-3">
              <h1 className="text-base font-semibold text-gray-800">Муза</h1>
              <p className={`text-xs ${isLoading ? 'text-purple-600' : 'text-green-600'}`}>
                {isLoading ? 'Печатает...' : 'Слушает тебя'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Быстрые ответы */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100 whitespace-nowrap">
            Медитация
          </button>
          <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100 whitespace-nowrap">
            Мне тревожно
          </button>
        </div>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs rounded-xl px-4 py-3 ${
                  message.role === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white border border-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs rounded-xl px-4 py-3 bg-white border border-gray-100">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ввод сообщения */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
          <input
            type="text"
            placeholder="Напиши, как ты себя чувствуешь..."
            className="flex-1 bg-transparent outline-none text-gray-800"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading}
            className={`ml-2 p-2 text-purple-600 hover:text-purple-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen; 