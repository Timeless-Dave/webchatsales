export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        padding: '20px 40px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>WebChatSales</h1>
          <a href="/chat" style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            Try AI Assistant
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '60px 40px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              margin: '0 0 20px 0',
              lineHeight: '1.1'
            }}>
              AI-Powered Sales
              <br />
              <span style={{ color: '#fbbf24' }}>Chat Assistant</span>
            </h2>
            <p style={{
              fontSize: '20px',
              margin: '0 0 30px 0',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              Transform your online sales with intelligent AI that helps customers find the perfect products, 
              answers questions instantly, and guides them through every step of their journey.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '40px'
            }}>
              <a href="/chat" style={{
                background: 'white',
                color: '#667eea',
                padding: '15px 30px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                Start Chatting →
              </a>
              <a href="#features" style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s'
              }}>
                Learn More
              </a>
            </div>
            <div style={{
              display: 'flex',
              gap: '30px',
              fontSize: '14px',
              opacity: 0.8
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🤖</span>
                <span>AI-Powered</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>⚡</span>
                <span>Instant Responses</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🎯</span>
                <span>Sales Focused</span>
              </div>
            </div>
          </div>

          {/* Chat Preview */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '20px',
              color: '#374151',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  AI
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>WebChatSales Assistant</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Online • Ready to help</div>
                </div>
              </div>
              <div style={{
                background: '#f8fafc',
                padding: '15px',
                borderRadius: '12px',
                marginBottom: '15px',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                👋 Hi! I can help you with product recommendations, pricing, and finding the perfect solution for your needs. What are you looking for today?
              </div>
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                <input 
                  placeholder="Type your message..." 
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '20px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  disabled
                />
                <button style={{
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '60px 40px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: '700',
            textAlign: 'center',
            margin: '0 0 50px 0'
          }}>
            Why Choose WebChatSales?
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {[
              {
                icon: '🎯',
                title: 'Sales-Optimized',
                description: 'AI trained specifically for sales conversations, product recommendations, and customer guidance.'
              },
              {
                icon: '⚡',
                title: 'Instant Responses',
                description: 'Get immediate answers to customer questions 24/7, reducing response time and improving satisfaction.'
              },
              {
                icon: '📈',
                title: 'Lead Generation',
                description: 'Intelligently capture leads, qualify prospects, and guide customers through the sales funnel.'
              },
              {
                icon: '🔧',
                title: 'Easy Integration',
                description: 'Simple setup with your existing website or e-commerce platform in minutes.'
              },
              {
                icon: '📊',
                title: 'Analytics & Insights',
                description: 'Track conversations, measure performance, and optimize your sales strategy with detailed analytics.'
              },
              {
                icon: '🛡️',
                title: 'Secure & Reliable',
                description: 'Enterprise-grade security with 99.9% uptime guarantee for uninterrupted customer service.'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '30px',
                borderRadius: '15px',
                border: '1px solid rgba(255,255,255,0.2)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{feature.icon}</div>
                <h4 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 15px 0' }}>{feature.title}</h4>
                <p style={{ opacity: 0.9, lineHeight: '1.6', margin: 0 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '36px',
            fontWeight: '700',
            margin: '0 0 20px 0'
          }}>
            Ready to Boost Your Sales?
          </h3>
          <p style={{
            fontSize: '18px',
            opacity: 0.9,
            margin: '0 0 30px 0',
            lineHeight: '1.6'
          }}>
            Start your AI-powered sales journey today. No setup fees, no long-term contracts.
          </p>
      <a href="/chat" style={{
            background: '#fbbf24',
            color: '#1f2937',
            padding: '18px 40px',
            borderRadius: '35px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '18px',
            display: 'inline-block',
            transition: 'all 0.3s',
            boxShadow: '0 6px 20px rgba(251, 191, 36, 0.3)'
          }}>
            Try Free Demo →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '30px 40px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center',
        opacity: 0.7
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          © 2024 WebChatSales. Powered by AI for better sales experiences.
        </p>
      </footer>
    </main>
  );
}
