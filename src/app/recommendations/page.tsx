'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RecommendationDisplay } from '@/components/recommendations/recommendation-display';
import { AuthGuard } from '@/components/auth/auth-guard';
import { parseResponses, generateVaccineRecommendations } from '@/lib/recommendation-algorithm';

// Create a client component that uses useSearchParams
function RecommendationsContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [recommendations, setRecommendations] = React.useState([]);

  React.useEffect(() => {
    // Get questionnaire data from URL params
    const data = searchParams.get('data');
    
    if (data) {
      try {
        const responses = JSON.parse(decodeURIComponent(data));
        const healthProfile = parseResponses(responses);
        const vaccineRecommendations = generateVaccineRecommendations(healthProfile);
        setRecommendations(vaccineRecommendations);
      } catch (error) {
        console.error('Error parsing questionnaire data:', error);
      }
    }
    
    setIsLoading(false);
  }, [searchParams]);

  const handleScheduleAppointment = () => {
    // Redirect to the appointments page
    window.location.href = '/appointments';
  };

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-center mb-8">Your Vaccine Recommendations</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <RecommendationDisplay 
              recommendations={recommendations}
              onScheduleAppointment={handleScheduleAppointment}
            />
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                These recommendations are based on the information you provided and general guidelines.
                <br />
                Always consult with a healthcare professional before getting vaccinated.
              </p>
            </div>
          </>
        )}
      </div>
    </AuthGuard>
  );
}

// Main page component
export default function RecommendationsPage() {
  return (
    <Suspense fallback={<div>Loading recommendations...</div>}>
      <RecommendationsContent />
    </Suspense>
  );
}
