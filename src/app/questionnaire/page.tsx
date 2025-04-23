'use client';

import React from 'react';
import { EnhancedConversationalQuestionnaire } from '@/components/questionnaire/enhanced-conversational-questionnaire';
import { AuthGuard } from '@/components/auth/auth-guard';

export default function QuestionnairePage() {
  const [responses, setResponses] = React.useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = React.useState(false);

  const handleQuestionnaireComplete = (questionnaireResponses: Record<string, string>) => {
    setResponses(questionnaireResponses);
    setIsComplete(true);
    // Redirect to recommendations page with the responses
    window.location.href = `/recommendations?data=${encodeURIComponent(JSON.stringify(questionnaireResponses))}`;
  };

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-center mb-8">Health Questionnaire</h1>
        <p className="text-center mb-8 text-gray-600">
          Answer a few questions to get personalized vaccine recommendations
        </p>
        
        <EnhancedConversationalQuestionnaire onComplete={handleQuestionnaireComplete} />
      </div>
    </AuthGuard>
  );
}
