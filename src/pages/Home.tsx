import { Fragment, useEffect, useRef, useState } from 'react';
import useLoadMotion from '../hooks/useLoadMotion';
import useFadeIn from '../hooks/useFadeIn';
import { COMPANY_INFO } from '../constants';
import imgMap from '../assets/images/img_new_map.webp';
import logoLguplus from '../assets/images/logo/logo_lguplus.svg';
import logoGsshop from '../assets/images/logo/logo_gsshop.svg';
import logoAbl from '../assets/images/logo/logo_abl.svg';
import logoShinhan from '../assets/images/logo/logo_shinhan.png';
import logoDongyang from '../assets/images/logo/logo_dongyang.svg';
import logoNhLife from '../assets/images/logo/logo_nh_life.svg';
import logoSamsungLife from '../assets/images/logo/logo_samsung_life.svg';
import logoKb from '../assets/images/logo/logo_kb.svg';
import logoAllbakery from '../assets/images/logo/logo_allbakery.svg';

interface BusinessProject {
    subject: string[];
    date: string;
    logo: string;
    logoAlt: string;
}

interface BusinessSection {
    className: 'sec02' | 'sec03' | 'sec04';
    title: string[];
    desc: string[];
    projects: BusinessProject[];
}

// 메인 Business 섹션 데이터 (원본 문구 그대로)
const BUSINESS_SECTIONS: BusinessSection[] = [
    {
        className: 'sec02',
        title: ['Supports generative AI', 'optimized for corporate', 'business.'],
        desc: [
            'AX는 다양한 디바이스 애플리케이션과 연결되어 비즈니스 분야의',
            '새로운 가치를 만들어냅니다. 올웨이즈는 생성형 AI 사업수행 역량을 ',
            '보유한 디지털 선도 기업입니다.'
        ],
        projects: [
            { subject: ['LG유플러스', 'VOCLAB 사용 확대를', '위한 사용자 포탈 내 신규'], date: '2024.02 - 2024.06', logo: logoLguplus, logoAlt: 'LG U+' },
            { subject: ['GS SHOP', '상품 카테고리 자동분류 ', '백오피스 구축'], date: '2024.02 - 2024.08', logo: logoGsshop, logoAlt: 'GS SHOP' },
            { subject: ['ABL생명', 'AI OCR 보험금 청구', '화면 개발'], date: '2024.01 - 2024.04', logo: logoAbl, logoAlt: 'ABL 생명' },
            { subject: ['LG유플러스', '고객 PainPoint 분석을', '위한 VOC 검색 솔루션'], date: '2023.05 - 2023.12', logo: logoLguplus, logoAlt: 'LG U+' }
        ]
    },
    {
        className: 'sec03',
        title: ['We realize digital potential', 'beyond what you want.'],
        desc: [
            '디지털 분야의 오랜 경험과 역량으로 고객의 가치를 탐구하여',
            '새로운 경험으로 최상의 온라인 비즈니스 파트너가 되기 위해',
            '끊임없이 노력하겠습니다.'
        ],
        projects: [
            { subject: ['신한라이프', '더스퀘어앱 고도화'], date: '2024.07 - 2024.11', logo: logoShinhan, logoAlt: '신한라이프' },
            { subject: ['동양생명', '영업지원시스템 고도화'], date: '2024.06 - 2024.11', logo: logoDongyang, logoAlt: '동양생명' },
            { subject: ['신한라이프', 'CRM시스템 고도화'], date: '2024.05 - 2024.11', logo: logoShinhan, logoAlt: '신한라이프' },
            { subject: ['NH농협손해보험', '전사 통합이미지 시스템', '구축'], date: '2023.12 - 2024.12', logo: logoNhLife, logoAlt: 'NH농협손해보험' }
        ]
    },
    {
        className: 'sec04',
        title: ['Continuous management is', 'necessary in a rapidly', 'changing IT environment.'],
        desc: [
            '미래 변화에 탄력적으로 대응하고 고객이 요구하는 서비스를 함께 고민, 개선을 통해 고객 니즈에 최적화된',
            'IT 서비스를 제공하며 시스템 운영과 유지보수 등 기업의 핵심역량을 한 단계 더 높여드립니다.'
        ],
        projects: [
            { subject: ['신한라이프', '웹디자인 및 퍼블리싱', '업무 도급'], date: '2024 ~ 진행중', logo: logoShinhan, logoAlt: '신한라이프' },
            { subject: ['삼성생명', '더헬스 앱 및 챌린지 운영 '], date: '2022 ~ 진행중', logo: logoSamsungLife, logoAlt: '삼성생명' },
            { subject: ['KB손해보험', '다이렉트 디자인', '연간 운영 '], date: '2022 ~ 진행중', logo: logoKb, logoAlt: 'kb손해보험' },
            { subject: ['올베이커리', 'PC, Mobile 사이트', '연간 운영'], date: '2022 ~ 진행중', logo: logoAllbakery, logoAlt: '올베이커리' }
        ]
    }
];

// 오른쪽 하단 섹션 표시 (원본 navCommBox)
const NAV_LIST = ['First', 'AI-ways', 'DX expert', 'Maintenance'];

const SEC01_TITLE = ['We create a new DX·AX', 'with ideas, technology and', 'emotions.'];
const SEC01_DESC = [
    '올웨이즈는 기업에 디지털분야에 최적화된 서비스를 제공하여',
    '새로운 비즈니스 가치를 만들어 갑니다.',
    '빅데이터, AI 등 최신 IT 기술의 오랜 기간 쌓아온 경험과 역량을',
    '바탕으로 고객 만족도를 제고합니다.'
];

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const renderLines = (lines: string[]) =>
    lines.map((line, index) => (
        <Fragment key={line}>
            {index > 0 && <br />}
            {line}
        </Fragment>
    ));

