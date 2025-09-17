export const runtime = 'nodejs';

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}));
    const { messages } = body as { messages?: Array<{ role: string; content: string }>; };

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing messages array' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Server missing GEMINI_API_KEY' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // Convert messages to Gemini format and add sales-focused system prompt
    const systemPrompt = {
      role: 'user',
      parts: [{ text: `You are a professional sales assistant for WebChatSales. Your role is to help potential customers with their inquiries, provide product recommendations, answer questions about services, and guide them through the sales process. 

IMPORTANT: Format your responses using Markdown for better readability:
- Use **bold text** for important points and product names
- Use *italics* for emphasis and quotes
- Use bullet points (- or *) for lists
- Use numbered lists (1., 2., 3.) for steps or features
- Use \`code\` formatting for technical terms, prices, or product codes
- Use > blockquotes for testimonials or important callouts
- Use tables for comparing products or pricing
- Use headers (##) to organize information

Be helpful, informative, and focus on understanding their needs to provide the best solutions. Keep responses concise but comprehensive, and always use proper formatting to make information easy to scan and understand.` }]
    };

    const geminiMessages = [
      systemPrompt,
      ...messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }))
    ];

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: 'Upstream error', status: response.status, details: errText }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    const data = await response.json();
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return new Response(JSON.stringify({ content }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
