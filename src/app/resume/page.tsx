import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume & Portfolio",
  description: "박건우 이력서 및 포트폴리오 PDF 다운로드",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Resume & Portfolio</h1>
      <p className="text-muted-foreground mb-8">
        이력서와 포트폴리오 PDF를 다운로드하실 수 있습니다.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 이력서 */}
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <div className="text-5xl mb-4 opacity-20">PDF</div>
          <h2 className="text-lg font-semibold mb-1">이력서</h2>
          <p className="text-sm text-muted-foreground mb-6">
            경력기술서 및 이력서
          </p>
          <Link
            href="/files/resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            download
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download
          </Link>
        </div>

        {/* 포트폴리오 */}
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <div className="text-5xl mb-4 opacity-20">PDF</div>
          <h2 className="text-lg font-semibold mb-1">포트폴리오</h2>
          <p className="text-sm text-muted-foreground mb-6">
            주요 프로젝트 케이스 스터디
          </p>
          <Link
            href="/files/portfolio.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            download
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">Quick Summary</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-2">메이아이(mAy-I Inc.)</h3>
            <p className="text-muted-foreground">
              Data Analyst / DA 팀 리드 | 2023.02 ~ 현재
            </p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>LG전자, 삼성전자, 현대백화점 등 대형 엔터프라이즈 프로젝트 수행</li>
              <li>DA 팀 0 to 3명 빌딩, 주간 스프린트 퍼실리테이션</li>
              <li>End-to-End 분석 파이프라인 설계 및 대형 클라이언트 지원</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">데이콘(Dacon)</h3>
            <p className="text-muted-foreground">
              Data Scientist / 파트장 | 2021.09 ~ 2022.08
            </p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>LG AI Research, 현대 NGV 등 엔터프라이즈 고객사 AI 경진대회 5회+ 제작</li>
              <li>서비스 성과 퍼널 분석 및 개선 &rarr; Active User +170%, 전환율 +77%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
