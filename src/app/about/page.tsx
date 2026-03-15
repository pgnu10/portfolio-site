import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "박건우 - Data Scientist 소개",
};

const TIMELINE = [
  { date: "2026.03", title: "Calibration Framework 개발", desc: "최종 산출물 정확도 보완 프레임워크"},
  {
    date: "2025.09",
    title: (
      <a
        href="/projects/kpi-anomaly-detection"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
        title="상세 프로젝트 문서로 이동"
      >
        이상치 탐지 시스템 개발
      </a>
    ),
    desc: "일일 KPI 자동 모니터링 & drill-down 체계 구축",
    highlight: true,
  },
  {
    date: "2025.06",
    title: (
      <a
        href="/projects/llm-market-analysis"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
        title="상세 프로젝트 문서로 이동"
      >
        LLM 상권 분석 자동 리포트 파이프라인
      </a>
    ),
    desc: "멀티 LLM Agent Flow와 RAG 기반의 프로덕션 리포트 생성 시스템 개발",
    highlight: true,
  },
  { date: "2024.11", title: "현대백화점 프로젝트", desc: "대형 백화점과 shop-in-mall 분석, 임원보고 자료 제작" },
  { date: "2024.09", title: "삼성전자 PoC 지표 개발", desc: "분석 니즈를 핵심 KPI와 커스텀 지표로 구조화 > 정식 도입과 확장" },
  { date: "2024.07", title: "동선 시각화 3종 제작", desc: "히트맵, 트래픽맵, 저니맵 동선 시각화 프로덕션 배포"},
  { date: "2024.04", title: "대시보드 템플릿 발행", desc: "보편적인 고객 니즈를 반영한 5종 템플릿 제작"},
  {
    date: "2023.11",
    title: (
      <a
        href="/projects/lg-store-analytics"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
        title="상세 프로젝트 문서로 이동"
      >
        LG전자 PoC 분석 보고서
      </a>
    ),
    desc: "분석 니즈를 핵심 KPI와 커스텀 지표로 구조화 > 정식 도입과 확장",
    highlight: true,
  },
  { date: "2023.07", title: "분석 프레임워크 정의", desc: "고객 니즈 구조화, 데이터 분석 상품 기획" },
  { date: "2023.02", title: "메이아이 입사", desc: "회사 최초의 DA로 입사", highlight: true },
  { date: "2021.09", title: "데이콘 입사", desc: "AI 경진대회 제작 운영, 서비스 성과 분석 및 개선" },
  { date: "2021.06", title: "부스트캠프 AI Tech 수료", desc: "네이버 커넥트 재단 AI 엔지니어링 교육 과정" },
  { date: "2021.02", title: "고려대학교 졸업", desc: "주전공: 심리학, 융합전공: 언어,뇌,컴퓨터", highlight: true},
  { date: "2020.10", title: "엘리스 코딩 인턴", desc: "Python, JavaScript, 알고리즘 교육 제작 인턴" },
  { date: "2020.06", title: "MZ CEC 감정 대화 분류 해커톤", desc: "AI 자연어처리 대회 입상, 4위" },
  { date: "2020.02", title: "DNI CRM 컨설팅 인턴", desc: "빅데이터 기반 CRM 컨설팅", highlight: true},
];

const SKILLS = {
  "핵심 언어/도구": ["Python", "Pandas", "NumPy", "SQL"],
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
                <span>고려대학교 | (주) 심리학, (부) 언어,뇌,컴퓨터</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">총 경력</span>
                <span>
                  {(() => {
                    // 입사일: 2021-02-01
                    const START_DATE = new Date(2021, 12, 1); // month is 0-indexed
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
                    return `약 ${years}년${months > 0 ? ` ${months}개월` : ""}`;
                  })()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">핵심 도메인</span>
                <span>오프라인 리테일 방문객 행동 분석</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">자격증</span>
                <span>경영정보시각화능력, 빅데이터분석기사, SQLD, ADsP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">어학</span>
                <span>OPIC: IH, TOEIC: 920, JLPT: N2</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm leading-relaxed">
              메이아이 최초의 DA로 입사하여 팀을 0명에서 3명으로 확장하고, LG전자, 삼성전자, 현대백화점, 신세계백화점 등
              대형 리테일 기업의 오프라인 매장 방문객 행동 데이터를 분석했습니다.  
              <br />
              고객사 실무자와 직접 미팅하며 현장의 문제를 발견하고 데이터와 AI 솔루션으로 문제를 풀어내는 역할을 했습니다.
              <br />
              분석 파이프라인 설계, 커스텀 KPI 개발, 고객사 리포트 제작, AI 모델 품질 관리까지 DA 업무 전반을 이끌었습니다.
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
