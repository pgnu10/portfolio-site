import Link from "next/link";
import type { Project } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

export function ProjectCard({ project, locale = "ko" }: { project: Project; locale?: Locale }) {
  return (
    <Link href={`/${locale}/projects/${project.slug}`} className="group block">
      <article className="rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:border-accent/40 hover:shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {project.period}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-1">{project.subtitle}</p>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.tldr}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.impact.slice(0, 2).map((item, i) => (
            <span
              key={i}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-accent/10 text-accent font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
