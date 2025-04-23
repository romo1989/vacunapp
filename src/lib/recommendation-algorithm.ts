// This file will contain the Python recommendation algorithm integration
// Since we couldn't access the original algorithm, we'll create a simplified version
// that can be replaced with the actual algorithm later

interface HealthProfile {
  age?: string;
  travel?: string;
  travelDestination?: string;
  healthConditions?: string;
  specificHealthConditions?: string;
  recentVaccines?: string;
  specificVaccines?: string;
  pregnancy?: string;
  allergies?: string;
  specificAllergies?: string;
}

interface VaccineRecommendation {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
}

// Parse questionnaire responses into a health profile
export const parseResponses = (responses: Record<string, string>): HealthProfile => {
  return {
    age: responses.age,
    travel: responses.travel,
    travelDestination: responses.travelDestination,
    healthConditions: responses.healthConditions,
    specificHealthConditions: responses.specificHealthConditions,
    recentVaccines: responses.recentVaccines,
    specificVaccines: responses.specificVaccines,
    pregnancy: responses.pregnancy,
    allergies: responses.allergies,
    specificAllergies: responses.specificAllergies,
  };
};

// Simplified version of the recommendation algorithm
// This mimics the logic described in the user's algorithm:
// - Collects responses from a user
// - Assigns risk factors based on answers
// - Determines vaccination priority using the highest-ranked risk
// - Adds required additional vaccines (Africa_Sudamerica and Varicela)
export const generateVaccineRecommendations = (profile: HealthProfile): VaccineRecommendation[] => {
  const recommendations: VaccineRecommendation[] = [];
  const riskFactors: Record<string, number> = {};
  
  // Age-based recommendations
  if (profile.age) {
    const age = parseInt(profile.age);
    if (!isNaN(age)) {
      if (age >= 65) {
        riskFactors.age = 3; // High risk
        recommendations.push({
          name: 'Influenza (Flu)',
          description: 'Annual flu vaccination is recommended for older adults',
          priority: 'high',
          reason: 'Adults 65 and older are at higher risk for flu complications'
        });
        recommendations.push({
          name: 'Pneumococcal',
          description: 'Protects against pneumococcal disease, which can cause severe infections',
          priority: 'high',
          reason: 'Recommended for all adults 65 and older'
        });
      } else if (age >= 50) {
        riskFactors.age = 2; // Medium risk
        recommendations.push({
          name: 'Shingles (Herpes Zoster)',
          description: 'Protects against shingles and post-herpetic neuralgia',
          priority: 'medium',
          reason: 'Recommended for adults 50 and older'
        });
      }
    }
  }
  
  // Travel-based recommendations
  if (profile.travel?.toLowerCase() === 'yes' && profile.travelDestination) {
    const destination = profile.travelDestination.toLowerCase();
    
    if (destination.includes('africa') || destination.includes('south america') || destination.includes('sudamerica')) {
      riskFactors.travel = 3; // High risk
      recommendations.push({
        name: 'Yellow Fever',
        description: 'Required for travel to many parts of Africa and South America',
        priority: 'high',
        reason: 'Travel to regions where Yellow Fever is endemic'
      });
      recommendations.push({
        name: 'Typhoid',
        description: 'Recommended for travelers to regions with poor sanitation',
        priority: 'medium',
        reason: 'Travel to regions with risk of typhoid'
      });
    } else if (destination.includes('asia')) {
      riskFactors.travel = 2; // Medium risk
      recommendations.push({
        name: 'Hepatitis A',
        description: 'Protects against hepatitis A virus infection',
        priority: 'medium',
        reason: 'Travel to regions with risk of Hepatitis A'
      });
      recommendations.push({
        name: 'Japanese Encephalitis',
        description: 'Recommended for longer stays in rural areas of Asia',
        priority: 'medium',
        reason: 'Travel to regions with risk of Japanese Encephalitis'
      });
    }
  }
  
  // Health conditions-based recommendations
  if (profile.healthConditions?.toLowerCase() === 'yes' && profile.specificHealthConditions) {
    const conditions = profile.specificHealthConditions.toLowerCase();
    
    if (conditions.includes('diabetes') || conditions.includes('heart') || conditions.includes('lung')) {
      riskFactors.healthConditions = 3; // High risk
      recommendations.push({
        name: 'Influenza (Flu)',
        description: 'Annual flu vaccination is recommended for people with chronic health conditions',
        priority: 'high',
        reason: 'Chronic health conditions increase risk of flu complications'
      });
      recommendations.push({
        name: 'Pneumococcal',
        description: 'Protects against pneumococcal disease, which can cause severe infections',
        priority: 'high',
        reason: 'Recommended for people with certain chronic health conditions'
      });
    }
    
    if (conditions.includes('immuno') || conditions.includes('transplant') || conditions.includes('hiv')) {
      riskFactors.immunocompromised = 3; // High risk
      recommendations.push({
        name: 'Pneumococcal',
        description: 'Protects against pneumococcal disease, which can cause severe infections',
        priority: 'high',
        reason: 'Recommended for immunocompromised individuals'
      });
      // Note: Live vaccines may be contraindicated for immunocompromised individuals
      recommendations.push({
        name: 'Consultation Required',
        description: 'Special vaccination considerations for immunocompromised individuals',
        priority: 'high',
        reason: 'Your immune status requires personalized vaccine recommendations'
      });
    }
  }
  
  // Pregnancy-based recommendations
  if (profile.pregnancy?.toLowerCase() === 'yes') {
    riskFactors.pregnancy = 3; // High risk
    recommendations.push({
      name: 'Tdap (Tetanus, Diphtheria, Pertussis)',
      description: 'Recommended during each pregnancy',
      priority: 'high',
      reason: 'Protects both mother and newborn against pertussis (whooping cough)'
    });
    recommendations.push({
      name: 'Influenza (Flu)',
      description: 'Recommended for all pregnant women during flu season',
      priority: 'high',
      reason: 'Pregnancy increases risk of flu complications'
    });
    
    // Note: Some vaccines are contraindicated during pregnancy
    recommendations.push({
      name: 'Consultation Required',
      description: 'Some vaccines should be avoided during pregnancy',
      priority: 'high',
      reason: 'Your pregnancy status requires personalized vaccine recommendations'
    });
  }
  
  // Allergy considerations
  if (profile.allergies?.toLowerCase() === 'yes' && profile.specificAllergies) {
    recommendations.push({
      name: 'Consultation Required',
      description: 'Your allergies may affect vaccine recommendations',
      priority: 'high',
      reason: 'Allergies to vaccine components require medical evaluation'
    });
  }
  
  // Add general recommendations if no specific high-priority ones exist
  if (recommendations.length === 0 || !recommendations.some(r => r.priority === 'high')) {
    recommendations.push({
      name: 'Tdap (Tetanus, Diphtheria, Pertussis)',
      description: 'Booster recommended every 10 years',
      priority: 'medium',
      reason: 'General recommendation for all adults'
    });
    
    recommendations.push({
      name: 'Influenza (Flu)',
      description: 'Annual vaccination recommended',
      priority: 'medium',
      reason: 'General recommendation for all adults'
    });
  }
  
  // Check for multiple high-priority risks (consultation recommendation)
  const highRiskFactors = Object.values(riskFactors).filter(risk => risk === 3).length;
  if (highRiskFactors >= 2 && !recommendations.some(r => r.name === 'Consultation Required')) {
    recommendations.push({
      name: 'Consultation Required',
      description: 'Multiple risk factors identified',
      priority: 'high',
      reason: 'Your health profile suggests the need for personalized medical advice'
    });
  }
  
  return recommendations;
};
