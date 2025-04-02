import React, { useState } from 'react';
import TitleScreen from './components/screens/TitleScreen';
import HomeScreen from './components/screens/HomeScreen';
import ChatScreen from './components/screens/ChatScreen';
import MeditationScreen from './components/screens/MeditationScreen';
import { useUser } from './hooks/useUser';

type Screen = 'title' | 'home' | 'chat' | 'meditation';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');
  const { userId, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700">
        <div className="text-white text-center p-4">
          <h2 className="text-xl font-bold mb-2">Ошибка</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-white text-purple-700 rounded-lg hover:bg-opacity-90"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  const handleStart = () => setCurrentScreen('home');
  const handleChat = () => setCurrentScreen('chat');
  const handleMeditation = () => setCurrentScreen('meditation');
  const handleBack = () => setCurrentScreen('home');

  return (
    <>
      {currentScreen === 'title' && (
        <TitleScreen onStart={handleStart} />
      )}
      {currentScreen === 'home' && (
        <HomeScreen 
          onChat={handleChat} 
          onMeditation={handleMeditation}
          userId={userId || undefined}
        />
      )}
      {currentScreen === 'chat' && (
        <ChatScreen 
          onBack={handleBack}
          userId={userId || undefined}
        />
      )}
      {currentScreen === 'meditation' && (
        <MeditationScreen 
          onBack={handleBack}
          userId={userId || undefined}
        />
      )}
    </>
  );
};

export default App; 