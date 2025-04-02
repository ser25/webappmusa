export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'muse';
  timestamp: Date;
}

export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number;
  audioUrl: string;
  thumbnailUrl?: string;
}

export interface EmotionalState {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface User {
  id: string;
  telegramId: string;
  name: string;
  createdAt: Date;
  lastActive: Date;
}

export interface ChatHistory {
  id: string;
  userId: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MeditationProgress {
  id: string;
  userId: string;
  meditationId: string;
  completed: boolean;
  duration: number;
  lastPlayed: Date;
} 