import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About",
  description: "GeonU Park - Data Scientist",
};

function getTimeline(locale: Locale) {
  const isEn = locale === "en";
  return [
    { date: "2026.03", title: isEn ? "Calibration Framework Development" : "Calibration Framework 개발", desc: isEn ? "Final output accuracy correction framework" : "최종 산출물 정확도 보완 프레임워크" },
    {
      date: "2025.09",
      title: (
        <a href={`/${locale}/projects/kpi-anomaly-detection`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800" title={isEn ? "View project details" : "상세 프로젝트 문서로 이동"}>
          {isEn ? "Anomaly Detection System" : "이상치 탐지 시스템 개발"}
        </a>
      ),
      desc: isEn ? "Daily KPI auto-monitoring & drill-down system" : "일일 KPI 자동 모니터링 & drill-down 체계 구축",
      highlight: true,
    },
    {
      date: "2025.06",
      title: (
        <a href={`/${locale}/projects/llm-market-analysis`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800" title={isEn ? "View project details" : "상세 프로젝트 문서로 이동"}>
          {isEn ? "LLM Market Analysis Auto-Report Pipeline" : "LLM 상권 분석 자동 리포트 파이프라인"}
        </a>
      ),
      desc: isEn ? "Production report generation system with multi-LLM Agent Flow and RAG" : "멀티 LLM Agent Flow와 RAG 기반의 프로덕션 리포트 생성 시스템 개발",
      highlight: true,
    },
    { date: "2024.11", title: isEn ? "Hyundai Dept Store Project" : "현대백화점 프로젝트", desc: isEn ? "Large department store & shop-in-mall analysis, executive reporting" : "대형 백화점과 shop-in-mall 분석, 임원보고 자료 제작" },
    { date: "2024.09", title: isEn ? "Samsung PoC Metric Development" : "삼성전자 PoC 지표 개발", desc: isEn ? "Structured analysis needs into core KPIs & custom metrics → full adoption & expansion" : "분석 니즈를 핵심 KPI와 커스텀 지표로 구조화 > 정식 도입과 확장" },
    { date: "2024.07", title: isEn ? "3 Movement Visualizations" : "동선 시각화 3종 제작", desc: isEn ? "Heatmap, traffic map, journey map — deployed to production" : "히트맵, 트래픽맵, 저니맵 동선 시각화 프로덕션 배포" },
    { date: "2024.04", title: isEn ? "Dashboard Templates Published" : "대시보드 템플릿 발행", desc: isEn ? "5 templates reflecting common client needs" : "보편적인 고객 니즈를 반영한 5종 템플릿 제작" },
    {
      date: "2023.11",
      title: (
        <a href={`/${locale}/projects/lg-store-analytics`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800" title={isEn ? "View project details" : "상세 프로젝트 문서로 이동"}>
          {isEn ? "LG Electronics PoC Analysis Report" : "LG전자 PoC 분석 보고서"}
        </a>
      ),
      desc: isEn ? "Structured analysis needs into core KPIs & custom metrics → full adoption & expansion" : "분석 니즈를 핵심 KPI와 커스텀 지표로 구조화 > 정식 도입과 확장",
      highlight: true,
    },
    { date: "2023.07", title: isEn ? "Analysis Framework Definition" : "분석 프레임워크 정의", desc: isEn ? "Client needs structuring, data analytics product planning" : "고객 니즈 구조화, 데이터 분석 상품 기획" },
    { date: "2023.02", title: isEn ? "Joined mAy-I" : "메이아이 입사", desc: isEn ? "Joined as the company's first DA" : "회사 최초의 DA로 입사", highlight: true },
    { date: "2021.09", title: isEn ? "Joined Dacon" : "데이콘 입사", desc: isEn ? "AI competition production & operations, service analytics" : "AI 경진대회 제작 운영, 서비스 성과 분석 및 개선" },
    { date: "2021.06", title: isEn ? "Boostcamp AI Tech Completion" : "부스트캠프 AI Tech 수료", desc: isEn ? "Naver Connect Foundation AI engineering program" : "네이버 커넥트 재단 AI 엔지니어링 교육 과정" },
    { date: "2021.02", title: isEn ? "Korea University Graduation" : "고려대학교 졸업", desc: isEn ? "Major: Psychology, Convergence: Language, Brain & Computer" : "주전공: 심리학, 융합전공: 언어,뇌,컴퓨터", highlight: true },
    { date: "2020.10", title: isEn ? "Elice Coding Intern" : "엘리스 코딩 인턴", desc: isEn ? "Python, JavaScript, algorithm education production intern" : "Python, JavaScript, 알고리즘 교육 제작 인턴" },
    { date: "2020.06", title: isEn ? "MZ CEC Emotion Dialog Hackathon" : "MZ CEC 감정 대화 분류 해커톤", desc: isEn ? "AI NLP competition — 4th place" : "AI 자연어처리 대회 입상, 4위" },
    { date: "2020.02", title: isEn ? "DNI CRM Consulting Intern" : "DNI CRM 컨설팅 인턴", desc: isEn ? "Big data-based CRM consulting" : "빅데이터 기반 CRM 컨설팅", highlight: true },
  ];
}

function getSkills(locale: Locale) {
  const isEn = locale === "en";
  return {
    [isEn ? "Core Languages/Tools" : "핵심 언어/도구"]: ["Python", "Pandas", "NumPy", "SQL"],
    [isEn ? "Visualization" : "시각화"]: ["Streamlit", "Plotly", "Matplotlib", "Seaborn", "Altair"],
    [isEn ? "Infrastructure" : "인프라"]: ["AWS S3", "DynamoDB", "Bedrock", "MongoDB", "PostgreSQL", "Docker"],
    [isEn ? "LLM/AI" : "LLM/AI"]: ["GPT-4.1", "o3-mini", "Perplexity sonar-pro", isEn ? "Prompt Engineering" : "프롬프트 엔지니어링", "RAG"],
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);
  const TIMELINE = getTimeline(locale as Locale);
  const SKILLS = getSkills(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">{t.about.title}</h1>
      <p className="text-muted-foreground mb-12">
        {t.about.subtitle}
      </p>

      {/* Profile */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">{t.about.profileTitle}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.about.labels.education}</span>
                <span>{t.about.education}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.about.labels.experience}</span>
                <span>
                  {(() => {
                    const START_DATE = new Date(2021, 12, 1);
                    const now = new Date();
                    let years = now.getFullYear() - START_DATE.getFullYear();
                    let months = now.getMonth() - START_DATE.getMonth();
                    if (now.getDate() < START_DATE.getDate()) {
                      months -= 1;
                    }
                    if (months < 0) {
                      years -= 1;
                      months += 12;
                    }
                    if (locale === "en") {
                      return `~${years} yr${years > 1 ? "s" : ""}${months > 0 ? ` ${months} mo` : ""}`;
                    }
                    return `약 ${years}년${months > 0 ? ` ${months}개월` : ""}`;
                  })()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.about.labels.domain}</span>
                <span>{t.about.domain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.about.labels.certs}</span>
                <span>{t.about.certs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.about.labels.languages}</span>
                <span>{t.about.languages}</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm leading-relaxed">
              {t.about.profileDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">{t.about.skillsTitle}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="text-xs px-2 py-1 rounded-md bg-muted">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="text-xl font-bold mb-6 pb-2 border-b border-border">{t.about.timelineTitle}</h2>
        <div className="space-y-0">
          {TIMELINE.map((event, i) => (
            <div key={i} className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                    event.highlight ? "bg-accent" : "bg-muted-foreground/40"
                  }`}
                />
                {i < TIMELINE.length - 1 && (
                  <div className="w-px flex-1 bg-border" />
                )}
              </div>
              <div className="pb-8">
                <span className="text-xs font-mono text-muted-foreground">
                  {event.date}
                </span>
                <h3 className={`text-sm font-medium mt-0.5 ${event.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                  {event.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
