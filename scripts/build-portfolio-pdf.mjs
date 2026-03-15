/**
 * Build portfolio PDF — each featured project fills exactly 2 A4 pages.
 * Page 1: Header + hero, TL;DR, metrics, problem table, role
 * Page 2: Key visual, approaches with images, results, tech/competencies
 *
 * Usage: node scripts/build-portfolio-pdf.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.resolve(ROOT, "public/files/portfolio.pdf");

// ── Project data (hand-curated from Part A of each MDX) ──

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
      { value: "PoC → 60+", label: "매장 확장", desc: "정식 도입 후 3배" },
      { value: "10개+", label: "커스텀 지표", desc: "상담 전환, 공간 매력 등" },
      { value: "80%", label: "KPI 채택률", desc: "운영 지표로 전환" },
      { value: "8분기", label: "연속 안정 운영", desc: "24_1Q ~ 26_1Q" },
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
    heroImage: "LG report_result.png",
    // Page 2 visuals
    keyVisual: "LG KPI_framework.png",
    keyVisualCaption: "KPI 프레임워크: 공간 매력도 · 핵심 성과 지표 · 방문객 특성 3개 범주 구조",
    approaches: [
      {
        title: "1) KPI 프레임워크 설계",
        body: "기본 지표를 나열하는 대신, 매장 운영을 설명할 수 있는 7개 핵심 지표를 3개 범주로 구조화했다. <strong>공간 매력도</strong>(체험 구역 전환율, 공간 활성도, 평균 체류시간), <strong>핵심 KPI</strong>(방문객 수, 상담 전환율), <strong>방문객 특성</strong>(평균 연령대, 그룹 방문 비율). 매장을 '왜 성과가 다른지' 해석 가능한 구조로 전환.",
      },
      {
        title: "2) 상담 지표 자동화 (Staff Interaction)",
        body: "수기 집계하던 상담 지표를 데이터화. 직원 분류 모델 출력값을 활용해 BBox 기준 거리 조건과 시간 조건으로 Staff Interaction 판정 로직을 설계. 고객 피드백 반영 후 실제 운영 기준으로 채택.",
      },
      {
        title: "3) 매장 유형화 및 벤치마킹",
        body: "K-means 검토 후, PoC 단계에서는 설명 가능성이 더 중요하다고 판단해 레이더 차트 기반 비교 프레임을 선택. 유사 조건의 우수 매장을 벤치마킹 대상으로 제안.",
        image: "LG Store_clustering.png",
      },
    ],
    results: [
      "고객의 모호한 요구를 KPI 체계로 구조화해 PoC의 설득력을 높임",
      "수기 집계 지표를 솔루션 기반 지표로 전환",
      "매장 간 비교와 벤치마킹이 가능한 공통 프레임 구축",
      "분석 결과가 정식 도입 및 60개+ 매장 확장으로 연결",
      "삼성전자, 현대백화점 등 타 엔터프라이즈 프로젝트에 확장 적용",
    ],
    tech: "Python, Pandas, NumPy, AWS S3, Jupyter Notebook",
    competencies: [
      "추상적인 비즈니스 요구를 분석 가능한 구조로 전환",
      "현업 문제를 해결하는 지표를 정의하는 능력",
      "설명 가능성을 고려한 분석 방법 선택",
      "분석 결과를 운영 체계 수준으로 연결하는 실행력",
    ],
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
      { value: "60 × 7", label: "모니터링 규모", desc: "420개+ 포인트 일일 자동" },
      { value: "80%+", label: "진단 리소스 절약", desc: "수동 모니터링 대비" },
      { value: "30%+", label: "유효 이상 탐지율", desc: "원인 추적 가능" },
      { value: "4단계", label: "심각도 분류", desc: "VERY HIGH ~ VERY LOW" },
    ],
    problemTable: [
      ["데이터 신뢰 하락", "체감 방문객 수와 솔루션 수치 불일치", "정합성 상시 감시 체계 → 고객 시연 후 계약 연장"],
      ["GT 검증 비현실적", "라벨러 1명이 매장 1일치에 1주일+ 소요", "운영 KPI 기반 감시로 문제 재정의, GT 대상 축소"],
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
    heroImage: "ANO total_result.png",
    keyVisual: "ANO structure.png",
    keyVisualCaption: "AI 파이프라인 모듈별 KPI 분해 구조 — 이상 탐지의 출발점",
    approaches: [
      {
        title: "1) 정확도 검증 → 운영 모니터링으로 재정의",
        body: "대규모 GT 구축이 현실적으로 불가능한 상황에서, '정확도 입증'이 아닌 '운영 리스크 상시 감시 + 이상 시 신속 대응' 체계로 목표를 전환. 라벨링에 매달리지 않고도 설명 가능한 품질 관리 프레임을 구축.",
      },
      {
        title: "2) 다중 윈도우 기준선 + 세그먼트 정렬",
        body: "최근 3주(R) / 3개월(Q) / 전년 동기(SY) / 음력 명절(LY)을 조합한 기준선 설계. 요일·공휴일을 분리해 동질 세그먼트끼리 비교. 하방 이상에 더 민감한 비대칭 임계값 적용.",
        image: "ANO detector_plan.png",
      },
      {
        title: "3) 탐지 후 drill-down 구조",
        body: "카메라×영상 단위와 방문객 단위까지 내려가 확인 가능한 구조를 설계. 전체 GT 검수 대신 이상 집중 구간만 우선 점검 → GT 검토 범위와 디버깅 범위를 빠르게 축소.",
        image: "ANO result.png",
      },
    ],
    results: [
      "대규모 라벨링 없이 설명 가능한 품질 관리 프레임 구축",
      "PM·AI 개발팀의 초기 진단 효율 80%+ 향상",
      "불필요한 경보 감소, 유의미한 이상 신호 안정적 포착",
      "고객 시연 후 계약 연장 성사",
      "PM, AI 개발팀, 어시스턴트가 사용하는 정규 운영 루틴으로 정착",
    ],
    tech: "Python, Pandas, Streamlit, Slack API, Notion API, n8n, 시계열 이상 탐지",
    competencies: [
      "불가능한 검증 문제를 운영 가능한 구조로 재정의",
      "AI 품질 문제를 KPI와 시계열 기준선으로 구조화",
      "설명 가능한 탐지 로직을 조직 공통 언어로 만드는 역량",
      "탐지 결과를 원인 추적과 대응 프로세스로 연결하는 실행력",
    ],
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
    tldr: "수작업 3주 걸리던 상권 분석 리포트를 멀티 LLM Agent Flow + RAG + validator 기반 시스템으로 전환해 15분 내 자동 생성, 다수 고객사 납품 및 계약 연장으로 연결",
    metrics: [
      { value: "3주 → 15분", label: "리포트 생성", desc: "2,000배 효율화" },
      { value: "5개+", label: "고객사 납품", desc: "아모레퍼시픽, 한섬 등" },
      { value: "40%+", label: "리텐션 증가", desc: "계약 연장 및 추가 도입" },
      { value: "3-LLM", label: "Agent 역할 분리", desc: "조사, 분석, 전략" },
    ],
    problemTable: [
      ["고객사 불만족", "대시보드 해석 + 외부 상권 결합의 여력 부족", "LLM 기반 상권 분석 리포트 자동화 시스템"],
      ["LLM 품질 불안정", "단계별 output 불일치로 수치 오류 반복", "validator, JSON schema, Python 후처리 가드레일"],
      ["확장성 부족", "고객사별 특수 정보의 수동 입력 필요", "RAG 컨텍스트로 동적 정보 자동 처리"],
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
    heroImage: "LLM Total_result.png",
    keyVisual: "LLM result_compare.png",
    keyVisualCaption: "Before & After — 일반 대시보드 vs. LLM 기반 상권 분석 리포트",
    approaches: [
      {
        title: "1) 수작업 분석을 먼저 표준화",
        body: "처음부터 자동화하지 않고, 고객용 상권 분석 리포트를 직접 작성하며 분석 순서와 결과물 구조를 정리. 분석은 순서가 있는 해석 과정이며, 모든 단계를 자동화할 수 있는 것은 아님을 확인 → 자동화 경계를 먼저 확보.",
        image: "LLM preresearch.png",
      },
      {
        title: "2) 멀티 LLM + 12 Stage 프롬프트",
        body: "단일 모델 시 품질 저하 → 역할별 모델 분리: 외부 웹 리서치(sonar-pro), 데이터 해석·추론(o3-mini), 최종 리포트 생성(GPT-4.1). 분석가의 사고 과정을 시스템 처리 가능 단위로 분해하여 12개 Stage 프롬프트와 8단계 DAG로 설계.",
        image: "LLM agent_flow.svg",
      },
      {
        title: "3) 품질 가드레일 설계",
        body: "가장 위험한 실패는 '잘못된 숫자'. 계산과 서술을 분리해 정합성은 코드로 통제, LLM은 해석·서술에 집중. validator로 원본 집계 대비 수치 검증, JSON schema로 포맷 강제, 실패 시 해당 단계만 재생성.",
      },
    ],
    results: [
      "수작업 3주 → 15분 내 완성 리포트 자동 생성",
      "12개 Stage 프롬프트 및 8단계 Agent Flow 설계",
      "멀티 LLM 역할 분리 적용 (o3-mini, GPT-4.1, sonar-pro)",
      "아모레퍼시픽, 한섬 등 다수 고객사에 기능 제공",
      "고객 미팅 시연 후 계약 연장 및 추가 도입 논의 활용",
    ],
    tech: "Python, JSON Schema, Streamlit, OpenAI o3-mini, GPT-4.1, Perplexity sonar-pro",
    competencies: [
      "고객 문제를 분석 서비스 구조로 재정의",
      "수작업 프로세스를 자동화 가능한 단계로 분해",
      "LLM을 만능 도구로 쓰지 않고 코드와 역할을 분리하는 설계",
      "정합성·재현성·설명 가능성을 고려한 품질 통제",
    ],
  },
];

const SITE_URL = "https://pgnu10-projects.vercel.app";

// ── HTML rendering ──

function imgSrc(imagesDir, filename) {
  const filePath = path.join(imagesDir, filename);
  const ext = path.extname(filename).toLowerCase();
  const mimeMap = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".gif": "image/gif" };
  const mime = mimeMap[ext] || "image/png";
  const data = fs.readFileSync(filePath);
  return `data:${mime};base64,${data.toString("base64")}`;
}

function renderMetrics(metrics) {
  return `<div class="metrics-grid">${metrics.map(m => `
    <div class="metric">
      <div class="metric-value">${m.value}</div>
      <div class="metric-label">${m.label}</div>
      <div class="metric-desc">${m.desc}</div>
    </div>`).join("")}
  </div>`;
}

function renderProblemTable(rows) {
  return `<table class="problem-table">
    <thead><tr><th>문제점</th><th>원인</th><th>개선 결과</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody>
  </table>`;
}

function renderRole(myRole, collab) {
  return `<div class="role-grid">
    <div><div class="role-label">주도한 업무</div><ul>${myRole.map(r => `<li>${r}</li>`).join("")}</ul></div>
    <div><div class="role-label">협업한 업무</div><ul>${collab.map(r => `<li>${r}</li>`).join("")}</ul></div>
  </div>`;
}

function formatApproachBody(body) {
  // Split on sentence boundaries (". " or "→ " at end) into individual lines
  const lines = body
    .split(/(?<=\.)\s+(?=[^<])/)
    .flatMap(s => s.split(/(?<=→)\s+/))
    .map(s => s.trim())
    .filter(Boolean);
  if (lines.length <= 1) {
    return `<span class="ab-line">${body}</span>`;
  }
  return lines.map(l => `<span class="ab-line">${l}</span>`).join("");
}

function renderApproaches(approaches, imagesDir) {
  return approaches.map(a => {
    const bodyHtml = formatApproachBody(a.body);
    if (a.image) {
      const src = imgSrc(imagesDir, a.image);
      return `
      <div class="approach-with-img">
        <div class="approach-text">
          <div class="approach-title">${a.title}</div>
          <div class="approach-body">${bodyHtml}</div>
        </div>
        <div class="approach-img">
          <img src="${src}" />
        </div>
      </div>`;
    }
    return `
    <div class="approach">
      <div class="approach-title">${a.title}</div>
      <div class="approach-body">${bodyHtml}</div>
    </div>`;
  }).join("");
}

function renderResults(results) {
  return `<ul class="results">${results.map(r => `<li>${r}</li>`).join("")}</ul>`;
}

function renderCompetencies(competencies) {
  return `<div class="competencies">${competencies.map(c => `<span class="competency">${c}</span>`).join("")}</div>`;
}

// ── Page 1: Header, TL;DR, Metrics, Problem, Role ──
function renderProjectPage1(p, imagesDir) {
  const heroSrc = p.heroImage ? imgSrc(imagesDir, p.heroImage) : "";
  return `
  <div class="page">
    <div class="proj-top">
      <div class="proj-header-area">
        <div class="proj-num">PROJECT ${p.number}</div>
        <h1 class="proj-title">${p.title}</h1>
        <p class="proj-sub">${p.subtitle}</p>
        <div class="proj-meta">
          <span>${p.company}</span><span class="sep">|</span>
          <span>${p.period}</span><span class="sep">|</span>
          <span>${p.role}</span>
        </div>
        <div class="proj-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="proj-link">
          상세 케이스 스터디 →
          <a href="${SITE_URL}/projects/${p.slug}">${SITE_URL}/projects/${p.slug}</a>
        </div>
      </div>
      ${heroSrc ? `<div class="proj-hero"><img src="${heroSrc}" /></div>` : ""}
    </div>

    <div class="tldr-box">${p.tldr}</div>

    ${renderMetrics(p.metrics)}

    <div class="section-title">문제 → 원인 → 개선</div>
    ${renderProblemTable(p.problemTable)}

    <div class="section-title">담당 역할</div>
    ${renderRole(p.myRole, p.collab)}
  </div>`;
}

// ── Page 2: Key Visual, Approaches, Results, Tech, Competencies ──
function renderProjectPage2(p, imagesDir) {
  const kvSrc = p.keyVisual ? imgSrc(imagesDir, p.keyVisual) : "";
  return `
  <div class="page">
    <div class="page2-header">
      <span class="page2-num">PROJECT ${p.number}</span>
      <span class="page2-title">${p.title}</span>
    </div>

    ${kvSrc ? `
    <div class="key-visual">
      <img src="${kvSrc}" />
      ${p.keyVisualCaption ? `<div class="kv-caption">${p.keyVisualCaption}</div>` : ""}
    </div>` : ""}

    <div class="section-title">접근 방식</div>
    ${renderApproaches(p.approaches, imagesDir)}

    <div class="section-title">성과</div>
    ${renderResults(p.results)}

    <div class="bottom-bar">
      <div class="tech"><strong>기술 스택</strong>: ${p.tech}</div>
      <div class="comp-label">핵심 역량</div>
      ${renderCompetencies(p.competencies)}
    </div>
  </div>`;
}

function buildFullHtml(imagesDir) {
  const projectPages = projects.map(p =>
    renderProjectPage1(p, imagesDir) + "\n" + renderProjectPage2(p, imagesDir)
  ).join("\n");

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap');

  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Noto Sans KR', -apple-system, sans-serif;
    font-size: 9pt;
    line-height: 1.6;
    color: #1a1a2e;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── Page container ── */
  .page {
    width: 210mm;
    height: 297mm;
    padding: 16mm 22mm 14mm 22mm;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }

  /* ── Cover ── */
  .cover {
    width: 210mm; height: 297mm;
    padding: 0;
    display: flex; flex-direction: column;
    background: #fff;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }

  .cover-accent {
    width: 100%; height: 8mm;
    background: linear-gradient(90deg, #3b82f6 0%, #1a1a2e 100%);
    flex-shrink: 0;
  }

  .cover-header {
    padding: 14mm 24mm 0 24mm;
  }
  .cover-header h1 {
    font-size: 32pt; font-weight: 700; color: #1a1a2e; margin-bottom: 2px;
  }
  .cover-header .en-name {
    font-size: 11pt; font-weight: 400; color: #868e96; margin-bottom: 4px;
  }
  .cover-header .title-line {
    font-size: 13pt; font-weight: 500; color: #3b82f6; margin-bottom: 10px;
  }
  .cover-header .tagline {
    font-size: 10pt; color: #495057; line-height: 1.7; max-width: 440px;
  }

  .cover-stats {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
    margin: 12mm 24mm 0 24mm;
    border-top: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
  }
  .cover-stat {
    text-align: center; padding: 10px 0;
    border-right: 1px solid #e9ecef;
  }
  .cover-stat:last-child { border-right: none; }
  .cover-stat .stat-val { font-size: 18pt; font-weight: 700; color: #1a1a2e; }
  .cover-stat .stat-label { font-size: 8pt; color: #868e96; margin-top: 2px; }

  .cover-toc {
    margin: 10mm 24mm 0 24mm;
  }
  .cover-toc-title {
    font-size: 9pt; font-weight: 700; color: #1a1a2e; letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 8px;
    padding-bottom: 4px; border-bottom: 2px solid #1a1a2e;
  }
  .cover-toc-item {
    display: flex; justify-content: space-between; align-items: baseline;
    padding: 7px 0;
    border-bottom: 1px solid #f1f3f5;
  }
  .cover-toc-num { font-size: 8pt; font-weight: 700; color: #3b82f6; width: 24px; flex-shrink: 0; }
  .cover-toc-name { font-size: 9.5pt; font-weight: 600; color: #1a1a2e; flex: 1; }
  .cover-toc-desc { font-size: 8pt; color: #868e96; margin-left: 12px; text-align: right; max-width: 200px; }

  .cover-career {
    margin: 10mm 24mm 0 24mm;
  }
  .cover-career-title {
    font-size: 9pt; font-weight: 700; color: #1a1a2e; letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 8px;
    padding-bottom: 4px; border-bottom: 2px solid #1a1a2e;
  }
  .cover-career-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  }
  .cover-company { font-size: 9pt; font-weight: 600; color: #1a1a2e; margin-bottom: 1px; }
  .cover-role { font-size: 8pt; color: #495057; margin-bottom: 2px; }
  .cover-desc-text { font-size: 7.5pt; color: #868e96; line-height: 1.5; }

  .cover-footer {
    margin-top: auto;
    padding: 8mm 24mm;
    background: #f8f9fa;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 8pt; color: #868e96;
  }
  .cover-footer a { color: #3b82f6; text-decoration: none; }
  .cover-footer .contact { display: flex; gap: 20px; }

  /* ── Page 1: Header + Hero ── */
  .proj-top {
    display: flex; gap: 20px; align-items: flex-start;
    margin-bottom: 12px;
  }
  .proj-header-area { flex: 1; }
  .proj-hero {
    width: 240px; flex-shrink: 0;
    border-radius: 6px; overflow: hidden;
    border: 1px solid #dee2e6;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .proj-hero img { width: 100%; display: block; }

  .proj-num {
    font-size: 8pt; font-weight: 700; color: #3b82f6;
    letter-spacing: 2px; margin-bottom: 4px;
  }
  .proj-title {
    font-size: 16pt; font-weight: 700; line-height: 1.3;
    margin-bottom: 4px; color: #1a1a2e;
  }
  .proj-sub { font-size: 9pt; color: #495057; margin-bottom: 8px; }
  .proj-meta { font-size: 8pt; color: #868e96; margin-bottom: 6px; }
  .proj-meta .sep { margin: 0 6px; }
  .proj-tags { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 6px; }
  .tag {
    display: inline-block; padding: 2px 10px; font-size: 7.5pt; font-weight: 500;
    border-radius: 12px; background: #e7f5ff; color: #1971c2;
  }
  .proj-link { font-size: 7.5pt; color: #868e96; }
  .proj-link a { color: #3b82f6; text-decoration: none; }

  /* ── TL;DR ── */
  .tldr-box {
    margin: 10px 0 12px 0;
    padding: 10px 14px;
    font-size: 9pt;
    background: #f8f9fa;
    border-left: 3px solid #3b82f6;
    border-radius: 4px;
    color: #343a40;
    line-height: 1.6;
  }

  /* ── Metrics ── */
  .metrics-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
    margin-bottom: 14px;
  }
  .metric {
    text-align: center; padding: 10px 6px;
    background: #f8f9fa; border-radius: 6px;
  }
  .metric-value { font-size: 14pt; font-weight: 700; color: #1a1a2e; line-height: 1.2; }
  .metric-label { font-size: 7.5pt; font-weight: 600; color: #495057; margin-top: 2px; }
  .metric-desc { font-size: 6.5pt; color: #868e96; }

  /* ── Section titles ── */
  .section-title {
    font-size: 10pt; font-weight: 700; color: #1a1a2e;
    margin-top: 14px; margin-bottom: 6px;
    padding-bottom: 3px; border-bottom: 1.5px solid #dee2e6;
  }

  /* ── Problem table ── */
  .problem-table { width: 100%; border-collapse: collapse; font-size: 8pt; margin-bottom: 6px; }
  .problem-table th {
    background: #f1f3f5; font-weight: 600; padding: 6px 8px;
    text-align: left; border-bottom: 1.5px solid #ced4da;
  }
  .problem-table td { padding: 5px 8px; border-bottom: 1px solid #e9ecef; vertical-align: top; }

  /* ── Role grid ── */
  .role-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 6px; }
  .role-label { font-size: 8pt; font-weight: 600; color: #495057; margin-bottom: 3px; }
  .role-grid ul { margin-left: 16px; font-size: 8pt; }
  .role-grid li { margin-bottom: 2px; }

  /* ── Page 2: Header bar ── */
  .page2-header {
    padding-bottom: 6px; margin-bottom: 10px;
    border-bottom: 2px solid #1a1a2e;
  }
  .page2-num {
    font-size: 7.5pt; font-weight: 700; color: #3b82f6;
    letter-spacing: 2px; margin-right: 10px;
  }
  .page2-title {
    font-size: 11pt; font-weight: 700; color: #1a1a2e;
  }

  /* ── Key Visual ── */
  .key-visual {
    margin-bottom: 14px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .key-visual img {
    width: 100%; display: block;
    max-height: 200px;
    object-fit: contain;
    background: #fafafa;
  }
  .kv-caption {
    padding: 6px 12px;
    font-size: 7.5pt; color: #868e96;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
  }

  /* ── Approaches ── */
  .approach { margin-bottom: 10px; }
  .approach-title { font-size: 9pt; font-weight: 600; color: #1a1a2e; margin-bottom: 2px; }
  .approach-body { font-size: 8pt; color: #343a40; line-height: 1.7; }
  .approach-body .ab-line { display: block; margin-bottom: 2px; padding-left: 10px; text-indent: -10px; }
  .approach-body .ab-line::before { content: "· "; color: #868e96; }

  .approach-with-img {
    display: flex; gap: 14px; align-items: flex-start;
    margin-bottom: 10px;
  }
  .approach-with-img .approach-text { flex: 1; }
  .approach-with-img .approach-img {
    width: 220px; flex-shrink: 0;
    border-radius: 6px; overflow: hidden;
    border: 1px solid #dee2e6;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  }
  .approach-with-img .approach-img img { width: 100%; display: block; }

  /* ── Results ── */
  .results { margin-left: 16px; font-size: 8.5pt; margin-bottom: 8px; }
  .results li { margin-bottom: 3px; line-height: 1.5; }

  /* ── Bottom bar ── */
  .bottom-bar {
    margin-top: 14px; padding-top: 8px;
    border-top: 1px solid #dee2e6;
  }
  .tech { font-size: 7.5pt; color: #495057; margin-bottom: 6px; }
  .comp-label { font-size: 7.5pt; font-weight: 600; color: #495057; margin-bottom: 4px; }
  .competencies { display: flex; flex-wrap: wrap; gap: 5px; }
  .competency {
    display: inline-block; padding: 3px 10px; font-size: 7pt;
    border: 1px solid #dee2e6; border-radius: 12px; color: #495057;
    background: #f8f9fa;
  }
</style>
</head>
<body>

<!-- Cover page -->
<div class="cover">
  <div class="cover-accent"></div>

  <div class="cover-header">
    <h1>박건우</h1>
    <div class="en-name">GeonU Park</div>
    <div class="title-line">Data Scientist — Portfolio</div>
    <div class="tagline">
      비즈니스 의사결정에 필요한 질문을 정의하고, 숫자로 답하는 Data Scientist.<br/>
      본 문서는 주요 프로젝트 3건의 케이스 스터디 요약본입니다.<br/>
      <span style="font-size:9pt; color:#3b82f6;">더 자세한 프로젝트 내용은 포트폴리오 사이트에서 확인하실 수 있습니다 →
      <a href="${SITE_URL}" style="color:#3b82f6; text-decoration:underline;">${SITE_URL}</a></span>
    </div>
  </div>

  <div class="cover-stats">
    <div class="cover-stat">
      <div class="stat-val">3년+</div>
      <div class="stat-label">DA 팀 리드 경력</div>
    </div>
    <div class="cover-stat">
      <div class="stat-val">12건</div>
      <div class="stat-label">프로젝트 수행</div>
    </div>
    <div class="cover-stat">
      <div class="stat-val">5개+</div>
      <div class="stat-label">엔터프라이즈 고객사</div>
    </div>
    <div class="cover-stat">
      <div class="stat-val">60개+</div>
      <div class="stat-label">분석 대상 매장</div>
    </div>
  </div>

  <div class="cover-toc">
    <div class="cover-toc-title">수록 프로젝트</div>
    <div class="cover-toc-item">
      <span class="cover-toc-num">01</span>
      <span class="cover-toc-name">엔터프라이즈 고객사 매장 분석 인사이트 리포트</span>
      <span class="cover-toc-desc">KPI 설계 · 60개+ 매장</span>
    </div>
    <div class="cover-toc-item">
      <span class="cover-toc-num">02</span>
      <span class="cover-toc-name">KPI 이상치 탐지 시스템</span>
      <span class="cover-toc-desc">품질 관리 · 420개+ 포인트 자동 모니터링</span>
    </div>
    <div class="cover-toc-item">
      <span class="cover-toc-num">03</span>
      <span class="cover-toc-name">LLM 기반 상권 분석 리포트 자동화</span>
      <span class="cover-toc-desc">멀티 LLM Agent Flow · 3주→15분</span>
    </div>
  </div>

  <div class="cover-career">
    <div class="cover-career-title">경력 요약</div>
    <div class="cover-career-grid">
      <div>
        <div class="cover-company">메이아이 (mAy-I Inc.)</div>
        <div class="cover-role">Data Analyst / DA 팀 리드 | 2023.02 ~ 현재</div>
        <div class="cover-desc-text">
          LG전자, 삼성전자, 현대백화점 등 엔터프라이즈 고객사 대상 오프라인 매장 행동 데이터 분석 체계 설계 및 운영. DA 팀 0→3명 빌딩, LLM 기반 자동화 시스템 설계.
        </div>
      </div>
      <div>
        <div class="cover-company">데이콘 (Dacon)</div>
        <div class="cover-role">Data Scientist / 파트장 | 2021.09 ~ 2022.08</div>
        <div class="cover-desc-text">
          LG AI Research, 현대 NGV 등 엔터프라이즈 AI 경진대회 5회+ 제작. 서비스 퍼널 분석 및 개선으로 Active User +170%, 전환율 +77% 달성.
        </div>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    <div>2026.03</div>
    <div class="contact">
      <span>afnf33@gmail.com</span>
      <a href="${SITE_URL}">${SITE_URL}</a>
    </div>
  </div>
</div>

${projectPages}

</body>
</html>`;
}

// ── Main ──

async function main() {
  console.log("Building portfolio PDF (2 pages per project)...");

  const imagesDir = path.resolve(ROOT, "public/images");
  const html = buildFullHtml(imagesDir);

  // Save HTML preview
  const htmlPath = path.resolve(ROOT, "scripts/_portfolio-preview.html");
  fs.writeFileSync(htmlPath, html, "utf-8");
  console.log(`HTML preview: ${htmlPath}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  await page.pdf({
    path: OUTPUT,
    format: "A4",
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  const sizeKB = (fs.statSync(OUTPUT).size / 1024).toFixed(0);
  const buf = fs.readFileSync(OUTPUT).toString("latin1");
  const pageCount = (buf.match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`Done! ${OUTPUT}`);
  console.log(`  ${pageCount} pages, ${sizeKB} KB`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
