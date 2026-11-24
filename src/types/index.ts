// /project 페이지 포트폴리오 (상단 카드 목록)
export interface MainProject {
    id: number;
    name: string;
    type: string;
    thumb: string;
    pcImages: string[];
    mobileImages: string[];
}

// /project 페이지 전체 프로젝트 이력
export interface HistoryProject {
    id: number;
    name: string;
    field: string;
    year: string;
}

// IA 관리 화면 (docs/ia-spec.md 원본 구조 유지)
// Task 상태: 0 Undone(코딩중), 1 Done(코딩완료), 2 Modify(완료 후 수정), 3 Delete(완료 후 삭제)
export type TaskKey = '0' | '1' | '2' | '3';

export interface Cell {
    className: string;
    text: string;
}

export interface HeaderCell {
    className: string;
    text: string;
}

export interface IaTable {
    id: string;
    title: string;
    path: string;
    headers: HeaderCell[];
    rows: Cell[][];
}
