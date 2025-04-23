# VacunApp Deployment Guide

This guide will help you deploy your VacunApp proof of concept to make it accessible online.

## Prerequisites

Before deploying, make sure you have:

1. Your Supabase project URL and anon key
2. A GitHub account (for Vercel or Netlify deployment)
3. The VacunApp codebase on your local machine

## Local Environment Setup

1. Create a `.env.local` file in the root of your project with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Test your application locally:

```bash
cd /home/ubuntu/vacunapp
npm run dev
```

Visit `http://localhost:3000` to ensure everything is working correctly.

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest option for deploying Next.js applications.

1. Create a GitHub repository and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/vacunapp.git
   git push -u origin main
   ```

2. Go to [Vercel](https://vercel.com/) and sign up/login with your GitHub account

3. Click "New Project" and import your GitHub repository

4. Configure environment variables:
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your values

5. Click "Deploy" and wait for the deployment to complete

6. Your app will be available at a URL like `https://vacunapp.vercel.app`

### Option 2: Deploy to Netlify

1. Create a GitHub repository as described above

2. Go to [Netlify](https://www.netlify.com/) and sign up/login with your GitHub account

3. Click "New site from Git" and select your GitHub repository

4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

5. Add environment variables in the "Advanced build settings" section

6. Click "Deploy site" and wait for the deployment to complete

### Option 3: Manual Deployment

If you prefer not to use a service like Vercel or Netlify:

1. Build your application:
   ```bash
   npm run build
   ```

2. The built files will be in the `.next` directory

3. You can deploy these files to any hosting service that supports Node.js applications

## Post-Deployment Steps

After deploying your application:

1. Test all features in the production environment
2. Ensure authentication is working correctly
3. Verify that the questionnaire, recommendations, and appointment booking are functioning as expected

## Troubleshooting

If you encounter issues after deployment:

1. Check that your environment variables are correctly set in your deployment platform
2. Verify that your Supabase project is properly configured with the necessary tables and policies
3. Check the browser console for any JavaScript errors
4. Review the deployment logs in your hosting platform

## Next Steps

Once your proof of concept is successfully deployed, consider:

1. Adding analytics to track user engagement
2. Implementing more sophisticated vaccine recommendations
3. Enhancing the user interface and experience
4. Adding more comprehensive testing
5. Setting up a CI/CD pipeline for automated deployments
