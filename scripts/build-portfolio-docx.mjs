/**
 * Build portfolio DOCX — editable Word document version.
 * Each featured project is structured for recruiter readability.
 *
 * Usage: node scripts/build-portfolio-docx.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, BorderStyle, PageBreak,
  ShadingType, TabStopPosition, TabStopType, ExternalHyperlink,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.resolve(ROOT, "public/files/portfolio.docx");

const SITE_URL = "https://pgnu10-projects.vercel.app";
const BLUE = "3B82F6";
const DARK = "1A1A2E";
const GRAY = "495057";
const LIGHT_GRAY = "868E96";
const BG_LIGHT = "F8F9FA";
const BORDER_COLOR = "DEE2E6";

// ── Project data ──

const projects = [
  {
    slug: "lg-store-analytics",
    number: 1,
    title: "엔터프라이즈 고객사 매장 분석 인사이트 리포트",
    subtitle: "오프라인 매장의 방문객 행동 데이터 분석 및 운영 전략 제안",
    period: "2023 ~ 2026",
    role: "DA 리드",
    company: "메이아이 (mAy-I Inc.)",
    tags: ["KPI 설계", "퍼널 분석", "오프라인 리테일", "군집 분석"],
    tldr: "PoC 단계에서 모호한 운영 요구를 7개 핵심 KPI와 10개+ 커스텀 지표로 구조화하여 정식 도입과 60개+ 매장 확장으로 이어진 프로젝트",
    metrics: [
      { value: "PoC → 60+", label: "매장 확장" },
      { value: "10개+", label: "커스텀 지표" },
      { value: "80%", label: "KPI 채택률" },
      { value: "8분기", label: "연속 안정 운영" },
    ],
    problemTable: [
      ["추상적인 운영 지표", "핵심 운영 개념을 측정하는 지표 없음", "7개 핵심 KPI 개발, 군집화 모델과 개선 전략 제안"],
      ["매장 간 비교 불가", "동일 기준으로 측정하는 시스템 부재", "레이더 차트 기반 매장 유형화, 벤치마킹 전략 제안"],
      ["PoC 가치 증명 필요", "기본 지표만으로는 설득 어려움", "실행 가능한 KPI 프레임워크 → 정식 도입 전환"],
    ],
    myRole: [
      "오프라인 매장 KPI 프레임워크 설계",
      "Staff Interaction 상담 판정 로직 설계 및 구현",
      "10개+ 커스텀 지표 개발",
      "매장 비교·유형화 시각화 프레임 설계",
      "매장 군집화 모델과 취약점 개선 전략 제안",
      "분석 보고서 작성 및 고객 발표",
    ],
    collab: [
      "AI 개발팀과 직원 분류 모델 연계",
      "플랫폼 팀과 API/데이터 파이프라인 운영 협업",
      "현장 엔지니어링 팀과 매장별 설치/운영 이슈 조율",
    ],
    approaches: [
      { title: "KPI 프레임워크 설계", body: "기본 지표 나열 대신 7개 핵심 지표를 3개 범주(공간 매력도·핵심 KPI·방문객 특성)로 구조화. 매장을 '왜 성과가 다른지' 해석 가능한 구조로 전환." },
      { title: "상담 지표 자동화", body: "수기 집계 상담 지표를 데이터화. 직원 분류 모델 출력 → BBox 거리+시간 조건 기반 Staff Interaction 판정 로직 설계. 고객 피드백 반영 후 운영 기준으로 채택." },
      { title: "매장 유형화 및 벤치마킹", body: "K-means 검토 후, PoC 단계에서는 설명 가능성이 더 중요하다고 판단해 레이더 차트 기반 비교 프레임 선택. 유사 조건의 우수 매장을 벤치마킹 대상으로 제안." },
    ],
    results: [
      "고객의 모호한 요구를 KPI 체계로 구조화해 PoC 설득력 향상",
      "수기 집계 지표를 솔루션 기반 지표로 전환",
      "매장 간 비교·벤치마킹 가능한 공통 프레임 구축",
      "정식 도입 및 60개+ 매장 확장으로 연결",
      "삼성전자, 현대백화점 등 타 엔터프라이즈 프로젝트에 확장 적용",
    ],
    tech: "Python, Pandas, NumPy, AWS S3, Jupyter Notebook",
    competencies: ["비즈니스 요구 → 분석 구조 전환", "운영 지표 정의", "설명 가능한 분석 방법 선택", "분석 → 운영 체계 연결"],
  },
  {
    slug: "kpi-anomaly-detection",
    number: 2,
    title: "KPI 이상치 탐지 시스템",
    subtitle: "60개+ 매장, 7개 운영 지표의 일일 자동 이상치 탐지 및 보고 체계",
    period: "2025.09 ~ 2025.12",
    role: "DA 리드 / 시스템 설계",
    company: "메이아이 (mAy-I Inc.)",
    tags: ["KPI 설계", "이상치 탐지", "통계 분석", "자동화", "품질 관리"],
    tldr: "고객 데이터 불신 상황에서 GT 검증 대신 운영 KPI 기반 정합성 감시 체계를 설계해 계약 연장과 운영 루틴 정착으로 이어진 프로젝트",
    metrics: [
      { value: "60 × 7", label: "모니터링 규모" },
      { value: "80%+", label: "진단 리소스 절약" },
      { value: "30%+", label: "유효 이상 탐지율" },
      { value: "4단계", label: "심각도 분류" },
    ],
    problemTable: [
      ["데이터 신뢰 하락", "체감 방문객 수와 솔루션 수치 불일치", "정합성 상시 감시 → 고객 시연 후 계약 연장"],
      ["GT 검증 비현실적", "라벨러 1명이 매장 1일치에 1주일+ 소요", "운영 KPI 기반 감시로 문제 재정의"],
      ["원인 추적 불가", "최종 결과치로는 문제 모듈 식별 불가", "모듈별 KPI 분해, 영상/방문객 단위 drill-down"],
    ],
    myRole: [
      "문제 재정의: 정확도 검증 → 운영 모니터링",
      "AI 파이프라인 분석 및 모듈별 핵심 KPI 설계",
      "다중 윈도우 기반 탐지 로직 설계",
      "요일/공휴일/음력 세그먼트 정렬 방식 설계",
      "비대칭 임계값 및 4단계 심각도 분류 설계",
      "drill-down 구조 설계 및 고객 시연",
    ],
    collab: [
      "모듈별 KPI 정의 구체화 (AI 개발팀)",
      "이상치 리뷰 및 오탐/미탐 피드백 반영",
      "Slack/Notion 자동화 연동",
    ],
    approaches: [
      { title: "운영 모니터링으로 재정의", body: "대규모 GT 구축 불가 → '정확도 입증' 대신 '운영 리스크 상시 감시 + 이상 시 신속 대응' 체계로 목표 전환." },
      { title: "모듈별 KPI 분해 감시", body: "AI 파이프라인을 직접 도식화, 방문객 수·커버리지·체류시간·속성 예측 등 모듈별 KPI 정의. 이상 탐지 = 원인 추적의 출발점." },
      { title: "다중 윈도우 기준선", body: "최근 3주/3개월/전년 동기/음력 명절 조합. 요일·공휴일 분리, 비대칭 임계값으로 운영에서 의미 있는 이상 신호를 안정 포착." },
      { title: "drill-down 구조", body: "카메라×영상 및 방문객 단위까지 분해. 이상 집중 구간만 우선 점검 → GT 검토 범위 빠르게 축소." },
    ],
    results: [
      "대규모 라벨링 없이 설명 가능한 품질 관리 프레임 구축",
      "PM·AI 개발팀의 초기 진단 효율 80%+ 향상",
      "고객 시연 후 계약 연장 성사",
      "PM, AI 개발팀, 어시스턴트가 사용하는 정규 운영 루틴 정착",
    ],
    tech: "Python, Pandas, Streamlit, Slack API, Notion API, n8n",
    competencies: ["불가능한 검증 → 운영 구조로 재정의", "KPI + 시계열 기준선 구조화", "설명 가능한 탐지 로직 설계", "탐지 → 대응 프로세스 연결"],
  },
  {
    slug: "llm-market-analysis",
    number: 3,
    title: "LLM 기반 상권 분석 리포트 자동화",
    subtitle: "멀티 LLM Agent Flow와 RAG로 구현한 End-to-End 자동화 상권 분석 리포트",
    period: "2025.03 ~ 2025.06",
    role: "주 제작자 / LLM 파이프라인 설계",
    company: "메이아이 (mAy-I Inc.)",
    tags: ["LLM/프롬프트 엔지니어링", "RAG", "자동화"],
    tldr: "수작업 3주 → 멀티 LLM Agent Flow + RAG + validator 기반 시스템으로 15분 내 자동 생성. 다수 고객사 납품 및 계약 연장으로 연결",
    metrics: [
      { value: "3주 → 15분", label: "리포트 생성" },
      { value: "5개+", label: "고객사 납품" },
      { value: "40%+", label: "리텐션 증가" },
      { value: "3-LLM", label: "Agent 역할 분리" },
    ],
    problemTable: [
      ["고객사 불만족", "대시보드 해석 + 외부 상권 결합 여력 부족", "LLM 기반 상권 분석 리포트 자동화"],
      ["LLM 품질 불안정", "단계별 output 불일치, 수치 오류", "validator, JSON schema, Python 후처리"],
      ["확장성 부족", "고객사별 특수 정보 수동 입력 필요", "RAG 컨텍스트로 동적 정보 자동 처리"],
    ],
    myRole: [
      "문제 정의 및 자동화 대상 범위 설정",
      "수작업 리포트 분석 프로세스 구조화",
      "8단계 Agent Flow 및 노드 입출력 구조 설계",
      "멀티 LLM 역할 분리 전략 수립",
      "12 Stage 프롬프트 설계",
      "validator 및 출력 가드레일 설계",
      "최종 리포트 정보 구조와 시각화 UX 기획",
    ],
    collab: [
      "DAG 실행 엔진 및 API 인프라 구현 (백엔드)",
      "RAG 컨텍스트 구조 설계",
      "UI 연동 및 배포",
    ],
    approaches: [
      { title: "수작업 분석 먼저 표준화", body: "고객용 리포트를 직접 작성하며 분석 순서와 결과물 구조를 정리. 자동화 가능 범위의 경계를 먼저 확보." },
      { title: "멀티 LLM + 12 Stage 프롬프트", body: "역할별 모델 분리: 웹 리서치(sonar-pro), 데이터 해석(o3-mini), 리포트 생성(GPT-4.1). 12개 Stage와 8단계 DAG로 설계." },
      { title: "품질 가드레일", body: "계산과 서술 분리 → 정합성은 코드 통제, LLM은 해석·서술에 집중. validator로 수치 검증, JSON schema로 포맷 강제." },
    ],
    results: [
      "수작업 3주 → 15분 내 완성 리포트 자동 생성",
      "12개 Stage 프롬프트 및 8단계 Agent Flow 설계",
      "멀티 LLM 역할 분리 (o3-mini, GPT-4.1, sonar-pro)",
      "아모레퍼시픽, 한섬 등 다수 고객사에 기능 제공",
      "고객 미팅 시연 후 계약 연장 및 추가 도입 논의 활용",
    ],
    tech: "Python, JSON Schema, Streamlit, OpenAI o3-mini, GPT-4.1, Perplexity sonar-pro",
    competencies: ["고객 문제 → 서비스 구조 재정의", "수작업 → 자동화 단계 분해", "LLM과 코드의 역할 분리 설계", "정합성·재현성 품질 통제"],
  },
];

// ── Helpers ──

const THIN_BORDER = { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR };
const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const ALL_NO_BORDER = { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER };

function spacer(size = 100) {
  return new Paragraph({ spacing: { after: size } });
}

function sectionTitle(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 20, color: DARK })],
    spacing: { before: 160, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR } },
  });
}

// ── Build project section ──

function buildProject(p) {
  const children = [];

  // Page break (except first)
  if (p.number > 1) {
    children.push(new Paragraph({ children: [new PageBreak()] }));
  }

  // PROJECT N
  children.push(new Paragraph({
    children: [new TextRun({ text: `PROJECT ${p.number}`, bold: true, size: 16, color: BLUE, characterSpacing: 80 })],
    spacing: { after: 40 },
  }));

  // Title
  children.push(new Paragraph({
    children: [new TextRun({ text: p.title, bold: true, size: 30, color: DARK })],
    spacing: { after: 20 },
  }));

  // Subtitle
  children.push(new Paragraph({
    children: [new TextRun({ text: p.subtitle, size: 18, color: GRAY })],
    spacing: { after: 40 },
  }));

  // Meta line
  children.push(new Paragraph({
    children: [new TextRun({ text: `${p.company}  |  ${p.period}  |  ${p.role}`, size: 16, color: LIGHT_GRAY })],
    spacing: { after: 40 },
  }));

  // Tags
  children.push(new Paragraph({
    children: p.tags.map((t, i) => new TextRun({
      text: (i > 0 ? "   " : "") + t,
      size: 15, color: "1971C2", bold: true,
    })),
    spacing: { after: 40 },
  }));

  // Detail link
  children.push(new Paragraph({
    children: [
      new TextRun({ text: "상세 케이스 스터디 → ", size: 14, color: LIGHT_GRAY }),
      new ExternalHyperlink({
        children: [new TextRun({ text: `${SITE_URL}/projects/${p.slug}`, size: 14, color: BLUE, underline: {} })],
        link: `${SITE_URL}/projects/${p.slug}`,
      }),
    ],
    spacing: { after: 80 },
  }));

  // TL;DR box
  children.push(new Paragraph({
    children: [new TextRun({ text: p.tldr, size: 17, color: DARK })],
    spacing: { before: 40, after: 40 },
    indent: { left: 200 },
    border: { left: { style: BorderStyle.SINGLE, size: 6, color: BLUE } },
    shading: { type: ShadingType.SOLID, color: BG_LIGHT },
  }));

  // Metrics row (table)
  children.push(new Table({
    rows: [
      new TableRow({
        children: p.metrics.map(m => new TableCell({
          children: [
            new Paragraph({ children: [new TextRun({ text: m.value, bold: true, size: 22, color: DARK })], alignment: AlignmentType.CENTER }),
            new Paragraph({ children: [new TextRun({ text: m.label, size: 14, color: GRAY })], alignment: AlignmentType.CENTER }),
          ],
          width: { size: 25, type: WidthType.PERCENTAGE },
          borders: ALL_NO_BORDER,
          shading: { type: ShadingType.SOLID, color: BG_LIGHT },
        })),
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
  }));

  children.push(spacer(80));

  // Problem table
  children.push(sectionTitle("문제 → 원인 → 개선"));
  children.push(new Table({
    rows: [
      new TableRow({
        children: ["문제점", "원인", "개선 결과"].map(h => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 15, color: DARK })] })],
          shading: { type: ShadingType.SOLID, color: "F1F3F5" },
          borders: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "CED4DA" }, top: THIN_BORDER, left: THIN_BORDER, right: THIN_BORDER },
        })),
      }),
      ...p.problemTable.map(row => new TableRow({
        children: row.map(cell => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: cell, size: 15 })] })],
          borders: { bottom: THIN_BORDER, top: THIN_BORDER, left: THIN_BORDER, right: THIN_BORDER },
        })),
      })),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
  }));

  // Role
  children.push(sectionTitle("담당 역할"));
  children.push(new Paragraph({
    children: [new TextRun({ text: "주도한 업무", bold: true, size: 16, color: GRAY })],
    spacing: { after: 20 },
  }));
  for (const r of p.myRole) {
    children.push(new Paragraph({
      children: [new TextRun({ text: `• ${r}`, size: 15 })],
      indent: { left: 200 },
      spacing: { after: 10 },
    }));
  }
  children.push(new Paragraph({
    children: [new TextRun({ text: "협업한 업무", bold: true, size: 16, color: GRAY })],
    spacing: { before: 60, after: 20 },
  }));
  for (const r of p.collab) {
    children.push(new Paragraph({
      children: [new TextRun({ text: `• ${r}`, size: 15 })],
      indent: { left: 200 },
      spacing: { after: 10 },
    }));
  }

  // Approaches
  children.push(sectionTitle("접근 방식"));
  for (const a of p.approaches) {
    children.push(new Paragraph({
      children: [new TextRun({ text: a.title, bold: true, size: 16, color: DARK })],
      spacing: { before: 60, after: 20 },
    }));
    children.push(new Paragraph({
      children: [new TextRun({ text: a.body, size: 15, color: "343A40" })],
      spacing: { after: 40 },
      indent: { left: 100 },
    }));
  }

  // Results
  children.push(sectionTitle("성과"));
  for (const r of p.results) {
    children.push(new Paragraph({
      children: [new TextRun({ text: `• ${r}`, size: 15 })],
      indent: { left: 200 },
      spacing: { after: 10 },
    }));
  }

  // Tech + Competencies
  children.push(new Paragraph({
    children: [
      new TextRun({ text: "기술 스택: ", bold: true, size: 14, color: GRAY }),
      new TextRun({ text: p.tech, size: 14, color: GRAY }),
    ],
    spacing: { before: 100, after: 40 },
    border: { top: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR } },
  }));
  children.push(new Paragraph({
    children: [
      new TextRun({ text: "핵심 역량: ", bold: true, size: 14, color: GRAY }),
      new TextRun({ text: p.competencies.join("  |  "), size: 14, color: GRAY }),
    ],
    spacing: { after: 60 },
  }));

  return children;
}

// ── Main ──

async function main() {
  console.log("Building portfolio DOCX...");

  // Cover page content
  const coverChildren = [
    spacer(800),
    // Name
    new Paragraph({ children: [new TextRun({ text: "박건우", bold: true, size: 64, color: DARK })], spacing: { after: 20 } }),
    new Paragraph({ children: [new TextRun({ text: "GeonU Park", size: 24, color: LIGHT_GRAY })], spacing: { after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: "Data Scientist — Portfolio", bold: true, size: 28, color: BLUE })], spacing: { after: 200 } }),
    new Paragraph({
      children: [new TextRun({ text: "비즈니스 의사결정에 필요한 질문을 정의하고, 숫자로 답하는 Data Scientist.", size: 20, color: GRAY })],
      spacing: { after: 40 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "본 문서는 주요 프로젝트 3건의 케이스 스터디 요약본입니다.", size: 20, color: GRAY })],
      spacing: { after: 300 },
    }),

    // Stats table
    new Table({
      rows: [
        new TableRow({
          children: [
            { val: "3년+", label: "DA 팀 리드" },
            { val: "12건", label: "프로젝트 수행" },
            { val: "5개+", label: "엔터프라이즈 고객" },
            { val: "60개+", label: "분석 대상 매장" },
          ].map(s => new TableCell({
            children: [
              new Paragraph({ children: [new TextRun({ text: s.val, bold: true, size: 28, color: DARK })], alignment: AlignmentType.CENTER }),
              new Paragraph({ children: [new TextRun({ text: s.label, size: 14, color: LIGHT_GRAY })], alignment: AlignmentType.CENTER }),
            ],
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: ALL_NO_BORDER,
            shading: { type: ShadingType.SOLID, color: BG_LIGHT },
          })),
        }),
      ],
      width: { size: 100, type: WidthType.PERCENTAGE },
    }),

    spacer(300),

    // TOC title
    new Paragraph({
      children: [new TextRun({ text: "수록 프로젝트", bold: true, size: 18, color: DARK })],
      spacing: { after: 80 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: DARK } },
    }),
    // TOC items
    ...[
      { num: "01", name: "엔터프라이즈 고객사 매장 분석 인사이트 리포트", desc: "KPI 설계 · 60개+ 매장" },
      { num: "02", name: "KPI 이상치 탐지 시스템", desc: "품질 관리 · 420개+ 포인트 자동 모니터링" },
      { num: "03", name: "LLM 기반 상권 분석 리포트 자동화", desc: "멀티 LLM Agent Flow · 3주→15분" },
    ].map(item => new Paragraph({
      children: [
        new TextRun({ text: item.num + "  ", bold: true, size: 16, color: BLUE }),
        new TextRun({ text: item.name, bold: true, size: 17, color: DARK }),
        new TextRun({ text: "   " + item.desc, size: 15, color: LIGHT_GRAY }),
      ],
      spacing: { after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "F1F3F5" } },
    })),

    spacer(300),

    // Career summary
    new Paragraph({
      children: [new TextRun({ text: "경력 요약", bold: true, size: 18, color: DARK })],
      spacing: { after: 80 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: DARK } },
    }),
    new Table({
      rows: [
        new TableRow({
          children: [
            { company: "메이아이 (mAy-I Inc.)", role: "DA 팀 리드 | 2023.02 ~ 현재", desc: "LG전자, 삼성전자, 현대백화점 등 엔터프라이즈 고객사 오프라인 매장 행동 데이터 분석 체계 설계·운영. DA 팀 0→3명 빌딩." },
            { company: "데이콘 (Dacon)", role: "Data Scientist / 파트장 | 2021.09 ~ 2022.08", desc: "엔터프라이즈 AI 경진대회 5회+ 제작. 퍼널 분석 및 개선 → Active User +170%, 전환율 +77%." },
          ].map(c => new TableCell({
            children: [
              new Paragraph({ children: [new TextRun({ text: c.company, bold: true, size: 17, color: DARK })], spacing: { after: 10 } }),
              new Paragraph({ children: [new TextRun({ text: c.role, size: 14, color: GRAY })], spacing: { after: 20 } }),
              new Paragraph({ children: [new TextRun({ text: c.desc, size: 14, color: LIGHT_GRAY })], spacing: { after: 10 } }),
            ],
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: ALL_NO_BORDER,
          })),
        }),
      ],
      width: { size: 100, type: WidthType.PERCENTAGE },
    }),

    spacer(600),

    // Footer
    new Paragraph({
      children: [
        new TextRun({ text: "2026.03  |  afnf33@gmail.com  |  ", size: 16, color: LIGHT_GRAY }),
        new ExternalHyperlink({
          children: [new TextRun({ text: SITE_URL, size: 16, color: BLUE, underline: {} })],
          link: SITE_URL,
        }),
      ],
      border: { top: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR } },
      spacing: { before: 40 },
    }),
  ];

  // Build all project sections
  const allProjectChildren = projects.flatMap(buildProject);

  const doc = new Document({
    sections: [
      {
        properties: { page: { margin: { top: 720, bottom: 720, left: 1000, right: 1000 } } },
        children: [...coverChildren, new Paragraph({ children: [new PageBreak()] }), ...allProjectChildren],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUTPUT, buffer);

  const sizeKB = (buffer.length / 1024).toFixed(0);
  console.log(`Done! ${OUTPUT} (${sizeKB} KB)`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
