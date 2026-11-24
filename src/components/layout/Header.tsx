import { useCallback, useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import Modal from '../common/Modal';
import useLoadMotion from '../../hooks/useLoadMotion';

interface HeaderProps {
    isMain: boolean;
    onContactOpen: () => void;
}

interface GnbItem {
    label: string;
    sectionId?: string;
    to?: string;
}

// 메인 GNB (원본: Business·Contact는 섹션 이동, Project는 새 창)
const GNB_LIST: GnbItem[] = [
    { label: 'Business', sectionId: 'business' },
    { label: 'Project', to: '/project' },
    { label: 'Contact', sectionId: 'contact' }
];

const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
};

const Header = ({ isMain, onContactOpen }: HeaderProps) => {
    const { isLoad, isBefore } = useLoadMotion();
    const [isAllMenuOpen, setIsAllMenuOpen] = useState(false);
    const [isWhite, setIsWhite] = useState(false);

    // 서브: 포트폴리오(어두운 배경) 영역 위에서는 로고·메뉴를 흰색으로 바꿉니다. (원본 scrollAnimation)
    useEffect(() => {
        if (isMain) return;

        const handleScroll = () => {
            const portfolio = document.querySelector('.mainSec.portfolio');
            const footer = document.getElementById('footer');
            if (!portfolio || !footer) return;
            const point = 100;
            setIsWhite(portfolio.getBoundingClientRect().top <= point && footer.getBoundingClientRect().top >= point);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMain]);

    const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        event.preventDefault();
        setIsAllMenuOpen(false);
        scrollToSection(sectionId);
    };

    const handleAllMenuOpen = () => setIsAllMenuOpen(true);
    const handleAllMenuClose = useCallback(() => setIsAllMenuOpen(false), []);

    const motionClass = `${isBefore ? ' before' : ''}${isLoad ? ' load' : ''}`;

    if (!isMain) {
        return (
            <header id="header" className={`subHeader${motionClass}${isWhite ? ' white' : ''}`}>
                <h1 className="logo">
                    <Logo type="symbol" />
                </h1>
                <div className="alignRight">
                    <button type="button" className="btnHeadAllmenu" onClick={onContactOpen} aria-controls="contactPop" aria-label="문의하기 열기">
                        <span className="line line1" />
                        <span className="line line2" />
                    </button>
                </div>
            </header>
        );
    }

    return (
        <>
            <header id="header" className={`newHeader${motionClass}`}>
                <h1 className="logo">
                    <Logo type="circle" />
                </h1>
                <nav className="gnb" aria-label="주요 메뉴">
                    {GNB_LIST.map((item, index) =>
                        item.to ? (
                            <Link key={item.label} to={item.to} target="_blank" rel="noreferrer">
                                <span className="txtLine"><em>{item.label}</em></span>
                            </Link>
                        ) : (
                            <a
                                key={item.label}
                                href={`#${item.sectionId}`}
                                className={index === 0 ? 'on' : undefined}
                                onClick={(event) => handleSectionClick(event, item.sectionId ?? '')}
                            >
                                <span className="txtLine"><em>{item.label}</em></span>
                            </a>
                        )
                    )}
                </nav>
                <div className="alignRight">
                    <button type="button" className="btnHeadAllmenu" onClick={handleAllMenuOpen} aria-controls="allMenuPop" aria-label="전체메뉴 열기">
                        <span className="line line1" />
                        <span className="line line2" />
                        <span className="line line3" />
                    </button>
                </div>
            </header>

            <Modal id="allMenuPop" className="allMenuPop" title="전체메뉴" isOpen={isAllMenuOpen} onClose={handleAllMenuClose}>
                <h2 className="logo">
                    <Logo type="circle" />
                </h2>
                <div className="menuList">
                    {GNB_LIST.map((item) => (
                        <div className="item" key={item.label}>
                            {item.to ? (
                                <Link to={item.to} target="_blank" rel="noreferrer">{item.label}</Link>
                            ) : (
                                <a href={`#${item.sectionId}`} onClick={(event) => handleSectionClick(event, item.sectionId ?? '')}>
                                    {item.label}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default Header;
