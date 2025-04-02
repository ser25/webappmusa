import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';

interface ChatScreenProps {
  onBack: () => void;
  userId?: string;
}

const QUICK_RESPONSES = [
  { id: 'meditation', text: 'Медитация' },
  { id: 'anxiety', text: 'Мне тревожно' },
  { id: 'help', text: 'Как ты можешь помочь?' },
  { id: 'today', text: 'Как прожить этот день?' },
];

const ChatScreen: React.FC<ChatScreenProps> = ({ onBack, userId }) => {
  const { messages, isLoading, error, sendMessage } = useChat(userId);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === '' || isLoading) return;
    
    const message = messageInput;
    setMessageInput('');
    await sendMessage(message);
  };

  const handleQuickResponse = async (text: string) => {
    if (isLoading) return;
    await sendMessage(text);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
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
              <p className="text-xs text-green-600">{isLoading ? 'Печатает...' : 'Слушает тебя'}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {QUICK_RESPONSES.map((response) => (
            <button
              key={response.id}
              onClick={() => handleQuickResponse(response.text)}
              className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100 hover:bg-purple-100 transition-colors whitespace-nowrap"
              disabled={isLoading}
            >
              {response.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-3 ${
                  message.role === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white border border-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
          <input
            type="text"
            placeholder="Напиши, как ты себя чувствуешь..."
            className="flex-1 bg-transparent outline-none text-gray-800"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            className={`ml-2 p-2 rounded-full ${
              isLoading || messageInput.trim() === ''
                ? 'text-gray-400'
                : 'text-purple-600 hover:bg-purple-50'
            } transition-colors`}
            disabled={isLoading || messageInput.trim() === ''}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen; 