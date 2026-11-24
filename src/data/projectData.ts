import project126Thumb from '../assets/images/project/project126Thumb.webp';
import project126Pc1 from '../assets/images/project/project126Pc1.webp';
import project125Thumb from '../assets/images/project/project125Thumb.webp';
import project125Pc1 from '../assets/images/project/project125Pc1.webp';
import project124Thumb from '../assets/images/project/project124Thumb.webp';
import project124Pc1 from '../assets/images/project/project124Pc1.webp';
import project123Thumb from '../assets/images/project/project123Thumb.webp';
import project123Pc1 from '../assets/images/project/project123Pc1.webp';
import project122Thumb from '../assets/images/project/project122Thumb.webp';
import project122Pc1 from '../assets/images/project/project122Pc1.webp';
import project121Thumb from '../assets/images/project/project121Thumb.webp';
import project121Pc1 from '../assets/images/project/project121Pc1.webp';
import project120Thumb from '../assets/images/project/project120Thumb.webp';
import project120Pc1 from '../assets/images/project/project120Pc1.webp';
import project119Thumb from '../assets/images/project/project119Thumb.webp';
import project119Pc1 from '../assets/images/project/project119Pc1.webp';
import project118Thumb from '../assets/images/project/project118Thumb.webp';
import project118Pc1 from '../assets/images/project/project118Pc1.webp';
import project117Thumb from '../assets/images/project/project117Thumb.webp';
import project117Pc1 from '../assets/images/project/project117Pc1.webp';
import type { HistoryProject, MainProject } from '../types';

// /project 페이지 목업 데이터
// - 원본 사이트(alwaysinc.co.kr/project)의 getMain.ax 응답(2026-11-24 기준)을 옮긴 데이터입니다.
// - 이미지는 원본 업로드 파일을 내려받아 중복을 제거하고 WebP로 변환(썸네일 1440px, 상세 1920px 너비)해 src/assets/images/project/에 저장했습니다.

export const MAIN_PROJECTS: MainProject[] = [
    {
        id: 126,
        name: "allBakery for cafes",
        type: "Shopping Platform",
        thumb: project126Thumb,
        pcImages: [project126Pc1],
        mobileImages: [project126Pc1]
    },
    {
        id: 125,
        name: "간병인 플랫폼 토닥씨",
        type: "Admin Platform",
        thumb: project125Thumb,
        pcImages: [project125Pc1],
        mobileImages: [project125Pc1]
    },
    {
        id: 124,
        name: "ABL생명 모바일 센터",
        type: "Insurance Platform",
        thumb: project124Thumb,
        pcImages: [project124Pc1],
        mobileImages: [project124Pc1]
    },
    {
        id: 123,
        name: "동양생명 모바일 청약",
        type: "Insurance Platform",
        thumb: project123Thumb,
        pcImages: [project123Pc1],
        mobileImages: [project123Pc1]
    },
    {
        id: 122,
        name: "NH손해보험 디지털혁신모델",
        type: "Insurance Platform",
        thumb: project122Thumb,
        pcImages: [project122Pc1],
        mobileImages: [project122Pc1]
    },
    {
        id: 121,
        name: "건강한 습관의 시작 스마트 케어",
        type: "Diet and Health Application",
        thumb: project121Thumb,
        pcImages: [project121Pc1],
        mobileImages: [project121Pc1]
    },
    {
        id: 120,
        name: "더 건강해지는 습관 삼성생명 더 헬스",
        type: "Health Care Application",
        thumb: project120Thumb,
        pcImages: [project120Pc1],
        mobileImages: [project120Pc1]
    },
    {
        id: 119,
        name: "같이 건강하게 시니어스",
        type: "Health and Fitness Application",
        thumb: project119Thumb,
        pcImages: [project119Pc1],
        mobileImages: [project119Pc1]
    },
    {
        id: 118,
        name: "LG U+ 고객케어 플랫폼",
        type: "Admin Platform",
        thumb: project118Thumb,
        pcImages: [project118Pc1],
        mobileImages: [project118Pc1]
    },
    {
        id: 117,
        name: "LG 퓨리케어 전자식 마스크",
        type: "Wearable Air Purifier Application",
        thumb: project117Thumb,
        pcImages: [project117Pc1],
        mobileImages: [project117Pc1]
    }
];

