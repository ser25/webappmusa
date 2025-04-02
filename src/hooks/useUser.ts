import { useState, useEffect } from 'react';
import { databaseService } from '../services/database/DatabaseService';

interface TelegramUser {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export const useUser = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initUser = async () => {
      try {
        // Получаем данные пользователя из Telegram Web App
        const tg = (window as any).Telegram?.WebApp;
        if (!tg?.initDataUnsafe?.user) {
          throw new Error('Не удалось получить данные пользователя Telegram');
        }

        const telegramUser: TelegramUser = tg.initDataUnsafe.user;

        // Проверяем, существует ли пользователь в базе
        let user = await databaseService.getUserByTelegramId(telegramUser.id.toString());

        // Если пользователя нет, создаем его
        if (!user) {
          user = await databaseService.createUser({
            telegramId: telegramUser.id.toString(),
            username: telegramUser.username,
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name
          });
        }

        setUserId(user.id);
      } catch (err) {
        console.error('Ошибка инициализации пользователя:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setIsLoading(false);
      }
    };

    initUser();
  }, []);

  return {
    userId,
    isLoading,
    error
  };
}; 