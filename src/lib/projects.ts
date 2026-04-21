import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project } from "./types";
import type { Locale } from "./i18n";

function getContentDir(locale: Locale = "ko") {
  const folder = locale === "ko" ? "projects" : `projects-${locale}`;
  return path.join(process.cwd(), "content", folder);
}

export function getAllProjects(locale: Locale = "ko"): Project[] {
  const dir = getContentDir(locale);
  if (!fs.existsSync(dir)) return getAllProjects("ko");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("HIDDEN_"));
  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(".mdx", ""),
      ...data,
    } as Project;
  });
  return projects.sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(locale: Locale = "ko"): Project[] {
  return getAllProjects(locale).filter((p) => p.featured);
}

export function getProjectBySlug(
  slug: string,
  locale: Locale = "ko"
): { meta: Project; content: string } | null {
  const dir = getContentDir(locale);
  let filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(getContentDir("ko"), `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: { slug, ...data } as Project,
    content,
  };
}

export function getAllProjectSlugs(locale: Locale = "ko"): string[] {
  const dir = getContentDir(locale);
  if (!fs.existsSync(dir)) return getAllProjectSlugs("ko");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("HIDDEN_"))
    .map((f) => f.replace(".mdx", ""));
}
