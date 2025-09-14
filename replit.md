# Subsentry - AI-Powered Subscription Management App

## Overview
A full-stack subscription management and cancellation service built with React, TypeScript, Express, and PostgreSQL. The app helps users track their subscriptions and uses AI agents to automatically cancel unwanted services.

## Project Architecture
- **Frontend**: React with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript, Drizzle ORM
- **Database**: PostgreSQL with Drizzle migrations
- **Authentication**: Replit Auth integration
- **Payments**: Stripe integration with secure webhook handling
- **AI**: OpenAI integration for cancellation strategy analysis

## Recent Changes (September 14, 2025)
- Fixed critical app startup issues including CSS compilation errors
- Resolved Stripe API version compatibility issues
- Fixed TypeScript errors in dashboard and navigation components
- Added secure Stripe webhook signature verification
- Cleaned up detached component files
- Successfully debugged and got app running on port 5000

## GitHub Repository
**Repository Created**: https://github.com/AJDIGITALllc/subsentry-app
- Repository name: `subsentry-app`
- Description: "AI-powered subscription management and cancellation service"
- Status: Repository created, code ready for push

### Manual Git Push Required
Due to Git security restrictions, the code push needs to be completed manually:
```bash
git remote add origin https://github.com/AJDIGITALllc/subsentry-app.git
git add .
git commit -m "Initial commit: Subsentry subscription management app"
git push -u origin main
```

## User Preferences
- User dismissed GitHub connector integration, prefers manual Git setup
- GitHub username: AJDIGITALllc
- GitHub token stored securely for repository operations

## Environment Variables Required
- `STRIPE_SECRET_KEY`: Stripe secret key for payment processing
- `VITE_STRIPE_PUBLIC_KEY`: Stripe publishable key for frontend
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret (production)
- `OPENAI_API_KEY`: OpenAI API key for AI cancellation analysis
- `DATABASE_URL`: PostgreSQL connection string
- `GITHUB_TOKEN`: GitHub personal access token (stored in secrets)

## Key Features
- Dashboard with subscription overview and analytics
- AI-powered cancellation task management
- Merchant scorecards and difficulty ratings
- Secure payment processing with Stripe
- Evidence collection and verification
- Real-time task progress tracking