"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const PROJECT_LABELS: Record<string, string> = {
  "lg-store-analytics": "LG전자 매장 분석",
  "kpi-anomaly-detection": "KPI 이상치 탐지",
  "llm-market-analysis": "LLM 상권 분석 자동화",
  "lg-calibration-framework": "LG Calibration Framework",
  "dashboard-template": "대시보드 템플릿",
  "shinsegae-analysis": "신세계백화점 분석",
  "samsung-d2c-analysis": "삼성전자 D2C 분석",
  "da-team-setup": "DA 팀 세팅",
  "streamlit-dashboard": "Streamlit 대시보드",
  "trajectory-analysis": "동선 분석 파이프라인",
  "model-eval-benchmark": "모델 평가 벤치마크",
  "da-pipeline": "범용 DA 파이프라인",
  "hyundai-department-store": "현대백화점 분석",
  "portfolio-rag-chatbot": "포트폴리오 AI Assistant",
};

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-suggestion]");
      if (target) {
        const suggestion = target.getAttribute("data-suggestion");
        if (suggestion) {
          setInput(suggestion);
          inputRef.current?.focus();
        }
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.reply,
          sources: data.sources,
        },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Messages */}
      <div className="h-[520px] overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            위 질문을 클릭하거나 직접 입력해보세요.
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] ${msg.role === "user" ? "" : "w-full max-w-[85%]"}`}>
              <div
                className={`rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <div className="chat-markdown">
                    <ReactMarkdown
                      components={{
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4 my-1.5 space-y-0.5">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-4 my-1.5 space-y-0.5">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="leading-relaxed">{children}</li>
                        ),
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                        code: ({ children }) => (
                          <code className="text-xs px-1.5 py-0.5 rounded bg-background/50 font-mono">
                            {children}
                          </code>
                        ),
                        h3: ({ children }) => (
                          <h3 className="font-semibold mt-3 mb-1">{children}</h3>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Related project links */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-xs text-muted-foreground py-1">관련 프로젝트:</span>
                  {msg.sources.map((slug) => (
                    <Link
                      key={slug}
                      href={`/projects/${slug}`}
                      target="_blank"
                      className="text-xs px-2.5 py-1 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                    >
                      {PROJECT_LABELS[slug] || slug}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-3 text-sm text-muted-foreground">
              <span className="inline-flex gap-1">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-border p-4 flex gap-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="포트폴리오에 대해 질문하세요..."
          disabled={loading}
          className="flex-1 rounded-md border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
