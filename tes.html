import React, { useState } from 'react';

const MuseApp = () => {
  // State variables
  const [currentScreen, setCurrentScreen] = useState('title');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Привет! Я твоя Муза. Как ты себя чувствуешь сегодня?", sender: 'muse' }
  ]);
  
  // Handle message sending
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { id: prev.length + 1, text: messageInput, sender: 'user' }]);
    setMessageInput('');
    
    // Simulate AI response
    setTimeout(() => {
      let response = "Спасибо, что поделилась. Я здесь, чтобы поддержать тебя без осуждения и ожиданий.";
      setMessages(prev => [...prev, { id: prev.length + 1, text: response, sender: 'muse' }]);
    }, 1000);
  };

  // Title Screen
  const TitleScreen = () => (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-900 to-purple-700 text-white">
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div className="h-32 w-32 rounded-xl bg-white bg-opacity-20 flex items-center justify-center mb-8">
          <div className="h-24 w-24 rounded-lg bg-white flex items-center justify-center text-purple-600 text-5xl font-bold">
            M
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4">MUSE</h1>
        <p className="text-xl text-center text-purple-100 mb-12">
          Внутренняя тишина в мире эмоционального шума
        </p>
        
        <button 
          onClick={() => setCurrentScreen('home')}
          className="bg-white bg-opacity-20 px-8 py-3 rounded-full text-white font-medium"
        >
          Начать исцеление
        </button>
      </div>
    </div>
  );
  
  // Home Screen
  const HomeScreen = () => (
    <div className="flex flex-col h-screen bg-gray-50">
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
        <p className="text-gray-600 text-sm">Воскресенье, 30 марта • Новый день для тебя</p>
      </header>
      
      <div className="p-5">
        <div className="bg-purple-600 rounded-xl p-5 text-white shadow-lg">
          <h3 className="font-semibold mb-1">Как ты себя чувствуешь сейчас?</h3>
          <p className="text-purple-100 text-sm mb-4">Проверь себя. Тебе не нужно притворяться здесь.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <button className="bg-white bg-opacity-20 py-2 px-4 rounded-full text-sm font-medium">
              В порядке
            </button>
            <button className="bg-white bg-opacity-20 py-2 px-4 rounded-full text-sm font-medium">
              Тревожно
            </button>
            <button className="bg-white bg-opacity-20 py-2 px-4 rounded-full text-sm font-medium">
              Грустно
            </button>
            <button className="bg-white bg-opacity-20 py-2 px-4 rounded-full text-sm font-medium">
              Пусто
            </button>
          </div>
          <button 
            onClick={() => setCurrentScreen('chat')}
            className="w-full py-3 bg-white text-purple-700 rounded-xl font-medium flex items-center justify-center"
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
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">M</div>
            <div>
              <h4 className="font-medium text-gray-800">5-минутная медитация присутствия</h4>
              <p className="text-xs text-gray-500">Идеально для начала дня</p>
            </div>
          </div>
          <button className="w-full py-2 border border-purple-600 text-purple-600 rounded-xl font-medium text-sm">
            Начать практику
          </button>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-between">
          <button 
            className="flex flex-col items-center text-gray-400"
            onClick={() => setCurrentScreen('chat')}
          >
            <span>Чат</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <span>Медитации</span>
          </button>
          <button className="flex flex-col items-center text-purple-600">
            <span>Главная</span>
          </button>
        </div>
      </div>
    </div>
  );
  
  // Chat Screen
  const ChatScreen = () => (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="mr-2 text-gray-500"
          >
            Назад
          </button>
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-base font-semibold">
              M
            </div>
            <div className="ml-3">
              <h1 className="text-base font-semibold text-gray-800">Муза</h1>
              <p className="text-xs text-green-600">Слушает тебя</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">
            Медитация
          </button>
          <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">
            Мне тревожно
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs rounded-xl px-4 py-3 ${
                  message.sender === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white border border-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
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
          />
          <button 
            onClick={handleSendMessage}
            className="ml-2 p-1 text-purple-600"
          >
            Отправить
          </button>
        </div>
        
        <div className="flex justify-between mt-4">
          <button 
            className="flex flex-col items-center text-purple-600"
            onClick={() => setCurrentScreen('chat')}
          >
            <span>Чат</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <span>Медитации</span>
          </button>
          <button 
            className="flex flex-col items-center text-gray-400"
            onClick={() => setCurrentScreen('home')}
          >
            <span>Главная</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Render the appropriate screen
  return (
    <>
      {currentScreen === 'title' && <TitleScreen />}
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'chat' && <ChatScreen />}
    </>
  );
};

export default MuseApp;