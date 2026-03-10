import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "박건우 - Data Scientist 소개",
};

const TIMELINE = [
  { date: "2026.03", title: "Calibration Framework 최종 완성", desc: "42페이지 TF2 최종 제안서 LG전자 발표", highlight: true },
  { date: "2025.07", title: "이상치 탐지 시스템 운영 시작", desc: "60개+ 매장 일일 자동 모니터링 체계 구축", highlight: true },
  { date: "2025", title: "LLM 상권 분석 자동 리포트 파이프라인", desc: "12 stage 프롬프트, 8단계 agent flow, 멀티 LLM+RAG", highlight: true },
  { date: "2024.11", title: "현대백화점 프로젝트 킥오프", desc: "더현대서울+킨텍스 분석, 임원보고 2회 제작" },
  { date: "2024.09", title: "이노션 미팅 - Journey Map", desc: "동선 분석 시연에서 'WA!' 반응 획득", highlight: true },
  { date: "2024.07", title: "Sankey Diagram 배포", desc: "동선 시각화 프로덕션 배포, da-utils 리팩토링" },
  { date: "2024.04", title: "대시보드 템플릿 첫 발행", desc: "Fujifilm, Coza 고객사에 7종 템플릿 적용" },
  { date: "2024.01", title: "신세계 데이터 오류 위기 해결", desc: "대면 미팅으로 직접 해결, 프로젝트 지속 확보" },
  { date: "2023.11", title: "LG전자 하계 가전 보고서 '히트'", desc: "70페이지 분석 보고서 오프라인 발표, 삼성 PoC 착수", highlight: true },
  { date: "2023.07", title: "분석 프레임워크 정의", desc: "LG베스트샵 분석 주제 초안 8페이지 - 이후 모든 보고서의 구조" },
  { date: "2023.02", title: "메이아이 입사, DA 팀 세팅", desc: "회사 최초의 DA로 입사, 팀 0명에서 3명으로 빌드업", highlight: true },
  { date: "2021.09", title: "데이콘 입사", desc: "AI 경진대회 제작 운영, AARRR 퍼널 분석으로 Active User +170%" },
  { date: "2021", title: "부스트캠프 AI Tech 수료", desc: "네이버 커넥트 재단 AI 엔지니어링 교육 과정" },
];

const SKILLS = {
  "핵심 언어/도구": ["Python", "Pandas", "NumPy", "SQL"],
  "분석/모델링": ["EWMA", "IQR", "MAD Z-Score", "Ridge Regression", "Decision Tree", "K-Means", "fastDTW"],
  "시각화": ["Streamlit", "Plotly", "Matplotlib", "Seaborn", "Altair"],
  "인프라": ["AWS S3", "DynamoDB", "Bedrock", "MongoDB", "PostgreSQL", "Docker"],
  "LLM/AI": ["GPT-4.1", "o3-mini", "Perplexity sonar-pro", "프롬프트 엔지니어링", "RAG"],
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">About</h1>
      <p className="text-muted-foreground mb-12">
        박건우 | Data Scientist (DA 팀 리드) | 메이아이(mAy-I Inc.)
      </p>

      {/* Profile */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">Profile</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">학력</span>
                <span>고려대학교 언어,뇌,컴퓨터학과</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">총 경력</span>
                <span>약 4년 5개월</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">핵심 도메인</span>
                <span>오프라인 리테일 방문객 행동 분석</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">자격증</span>
                <span>빅데이터분석기사, SQLD, ADsP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">어학</span>
                <span>OPIC IH, TOEIC 920, JLPT N2</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              메이아이에서 DA 팀을 0명에서 3명으로 세팅하고, LG전자, 삼성전자, 현대백화점, 신세계백화점 등
              대형 리테일 기업의 오프라인 매장 방문객 행동 데이터를 분석했습니다.
              고객사 실무자와 직접 미팅하며 현장의 문제를 발견하고, 데이터와 AI 솔루션으로 풀어내는 역할을 했습니다.
              분석 파이프라인 설계, 커스텀 KPI 개발, 고객사 리포트 제작, AI 모델 품질 관리까지
              DA 업무 전반을 이끌었습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">Skills</h2>
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
        <h2 className="text-xl font-bold mb-6 pb-2 border-b border-border">Timeline</h2>
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
