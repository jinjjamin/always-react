import { useCallback, useEffect, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import Logo from '../components/common/Logo';
import Modal from '../components/common/Modal';
import AlwaysInfo from '../components/common/AlwaysInfo';
import '../assets/css/common.css';
import '../assets/css/guide.css';

// 공통 컴포넌트 UI Guide (/Guide) — docs/guide-spec.md 기준
// - 공통 Header·Footer·Layout을 적용하지 않는 독립 화면입니다.
// - Guide 화면 스타일은 guide.css, 실제 UI 미리보기는 #siteWrap(common.css) 범위 안에서 렌더링합니다.

interface GuideItemProps {
    title: string;
    desc?: string;
    children: ReactNode;
}

interface PropRow {
    name: string;
    type: string;
    defaultValue: string;
    description: string;
}

interface GuideSectionInfo {
    id: string;
    category: string;
    name: string;
    path: string;
}

const SECTIONS: GuideSectionInfo[] = [
    { id: 'logo', category: 'COMMON', name: 'Logo', path: 'src/components/common/Logo.tsx' },
    { id: 'modal', category: 'COMMON', name: 'Modal', path: 'src/components/common/Modal.tsx' },
    { id: 'alwaysInfo', category: 'COMMON', name: 'AlwaysInfo', path: 'src/components/common/AlwaysInfo.tsx' }
];

const LOGO_PROPS: PropRow[] = [
    { name: 'type', type: "'circle' | 'symbol'", defaultValue: "'circle'", description: 'circle: 메인 헤더·전체메뉴 원형 로고(48px) / symbol: 서브 헤더·로딩 심볼 로고(32px)' },
    { name: 'isLink', type: 'boolean', defaultValue: 'true', description: 'true면 홈(/)으로 이동하는 링크로 감쌉니다. 로딩처럼 장식용이면 false' }
];

const MODAL_PROPS: PropRow[] = [
    { name: 'id', type: 'string', defaultValue: '-', description: '레이어 id (열기 버튼의 aria-controls와 연결)' },
    { name: 'className', type: "'allMenuPop' | 'contactSub' | 'portfolioSub'", defaultValue: '-', description: '레이어 종류별 스타일 클래스' },
    { name: 'isOpen', type: 'boolean', defaultValue: '-', description: '열림 여부' },
    { name: 'title', type: 'string', defaultValue: '-', description: '스크린리더용 레이어 이름 (aria-label)' },
    { name: 'onClose', type: '() => void', defaultValue: '-', description: '닫기 버튼·ESC 키 동작. useCallback으로 고정된 함수를 전달합니다' },
    { name: 'children', type: 'ReactNode', defaultValue: '-', description: '.bodyArea 안에 들어갈 내용' }
];

const ALWAYS_INFO_PROPS: PropRow[] = [
    { name: 'hasMotion', type: 'boolean', defaultValue: 'false', description: 'true면 data-motion="bottom-fade-in" 스크롤 모션을 붙입니다 (Footer에서 사용)' }
];

const GuideItem = ({ title, desc, children }: GuideItemProps) => {
    return (
        <div className="guideItem">
            <div className="guideItemHead">
                <strong>{title}</strong>
                {desc && <p>{desc}</p>}
            </div>
            <div className="guidePreview">{children}</div>
        </div>
    );
};

const PropsTable = ({ rows }: { rows: PropRow[] }) => {
    return (
        <div className="guideTableWrap">
            <table className="guideTable">
                <thead>
                    <tr>
                        <th scope="col">Props</th>
                        <th scope="col">Type</th>
                        <th scope="col">Default</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.name}>
                            <td><code>{row.name}</code></td>
                            <td><code>{row.type}</code></td>
                            <td><code>{row.defaultValue}</code></td>
                            <td>{row.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const getHashId = () => decodeURIComponent(window.location.hash.replace('#', ''));

const Guide = () => {
    const [activeId, setActiveId] = useState(() => {
        const hashId = getHashId();
        return SECTIONS.some((section) => section.id === hashId) ? hashId : SECTIONS[0].id;
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 스크롤 위치에 따라 왼쪽 메뉴 활성화 (활성 메뉴는 항상 하나)
    useEffect(() => {
        const elements = SECTIONS.map((section) => document.getElementById(section.id)).filter(
            (element): element is HTMLElement => element !== null
        );

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActiveId(visible[0].target.id);
            },
            { rootMargin: '0px 0px -60% 0px' }
        );

        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault();
        setActiveId(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', `#${id}`);
    };

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = useCallback(() => setIsModalOpen(false), []);

    return (
        <div className="guideWrap">
            <aside className="guideSide">
                <h1 className="guideLogo">always UI Guide</h1>
                <nav className="guideNav" aria-label="공통 컴포넌트 목록">
                    <strong>COMMON</strong>
                    {SECTIONS.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className={activeId === section.id ? 'on' : undefined}
                            aria-current={activeId === section.id ? 'location' : undefined}
                            onClick={(event) => handleNavClick(event, section.id)}
                        >
                            {section.name}
                        </a>
                    ))}
                </nav>
            </aside>

            <main className="guideContent">
                <div className="guideHead">
                    <span className="guideBadge">UI GUIDE</span>
                    <h2>Common Components</h2>
                    <p>올웨이즈 React 퍼블리싱에서 2곳 이상 사용하는 공통 컴포넌트의 Props와 사용 예제입니다.</p>
                </div>

                {/* 실제 공통 컴포넌트 미리보기를 위해 섹션 영역을 #siteWrap(common.css 범위)으로 감쌉니다. 한 화면에 하나만 둡니다. */}
                <div id="siteWrap" className="guideSections">
                <section className="guideSection" id="logo">
                    <div className="guideTitle">
                        <div>
                            <span className="guideCategory">COMMON</span>
                            <h3>Logo</h3>
                        </div>
                        <span className="guidePath">src/components/common/Logo.tsx</span>
                    </div>
                    <GuideItem title="Props">
                        <PropsTable rows={LOGO_PROPS} />
                    </GuideItem>
                    <GuideItem title="실제 UI" desc="circle은 메인 헤더(어두운 배경), symbol은 서브 헤더(노란 배경)에서 사용합니다.">
                        <div className="guideSitePreview">
                            <div className="guideFlex">
                                <span className="guideLogoBox isDark"><Logo type="circle" /></span>
                                <span className="guideLogoBox isYellow"><Logo type="symbol" /></span>
                                <span className="guideLogoBox isYellow"><Logo type="symbol" isLink={false} /></span>
                            </div>
                        </div>
                    </GuideItem>
                    <GuideItem title="사용 코드">
                        <pre className="guideCode">{`<h1 className="logo"><Logo type="circle" /></h1>
<h1 className="logo"><Logo type="symbol" /></h1>
<div className="logo"><Logo type="symbol" isLink={false} /></div>`}</pre>
                    </GuideItem>
                </section>

                <section className="guideSection" id="modal">
                    <div className="guideTitle">
                        <div>
                            <span className="guideCategory">COMMON</span>
                            <h3>Modal</h3>
                        </div>
                        <span className="guidePath">src/components/common/Modal.tsx</span>
                    </div>
                    <GuideItem title="Props">
                        <PropsTable rows={MODAL_PROPS} />
                    </GuideItem>
                    <GuideItem title="상태·이벤트" desc="열리면 페이지 스크롤을 잠그고 닫기 버튼에 포커스를 줍니다. ESC 키로 닫히며, 닫히면 열기 전 요소로 포커스가 돌아갑니다.">
                        <div className="guideSitePreview">
                            <div className="guideFlex">
                                <button type="button" className="guideButton" onClick={handleModalOpen} aria-controls="guideModal">
                                    Contact 레이어 열기
                                </button>
                            </div>
                            <Modal id="guideModal" className="contactSub" title="Contact Us 예제" isOpen={isModalOpen} onClose={handleModalClose}>
                                <div className="contactIntroduce">
                                    <strong className="title"><em>Modal example.</em></strong>
                                    <div className="inner">
                                        <AlwaysInfo />
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </GuideItem>
                    <GuideItem title="사용 코드">
                        <pre className="guideCode">{`const [isOpen, setIsOpen] = useState(false);
const handleClose = useCallback(() => setIsOpen(false), []);

<button type="button" onClick={() => setIsOpen(true)} aria-controls="contactPop">열기</button>
<Modal id="contactPop" className="contactSub" title="Contact Us" isOpen={isOpen} onClose={handleClose}>
    ...
</Modal>`}</pre>
                    </GuideItem>
                </section>

                <section className="guideSection" id="alwaysInfo">
                    <div className="guideTitle">
                        <div>
                            <span className="guideCategory">COMMON</span>
                            <h3>AlwaysInfo</h3>
                        </div>
                        <span className="guidePath">src/components/common/AlwaysInfo.tsx</span>
                    </div>
                    <GuideItem title="Props">
                        <PropsTable rows={ALWAYS_INFO_PROPS} />
                    </GuideItem>
                    <GuideItem title="실제 UI" desc="주소·지도 링크·전화·메일. 문구는 src/constants/index.ts의 COMPANY_INFO에서 관리합니다.">
                        <div className="guideSitePreview">
                            <div className="guideInfoBox">
                                <AlwaysInfo />
                            </div>
                        </div>
                    </GuideItem>
                    <GuideItem title="사용 코드">
                        <pre className="guideCode">{`<AlwaysInfo />            // Contact 레이어
<AlwaysInfo hasMotion />  // Footer (스크롤 모션)`}</pre>
                    </GuideItem>
                </section>
                </div>
            </main>
        </div>
    );
};

export default Guide;
