import { useState, useEffect, useCallback } from 'react';
import { openAIService } from '../services/openai/OpenAIService';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Создаем новый тред при инициализации чата
    const initializeChat = async () => {
      try {
        const newThreadId = await openAIService.createThread();
        setThreadId(newThreadId);
      } catch (err) {
        setError('Не удалось инициализировать чат');
        console.error(err);
      }
    };

    initializeChat();
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!threadId) {
      setError('Чат не инициализирован');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Добавляем сообщение пользователя
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);

      // Получаем ответ от ассистента
      const response = await openAIService.sendMessage(threadId, content);
      
      // Добавляем ответ ассистента
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Не удалось отправить сообщение');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [threadId]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
}; 