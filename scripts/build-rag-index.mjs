/**
 * Build RAG index: read all MDX + normalized sources, chunk them,
 * generate embeddings via text-embedding-3-small, save as JSON.
 *
 * Usage: node scripts/build-rag-index.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const NORMALIZED = path.resolve(ROOT, "../../normalized");
const CONTENT = path.resolve(ROOT, "content/projects");
const OUTPUT = path.resolve(ROOT, "src/lib/rag-index.json");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- Chunking ---

function stripJsx(text) {
  // Remove JSX/HTML blocks like <div ...>...</div>, <MetricHighlight ... />
  return text
    .replace(/<div[\s\S]*?<\/div>/g, "")
    .replace(/<[A-Z][a-zA-Z]*\s[^>]*\/>/g, "")
    .replace(/<[a-z][^>]*>/g, "")
    .replace(/<\/[a-z]+>/g, "")
    .replace(/className="[^"]*"/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function chunkText(text, source, maxTokens = 500) {
  const cleaned = stripJsx(text);
  const paragraphs = cleaned.split(/\n{2,}/);
  const chunks = [];
  let current = "";

  for (const p of paragraphs) {
    const trimmed = p.trim();
    if (!trimmed) continue;

    // Rough token estimate: 1 Korean char ≈ 1.5 tokens, 1 English word ≈ 1.3 tokens
    const estimate = trimmed.length * 0.7;

    if (current && (current.length * 0.7 + estimate) > maxTokens) {
      chunks.push({ text: current.trim(), source });
      current = trimmed;
    } else {
      current += (current ? "\n\n" : "") + trimmed;
    }
  }
  if (current.trim()) {
    chunks.push({ text: current.trim(), source });
  }
  return chunks;
}

// --- Collect sources ---

function collectSources() {
  const chunks = [];

  // 1. MDX files (strip frontmatter)
  const mdxFiles = fs.readdirSync(CONTENT).filter((f) => f.endsWith(".mdx") && !f.startsWith("HIDDEN_"));
  for (const file of mdxFiles) {
    const raw = fs.readFileSync(path.join(CONTENT, file), "utf-8");
    const content = raw.replace(/^---[\s\S]*?---\n*/, ""); // strip frontmatter
    const slug = file.replace(".mdx", "");
    chunks.push(...chunkText(content, `project:${slug}`));
  }

  // 2. Normalized project overviews and roles
  if (fs.existsSync(NORMALIZED)) {
    const projDir = path.join(NORMALIZED, "projects");
    if (fs.existsSync(projDir)) {
      for (const dir of fs.readdirSync(projDir)) {
        const full = path.join(projDir, dir);
        if (!fs.statSync(full).isDirectory()) continue;

        for (const fname of ["overview.md", "my_role.md"]) {
          const fp = path.join(full, fname);
          if (fs.existsSync(fp)) {
            const text = fs.readFileSync(fp, "utf-8");
            chunks.push(...chunkText(text, `normalized:${dir}/${fname}`));
          }
        }
      }
    }

    // 3. Career description
    const careerFile = path.join(NORMALIZED, "career/base_career_description.md");
    if (fs.existsSync(careerFile)) {
      const text = fs.readFileSync(careerFile, "utf-8");
      chunks.push(...chunkText(text, "career:base_description"));
    }

    // 4. Project index
    const indexFile = path.join(NORMALIZED, "career/project_index_for_agent.md");
    if (fs.existsSync(indexFile)) {
      const text = fs.readFileSync(indexFile, "utf-8");
      chunks.push(...chunkText(text, "career:project_index"));
    }

    // 5. Strengths/weaknesses
    const swFile = path.join(NORMALIZED, "strengths_weaknesses.md");
    if (fs.existsSync(swFile)) {
      const text = fs.readFileSync(swFile, "utf-8");
      chunks.push(...chunkText(text, "career:strengths_weaknesses"));
    }
  }

  return chunks;
}

// --- Embedding ---

async function embedChunks(chunks) {
  const BATCH_SIZE = 100;
  const allEmbeddings = [];

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map((c) => c.text.slice(0, 8000)); // safety limit

    console.log(`Embedding batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)} (${texts.length} chunks)...`);

    const resp = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts,
    });

    for (let j = 0; j < resp.data.length; j++) {
      allEmbeddings.push({
        text: batch[j].text,
        source: batch[j].source,
        embedding: resp.data[j].embedding,
      });
    }
  }

  return allEmbeddings;
}

// --- Main ---

async function main() {
  console.log("Collecting sources...");
  const chunks = collectSources();
  console.log(`Found ${chunks.length} chunks.`);

  console.log("Generating embeddings (text-embedding-3-small)...");
  const indexed = await embedChunks(chunks);

  fs.writeFileSync(OUTPUT, JSON.stringify(indexed));
  const sizeMB = (fs.statSync(OUTPUT).size / 1024 / 1024).toFixed(2);
  console.log(`Done. Wrote ${indexed.length} vectors to ${OUTPUT} (${sizeMB} MB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