export const HISTORY_PROJECTS: HistoryProject[] = [
    { id: 116, name: "ABL생명 모바일 사이버창구 리뉴얼", field: "PLAN/DESIGN/HTML", year: "2022" },
    { id: 114, name: "KB손해보험 모바일 대표 및 다이렉트 통합 구축", field: "HTML", year: "2022" },
    { id: 113, name: "삼성화재 애니핏 2차 고도화", field: "HTML", year: "2022" },
    { id: 112, name: "삼성화재 애니핏 운영", field: "HTML", year: "2022" },
    { id: 111, name: "올베이커리 PC/MO 사이트 구축 및 운영", field: "PLAN/DESIGN/HTML/DEVELOPMENT", year: "2022" },
    { id: 110, name: "동양생명 모바일청약 리뉴얼", field: "DESIGN/HTML", year: "2022" },
    { id: 109, name: "동양생명 가입설계 고도화", field: "DESIGN/HTML", year: "2022" },
    { id: 108, name: "KOCES 웹스토어 서비스 리뉴얼", field: "PLAN", year: "2022" },
    { id: 107, name: "대신저축은행 스마트뱅킹 리뉴얼", field: "PLAN/DESIGN/HTML", year: "2022" },
    { id: 106, name: "DB생명 화상상담 구축", field: "DESIGN/HTML", year: "2022" },
    { id: 105, name: "KDB생명 모바일 영업지원시스템 구축", field: "PLAN/DESIGN/HTML", year: "2022" },
    { id: 104, name: "시니어 간병인 플랫폼 토닥씨 구축 진행 중", field: "PLAN/DESIGN/HTML/DEVELOPMENT", year: "2022" },
    { id: 103, name: "NH손해보험 디지털혁신모델 구축", field: "PLAN/DESIGN/HTML", year: "2022" },
    { id: 102, name: "LG U+ 고객 불편경험케어 UI개발 연간과제", field: "PLAN/DESIGN/HTML/DEVELOPMENT", year: "2022" },
    { id: 101, name: "롯데카드 로카시스템 고도화", field: "HTML", year: "2022" },
    { id: 100, name: "제주용암수 PC/MO 구축", field: "HTML", year: "2022" },
    { id: 99, name: "삼성생명 더 헬스 월간 챌린지 운영", field: "PLAN/DESIGN/HTML", year: "2022" },
    { id: 98, name: "KB손해보험 다이렉트 디자인 연간 운영", field: "DESIGN", year: "2022" },
    { id: 97, name: "KB헬스케어오케어 MVP21 홈페이지 구축", field: "DESIGN/HTML", year: "2022" },
    { id: 96, name: "한국국제기아대책기구 캠페인 운영", field: "HTML", year: "2022" },
    { id: 95, name: "꼬잇핏/디지핏 꼬잇 플랫폼 구축 및 고도화", field: "PLAN/DESIGN/HTML", year: "2022" },
    { id: 94, name: "라이프시맨틱스 시니어스 앱 구축", field: "DESIGN", year: "2022" },
    { id: 93, name: "삼성생명 건강관리서비스 앱 [더 헬스] 구축", field: "PLAN/DESIGN/HTML", year: "2022" },
    { id: 92, name: "삼성화재 애니핏 리뉴얼 구축", field: "HTML", year: "2022" },
    { id: 91, name: "JTBC 러너블 앱 구축 [걷기/달리기 및 마라톤 대회앱]", field: "PLAN/DESIGN/HTML", year: "2022" },
    { id: 90, name: "꼬잇 펫케어 플랫폼 구축 및 운영", field: "PLAN/DESIGN/HTML", year: "2022" },
    { id: 89, name: "한화손해보험 일반보험 가입설계 및 출력물 고도화", field: "HTML", year: "2022" },
    { id: 88, name: "KBS 시청률관리 차트디자인 프로그램 구축", field: "HTML", year: "2022" },
    { id: 87, name: "SK에너지 리뉴얼", field: "HTML", year: "2022" },
    { id: 86, name: "랜선에듀 튜더링 POC 구축", field: "HTML", year: "2022" },
    { id: 85, name: "레오파트라 PC구축 및 운영", field: "DESIGN/HTML", year: "2022" },
    { id: 84, name: "KB손해보험 다이렉트 장기일반 PC상품 확대 및 UX개선", field: "PLAN/DESIGN/HTML/DEVELOPMENT", year: "2022" },
    { id: 83, name: "우리카드 통합정산시스템 구축", field: "DESIGN/HTML", year: "2022" },
    { id: 82, name: "에임메드-SK하이닉스 임직원 12대 질환케어 플랫폼 EHP 구축", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 81, name: "우리카드 할부금융 리스/렌트 모바일 비대면 고도화", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 80, name: "신한라이프 영업지원시스템 리브랜딩 DAY1", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 79, name: "신한라이프 영업지원시스템 AiTOM main 리뉴얼", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 78, name: "DB생명 가입설계고도화", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 77, name: "보이스캐디 미국 및 일본 사이트 회원 통합", field: "HTML", year: "2021" },
    { id: 76, name: "CJ O쇼핑 홈쇼핑 방송송출화면 개발", field: "HTML/DEVELOPMENT", year: "2021" },
    { id: 75, name: "SKE&S 반응형웹 리뉴얼", field: "HTML", year: "2021" },
    { id: 74, name: "SK 복리후생 웹사이트 구축", field: "HTML/DEVELOPMENT", year: "2021" },
    { id: 73, name: "KB헬스케어 오케어 관리자 구축", field: "DESIGN/HTML", year: "2021" },
    { id: 72, name: "NH손해보험 보장분석구축 및 비대면 서비스개발", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 71, name: "케이카캐피탈 모바일웹 고도화 개발", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 70, name: "라이프시맨틱스 닥터콜 PC디자인 고도화 및 모바일 구축", field: "DESIGN/HTML", year: "2021" },
    { id: 69, name: "신한/오렌지라이프 통합 신한코코 옴니청약 고도화", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 68, name: "신한/오렌지라이프 통합 오렌지 옴니청약 구축", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 67, name: "신한라이프 신한 코코 영업지원시스템 스마트폰 구축", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 66, name: "신한라이프 클릭내보장(보장분석) PC 및 보고서 리뉴얼", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 65, name: "신한라이프 통합 안내장 및 보고서 리뉴얼", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 64, name: "하나카드 마이데이터 공급서비스 구축", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 63, name: "흥국화재 모바일 웹사이트 리뉴얼", field: "HTML", year: "2021" },
    { id: 62, name: "흥국생명 모바일 웹사이트 리뉴얼", field: "HTML", year: "2021" },
    { id: 61, name: "LH 스마트홈넷 하이브리드앱 구축", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 60, name: "설램 하이브리드 앱 개발", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 59, name: "LG전자 전자식 마스크 네이티브 앱 구축", field: "PLAN/DESIGN", year: "2021" },
    { id: 58, name: "삼성화재 스포츠안전재단 연계시스템 구축", field: "DESIGN/HTML", year: "2021" },
    { id: 57, name: "천재교육 티셀파 통합 및 수학 컨텐츠 리뉴얼", field: "HTML", year: "2021" },
    { id: 56, name: "한화생명 헬로 앱 고도화", field: "PLAN/HTML", year: "2021" },
    { id: 55, name: "SCI평가정보 비즈레이팅 PC/MOBILE 리뉴얼", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 54, name: "봄툰 자유연재소설 PC/MO 플랫폼 구축", field: "HTML/DEVELOPMENT", year: "2021" },
    { id: 53, name: "미샤 눙크 PC/MO 웹사이트 운영", field: "HTML/DEVELOPMENT", year: "2021" },
    { id: 52, name: "제주ITS PC/MOBILE 반응형 웹 구축", field: "PLAN/DESIGN/HTML/DEVELOPMENT", year: "2021" },
    { id: 51, name: "유진저축은행 PC/MO 디지털채널2.0 구축", field: "HTML/DEVELOPMENT", year: "2021" },
    { id: 50, name: "두산DMI 태양광발전소 드론디플로이 솔루션 구축", field: "PLAN/DESIGN/HTML/DEVELOPMENT", year: "2021" },
    { id: 49, name: "파미유 PC/MOBILE 웹사이트 및 물류관리시스템 연간운영", field: "PLAN/DESIGN/HTML/DEVELOPMENT", year: "2021" },
    { id: 48, name: "DB생명 GA 모바일 웹 고도화 및 영업지원시스템 고도화", field: "PLAN/DESIGN/HTML", year: "2021" },
    { id: 47, name: "빅히트엔터테인먼트 사내 웹사이트 구축", field: "HTML", year: "2021" },
    { id: 46, name: "더웨이 관리자 웹 구축", field: "HTML", year: "2021" },
    { id: 45, name: "신한생명 SFA 통합구축 및 모바일 개편", field: "HTML", year: "2020" },
    { id: 44, name: "OK저축은행 P2P대출 PC/MOBILE/APP 신규구축", field: "PLAN/DESIGN/HTML/DEVELOPMENT", year: "2020" },
    { id: 43, name: "파미유 PC/MOBILE 웹사이트 및 물류관리시스템 연간운영", field: "PLAN/DESIGN/HTML/DEVELOPMENT", year: "2020" },
    { id: 42, name: "DGB생명 모바일 웹 및 Msmart 고도화", field: "DESIGN/HTML", year: "2020" },
    { id: 41, name: "NH스마트고지 고도화 및 NH오픈플랫폼 고도화 구축", field: "DESIGN/HTML", year: "2020" },
    { id: 40, name: "한국국제기아대책기구 신규 캠페인 다수 구축", field: "DESIGN/HTML", year: "2020" },
    { id: 39, name: "상상인저축은행 리뉴얼", field: "HTML", year: "2020" },
    { id: 38, name: "오렌지라이프 SFA 비교설계 구축", field: "HTML", year: "2020" },
    { id: 37, name: "KDB산업은행 온랜딩대출 구축", field: "PLAN/DESIGN/HTML", year: "2020" },
    { id: 36, name: "현대해상 보상포탈 구축", field: "HTML", year: "2020" },
    { id: 35, name: "메리츠화재 보장분석 구축", field: "DESIGN/HTML", year: "2020" },
    { id: 34, name: "NS홈쇼핑 TV송출화면 구축", field: "HTML", year: "2020" },
    { id: 33, name: "KB손해보험 SME 법인 모바일 플랫폼 구축", field: "HTML", year: "2020" },
    { id: 32, name: "현대홈쇼핑/NS홈쇼핑 방송송출화면 퍼블리싱", field: "HTML", year: "2020" },
    { id: 31, name: "엘지생활건강 숨:37도 매월 샘플링 이벤트 서버 운영", field: "HTML/DEVELOPMENT", year: "2020" },
    { id: 30, name: "티시스 DMP(디지털마케팅플랫폼) 구축", field: "PLAN/DESIGN/HTML", year: "2020" },
    { id: 29, name: "KCB 올크레딧 PC/MOBILE/APP 리뉴얼", field: "HTML", year: "2020" },
    { id: 28, name: "삼성자산운용 전문투자자플랫폼 구축", field: "HTML", year: "2020" },
    { id: 27, name: "LG ISCBPAI 자산관리 시스템 구축", field: "PLAN/DESIGN/HTML", year: "2020" },
    { id: 26, name: "CNPRx 2020 샘플링 이벤트 구축", field: "HTML", year: "2020" },
    { id: 25, name: "2020 현대백화점 설 선물 스마트가이드 웹/모바일 사이트 구축", field: "HTML", year: "2020" },
    { id: 24, name: "SKT 공공문자알리미 반응형 웹 구축", field: "HTML", year: "2020" },
    { id: 23, name: "KCB 계열사포함 웹/모바일 및 APP 연간 운영", field: "DESIGN/HTML", year: "2020" },
    { id: 22, name: "현대해상 일반손사 구축", field: "HTML", year: "2020" },
    { id: 21, name: "한국주택금융공사 차세대정보시스템 참여", field: "DESIGN/HTML", year: "2020" },
    { id: 20, name: "시큐사인 전자결제서비스 반응형 신규 구축", field: "DESIGN/HTML", year: "2020" }
];
