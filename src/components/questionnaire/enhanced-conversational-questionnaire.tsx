'use client';

import React from 'react';
import { ChatContainer, ChatBubble } from '@/components/ui/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Define the question types and their possible responses
type QuestionType = 'text' | 'options' | 'boolean';

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  nextQuestion?: (response: string) => string | null;
}

// Enhanced version of the conversational questionnaire with more Lemonade-like features
export const EnhancedConversationalQuestionnaire: React.FC<{
  onComplete: (responses: Record<string, string>) => void;
}> = ({ onComplete }) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState('age');
  const [responses, setResponses] = React.useState<Record<string, string>>({});
  const [inputValue, setInputValue] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState<Array<{ content: string; isUser: boolean }>>([
    { content: "Hi there! I'm your vaccine assistant. I'll help you find the right vaccines based on your health profile.", isUser: false },
  ]);
  const [isTyping, setIsTyping] = React.useState(false);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  // Define the questionnaire flow
  const questions: Record<string, Question> = {
    age: {
      id: 'age',
      text: "Let's start with your age. How old are you?",
      type: 'text',
      nextQuestion: (response) => {
        // Store as number if possible
        const age = parseInt(response);
        if (isNaN(age)) {
          return 'age'; // Ask again if not a number
        }
        return 'travel';
      }
    },
    travel: {
      id: 'travel',
      text: "Are you planning to travel internationally in the next 6 months?",
      type: 'boolean',
      nextQuestion: (response) => {
        if (response.toLowerCase() === 'yes') {
          return 'travelDestination';
        }
        return 'healthConditions';
      }
    },
    travelDestination: {
      id: 'travelDestination',
      text: "Which regions are you planning to visit? (e.g., South America, Africa, Asia, Europe)",
      type: 'text',
      nextQuestion: () => 'healthConditions'
    },
    healthConditions: {
      id: 'healthConditions',
      text: "Do you have any pre-existing health conditions?",
      type: 'boolean',
      nextQuestion: (response) => {
        if (response.toLowerCase() === 'yes') {
          return 'specificHealthConditions';
        }
        return 'recentVaccines';
      }
    },
    specificHealthConditions: {
      id: 'specificHealthConditions',
      text: "Please specify your health conditions (e.g., diabetes, heart disease, immunocompromised)",
      type: 'text',
      nextQuestion: () => 'recentVaccines'
    },
    recentVaccines: {
      id: 'recentVaccines',
      text: "Have you received any vaccines in the last 6 months?",
      type: 'boolean',
      nextQuestion: (response) => {
        if (response.toLowerCase() === 'yes') {
          return 'specificVaccines';
        }
        return 'pregnancy';
      }
    },
    specificVaccines: {
      id: 'specificVaccines',
      text: "Which vaccines have you received in the last 6 months?",
      type: 'text',
      nextQuestion: () => 'pregnancy'
    },
    pregnancy: {
      id: 'pregnancy',
      text: "Are you pregnant or planning to become pregnant in the next 3 months?",
      type: 'boolean',
      nextQuestion: () => 'allergies'
    },
    allergies: {
      id: 'allergies',
      text: "Do you have any allergies to vaccines or their components?",
      type: 'boolean',
      nextQuestion: (response) => {
        if (response.toLowerCase() === 'yes') {
          return 'specificAllergies';
        }
        return null; // End of questionnaire
      }
    },
    specificAllergies: {
      id: 'specificAllergies',
      text: "Please specify your allergies",
      type: 'text',
      nextQuestion: () => null // End of questionnaire
    }
  };

  // Function to add a message to the chat history with typing animation
  const addMessage = (content: string, isUser: boolean) => {
    if (!isUser) {
      setIsTyping(true);
      // Simulate typing delay
      setTimeout(() => {
        setChatHistory(prev => [...prev, { content, isUser }]);
        setIsTyping(false);
      }, 500 + Math.random() * 1000); // Random delay between 500ms and 1500ms
    } else {
      setChatHistory(prev => [...prev, { content, isUser }]);
    }
  };

  // Scroll to bottom of chat when history changes
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  // Display the first question
  React.useEffect(() => {
    if (currentQuestionId && questions[currentQuestionId]) {
      addMessage(questions[currentQuestionId].text, false);
    }
  }, []);

  const handleResponse = (response: string) => {
    if (!currentQuestionId) return;
    
    const currentQuestion = questions[currentQuestionId];
    if (!currentQuestion) return;

    // Add user response to chat
    addMessage(response, true);
    
    // Save response
    setResponses(prev => ({
      ...prev,
      [currentQuestionId]: response
    }));
    
    // Determine next question
    const nextQuestionId = currentQuestion.nextQuestion?.(response) || null;
    
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
      // Add next question after a delay
      setTimeout(() => {
        addMessage(questions[nextQuestionId].text, false);
      }, 1000);
    } else {
      // Questionnaire complete
      setTimeout(() => {
        addMessage("Thanks for answering all the questions! I'll now analyze your responses to recommend appropriate vaccines.", false);
        
        // Complete the questionnaire after a delay
        setTimeout(() => {
          onComplete(responses);
        }, 2000);
      }, 1000);
    }
    
    // Clear input
    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    handleResponse(inputValue);
  };

  // For boolean questions, provide Yes/No buttons
  const renderResponseOptions = () => {
    if (!currentQuestionId) return null;
    
    const currentQuestion = questions[currentQuestionId];
    if (!currentQuestion) return null;
    
    if (currentQuestion.type === 'boolean') {
      return (
        <div className="flex space-x-2 mt-4">
          <Button 
            onClick={() => handleResponse('Yes')}
            variant="primary"
            className="flex-1"
          >
            Yes
          </Button>
          <Button 
            onClick={() => handleResponse('No')}
            variant="secondary"
            className="flex-1"
          >
            No
          </Button>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-4 bg-blue-500 text-white">
        <h2 className="text-xl font-semibold">Health Questionnaire</h2>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="h-96 overflow-y-auto p-4 bg-gray-50"
      >
        <ChatContainer>
          {chatHistory.map((message, index) => (
            <ChatBubble 
              key={index} 
              content={message.content} 
              isUser={message.isUser} 
            />
          ))}
          {isTyping && (
            <ChatBubble 
              content={
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              } 
              isUser={false} 
            />
          )}
        </ChatContainer>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        {renderResponseOptions()}
        
        <form onSubmit={handleSubmit} className="flex space-x-2 mt-2">
          <Input
            placeholder="Type your answer..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
            disabled={isTyping || !currentQuestionId}
          />
          <Button 
            type="submit"
            disabled={isTyping || !currentQuestionId || inputValue.trim() === ''}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
