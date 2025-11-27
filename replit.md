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

## Recent Changes

### Critical Fixes for Interactive Components (Latest)
- **Fixed dropdown rendering**: Updated JSON parsing in assistant-message.tsx to properly detect and render interactive components
- **Made MCQs conditional**: Updated prompts to specify MCQs should be used selectively for conceptual questions, not mandatory for all
- **CV-based interview flow**: Enhanced prompts with explicit CV-based interview instructions - users no longer skip to domain-specific after CV upload
- **Feedback dashboard rendering**: Fixed feedback component to properly parse JSON format and display visual charts instead of text
- **JSON format specifications**: Added comprehensive prompt instructions for AI to output correct JSON formats:
  - domain_topic_selector: For domain/topic selection dropdowns
  - mcq: For multiple-choice questions with 4 options
  - feedback: For performance metrics dashboard with charts
- **Fixed TypeScript errors**: Resolved optional field handling in feedback component
- **Improved component flexibility**: Made feedback metrics optional fields to handle various interview types

### Previous: MCQ Questions & Performance Dashboard
- Implemented MCQ questions with radio button options for user selection
- Created comprehensive feedback dashboard with summary cards, pie charts, bar charts
- Built PDF report generator using jsPDF and html2canvas
- Integrated MCQ and feedback components into chat message renderer

### CV-Based & Domain-Specific Interview Modes
- Added interview type selection screen with two options: CV-Based and Domain-Specific
- Implemented CV upload component with drag-and-drop support (PDF/JPG/PNG up to 10MB)
- Created persistent CV storage using localStorage for future use
- Added interview mode switcher buttons that appear during conversation
- Users can seamlessly switch between CV-based and domain-specific interviews
- When CV is uploaded, it's stored with metadata for future reference
- CV upload sends context to AI for personalized questioning
- Beautiful UI with glassmorphic design matching existing theme

### Domain/Topic Selector
- Created beautiful dropdown-based domain selector with glassmorphic design
- Implemented cascading topic selector that appears after domain selection
- Added smooth animations and transitions for selecting workflow
- Integrated with chat system to send domain/topic selections
- Styled with matching deep space theme and accent colors (sky-blue for domain, orange for topic)
- Added visual feedback (emerald indicator dots) for completed selections
- Implemented "Start Interview" button with gradient and glow effects
- Added helpful info messages and smooth reveal animations

### UI Redesign
- Implemented premium "Deep Space" dark theme with navy gradient background
- Added glassmorphic (frosted glass) effects throughout the interface
- Enhanced header with floating pill design, avatar glow ring, and online indicator
- Redesigned user messages with glass-effect bubbles and gradient borders
- Polished assistant messages with fade-in animations and improved typography
- Styled tool calls with color-coded states (sky-blue for in-progress, emerald for complete)
- Added violet-themed reasoning blocks with collapsible panels
- Created animated gradient send button with hover effects
- Improved accessibility with enhanced text contrast ratios
- Added smooth animations: fade-in, slide-up, pulse effects

### Design Tokens
- Primary accent: Sky blue (#38bdf8)
- Secondary accent: Orange (#f97316)
- Background: Deep space gradient (oklch dark navy)
- Glass effects: backdrop-blur-xl with translucent backgrounds

### Project Import
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
