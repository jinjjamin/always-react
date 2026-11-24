# 작업 목록 (Tasks)

> AI와 사람이 **지금 무엇을 할 차례인지** 확인하는 문서입니다.
> 위에서부터 순서대로 하나씩 진행하고, 끝나면 `[x]`로 체크합니다.
> 각 작업 옆의 `(US-xx)`는 `requirements.md`의 사용자 스토리 번호입니다.

---

## 진행 상태
- **현재 단계**: Phase 4 (마무리 점검)
- **다음 작업**: 4-1 실제 기기 반응형 점검, 미결정 사항 확인 (requirements.md 7장)
- **막힌 부분**: 없음

---

## Phase 1. 초기 구성

- [x] 1-1. Vite + React + TypeScript 프로젝트 생성, React Router 설치
- [x] 1-2. `AGENTS.md` 폴더 구조대로 폴더 생성, Vite 예제 파일 삭제
- [x] 1-3. `types/index.ts`, `constants/index.ts` 작성
- [x] 1-4. 원본 사이트 이미지·로고·폰트 에셋 내려받기 (중복 제거)
- [x] 1-5. `Layout`(`#siteWrap`), 디자인 토큰, `/Ia`, `/Guide` 라우트 구성, IA에 Guide 등록
- [x] 1-6. `npm run build` 통과 확인

## Phase 2. 공통 컴포넌트 + Guide

- [x] 2-1. `Logo` (메인 헤더·전체메뉴 / 서브 헤더·로딩) + Guide 섹션
- [x] 2-2. `Modal` (전체메뉴·Contact·포트폴리오 상세) + Guide 섹션
- [x] 2-3. `AlwaysInfo` (Footer·Contact 레이어) + Guide 섹션
- [x] 2-4. 공통 레이아웃 `Header`(메인/서브), `Footer`, `Cursor`
- [x] 2-5. 공통 훅 `useLoadMotion`, `useFadeIn`

## Phase 3. 페이지

- [x] 3-1. 메인 `/` — Business 섹션 스크롤 모션, Contact, 섹션 표시, 모바일 전체메뉴 (US-01) · IA 등록
- [x] 3-2. 프로젝트 `/project` — 비주얼, 포트폴리오·상세 레이어, 이력 더보기, Footer, Contact 레이어 (US-02) · IA 등록

## Phase 4. 마무리

- [ ] 4-1. 실제 기기 반응형 점검 (360px / 768px / 1024px / 1280px / 1920px) — 브라우저 에뮬레이션(375px, 1440px)만 확인함
- [x] 4-2. 접근성 점검 (`alt`, 키보드 포커스, 레이어 ESC 닫기·포커스 복귀)
- [x] 4-3. 하드코딩된 색상·연락처를 토큰·상수로 정리
- [x] 4-4. `console.log` 없음, `npm run lint` 통과
- [x] 4-5. `npm run build` 최종 확인
- [x] 4-6. 문서와 실제 코드 일치 확인 (requirements, design 업데이트)
- [x] 4-7. IA(`src/data/iaData.ts`) 화면 목록·경로·상태가 실제 라우트와 tasks.md 완료 기록과 일치
- [x] 4-8. `/Guide` 최상단 등록, IA 필터·집계, Guide 앵커·`on`·`aria-current` 확인
- [ ] 4-9. `node scripts/check-project.mjs` 실행 — 스크립트가 프로젝트에 없어 미실행
- [x] 4-10. 반응형 방식(max-width) 예외 승인 (2026-11-24, design.md 10장 ADR)

---

## 완료 기록

| 날짜 | 작업 | 메모 |
|---|---|---|
| 2026-11-24 | 웹폰트 서브셋 | 9개 woff2 재생성. build·lint 통과, 브라우저에서 Pretendard·Gmarket·Outfit 로드 확인 |
| 2026-11-24 | 이미지 최적화 | PNG/JPG 26개 → WebP. build·lint 통과, 메인·프로젝트·상세 레이어 이미지 표시 확인 |
| 2026-11-24 | Phase 1~3, 4-2~4-8 | alwaysinc.co.kr `/`, `/project`를 React로 전환. build·lint 통과, 브라우저(1440px·375px)에서 화면·레이어·더보기·IA·Guide 동작 확인 |

## 나중에 할 것 (Backlog)

- [ ] 실제 API 연동 (`/public/getMain.ax`)
- [ ] 카카오맵 API 적용
- [ ] 메인 섹션 자동 스냅 스크롤
- [x] 원본 이미지 용량 최적화 (WebP 변환·리사이즈, 29.3MB → 6.6MB)
- [x] 웹폰트 서브셋 (6.1MB → 1.46MB, Gmarket·Outfit 깨진 woff2 교체)
- [ ] 레이어 열림 시 커서 확대 전환 효과, Contact 제목 타이핑 효과
