import { User, Chat, Message, EmotionalState, Meditation, MeditationProgress } from '@prisma/client';

export interface CreateUserData {
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface CreateMessageData {
  chatId: string;
  content: string;
  role: string;
}

export interface CreateEmotionalStateData {
  userId: string;
  state: string;
  note?: string;
}

export interface CreateMeditationProgressData {
  userId: string;
  meditationId: string;
  duration: number;
}

export interface DatabaseService {
  // User operations
  createUser(data: CreateUserData): Promise<User>;
  getUserByTelegramId(telegramId: string): Promise<User | null>;
  
  // Chat operations
  createChat(userId: string): Promise<Chat>;
  getChatMessages(chatId: string): Promise<Message[]>;
  addMessage(data: CreateMessageData): Promise<Message>;
  
  // Emotional state operations
  recordEmotionalState(data: CreateEmotionalStateData): Promise<EmotionalState>;
  getUserEmotionalStates(userId: string): Promise<EmotionalState[]>;
  
  // Meditation operations
  createMeditation(title: string, description: string, duration: number, audioUrl: string): Promise<Meditation>;
  getMeditations(): Promise<Meditation[]>;
  recordMeditationProgress(data: CreateMeditationProgressData): Promise<MeditationProgress>;
  getUserMeditationProgress(userId: string): Promise<MeditationProgress[]>;
} 