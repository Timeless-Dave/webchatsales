export const metadata = {
  metadataBase: new URL('https://webchatsales.com'),
  title: 'WebChatSales - AI-Powered Sales Assistant',
  description: 'Transform your online sales with intelligent AI that helps customers find products, answers questions instantly, and guides them through their purchasing journey.',
  keywords: 'AI sales assistant, chatbot, customer service, sales automation, product recommendations, online sales',
  authors: [{ name: 'WebChatSales Team' }],
  creator: 'WebChatSales',
  publisher: 'WebChatSales',
  robots: 'index, follow',
  openGraph: {
    title: 'WebChatSales - AI-Powered Sales Assistant',
    description: 'Transform your online sales with intelligent AI that helps customers find products, answers questions instantly, and guides them through their purchasing journey.',
    url: 'https://webchatsales.com',
    siteName: 'WebChatSales',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WebChatSales AI Assistant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebChatSales - AI-Powered Sales Assistant',
    description: 'Transform your online sales with intelligent AI that helps customers find products, answers questions instantly, and guides them through their purchasing journey.',
    images: ['/og-image.jpg'],
    creator: '@webchatsales',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#667eea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
