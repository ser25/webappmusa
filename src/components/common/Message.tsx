import React from 'react';

interface MessageProps {
  text: string;
  sender: 'user' | 'muse';
  timestamp?: Date;
  className?: string;
}

const Message: React.FC<MessageProps> = ({
  text,
  sender,
  timestamp,
  className = '',
}) => {
  const isUser = sender === 'user';
  
  const messageStyles = isUser
    ? 'bg-purple-600 text-white'
    : 'bg-white border border-gray-100 text-gray-800';

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${className}`}
    >
      <div 
        className={`max-w-xs rounded-xl px-4 py-3 ${messageStyles}`}
      >
        <p className="text-sm">{text}</p>
        {timestamp && (
          <span className="text-xs opacity-70 mt-1 block">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};

export default Message; 