# MyAI3 - AI Chatbot Assistant

## Project Overview

MyAI3 is a Next.js-based AI chatbot application that provides:
- AI-powered chat interface with multiple AI model support (OpenAI, Fireworks, etc.)
- Web search capabilities via Exa API
- Vector database integration with Pinecone
- Content moderation using OpenAI's moderation API
- Real-time streaming responses
- Citation and source tracking

## Technology Stack

- **Framework**: Next.js 16.0.0 (using Turbopack)
- **Runtime**: Node.js
- **UI**: React 19.2.0 with Radix UI components
- **Styling**: Tailwind CSS 4.0
- **AI SDK**: Vercel AI SDK with multiple providers
- **State Management**: React Hook Form with Zod validation

## Replit Configuration

### Development Environment
- **Port**: 5000 (frontend)
- **Host**: 0.0.0.0 (configured for Replit proxy)
- **Dev Command**: `npm run dev` (runs Next.js with `-H 0.0.0.0 -p 5000`)

### Deployment Configuration
- **Type**: Autoscale (stateless website)
- **Build**: `npm run build`
- **Run**: `npm run start`

### Workflow
The project has one workflow configured:
- **Next.js Dev Server**: Runs the development server on port 5000

## Environment Variables Required

The application requires the following API keys (configured via Replit Secrets):

### Required
- `OPENAI_API_KEY` - For AI model and content moderation

### Optional
- `EXA_API_KEY` - For web search functionality
- `PINECONE_API_KEY` - For vector database search
- `FIREWORKS_API_KEY` - For alternative AI models

## Project Structure

```
myAI3/
├── app/                    # Next.js app directory
│   ├── api/chat/          # Chat API endpoint and tools
│   ├── page.tsx           # Main chat interface
│   ├── parts/             # UI component parts
│   └── terms/             # Terms of Use page
├── components/            # React components
│   ├── ai-elements/      # AI-specific components
│   ├── messages/         # Message display components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
├── types/                # TypeScript definitions
├── config.ts             # Main configuration file
├── prompts.ts            # AI behavior configuration
└── package.json          # Dependencies
```

## Key Configuration Files

### `config.ts`
Main application configuration including:
- AI model selection
- AI name and owner
- Welcome messages
- Moderation messages
- Pinecone settings

### `prompts.ts`
AI behavior and prompt engineering:
- System prompts
- Tool calling instructions
- Tone and style guidelines
- Citation rules

## Customization

Most customization can be done in two files:
1. **`config.ts`** - Change AI identity, model, messages
2. **`prompts.ts`** - Adjust AI behavior and responses

## Recent Changes (Project Import)

- Installed all npm dependencies
- Configured Next.js dev server to run on 0.0.0.0:5000 for Replit environment
- Set up workflow for Next.js Dev Server
- Configured deployment for autoscale with build and start scripts
- Verified application loads successfully in Replit

## Notes

- The application uses local storage to persist chat history
- Hydration warnings are expected due to time-based content (Date.now())
- All API keys should be configured as Replit Secrets
- The application is designed for Vercel deployment but works in Replit
