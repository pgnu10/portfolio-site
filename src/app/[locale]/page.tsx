import Link from "next/link";
import Image from "next/image";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  const featured = getFeaturedProjects(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-10">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-mono text-accent mb-4 tracking-wide">
              {t.home.role}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              {t.home.heroTitle1}
              <br />
              {t.home.heroTitle2}
              <span className="text-accent">{t.home.heroTitleAccent}</span>
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed mb-8">
              {t.home.heroDesc}
              <br />
              {t.home.heroDesc2}
            </p>

            {/* Core competencies */}
            <div className="flex flex-wrap gap-2">
              {t.home.competencies.map((skill: string) => (
                <span
                  key={skill}
                  className="text-sm px-3 py-1.5 rounded-full border border-border text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Profile photo + CTA */}
          <div className="flex-shrink-0 flex flex-col items-center gap-6">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-border">
              <Image
                src="/images/profile.png"
                alt={t.home.profileAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={`/${locale}/resume`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Resume
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17l9.2-9.2M17 17V7.8H7.8" />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/in/pgnu10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="mailto:afnf33@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.home.stats.map((stat: { value: string; label: string; desc: string }) => (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
              <div className="text-2xl font-bold font-mono text-accent">
                {stat.value}
              </div>
              <div className="text-sm font-medium mt-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t.home.featuredTitle}</h2>
          <Link
            href={`/${locale}/projects`}
            className="text-sm text-accent hover:underline"
          >
            {t.home.viewAll} &rarr;
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale as Locale} />
          ))}
        </div>
      </section>

    </div>
  );
}
