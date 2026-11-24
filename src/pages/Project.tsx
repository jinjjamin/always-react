import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import Modal from '../components/common/Modal';
import Logo from '../components/common/Logo';
import useLoadMotion from '../hooks/useLoadMotion';
import useFadeIn from '../hooks/useFadeIn';
import { HISTORY_PROJECTS, MAIN_PROJECTS } from '../data/projectData';
import { COMPANY_INFO, HISTORY_LOADING_TIME, HISTORY_PAGE_SIZE, MOBILE_MAX_WIDTH } from '../constants';
import type { MainProject } from '../types';

// 슬로건 타이핑 단어 (원본 loadFunc dataText)
const SLOGAN_WORDS = ['have', 'will', 'want', 'new', 'try', 'on', 'say', 'loved', 'with', 'enjoy', 'fun', 'trust'];
const TYPING_SPEED = 200;
const WORD_DELAY = 1000;
const ROUND_DELAY = 5000;

// 원본 타이핑: 한 글자씩 입력 → 1초 대기 → 다음 단어, 마지막 단어 뒤 5초 대기 후 처음부터 반복
const useTypingSlogan = (isStart: boolean) => {
    const [text, setText] = useState(SLOGAN_WORDS[0]);

    useEffect(() => {
        if (!isStart) return;

        let timerId = 0;
        const typeWord = (wordIndex: number, charIndex: number) => {
            const word = SLOGAN_WORDS[wordIndex];
            setText(word.substring(0, charIndex + 1));

            if (charIndex + 1 < word.length) {
                timerId = window.setTimeout(() => typeWord(wordIndex, charIndex + 1), TYPING_SPEED);
                return;
            }
            const nextIndex = (wordIndex + 1) % SLOGAN_WORDS.length;
            const delay = nextIndex === 0 ? WORD_DELAY + ROUND_DELAY : WORD_DELAY;
            timerId = window.setTimeout(() => typeWord(nextIndex, 0), delay + TYPING_SPEED);
        };

        timerId = window.setTimeout(() => typeWord(1, 0), TYPING_SPEED);
        return () => window.clearTimeout(timerId);
    }, [isStart]);

    return text;
};

interface PortfolioItemProps {
    project: MainProject;
    onOpen: (project: MainProject) => void;
}

// 포트폴리오 카드: 마우스가 카드 오른쪽 절반에 있으면 mouseHover 클래스로 기울기 방향을 바꿉니다. (원본 portfolioHover)
const PortfolioItem = ({ project, onOpen }: PortfolioItemProps) => {
    const [isRightHover, setIsRightHover] = useState(false);

    const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setIsRightHover(event.clientX - rect.left - rect.width / 2 >= 0);
    };

    return (
        <button
            type="button"
            className={`item${isRightHover ? ' mouseHover' : ''}`}
            data-motion="bottom-fade-in"
            aria-controls="portfolioPop"
            onClick={() => onOpen(project)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsRightHover(false)}
        >
            <span className="itemInner">
                <span className="thumb"><img src={project.thumb} alt="" /></span>
                <span className="info">
                    <strong className="title">{project.name}</strong>
                    <span className="type">{project.type}</span>
                </span>
            </span>
        </button>
    );
};

