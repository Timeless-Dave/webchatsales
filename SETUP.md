# WebChatSales Setup Guide

## 🚀 Quick Start

WebChatSales is now configured to use Google's Gemini AI for intelligent sales conversations. Follow these steps to get your AI assistant up and running.

## 🔑 API Key Configuration

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" in the left sidebar
4. Create a new API key or use an existing one
5. Copy your API key (it will look like: `AIzaSy...`)

### Step 2: Add API Key to Your Environment

#### For Local Development:

1. Create a `.env.local` file in your project root:
```bash
# .env.local
GEMINI_API_KEY=your_gemini_api_key_here
```

2. Restart your development server:
```bash
npm run dev
```

#### For Production Deployment:

#### Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `GEMINI_API_KEY` with your API key value
5. Redeploy your application

#### Render:
1. Go to your Render dashboard
2. Select your service
3. Go to Environment tab
4. Add: `GEMINI_API_KEY` with your API key value
5. Redeploy your service

#### Other Platforms:
Add the environment variable `GEMINI_API_KEY` with your Gemini API key value.

## 🎯 Features Overview

### What WebChatSales Does:

- **AI-Powered Sales Assistant**: Uses Gemini AI for intelligent customer conversations
- **Rich Markdown Formatting**: Supports bold, italic, lists, tables, code blocks, and more
- **Sales-Focused Responses**: Trained to handle product recommendations, pricing, and support
- **Modern Chat Interface**: Beautiful, responsive design with real-time messaging
- **Quick Actions**: Pre-defined buttons for common sales scenarios
- **Lead Generation**: Designed to capture and qualify potential customers

### Key Components:

1. **Landing Page** (`app/page.jsx`): Professional marketing page showcasing features
2. **Chat Interface** (`app/chat/page.tsx`): Interactive chat with AI assistant
3. **API Route** (`app/api/chat/route.ts`): Backend integration with Gemini AI
4. **Health Check** (`app/api/health/route.ts`): Service status monitoring

## 🛠️ Technical Details

### AI Model Configuration:
- **Model**: `gemini-1.5-flash-latest`
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Tokens**: 1024 (optimal for chat responses)
- **System Prompt**: Sales-focused assistant persona

### Customization Options:

#### Modify the AI Personality:
Edit the system prompt in `app/api/chat/route.ts`:
```typescript
const systemPrompt = {
  role: 'user',
  parts: [{ text: `Your custom sales assistant prompt here...` }]
};
```

#### Add Quick Actions:
Modify the `quickActions` array in `app/chat/page.tsx`:
```typescript
const quickActions = [
  { label: "Your Action", prompt: "Your prompt text" },
  // Add more actions...
];
```

#### Customize Markdown Formatting:
The AI responses support full Markdown formatting including:
- **Bold text** and *italic text*
- Bullet points and numbered lists
- Code blocks with syntax highlighting
- Tables for comparisons
- Blockquotes for testimonials
- Headers for organization

The AI is instructed to use proper formatting automatically, but you can request specific formatting in your prompts.

#### Customize Styling:
The interface uses inline styles for easy customization. Key color variables:
- Primary: `#667eea` to `#764ba2` (gradient)
- Accent: `#fbbf24` (yellow)
- Success: `#10b981` (green)

## 📊 Usage Analytics

The chat interface includes:
- Message history tracking
- Loading states with animations
- Error handling and user feedback
- Responsive design for all devices

## 🔧 Troubleshooting

### Common Issues:

1. **"Server missing GEMINI_API_KEY" error**:
   - Ensure your API key is correctly set in environment variables
   - Restart your development server after adding the key
   - Check that the key starts with "AIzaSy"

2. **Chat not responding**:
   - Check your internet connection
   - Verify the API key has proper permissions
   - Check browser console for error messages

3. **Styling issues**:
   - Clear browser cache
   - Ensure you're using a modern browser
   - Check for JavaScript errors in console

### Getting Help:

- Check the [Gemini API Documentation](https://ai.google.dev/docs)
- Review error messages in browser developer tools
- Ensure your API key has sufficient quota

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] API key configured in production environment
- [ ] Test chat functionality
- [ ] Verify responsive design on mobile
- [ ] Check error handling
- [ ] Monitor API usage and costs

## 📈 Next Steps

Consider adding:
- User authentication and chat history
- Analytics dashboard
- Custom branding options
- Integration with CRM systems
- Multi-language support
- Voice chat capabilities

---

**Need help?** The WebChatSales AI assistant is designed to be your first line of support. Try asking it questions about setup, features, or customization!
