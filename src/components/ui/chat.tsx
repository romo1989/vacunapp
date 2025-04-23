'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  content: React.ReactNode;
  isUser?: boolean;
  className?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  isUser = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'max-w-[80%] rounded-2xl px-4 py-3 mb-2',
        isUser 
          ? 'bg-blue-500 text-white ml-auto rounded-br-none' 
          : 'bg-gray-100 text-gray-800 mr-auto rounded-bl-none',
        className
      )}
    >
      {content}
    </div>
  );
};

interface ChatContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 p-4', className)}>
      {children}
    </div>
  );
};
