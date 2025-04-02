import React, { useEffect } from 'react';
import MuseApp from '../components/screens/MuseApp';
import { initTelegramApp } from '../utils/telegram';

const Home: React.FC = () => {
  useEffect(() => {
    initTelegramApp();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MuseApp />
    </div>
  );
};

export default Home; 