const Home = () => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const sec01Ref = useRef<HTMLElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const { isLoad, isBefore } = useLoadMotion();
    const [navIndex, setNavIndex] = useState(-1);

    useFadeIn(wrapRef);

    // 원본 GSAP ScrollTrigger 동작을 스크롤 진행률(CSS 변수)로 옮겼습니다.
    // --parallax: 배경 오브젝트 이동, --itemProgress: 프로젝트 카드 상승, --descFade: 설명 문구 사라짐
    useEffect(() => {
        let frameId = 0;

        const update = () => {
            const viewHeight = window.innerHeight;
            const center = viewHeight / 2;

            sectionRefs.current.forEach((section) => {
                if (!section) return;
                const { top, bottom, height } = section.getBoundingClientRect();
                const parallax = clamp((viewHeight - top) / (viewHeight + height + 300));
                const itemProgress = clamp((viewHeight - top) / (viewHeight + height));
                const fadeStart = viewHeight * 2.5;
                const descFade = clamp((fadeStart - bottom) / (fadeStart - 1300));

                // [inline-style] 스크롤 진행률: 스크롤 위치에 따라 런타임에 계산되는 값 (CSS에서 transform/opacity 계산에 사용)
                section.style.setProperty('--parallax', parallax.toFixed(4));
                section.style.setProperty('--itemProgress', itemProgress.toFixed(4));
                section.style.setProperty('--descFade', descFade.toFixed(4));
            });

            // 섹션 하단이 화면 중앙을 지나면 오른쪽 하단 표시를 바꿉니다.
            const passed = [sec01Ref.current, ...sectionRefs.current].map(
                (section) => (section ? section.getBoundingClientRect().bottom < center : false)
            );
            const passedCount = passed.filter(Boolean).length;
            setNavIndex(passedCount >= 1 && passedCount <= 3 ? passedCount : -1);
        };

        const handleScroll = () => {
            window.cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const loadClass = `${isBefore ? ' before' : ''}${isLoad ? ' load' : ''}`;

    return (
        <div className="newMainWrap" ref={wrapRef}>
            <div className="newMainSecWrap">
                <section className={`newMainSec sec01${loadClass}`} id="business" ref={sec01Ref} aria-label="Business">
                    <div className="background">
                        <div className="filter" />
                        <div className="titleBox mHide">
                            <h2 className="title">
                                {SEC01_TITLE.map((line) => (
                                    <span className="txtLine" key={line}><em>{line}</em></span>
                                ))}
                            </h2>
                            <p className="desc">
                                {SEC01_DESC.map((line) => (
                                    <span className="txtLine" key={line}><em>{line}</em></span>
                                ))}
                            </p>
                        </div>
                        <div className="titleBox wHide">
                            <h2 className="title" data-motion="bottom-fade-in">{SEC01_TITLE.join(' ')}</h2>
                            <p className="desc" data-motion="bottom-fade-in">{SEC01_DESC.join(' ')}</p>
                        </div>
                        <div className="navBox">
                            <div className="first">
                                <div className="scroll"><span>Scroll down</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                {BUSINESS_SECTIONS.map((section, sectionIndex) => (
                    <section
                        className={`newMainSec ${section.className}`}
                        key={section.className}
                        ref={(element) => {
                            sectionRefs.current[sectionIndex] = element;
                        }}
                        aria-label={NAV_LIST[sectionIndex + 1]}
                    >
                        <div className="background">
                            <div className="filter" />
                            <div className="object" />
                            <div className="titleBox">
                                <h2 className="title" data-motion="bottom-fade-in">{renderLines(section.title)}</h2>
                                <p className="desc">
                                    <span data-motion="bottom-fade-in">{renderLines(section.desc)}</span>
                                </p>
                            </div>
                        </div>
                        <ul className="projectList">
                            {section.projects.map((project) => (
                                <li className="item" key={`${project.subject.join('')}-${project.date}`}>
                                    <div>
                                        <div className="subject">{renderLines(project.subject)}</div>
                                        <div className="date">{project.date}</div>
                                    </div>
                                    <div className="logo"><img src={project.logo} alt={project.logoAlt} /></div>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}

                <section className="newMainSec contact" id="contact" aria-label="Contact">
                    <div className="contactInfo">
                        <h2 className="title" data-motion="bottom-fade-in">Contact</h2>
                        <dl data-motion="bottom-fade-in">
                            <dt>Address</dt>
                            <dd>{COMPANY_INFO.addressKo}</dd>
                        </dl>
                        <dl data-motion="bottom-fade-in">
                            <dt>Tel</dt>
                            <dd>{COMPANY_INFO.tel}</dd>
                        </dl>
                        <dl data-motion="bottom-fade-in">
                            <dt>E-mail</dt>
                            <dd><a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a></dd>
                        </dl>
                    </div>
                    <div className="mapArea" data-motion="bottom-fade-in">
                        <a href={COMPANY_INFO.mapUrl} target="_blank" rel="noreferrer" aria-label="카카오맵에서 올웨이즈 위치 보기 (새 창)">
                            <img src={imgMap} alt="올웨이즈 위치 지도: 서울시 마포구 월드컵북로 63, 서레빌딩 6층" />
                        </a>
                    </div>
                    <p className="copyright">(C) alwaysinc. All Rights Reserved.</p>
                </section>
            </div>

            <div className={`navCommBox${navIndex > 0 ? ' acitve' : ''}`} aria-hidden="true">
                <div className="enter">
                    <div className="enterIn">
                        {NAV_LIST.map((label, index) => (
                            <div className={`nav${index === navIndex ? ' on' : ''}`} key={label}>
                                <span data-text={label}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
