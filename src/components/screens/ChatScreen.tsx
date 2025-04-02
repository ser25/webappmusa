import React, { useState } from 'react';
import Header from '../layout/Header';
import Navigation from '../layout/Navigation';
import Button from '../common/Button';
import { ChatBubbleLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'muse';
  timestamp: Date;
}

interface ChatScreenProps {
  onBack: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я Муза, твой персональный помощник. Как я могу помочь тебе сегодня?',
      sender: 'muse',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Simulate Muse's response
    setTimeout(() => {
      const museResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Я понимаю твои чувства. Давай поговорим об этом подробнее.',
        sender: 'muse',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, museResponse]);
    }, 1000);
  };

  const navItems = [
    { id: 'chat', label: 'Чат', icon: <ChatBubbleLeftIcon className="w-6 h-6" />, onClick: () => {}, isActive: true },
    { id: 'home', label: 'Главная', onClick: onBack, isActive: false },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        title="Чат с Музой"
        subtitle="Поделись своими мыслями"
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === 'user'
                  ? 'bg-purple-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-t border-gray-100 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Напиши сообщение..."
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Button
            onClick={handleSend}
            variant="primary"
            size="sm"
            className="px-4"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      <Navigation items={navItems} />
    </div>
  );
};

export default ChatScreen; 