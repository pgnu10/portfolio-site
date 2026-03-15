"use client";

import { useState, useMemo } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      for (const tag of p.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [projects]);

  const filtered = useMemo(() => {
    if (selectedTags.size === 0) return projects;
    return projects.filter((p) =>
      p.tags.some((tag) => selectedTags.has(tag))
    );
  }, [projects, selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  function clearAll() {
    setSelectedTags(new Set());
  }

  return (
    <div>
      {/* Tag filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.map(([tag, count]) => {
          const active = selectedTags.has(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                active
                  ? "bg-accent text-white border-accent"
                  : "bg-transparent text-muted-foreground border-border hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {tag}
              <span className="ml-1 opacity-60">{count}</span>
            </button>
          );
        })}
        {selectedTags.size > 0 && (
          <button
            onClick={clearAll}
            className="text-sm px-3 py-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      {selectedTags.size > 0 && (
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length}개 프로젝트
        </p>
      )}

      {/* Project grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
