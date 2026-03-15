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

His 12 projects include:
1. LG Store Analytics — 엔터프라이즈 고객사 매장 분석 인사이트 리포트 (60개+ 매장, KPI 설계, 퍼널 분석)
2. KPI Anomaly Detection — KPI 이상치 탐지 시스템 (60개+ 매장, EWMA+IQR, 자동 모니터링)
3. LLM Market Analysis — LLM 기반 상권 분석 리포트 자동화 (멀티 LLM Agent Flow, RAG)
4. Hyundai Department Store — 현대백화점 복합 리테일 분석 프레임 설계 및 임원 보고
5. Samsung D2C Analysis — 엔터프라이즈 고객사 매장 KPI 설계 및 검증 체계 구축
6. Shinsegae Analysis — 신세계백화점 식품관 분석 및 전층 확장 프레임 설계
7. Trajectory Analysis — 동선 분석 모듈 설계 및 제품화
8. LG Calibration Framework — 매장 방문자 수 예측 Calibration 3-Layer 품질 관리 체계
9. Dashboard Template — mAsh 대시보드 템플릿 기획 (70+ 가설 → 5종 템플릿)
10. Streamlit Dashboard — Streamlit 기반 분석 프로토타이핑 (6종 대시보드)
11. DA Team Setup — DA 팀 세팅 및 분석 환경 구축 (0→3명 빌딩)
12. Portfolio RAG Chatbot — 포트폴리오 AI Assistant (RAG 챗봇, 이 시스템)

Tech stack: Python, Pandas, Streamlit, LLM (GPT-4.1, o3-mini, Perplexity sonar-pro), RAG, EWMA, Ridge Regression, Next.js.

Below is retrieved context from his portfolio. Use it to answer the user's question in Korean. Use markdown formatting (bold, lists, etc.) for readability. Include specific numbers and project names when available. If the question is completely unrelated to his career (e.g. cooking recipes), politely decline.

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

  // Map normalized directory names to site slugs
  const normalizedToSlug: Record<string, string> = {
    "01_lgbestshop_data_analysis": "lg-store-analytics",
    "02_lg_calibration_framework": "lg-calibration-framework",
    "03_anomaly_detection_system": "kpi-anomaly-detection",
    "04_dashboard_template": "dashboard-template",
    "05_shinsegae_analysis": "shinsegae-analysis",
    "06_samsung_analysis": "samsung-d2c-analysis",
    "07_da_team_setup": "da-team-setup",
    "08_insight_report": "llm-market-analysis",
    "09_streamlit_dashboard": "streamlit-dashboard",
    "10_trajectory_analysis": "trajectory-analysis",
    "13_hyundai_department_store": "hyundai-department-store",
  };

  // Extract unique project slugs from sources
  const slugs = new Set<string>();
  for (const r of topResults) {
    const projectMatch = r.source.match(/^project:(.+)$/);
    if (projectMatch) {
      slugs.add(projectMatch[1]);
      continue;
    }
    const normalizedMatch = r.source.match(/^normalized:([^/]+)\//);
    if (normalizedMatch && normalizedToSlug[normalizedMatch[1]]) {
      slugs.add(normalizedToSlug[normalizedMatch[1]]);
    }
  }

  return { context, projectSlugs: [...slugs] };
}
