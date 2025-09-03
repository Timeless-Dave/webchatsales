export const runtime = 'nodejs';

export async function GET() {
return new Response(JSON.stringify({
ok: true,
service: 'WebChatSales',
timestamp: new Date().toISOString()
}), {
status: 200,
headers: { 'content-type': 'application/json' }
});
}
