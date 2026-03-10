import type { Metadata } from "next";
import { ChatInterface } from "@/components/ChatInterface";

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "박건우 포트폴리오 RAG 챗봇",
};

export default function AIDemoPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
      <p className="text-muted-foreground mb-8">
        포트폴리오에 대해 무엇이든 물어보세요. 13개 프로젝트와 경력 정보를 기반으로 답변합니다.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          "박건우는 어떤 프로젝트를 했나요?",
          "LG전자 프로젝트의 핵심 성과는?",
          "LLM을 활용한 경험이 있나요?",
          "이상치 탐지 시스템은 어떻게 설계했나요?",
          "DA 팀을 어떻게 빌딩했나요?",
          "가장 자신 있는 기술 스택은?",
        ].map((q) => (
          <button
            key={q}
            className="text-left text-sm px-4 py-3 rounded-lg border border-border bg-card hover:border-accent/40 hover:bg-accent/5 transition-colors text-muted-foreground"
            data-suggestion={q}
          >
            {q}
          </button>
        ))}
      </div>

      <ChatInterface />
    </div>
  );
}
