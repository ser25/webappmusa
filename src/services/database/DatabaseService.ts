import { PrismaClient } from '@prisma/client';
import {
  DatabaseService,
  CreateUserData,
  CreateMessageData,
  CreateEmotionalStateData,
  CreateMeditationProgressData
} from './types';

export class PostgresDatabaseService implements DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // User operations
  async createUser(data: CreateUserData) {
    return this.prisma.user.create({
      data: {
        telegramId: data.telegramId,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName
      }
    });
  }

  async getUserByTelegramId(telegramId: string) {
    return this.prisma.user.findUnique({
      where: { telegramId }
    });
  }

  // Chat operations
  async createChat(userId: string) {
    return this.prisma.chat.create({
      data: {
        userId
      }
    });
  }

  async getChatMessages(chatId: string) {
    return this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' }
    });
  }

  async addMessage(data: CreateMessageData) {
    return this.prisma.message.create({
      data: {
        chatId: data.chatId,
        content: data.content,
        role: data.role
      }
    });
  }

  // Emotional state operations
  async recordEmotionalState(data: CreateEmotionalStateData) {
    return this.prisma.emotionalState.create({
      data: {
        userId: data.userId,
        state: data.state,
        note: data.note
      }
    });
  }

  async getUserEmotionalStates(userId: string) {
    return this.prisma.emotionalState.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Meditation operations
  async createMeditation(title: string, description: string, duration: number, audioUrl: string) {
    return this.prisma.meditation.create({
      data: {
        title,
        description,
        duration,
        audioUrl
      }
    });
  }

  async getMeditations() {
    return this.prisma.meditation.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async recordMeditationProgress(data: CreateMeditationProgressData) {
    return this.prisma.meditationProgress.create({
      data: {
        userId: data.userId,
        meditationId: data.meditationId,
        duration: data.duration
      }
    });
  }

  async getUserMeditationProgress(userId: string) {
    return this.prisma.meditationProgress.findMany({
      where: { userId },
      include: { meditation: true },
      orderBy: { lastPlayed: 'desc' }
    });
  }

  // Utility methods
  async disconnect() {
    await this.prisma.$disconnect();
  }
}

// Создаем и экспортируем экземпляр сервиса
export const databaseService = new PostgresDatabaseService(); 