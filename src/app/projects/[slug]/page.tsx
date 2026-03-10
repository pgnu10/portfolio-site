import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { MdxRenderer } from "@/components/MdxRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.meta.title,
    description: project.meta.tldr,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-8">
        <Link href="/projects" className="hover:text-foreground transition-colors">
          Projects
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

      {/* TL;DR */}
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-5 mb-10">
        <p className="text-xs font-mono text-accent uppercase tracking-wide mb-2">
          TL;DR
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
          href="/projects"
          className="text-sm text-accent hover:underline"
        >
          &larr; Back to all projects
        </Link>
      </div>
    </div>
  );
}
