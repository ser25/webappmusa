import React, { useState } from 'react';
import { useChatStream } from '../hooks/useChatStream';

export const StreamingChat: React.FC = () => {
  const { messages, streamingMessage, isLoading, error, sendMessage } = useChatStream();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-100 ml-auto max-w-[80%]' 
                : 'bg-gray-100 mr-auto max-w-[80%]'
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}
        
        {/* Показуємо повідомлення, що надходить потоком */}
        {streamingMessage && (
          <div className="p-3 rounded-lg bg-gray-100 mr-auto max-w-[80%]">
            <p className="whitespace-pre-wrap">{streamingMessage}</p>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
          placeholder="Напишіть повідомлення..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {isLoading ? 'Надсилання...' : 'Надіслати'}
        </button>
      </form>
    </div>
  );
}; 