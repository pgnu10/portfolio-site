import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface RagEntry {
  text: string;
  source: string;
  embedding: number[];
}

let _index: RagEntry[] | null = null;

function getIndex(): RagEntry[] {
  if (_index) return _index;
  try {
    const filePath = path.join(process.cwd(), "src/lib/rag-index.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    _index = JSON.parse(raw) as RagEntry[];
    return _index;
  } catch {
    console.warn("RAG index not found. Run: node scripts/build-rag-index.mjs");
    return [];
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function retrieveContext(query: string, topK = 8): Promise<string> {
  const index = getIndex();
  if (index.length === 0) return "";

  const resp = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });
  const queryEmbedding = resp.data[0].embedding;

  const scored = index.map((entry) => ({
    ...entry,
    score: cosineSimilarity(queryEmbedding, entry.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  const topResults = scored.slice(0, topK);

  return topResults
    .map((r) => `[Source: ${r.source}]\n${r.text}`)
    .join("\n\n---\n\n");
}

export async function chatWithRAG(
  messages: { role: "user" | "assistant"; content: string }[]
): Promise<{ reply: string; sources: string[] }> {
  const lastUserMsg = messages.filter((m) => m.role === "user").pop();
  const { context, projectSlugs } = lastUserMsg
    ? await retrieveContextWithSources(lastUserMsg.content)
    : { context: "", projectSlugs: [] };

  const systemPrompt = `You are a helpful portfolio assistant for 박건우 (GeonU Park), a Data Scientist who worked at mAy-I Inc. as DA Team Lead for 3+ years.

His 13 projects include: LG Store Analytics (60+ stores), KPI Anomaly Detection, LLM Market Analysis Automation, Samsung D2C, Shinsegae Department Store, Hyundai Department Store, Dashboard Templates, Trajectory Analysis Pipeline, DA Pipeline, Model Evaluation Benchmark, Streamlit Dashboards, LG Calibration Framework, and DA Team Setup.

Tech stack: Python, Pandas, Streamlit, LLM (GPT-4.1, o3-mini, Perplexity sonar-pro), RAG, EWMA, Ridge Regression.

Below is retrieved context from his portfolio. Use it along with the summary above to answer the user's question in Korean. Use markdown formatting (bold, lists, etc.) for readability. Include specific numbers and project names. If the question is completely unrelated to his career (e.g. cooking recipes), politely decline.

--- Retrieved Context ---
${context || "(no results)"}
--- End Context ---`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
    temperature: 0.3,
    max_tokens: 1024,
  });

  return {
    reply: response.choices[0].message.content ?? "",
    sources: projectSlugs,
  };
}

async function retrieveContextWithSources(
  query: string,
  topK = 8
): Promise<{ context: string; projectSlugs: string[] }> {
  const index = getIndex();
  if (index.length === 0) return { context: "", projectSlugs: [] };

  const resp = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });
  const queryEmbedding = resp.data[0].embedding;

  const scored = index.map((entry) => ({
    ...entry,
    score: cosineSimilarity(queryEmbedding, entry.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  const topResults = scored.slice(0, topK);

  const context = topResults
    .map((r) => `[Source: ${r.source}]\n${r.text}`)
    .join("\n\n---\n\n");

  // Extract unique project slugs from sources
  const slugs = new Set<string>();
  for (const r of topResults) {
    const match = r.source.match(/^project:(.+)$/);
    if (match) slugs.add(match[1]);
  }

  return { context, projectSlugs: [...slugs] };
}
