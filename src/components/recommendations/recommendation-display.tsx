import React from 'react';
import { Button } from '@/components/ui/button';

interface VaccineRecommendation {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
}

// This is a simplified version of the recommendation component
// It will be enhanced when we integrate the actual Python algorithm
export const RecommendationDisplay: React.FC<{
  recommendations: VaccineRecommendation[];
  onScheduleAppointment: () => void;
}> = ({ recommendations, onScheduleAppointment }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6 bg-blue-500 text-white">
        <h2 className="text-xl font-semibold">Your Vaccine Recommendations</h2>
        <p className="mt-1 text-sm opacity-90">Based on your health profile</p>
      </div>
      
      <div className="p-6">
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No recommendations available based on your profile.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendations.map((vaccine, index) => (
              <div 
                key={index}
                className={`border rounded-lg p-4 ${
                  vaccine.priority === 'high' 
                    ? 'border-red-200 bg-red-50' 
                    : vaccine.priority === 'medium'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-green-200 bg-green-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-lg">{vaccine.name}</h3>
                  <span 
                    className={`px-2 py-1 text-xs rounded-full ${
                      vaccine.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : vaccine.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {vaccine.priority.charAt(0).toUpperCase() + vaccine.priority.slice(1)} Priority
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{vaccine.description}</p>
                <div className="mt-3 text-sm text-gray-500">
                  <strong>Reason:</strong> {vaccine.reason}
                </div>
              </div>
            ))}
            
            <div className="mt-8">
              <Button 
                onClick={onScheduleAppointment}
                className="w-full"
              >
                Schedule Vaccination Appointment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
