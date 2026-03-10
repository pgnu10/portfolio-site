import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="text-sm font-mono text-accent mb-4 tracking-wide">
          Data Scientist
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
          비즈니스 의사결정에 필요한
          <br />
          질문을 정의하고,{" "}
          <span className="text-accent">숫자로 답합니다.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
          오프라인 리테일 매장 방문객 행동 분석 SaaS 플랫폼에서 3년간 LG전자,
          삼성전자, 현대백화점 등 대형 고객사의 데이터 분석과 인사이트 전달을
          리드했습니다. 모호한 비즈니스 니즈를 구조화된 분석 프레임워크로 변환하고,
          End-to-End 분석 파이프라인을 설계하여 고객사의 의사결정을
          지원합니다.
        </p>

        {/* Core competencies */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            "문제 정의 & 프레임워크 설계",
            "End-to-End 분석 파이프라인",
            "KPI/지표 설계",
            "데이터 스토리텔링",
            "LLM/프롬프트 엔지니어링",
            "팀 빌딩 (0 to 3)",
          ].map((skill) => (
            <span
              key={skill}
              className="text-sm px-3 py-1.5 rounded-full border border-border text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/resume"
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
      </section>

      {/* Featured Projects */}
      <section className="pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-sm text-accent hover:underline"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="pb-20">
        <h2 className="text-2xl font-bold mb-6">At a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "3+", label: "Years Experience", desc: "오프라인 리테일 분석" },
            { value: "15+", label: "Client Projects", desc: "LG, 삼성, 현대, 신세계" },
            { value: "13", label: "End-to-End Projects", desc: "파이프라인 설계부터 전달까지" },
            { value: "60+", label: "Stores Managed", desc: "전국 매장 데이터 분석" },
          ].map(({ value, label, desc }) => (
            <div key={label} className="rounded-lg border border-border bg-card p-4">
              <div className="text-2xl font-bold font-mono text-accent">
                {value}
              </div>
              <div className="text-sm font-medium mt-1">{label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
