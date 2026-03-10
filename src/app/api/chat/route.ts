import { NextRequest, NextResponse } from "next/server";
import { chatWithRAG } from "@/lib/rag";

export async function POST(req: NextRequest) {
  // Temporarily disabled
  return NextResponse.json(
    { reply: "AI Assistant는 현재 준비 중입니다. 곧 만나보실 수 있습니다.", sources: [] }
  );

  try {
    const body = await req.json();
    const { messages } = body as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    const { reply, sources } = await chatWithRAG(messages);
    return NextResponse.json({ reply, sources });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
