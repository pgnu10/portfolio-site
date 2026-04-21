import { getAllProjects } from "@/lib/projects";
import { ProjectFilter } from "@/components/ProjectFilter";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Data analysis project portfolio",
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  const projects = getAllProjects(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">{t.projects.title}</h1>
      <p className="text-muted-foreground mb-10">
        {t.projects.desc}
      </p>
      <ProjectFilter projects={projects} locale={locale as Locale} />
    </div>
  );
}
