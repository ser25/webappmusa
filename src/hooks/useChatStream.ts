import { useState, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const useChatStream = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingMessage, setStreamingMessage] = useState<string>('');

  // Функція для надсилання повідомлення та обробки відповіді зі стрімінгом
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      setStreamingMessage('');

      // Додаємо повідомлення користувача до списку
      const userMessage: Message = { role: 'user', content };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      // Робимо запит до API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Помилка HTTP: ${response.status}`);
      }

      // Отримуємо та обробляємо стрімінг
      const reader = response.body?.getReader();
      if (!reader) throw new Error('Не вдалося отримати reader');

      const decoder = new TextDecoder();
      let done = false;
      let accumulatedContent = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            if (data === '[DONE]') {
              // Стрімінг завершено
              break;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;
                setStreamingMessage(accumulatedContent);
              }
            } catch (e) {
              console.error('Помилка розбору даних стрімінгу:', e);
            }
          }
        }
      }

      // Додаємо повідомлення асистента до списку, коли стрімінг завершено
      const assistantMessage: Message = { role: 'assistant', content: accumulatedContent };
      setMessages([...newMessages, assistantMessage]);
      setStreamingMessage('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Сталася помилка при надсиланні повідомлення');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return {
    messages,
    streamingMessage,
    isLoading,
    error,
    sendMessage,
  };
}; 