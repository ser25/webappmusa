import React, { useState } from 'react';
import TitleScreen from './TitleScreen';
import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import MeditationScreen from './MeditationScreen';

type Screen = 'title' | 'home' | 'chat' | 'meditation';

const MuseApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'title':
        return <TitleScreen onStart={() => handleScreenChange('home')} />;
      case 'home':
        return (
          <HomeScreen
            onChat={() => handleScreenChange('chat')}
            onMeditation={() => handleScreenChange('meditation')}
          />
        );
      case 'chat':
        return <ChatScreen onBack={() => handleScreenChange('home')} />;
      case 'meditation':
        return <MeditationScreen onBack={() => handleScreenChange('home')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
    </div>
  );
};

export default MuseApp; 