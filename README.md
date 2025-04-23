# VacunApp README

## Overview
VacunApp is a personalized vaccine recommendation system that helps users identify which vaccines they may need based on their health profile, travel plans, and medical history. This proof of concept demonstrates the core functionality with a focus on user experience and simplicity.

## Core Features
- **User Authentication**: Secure signup, login, and profile management
- **Conversational Health Questionnaire**: Lemonade-style chat interface for collecting health information
- **Personalized Vaccine Recommendations**: Algorithm that analyzes user responses to suggest appropriate vaccines
- **Appointment Scheduling**: Integration with calendar systems for booking vaccination appointments

## Technology Stack
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Calendar Integration**: Calendly

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/vacunapp.git
cd vacunapp
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the project root with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure
- `/src/app`: Next.js app router pages
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions and shared code
- `/src/components/auth`: Authentication components
- `/src/components/questionnaire`: Conversational interface components
- `/src/components/recommendations`: Vaccine recommendation components
- `/src/components/ui`: Basic UI components

## Deployment
See the [Deployment Guide](./deployment_guide.md) for instructions on deploying the application.

## Future Enhancements
- Mobile app version
- Integration with electronic health records
- Multi-language support
- Advanced analytics dashboard
- AI-powered recommendation refinements

## License
This project is licensed under the MIT License - see the LICENSE file for details.
