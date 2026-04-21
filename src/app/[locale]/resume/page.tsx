import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume & Portfolio",
  description: "Resume and portfolio PDF download",
};

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  const isEn = locale === "en";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">{t.resume.title}</h1>
      <p className="text-muted-foreground mb-8">
        {t.resume.desc}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <div className="text-5xl mb-4 opacity-20">PDF</div>
          <h2 className="text-lg font-semibold mb-1">{t.resume.resumeTitle}</h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t.resume.resumeDesc}
          </p>
          <Link
            href="/files/resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            download
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            {t.resume.download}
          </Link>
        </div>

        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <div className="text-5xl mb-4 opacity-20">PDF</div>
          <h2 className="text-lg font-semibold mb-1">{t.resume.portfolioTitle}</h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t.resume.portfolioDesc}
          </p>
          <Link
            href="/files/portfolio.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            download
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            {t.resume.download}
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">{t.resume.quickSummary}</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-2">{isEn ? "mAy-I Inc." : "메이아이(mAy-I Inc.)"}</h3>
            <p className="text-muted-foreground">
              {isEn ? "Data Analyst / DA Team Lead | 2023.02 ~ Present" : "Data Analyst / DA 팀 리드 | 2023.02 ~ 현재"}
            </p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              {isEn ? (
                <>
                  <li>Enterprise projects for LG Electronics, Samsung, Hyundai Dept Store</li>
                  <li>DA team built from 0 to 3, weekly sprint facilitation</li>
                  <li>End-to-end analysis pipeline design & major client support</li>
                </>
              ) : (
                <>
                  <li>LG전자, 삼성전자, 현대백화점 등 대형 엔터프라이즈 프로젝트 수행</li>
                  <li>DA 팀 0 to 3명 빌딩, 주간 스프린트 퍼실리테이션</li>
                  <li>End-to-End 분석 파이프라인 설계 및 대형 클라이언트 지원</li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">{isEn ? "Dacon" : "데이콘(Dacon)"}</h3>
            <p className="text-muted-foreground">
              {isEn ? "Data Scientist / Team Lead | 2021.09 ~ 2022.08" : "Data Scientist / 파트장 | 2021.09 ~ 2022.08"}
            </p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              {isEn ? (
                <>
                  <li>5+ enterprise AI competitions for LG AI Research, Hyundai NGV, etc.</li>
                  <li>Service funnel analysis & optimization → Active Users +170%, CVR +77%</li>
                </>
              ) : (
                <>
                  <li>LG AI Research, 현대 NGV 등 엔터프라이즈 고객사 AI 경진대회 5회+ 제작</li>
                  <li>서비스 성과 퍼널 분석 및 개선 &rarr; Active User +170%, 전환율 +77%</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
