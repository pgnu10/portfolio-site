import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { ChatInterface } from "@/components/ChatInterface";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "Portfolio RAG chatbot",
};

export default async function AIDemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">{t.ai.title}</h1>
      <p className="text-muted-foreground mb-8">
        {t.ai.desc}
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {t.ai.suggestions.map((q: string) => (
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
