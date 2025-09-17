"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "intro", role: "assistant", content: `Hello! I'm your AI assistant. I can help you with:

• Product recommendations
• Pricing information  
• Technical support
• Custom solutions

What can I help you with today?` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const newUserMsg: ChatMessage = { id: String(Date.now()), role: "user", content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages.concat(newUserMsg).map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err?.error || `Request failed: ${resp.status}`);
      }

      const data = await resp.json();
      const assistantMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: data?.content ?? "(no response)",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [...prev, { id: String(Date.now() + 2), role: "assistant", content: `Error: ${message}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#fafafa" }}>
      <header style={{ 
        padding: "clamp(14px, 3vw, 18px) clamp(16px, 4vw, 24px)", 
        borderBottom: "1px solid #f0f0f0", 
        display: "flex", 
        alignItems: "center", 
        gap: 16,
        background: "white",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
      }}>
        <Link href="/" style={{ 
          textDecoration: "none", 
          color: "#666", 
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}>
          ← Back
        </Link>
        <div style={{ flex: 1, textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "clamp(14px, 3vw, 16px)", fontWeight: "500", color: "#1a1a1a", letterSpacing: "-0.01em" }}>AI Assistant</h1>
        </div>
        <div style={{ 
          width: 6, 
          height: 6, 
          borderRadius: "50%", 
          background: "#10b981",
          opacity: 0.9
        }}></div>
      </header>

      <div ref={listRef} style={{ 
        flex: 1, 
        overflowY: "auto", 
        padding: "clamp(16px, 3vw, 20px) clamp(16px, 4vw, 24px)",
        background: "#fafafa"
      }}>
        <div style={{ maxWidth: "min(640px, 100%)", margin: "0 auto", display: "grid", gap: 16 }}>
          {messages.map((m) => (
            <div key={m.id} style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-start",
              gap: 10,
            }}>
              {m.role === "assistant" && (
                <div style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 11,
                  fontWeight: "500",
                  flexShrink: 0,
                  marginTop: 1
                }}>
                  AI
                </div>
              )}
              <div style={{
                background: m.role === "user" ? "#1a1a1a" : "white",
                color: m.role === "user" ? "white" : "#2a2a2a",
                padding: m.role === "user" ? "clamp(8px, 2vw, 10px) clamp(12px, 2.5vw, 14px)" : "clamp(12px, 2.5vw, 14px) clamp(16px, 3vw, 18px)",
                borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                boxShadow: m.role === "user" ? "0 1px 2px rgba(0,0,0,0.08)" : "0 1px 2px rgba(0,0,0,0.04)",
                maxWidth: "min(75%, 320px)",
                lineHeight: "1.5",
                fontSize: "clamp(13px, 2.5vw, 14px)",
                border: m.role === "assistant" ? "1px solid #f0f0f0" : "none"
              }}>
                {m.role === "assistant" ? (
                  <div className="markdown-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    components={{
                      p: ({ children }) => <p style={{ margin: "0 0 10px 0", lineHeight: "1.5", color: "#2a2a2a" }}>{children}</p>,
                      ul: ({ children }) => <ul style={{ margin: "6px 0", paddingLeft: "16px" }}>{children}</ul>,
                      ol: ({ children }) => <ol style={{ margin: "6px 0", paddingLeft: "16px" }}>{children}</ol>,
                      li: ({ children }) => <li style={{ margin: "4px 0", lineHeight: "1.5", color: "#2a2a2a" }}>{children}</li>,
                      strong: ({ children }) => <strong style={{ fontWeight: "600", color: "#1a1a1a" }}>{children}</strong>,
                      em: ({ children }) => <em style={{ fontStyle: "italic", color: "#4a4a4a" }}>{children}</em>,
                      code: ({ children, className }) => (
                        <code 
                          className={className}
                          style={{ 
                            background: "#f5f5f5", 
                            padding: "3px 6px", 
                            borderRadius: "4px", 
                            fontSize: "13px",
                            fontFamily: "Monaco, Consolas, 'Courier New', monospace",
                            color: "#2a2a2a",
                            border: "1px solid #e8e8e8"
                          }}
                        >
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre style={{ 
                          background: "#fafafa", 
                          padding: "12px", 
                          borderRadius: "6px", 
                          overflow: "auto",
                          margin: "8px 0",
                          border: "1px solid #e8e8e8",
                          fontSize: "12px"
                        }}>
                          {children}
                        </pre>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote style={{ 
                          borderLeft: "3px solid #d1d5db", 
                          paddingLeft: "12px", 
                          margin: "8px 0",
                          fontStyle: "italic",
                          color: "#6a6a6a",
                          background: "#f9f9f9",
                          padding: "8px 12px",
                          borderRadius: "0 4px 4px 0"
                        }}>
                          {children}
                        </blockquote>
                      ),
                      h1: ({ children }) => <h1 style={{ fontSize: "16px", fontWeight: "600", margin: "12px 0 6px 0", color: "#1a1a1a" }}>{children}</h1>,
                      h2: ({ children }) => <h2 style={{ fontSize: "15px", fontWeight: "600", margin: "10px 0 4px 0", color: "#1a1a1a" }}>{children}</h2>,
                      h3: ({ children }) => <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "8px 0 3px 0", color: "#1a1a1a" }}>{children}</h3>,
                      table: ({ children }) => (
                        <table style={{ 
                          borderCollapse: "collapse", 
                          width: "100%", 
                          margin: "8px 0",
                          border: "1px solid #e8e8e8",
                          borderRadius: "4px",
                          overflow: "hidden"
                        }}>
                          {children}
                        </table>
                      ),
                      th: ({ children }) => (
                        <th style={{ 
                          border: "1px solid #e8e8e8", 
                          padding: "8px 10px", 
                          background: "#f8f8f8",
                          fontWeight: "500",
                          textAlign: "left",
                          fontSize: "13px"
                        }}>
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td style={{ 
                          border: "1px solid #e8e8e8", 
                          padding: "8px 10px",
                          fontSize: "13px"
                        }}>
                          {children}
                        </td>
                      ),
                      a: ({ children, href }) => (
                        <a 
                          href={href} 
                          style={{ 
                            color: "#1a1a1a", 
                            textDecoration: "underline",
                            fontWeight: "500"
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      hr: () => <hr style={{ border: "none", borderTop: "1px solid #e8e8e8", margin: "12px 0" }} />
                    }}
                    >
              {m.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <span style={{ whiteSpace: "pre-wrap" }}>{m.content}</span>
                )}
              </div>
              {m.role === "user" && (
                <div style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 11,
                  fontWeight: "500",
                  flexShrink: 0,
                  marginTop: 1
                }}>
                  👤
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: 10 }}>
              <div style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 11,
                fontWeight: "500",
                flexShrink: 0,
                marginTop: 1
              }}>
                AI
              </div>
              <div style={{
                background: "white",
                padding: "14px 18px",
                borderRadius: "18px 18px 18px 4px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                border: "1px solid #f0f0f0",
                display: "flex",
                alignItems: "center",
                gap: 10
              }}>
                <div style={{ display: "flex", gap: 3 }}>
                  <div style={{ width: 3, height: 3, background: "#1a1a1a", borderRadius: "50%", animation: "bounce 1.4s infinite" }}></div>
                  <div style={{ width: 3, height: 3, background: "#1a1a1a", borderRadius: "50%", animation: "bounce 1.4s infinite 0.2s" }}></div>
                  <div style={{ width: 3, height: 3, background: "#1a1a1a", borderRadius: "50%", animation: "bounce 1.4s infinite 0.4s" }}></div>
                </div>
                <span style={{ color: "#6a6a6a", fontSize: "13px" }}>Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ 
        padding: "clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)", 
        borderTop: "1px solid #f0f0f0",
        background: "white"
      }}>
        <form onSubmit={sendMessage} style={{ 
          display: "flex", 
          gap: 8, 
          maxWidth: "min(640px, 100%)",
          margin: "0 auto",
          alignItems: "flex-end"
        }}>
          <div style={{ flex: 1, position: "relative" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
              placeholder={loading ? "AI is responding..." : "Type your message..."}
              style={{ 
                width: "100%",
                padding: "clamp(10px, 2.5vw, 12px) clamp(14px, 3vw, 16px)", 
                border: "1px solid #e8e8e8", 
                borderRadius: 10,
                fontSize: "clamp(13px, 2.5vw, 14px)",
                outline: "none",
                transition: "all 0.2s",
                background: "#fafafa",
                resize: "none",
                fontFamily: "inherit",
                lineHeight: "1.4"
              }}
          disabled={loading}
              onFocus={(e) => {
                e.target.style.borderColor = "#1a1a1a";
                e.target.style.background = "white";
                e.target.style.boxShadow = "0 0 0 3px rgba(26, 26, 26, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e8e8e8";
                e.target.style.background = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || !input.trim()} 
            style={{ 
              padding: "clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 14px)", 
              borderRadius: 10, 
              background: loading || !input.trim() ? "#f0f0f0" : "#1a1a1a", 
              color: loading || !input.trim() ? "#999" : "white",
              border: "none",
              fontWeight: "500",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              minWidth: "clamp(45px, 8vw, 50px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(13px, 2.5vw, 14px)"
            }}
          >
            {loading ? (
              <div style={{ width: 14, height: 14, border: "2px solid #999", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
            ) : (
              "→"
            )}
        </button>
      </form>
      </div>

      <style jsx global>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Syntax highlighting styles */
        .hljs {
          background: #fafafa !important;
          color: #2a2a2a !important;
          border-radius: 8px;
          padding: 16px;
          margin: 12px 0;
          overflow-x: auto;
          font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
          font-size: 13px;
          line-height: 1.4;
          border: 1px solid #e8e8e8;
        }
        
        .hljs-keyword { color: #7c3aed !important; }
        .hljs-string { color: #059669 !important; }
        .hljs-number { color: #dc2626 !important; }
        .hljs-comment { color: #6b7280 !important; font-style: italic; }
        .hljs-function { color: #2563eb !important; }
        .hljs-variable { color: #ea580c !important; }
        .hljs-built_in { color: #7c2d12 !important; }
        
        /* Ensure proper spacing for markdown elements */
        .markdown-content h1:first-child,
        .markdown-content h2:first-child,
        .markdown-content h3:first-child {
          margin-top: 0;
        }
        
        .markdown-content p:last-child {
          margin-bottom: 0;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #d1d1d1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .markdown-content h1,
          .markdown-content h2,
          .markdown-content h3 {
            font-size: 14px !important;
            margin: 8px 0 4px 0 !important;
          }
          
          .markdown-content p {
            font-size: 13px !important;
            margin: 0 0 8px 0 !important;
          }
          
          .markdown-content ul,
          .markdown-content ol {
            padding-left: 16px !important;
          }
          
          .markdown-content li {
            font-size: 13px !important;
            margin: 3px 0 !important;
          }
          
          .markdown-content code {
            font-size: 11px !important;
            padding: 2px 4px !important;
          }
          
          .markdown-content pre {
            font-size: 11px !important;
            padding: 8px !important;
            margin: 6px 0 !important;
          }
          
          .markdown-content table {
            font-size: 11px !important;
          }
          
          .markdown-content th,
          .markdown-content td {
            padding: 6px 8px !important;
          }
        }
        
        /* Touch-friendly interactions */
        @media (hover: none) and (pointer: coarse) {
          button:hover {
            transform: none !important;
          }
          
          input:focus {
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}
