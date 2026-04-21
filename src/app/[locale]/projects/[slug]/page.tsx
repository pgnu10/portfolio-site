import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { MdxRenderer } from "@/components/MdxRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { getDictionary, locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of getAllProjectSlugs(locale)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale as Locale);
  if (!project) return { title: "Not Found" };
  return {
    title: project.meta.title,
    description: project.meta.tldr,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getDictionary(locale as Locale);
  const project = getProjectBySlug(slug, locale as Locale);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-8">
        <Link href={`/${locale}/projects`} className="hover:text-foreground transition-colors">
          {t.projects.title}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{project.meta.title}</span>
      </nav>

      {/* Hero */}
      <header className="mb-10">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.meta.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          {project.meta.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          {project.meta.subtitle}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>{project.meta.period}</span>
          <span>{project.meta.company}</span>
          <span>{project.meta.role}</span>
        </div>
      </header>

      {/* Summary */}
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-5 mb-10">
        <p className="text-xs font-mono text-accent uppercase tracking-wide mb-2">
          {t.projects.summary}
        </p>
        <p className="text-sm leading-relaxed">{project.meta.tldr}</p>
      </div>

      {/* Impact metrics */}
      {project.meta.impact.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {project.meta.impact.map((item, i) => (
            <span
              key={i}
              className="text-sm font-mono px-3 py-1.5 rounded-md bg-accent/10 text-accent font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Content + TOC */}
      <div className="flex items-start gap-12">
        <article className="flex-1 min-w-0">
          <MdxRenderer source={project.content} />
        </article>
        <TableOfContents />
      </div>

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t border-border">
        <Link
          href={`/${locale}/projects`}
          className="text-sm text-accent hover:underline"
        >
          {t.projects.backToAll}
        </Link>
      </div>
    </div>
  );
}
