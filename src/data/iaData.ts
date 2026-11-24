import type { Cell, HeaderCell, IaTable, TaskKey } from '../types';

// IA 관리 화면 데이터 (docs/ia-spec.md)
// - 화면 목록은 docs/requirements.md 페이지 목록과 실제 React Router 경로 기준입니다.
// - Task 상태는 docs/tasks.md 완료 기록 기준이며, 페이지를 추가·수정하면 이 파일도 함께 갱신합니다.

export const TASKS: { key: TaskKey; name: string }[] = [
    { key: '0', name: 'Undone' },
    { key: '1', name: 'Done' },
    { key: '2', name: 'Modify' },
    { key: '3', name: 'Delete' }
];

// 프로젝트마다 바꾸는 값: title(h1 <em> 문구), worksheet(작업 영역 제목)
// notice 문구는 원본 그대로 유지합니다.
export const IA_INFO = {
    title: '올웨이즈',
    worksheet: 'Worksheet: Web',
    notice: 'Undone: 코딩중, Done: 코딩완료, Modify: 코딩 완료 후 HTML수정, Delete: 코딩 완료 후 SB삭제'
};

// 메뉴 깊이 열 개수 (원본 기본값: 5~6. 프로젝트 메뉴 깊이에 맞게 조정)
const DEPTH_COUNT = 2;

const createHeaders = (depthCount: number): HeaderCell[] => [
    ...Array.from({ length: depthCount }, (_, index) => ({ className: 'menuDepth', text: `Depth${index + 1}` })),
    { className: 'fileName', text: 'File Name/ID' },
    { className: 'dueDate', text: 'Done/Modify' },
    { className: 'people', text: 'People' },
    { className: 'issueMemo', text: 'Issue/Memo' },
    { className: 'checkTask', text: 'Task' }
];

interface RowOption {
    date?: string;
    people?: string;
    memo?: string;
    task?: TaskKey;
}

// depths: 메뉴 깊이별 이름 (상위 메뉴와 같은 행이 아니면 빈 문자열)
// fileName: 실제 React Router 경로 (IA에서 새 창 열기·미리보기 링크로 사용)
// task 기본값은 '0'(Undone). 검증된 페이지만 '1'(Done)로 바꿉니다.
const createRow = (depths: string[], fileName: string, option: RowOption = {}): Cell[] => {
    const { date = '', people = '', memo = '', task = '0' } = option;
    return [
        ...Array.from({ length: DEPTH_COUNT }, (_, index) => ({ className: 'menuDepth', text: depths[index] ?? '' })),
        { className: 'fileName', text: fileName },
        { className: 'date', text: date },
        { className: 'people', text: people },
        { className: 'issueMemo', text: memo },
        { className: 'checkTask', text: task }
    ];
};

// 배포 경로(GitHub Pages: /always-react/)를 붙인 실제 접속 경로. 개발 서버에서는 BASE_URL이 / 입니다.
const toRoute = (route: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${route}`;

// 메뉴(테이블)마다 id는 menuIdx1부터 순서대로 부여합니다.
// Guide는 필수 고정 항목이며 항상 첫 번째(menuIdx1)에 둡니다. (docs/guide-spec.md)
export const IA_TABLES: IaTable[] = [
    {
        id: 'menuIdx1',
        title: 'Guide',
        path: '',
        headers: createHeaders(DEPTH_COUNT),
        rows: [createRow(['Guide'], toRoute('/Guide'), { date: '2026-11-24', task: '1' })]
    },
    {
        id: 'menuIdx2',
        title: 'Business',
        path: '',
        headers: createHeaders(DEPTH_COUNT),
        rows: [createRow(['메인 (Business·Contact)'], toRoute('/'), { date: '2026-11-24', task: '1', memo: '원본 지도는 카카오맵 API → 이미지 링크로 대체' })]
    },
    {
        id: 'menuIdx3',
        title: 'Project',
        path: '',
        headers: createHeaders(DEPTH_COUNT),
        rows: [createRow(['Project'], toRoute('/project'), { date: '2026-11-24', task: '1', memo: '포트폴리오·프로젝트 이력은 원본 응답을 목업 데이터로 변환' })]
    }
];
