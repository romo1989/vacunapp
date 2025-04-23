'use client';

import React from 'react';
import { ChatContainer, ChatBubble } from '@/components/ui/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface QuestionnaireProps {
  onComplete: (responses: Record<string, string>) => void;
}

// This is a simplified version of the conversational questionnaire component
// It will be expanded with more questions and logic based on the recommendation algorithm
export const ConversationalQuestionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [step, setStep] = React.useState(0);
  const [responses, setResponses] = React.useState<Record<string, string>>({});
  const [currentResponse, setCurrentResponse] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState<Array<{ content: string; isUser: boolean }>>([
    { content: "Hi there! I'm here to help you find the right vaccines for your needs. Let's start with a few questions.", isUser: false },
  ]);

  // Sample questions for the health questionnaire
  const questions = [
    "What's your age?",
    "Are you planning to travel internationally? If yes, where?",
    "Do you have any pre-existing health conditions?",
    "Have you had any vaccines in the last 6 months?",
    "Are you pregnant or planning to become pregnant?",
  ];

  const handleNext = () => {
    if (currentResponse.trim() === '') return;

    // Add user response to chat history
    setChatHistory((prev) => [
      ...prev,
      { content: currentResponse, isUser: true },
    ]);

    // Save response
    const questionKey = `question_${step}`;
    setResponses((prev) => ({
      ...prev,
      [questionKey]: currentResponse,
    }));

    // Clear current response
    setCurrentResponse('');

    // If there are more questions, continue
    if (step < questions.length - 1) {
      // Add next question to chat history after a short delay
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          { content: questions[step + 1], isUser: false },
        ]);
        setStep((prev) => prev + 1);
      }, 500);
    } else {
      // If all questions are answered, add completion message
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          { content: "Thanks for answering all the questions! I'll now analyze your responses to recommend appropriate vaccines.", isUser: false },
        ]);
        
        // Complete the questionnaire
        setTimeout(() => {
          onComplete(responses);
        }, 1000);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-4 bg-blue-500 text-white">
        <h2 className="text-xl font-semibold">Health Questionnaire</h2>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 bg-gray-50">
        <ChatContainer>
          {chatHistory.map((message, index) => (
            <ChatBubble 
              key={index} 
              content={message.content} 
              isUser={message.isUser} 
            />
          ))}
        </ChatContainer>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <Input
            placeholder="Type your answer..."
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleNext}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
