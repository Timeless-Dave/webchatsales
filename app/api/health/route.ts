export const runtime = 'nodejs';

export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      service: 'WebChatSales',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    }
  );
}

export async function HEAD() {
  return new Response(null, { status: 200, headers: { 'Cache-Control': 'no-store' } });
}
