import { useState, useEffect, useCallback } from 'react';
import { OpenAIService } from '../services/openai/OpenAIService';
import { databaseService } from '../services/database/DatabaseService';

interface Message {
  role: string;
  content: string;
}

const openAIService = new OpenAIService();

export const useChat = (userId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  // Инициализация чата
  useEffect(() => {
    const initChat = async () => {
      try {
        // Создаем тред в OpenAI
        const newThreadId = await openAIService.createThread();
        setThreadId(newThreadId);

        // Если есть userId, создаем чат в базе данных
        if (userId) {
          const chat = await databaseService.createChat(userId);
          setChatId(chat.id);
        }
        
        // Добавляем приветственное сообщение
        const welcomeMessage = {
          role: 'assistant',
          content: 'Привет! Я твоя Муза. Как ты себя чувствуешь сегодня?'
        };
        setMessages([welcomeMessage]);

        // Сохраняем приветственное сообщение в базу, если есть chatId
        if (chatId) {
          await databaseService.addMessage({
            chatId,
            content: welcomeMessage.content,
            role: welcomeMessage.role
          });
        }
      } catch (err) {
        setError('Ошибка инициализации чата');
        console.error(err);
      }
    };

    initChat();
  }, [userId]);

  // Отправка сообщения
  const sendMessage = useCallback(async (content: string) => {
    if (!threadId) {
      setError('Чат не инициализирован');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Добавляем сообщение пользователя
      const userMessage = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);

      // Сохраняем сообщение пользователя в базу
      if (chatId) {
        await databaseService.addMessage({
          chatId,
          content: userMessage.content,
          role: userMessage.role
        });
      }

      // Отправляем сообщение в OpenAI
      await openAIService.sendMessage(threadId, content);

      // Получаем обновленные сообщения
      const updatedMessages = await openAIService.getMessages(threadId);
      setMessages(updatedMessages.reverse());

      // Сохраняем последнее сообщение ассистента в базу
      if (chatId) {
        const lastMessage = updatedMessages[0];
        if (lastMessage && lastMessage.role === 'assistant') {
          await databaseService.addMessage({
            chatId,
            content: lastMessage.content,
            role: lastMessage.role
          });
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла ошибка при отправке сообщения');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [threadId, chatId]);

  // Загрузка истории сообщений
  useEffect(() => {
    const loadChatHistory = async () => {
      if (chatId) {
        try {
          const history = await databaseService.getChatMessages(chatId);
          setMessages(history.map(msg => ({
            role: msg.role,
            content: msg.content
          })));
        } catch (err) {
          console.error('Ошибка загрузки истории чата:', err);
        }
      }
    };

    loadChatHistory();
  }, [chatId]);

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
}; 