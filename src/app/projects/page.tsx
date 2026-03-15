import { getAllProjects } from "@/lib/projects";
import { ProjectFilter } from "@/components/ProjectFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "데이터 분석 프로젝트 포트폴리오",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Projects</h1>
      <p className="text-muted-foreground mb-10">
        직접 수행한 End-to-End 데이터 분석 프로젝트 중 주요 케이스 스터디입니다.
      </p>
      <ProjectFilter projects={projects} />
    </div>
  );
}
