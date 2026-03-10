# Portfolio Site - 박건우 (GeonU Park)

Data Scientist 포트폴리오 사이트. 비즈니스 의사결정에 필요한 질문을 정의하고, 숫자로 답하는 데이터 사이언티스트의 14개 프로젝트 케이스 스터디와 AI Assistant를 제공합니다.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4, Geist Sans/Mono
- **Content**: MDX (`next-mdx-remote/rsc`)
- **AI Assistant**: OpenAI gpt-4o-mini + text-embedding-3-small (RAG)
- **Deployment**: Vercel

## Features

- 14개 프로젝트 케이스 스터디 (MDX)
- AI Assistant - RAG 기반 포트폴리오 챗봇
- 다크/라이트 테마
- 반응형 디자인
- 프로젝트 상세 페이지 목차 (sticky scroll)

## Project Structure

```
content/projects/     # 14개 프로젝트 MDX 파일
scripts/              # RAG 인덱스 빌드 스크립트
src/
  app/                # Next.js App Router 페이지
    ai/               # AI Assistant 페이지
    api/chat/         # Chat API Route
    projects/         # 프로젝트 목록 및 상세
    about/            # About 페이지
    resume/           # 이력서 페이지
  components/         # React 컴포넌트
  lib/                # 유틸리티 (MDX 로더, RAG, 타입)
```

## Getting Started

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## RAG Index

AI Assistant는 프로젝트 콘텐츠에서 생성한 벡터 인덱스를 사용합니다. MDX 파일을 수정한 경우 인덱스를 재빌드해야 합니다.

```bash
# .env.local에 OPENAI_API_KEY 필요
node scripts/build-rag-index.mjs
```

## Environment Variables

| 변수 | 설명 |
|------|------|
| `OPENAI_API_KEY` | OpenAI API 키 (AI Assistant용) |
