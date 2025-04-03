import { useState, useEffect, useCallback } from 'react';
import { OpenAIService } from '../services/openai/OpenAIService';
import { databaseService } from '../services/database/DatabaseService';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const openAIService = new OpenAIService();

const SYSTEM_MESSAGE: Message = {
  role: 'system',
  content: 'Ти - Муза, емпатичний та підтримуючий AI-асистент. Ти спілкуєшся українською мовою та допомагаєш користувачам впоратися з їхніми емоціями, думками та переживаннями. Ти завжди відповідаєш з турботою та розумінням.'
};

export const useChat = (userId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [streamingMessage, setStreamingMessage] = useState<string>('');

  // Ініціалізація чату
  useEffect(() => {
    const initChat = async () => {
      try {
        // Якщо є userId, створюємо чат в базі даних
        if (userId) {
          const chat = await databaseService.createChat(userId);
          setChatId(chat.id);
        }
        
        // Додаємо привітальне повідомлення
        const welcomeMessage: Message = {
          role: 'assistant',
          content: 'Привіт! Я твоя Муза. Як ти себе почуваєш сьогодні?'
        };
        setMessages([welcomeMessage]);

        // Зберігаємо привітальне повідомлення в базу, якщо є chatId
        if (chatId) {
          await databaseService.addMessage({
            chatId,
            content: welcomeMessage.content,
            role: welcomeMessage.role
          });
        }
      } catch (err) {
        setError('Помилка ініціалізації чату');
        console.error(err);
      }
    };

    initChat();
  }, [userId]);

  // Надсилання повідомлення
  const sendMessage = useCallback(async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setStreamingMessage('');

      // Додаємо повідомлення користувача
      const userMessage: Message = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);

      // Зберігаємо повідомлення користувача в базу
      if (chatId) {
        await databaseService.addMessage({
          chatId,
          content: userMessage.content,
          role: userMessage.role
        });
      }

      // Формуємо історію повідомлень для API
      const apiMessages: ChatCompletionMessageParam[] = [
        SYSTEM_MESSAGE,
        ...messages,
        userMessage
      ];

      // Надсилаємо повідомлення в OpenAI з підтримкою стрімінгу
      const finalContent = await openAIService.sendMessage(apiMessages, (streamContent) => {
        setStreamingMessage(streamContent);
      });

      // Додаємо фінальне повідомлення асистента
      if (finalContent) {
        const assistantMessage: Message = { role: 'assistant', content: finalContent };
        setMessages(prev => [...prev, assistantMessage]);

        // Зберігаємо повідомлення асистента в базу
        if (chatId) {
          await databaseService.addMessage({
            chatId,
            content: assistantMessage.content,
            role: assistantMessage.role
          });
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Сталася помилка при надсиланні повідомлення');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
      setStreamingMessage('');
    }
  }, [messages, chatId]);

  // Завантаження історії повідомлень
  useEffect(() => {
    const loadChatHistory = async () => {
      if (chatId) {
        try {
          const history = await databaseService.getChatMessages(chatId);
          setMessages(history.map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
          })));
        } catch (err) {
          console.error('Помилка завантаження історії чату:', err);
        }
      }
    };

    loadChatHistory();
  }, [chatId]);

  return {
    messages,
    streamingMessage,
    isLoading,
    error,
    sendMessage
  };
}; 