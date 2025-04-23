'use client';

import React from 'react';
import { AuthGuard } from '@/components/auth/auth-guard';

export default function AppointmentsPage() {
  const [selectedProvider, setSelectedProvider] = React.useState('');
  const [calendarLoaded, setCalendarLoaded] = React.useState(false);
  
  // List of sample providers
  const providers = [
    { id: 'provider1', name: 'Dr. Sarah Johnson', specialty: 'Family Medicine' },
    { id: 'provider2', name: 'Dr. Michael Chen', specialty: 'Internal Medicine' },
    { id: 'provider3', name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics' },
  ];

  // Function to load Calendly widget
  const loadCalendlyWidget = (providerId: string) => {
    // In a real implementation, each provider would have their own Calendly link
    // For this proof of concept, we'll use a placeholder Calendly link
    
    // Clear any existing Calendly widget
    const container = document.getElementById('calendly-container');
    if (container) {
      container.innerHTML = '';
    }
    
    // Create Calendly inline widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      // Initialize Calendly widget
      // Note: In a real implementation, replace this URL with the actual Calendly URL
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/example/15min',
          parentElement: document.getElementById('calendly-container'),
          prefill: {},
          utm: {}
        });
        setCalendarLoaded(true);
      }
    };
  };

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    loadCalendlyWidget(providerId);
  };

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-center mb-8">Schedule Your Vaccination Appointment</h1>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Select a Provider</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {providers.map((provider) => (
                <div 
                  key={provider.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedProvider === provider.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleProviderSelect(provider.id)}
                >
                  <h3 className="font-medium">{provider.name}</h3>
                  <p className="text-sm text-gray-500">{provider.specialty}</p>
                </div>
              ))}
            </div>
            
            {selectedProvider ? (
              <div>
                <h2 className="text-lg font-medium mb-4">Select a Date & Time</h2>
                
                <div 
                  id="calendly-container" 
                  className="min-h-[500px] border rounded-lg"
                >
                  {!calendarLoaded && (
                    <div className="flex justify-center items-center h-[500px]">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    Note: This is a demonstration of the calendar integration. In a production environment, 
                    this would connect to your actual scheduling system.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Please select a provider to view available appointment times.
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

// Add TypeScript declaration for Calendly
declare global {
  interface Window {
    Calendly?: any;
  }
}
