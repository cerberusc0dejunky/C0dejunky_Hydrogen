import { json } from 'react-router';
import type { Route } from './+types/api.ai.chat';

/**
 * AI Chat API Route
 * Handles AI interactions - connects to your AI service
 * IMPORTANT: API keys stay on the server, never exposed to client
 */

export async function action({ request, context }: Route.ActionArgs) {
    const { env } = context;

    try {
        const { message } = await request.json();

        // Validate input
        if (!message || typeof message !== 'string') {
            return json({ error: 'Invalid message' }, { status: 400 });
        }

        // TODO: Replace with your actual AI service
        // Examples below for different AI providers

        // ===== OPTION 1: OpenAI GPT-4 =====
        /*
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.PRIVATE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4-turbo-preview',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful shopping assistant for an online store. Help customers find products, answer questions, and provide recommendations.',
              },
              {
                role: 'user',
                content: message,
              },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });
    
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        */

        // ===== OPTION 2: Anthropic Claude =====
        /*
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.PRIVATE_ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 500,
            messages: [{
              role: 'user',
              content: message,
            }],
            system: 'You are a helpful shopping assistant for an online store.',
          }),
        });
    
        const data = await response.json();
        const aiResponse = data.content[0].text;
        */

        // ===== OPTION 3: Custom AI Endpoint =====
        /*
        const response = await fetch(env.PRIVATE_AI_ENDPOINT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.PRIVATE_AI_API_KEY}`,
          },
          body: JSON.stringify({
            query: message,
            context: 'shopping_assistant',
          }),
        });
    
        const data = await response.json();
        const aiResponse = data.response;
        */

        // ===== TEMPORARY MOCK RESPONSE (for testing) =====
        // Remove this when you connect to a real AI service
        const aiResponse = `I received your message: "${message}". I'm a placeholder response - connect me to your actual AI service by editing app/routes/api.ai.chat.tsx`;

        return json({
            response: aiResponse,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error('AI Chat Error:', error);
        return json(
            {
                error: 'Sorry, I encountered an error processing your request. Please try again.',
            },
            { status: 500 }
        );
    }
}

// Optional: Add rate limiting
/*
const rateLimiter = new Map<string, {count: number; resetAt: number}>();

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const limit = rateLimiter.get(userId);

  if (!limit || now > limit.resetAt) {
    rateLimiter.set(userId, {
      count: 1,
      resetAt: now + 60000, // 1 minute window
    });
    return true;
  }

  if (limit.count >= 10) { // Max 10 requests per minute
    return false;
  }

  limit.count++;
  return true;
}