const Project = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const { isLoad, isBefore } = useLoadMotion();
    const sloganText = useTypingSlogan(!isBefore);
    const [visibleCount, setVisibleCount] = useState(HISTORY_PAGE_SIZE);
    const [isLoading, setIsLoading] = useState(false);
    const [isPdfWhite, setIsPdfWhite] = useState(false);
    const [selectedProject, setSelectedProject] = useState<MainProject | null>(null);

    useFadeIn(pageRef, visibleCount);

    // 비주얼 배경 그라데이션이 마우스를 따라 움직입니다. (원본 --client_x / --client_y)
    useEffect(() => {
        const visual = visualRef.current;
        if (!visual) return;

        const setPosition = (x: number, y: number) => {
            // [inline-style] 마우스 좌표: 런타임에 계산되는 배경 그라데이션 위치
            visual.style.setProperty('--client_x', `${x}px`);
            visual.style.setProperty('--client_y', `${y}px`);
        };
        const handleMouseMove = (event: globalThis.MouseEvent) => setPosition(event.clientX, event.clientY);

        setPosition(window.innerWidth / 2, window.innerHeight / 2);
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // 어두운 포트폴리오 영역 위에서는 always brief 버튼을 흰색으로 바꿉니다.
    useEffect(() => {
        const handleScroll = () => {
            const portfolio = pageRef.current?.querySelector('.mainSec.portfolio');
            const footer = document.getElementById('footer');
            if (!portfolio || !footer) return;
            const point = window.innerWidth > MOBILE_MAX_WIDTH ? window.innerHeight / 2 : window.innerHeight - 100;
            setIsPdfWhite(portfolio.getBoundingClientRect().top <= point && footer.getBoundingClientRect().top >= point);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 더보기: 원본처럼 로딩을 1.8초 보여준 뒤 10개씩 추가합니다.
    useEffect(() => {
        if (!isLoading) return;
        const timerId = window.setTimeout(() => {
            setVisibleCount((prev) => prev + HISTORY_PAGE_SIZE);
            setIsLoading(false);
        }, HISTORY_LOADING_TIME);
        return () => window.clearTimeout(timerId);
    }, [isLoading]);

    const handleMoreClick = () => setIsLoading(true);
    const handlePortfolioOpen = useCallback((project: MainProject) => setSelectedProject(project), []);
    const handlePortfolioClose = useCallback(() => setSelectedProject(null), []);

    const visibleHistory = HISTORY_PROJECTS.slice(0, visibleCount);
    const hasMore = visibleCount < HISTORY_PROJECTS.length;
    const visualClass = `${isBefore ? ' before' : ''}${isLoad ? ' load' : ''}`;
    const txtLineClass = isBefore ? ' txtLine' : '';

    return (
        <div className="mainWrap" ref={pageRef}>
            <section className={`mainSec visual${visualClass}`} ref={visualRef} aria-label="always">
                <div className="background" />
                <div className="sloganArea">
                    <div className="mid">
                        <h2 className={`logo${txtLineClass}`}><em>always</em></h2>
                        <div className={`changeSlogan${txtLineClass}`} aria-live="off">
                            <div>
                                <span>{sloganText}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`btnPdfWrap${isPdfWhite ? ' white' : ''}`}>
                        <div className="btnPdfInner">
                            <a href={COMPANY_INFO.briefPdfUrl} className="btnPdf" target="_blank" rel="noreferrer" aria-label="always brief PDF 열기 (새 창)">
                                <span>always brief</span>
                                <em>
                                    {/* 원본 PDF 아이콘 SVG (stroke 색상은 CSS .pdfStorke에서 전환) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="32" viewBox="0 0 18 32" aria-hidden="true" focusable="false">
                                        <defs>
                                            <clipPath id="pdfIconClip">
                                                <path transform="translate(7.326 4.494)" className="pdfStorke pdfFill" d="M0 0h18v32H0z" />
                                            </clipPath>
                                        </defs>
                                        <g clipPath="url(#pdfIconClip)" transform="translate(-7.326 -4.494)">
                                            <path transform="translate(16.326 4.494)" className="pdfStorke" d="M0 0v25" />
                                            <path d="m3787.822 857.81 5 5 5-5" className="pdfStorke" transform="translate(-3776.496 -833.316)" />
                                            <path d="M3786.516 862.156v4h16v-4" className="pdfStorke" transform="translate(-3778.189 -830.662)" />
                                        </g>
                                    </svg>
                                </em>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mainSec portfolio" aria-label="Portfolio">
                <div className="inner">
                    <div className="portfolioList">
                        {MAIN_PROJECTS.map((project) => (
                            <PortfolioItem key={project.id} project={project} onOpen={handlePortfolioOpen} />
                        ))}
                    </div>

                    <div className="historyArea">
                        <strong className="title" data-motion="bottom-fade-in">
                            <em>{HISTORY_PROJECTS.length}</em>
                            <br className="wHide" /> Projects
                        </strong>
                        <ul className="historyList" data-motion="bottom-fade-in">
                            {visibleHistory.map((item) => (
                                <li className="item" key={item.id}>
                                    <div className="projectName">{item.name}</div>
                                    <span className="type">{`${item.field}, ${item.year}`}</span>
                                </li>
                            ))}
                        </ul>
                        {hasMore && (
                            <div className="btnArea right" data-motion="bottom-fade-in">
                                <button type="button" className="textMore" onClick={handleMoreClick} disabled={isLoading}>
                                    <span>Load more</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Modal
                id="portfolioPop"
                className="portfolioSub"
                title={selectedProject ? `${selectedProject.name} 상세` : '프로젝트 상세'}
                isOpen={selectedProject !== null}
                onClose={handlePortfolioClose}
            >
                {selectedProject?.pcImages.map((image, index) => (
                    <picture key={image}>
                        <source media={`(max-width: ${MOBILE_MAX_WIDTH}px)`} srcSet={selectedProject.mobileImages[index] ?? image} />
                        <img src={image} alt={index === 0 ? `${selectedProject.name} 화면 디자인` : ''} className="imgResponsive" />
                    </picture>
                ))}
            </Modal>

            <div className={`loadingWrap${isLoading ? ' is-active' : ''}`} role="status" aria-live="polite">
                <div className="loading">
                    <div className="logo">
                        <Logo type="symbol" isLink={false} />
                    </div>
                    {isLoading && <span className="blind">프로젝트를 불러오는 중입니다.</span>}
                </div>
            </div>
        </div>
    );
};

export default Project;
