import React, { useState } from 'react';
import Header from '../layout/Header';
import Navigation from '../layout/Navigation';
import Button from '../common/Button';
import { SparklesIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number;
  audioUrl: string;
  thumbnailUrl?: string;
}

interface MeditationScreenProps {
  onBack: () => void;
  userId?: string;
}

const meditations: Meditation[] = [
  {
    id: '1',
    title: '5-минутная медитация присутствия',
    description: 'Идеально для начала дня. Научись быть здесь и сейчас.',
    duration: 300,
    audioUrl: '/meditations/presence.mp3',
    thumbnailUrl: '/images/meditation-1.jpg',
  },
  {
    id: '2',
    title: '10-минутная медитация для снятия стресса',
    description: 'Освободись от напряжения и тревоги.',
    duration: 600,
    audioUrl: '/meditations/stress-relief.mp3',
    thumbnailUrl: '/images/meditation-2.jpg',
  },
];

const MeditationScreen: React.FC<MeditationScreenProps> = ({ onBack, userId }) => {
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleStart = (meditation: Meditation) => {
    setSelectedMeditation(meditation);
    setTimeLeft(meditation.duration);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleResume = () => {
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const navItems = [
    { id: 'meditation', label: 'Медитации', icon: <SparklesIcon className="w-6 h-6" />, onClick: () => {}, isActive: true },
    { id: 'home', label: 'Главная', onClick: onBack, isActive: false },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        title="Медитации"
        subtitle="Найди свой путь к спокойствию"
      />
      
      <div className="flex-1 overflow-y-auto p-4">
        {selectedMeditation ? (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedMeditation.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedMeditation.description}
              </p>
              <div className="text-4xl font-bold text-purple-600 mb-6">
                {formatTime(timeLeft)}
              </div>
              <div className="flex justify-center space-x-4">
                {isPlaying ? (
                  <Button
                    onClick={handlePause}
                    variant="outline"
                    size="lg"
                  >
                    <PauseIcon className="w-6 h-6 mr-2" />
                    Пауза
                  </Button>
                ) : (
                  <Button
                    onClick={handleResume}
                    variant="primary"
                    size="lg"
                  >
                    <PlayIcon className="w-6 h-6 mr-2" />
                    Продолжить
                  </Button>
                )}
                <Button
                  onClick={() => setSelectedMeditation(null)}
                  variant="ghost"
                  size="lg"
                >
                  Завершить
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {meditations.map((meditation) => (
              <div
                key={meditation.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <SparklesIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {meditation.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {meditation.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {formatTime(meditation.duration)}
                  </span>
                  <Button
                    onClick={() => handleStart(meditation)}
                    variant="primary"
                    size="sm"
                  >
                    <PlayIcon className="w-5 h-5 mr-2" />
                    Начать
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Navigation items={navItems} />
    </div>
  );
};

export default MeditationScreen; 