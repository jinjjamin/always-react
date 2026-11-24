import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Cursor from './Cursor';
import Modal from '../common/Modal';
import AlwaysInfo from '../common/AlwaysInfo';
import { COMPANY_INFO } from '../../constants';
import '../../assets/css/common.css';

interface LayoutProps {
    children: ReactNode;
}

// 일반 페이지 공통 레이아웃 (#siteWrap)
// - 메인(/)은 원본처럼 Footer 없이 페이지 안의 Contact 영역이 하단 역할을 합니다.
// - 서브(/project)는 Header 메뉴 버튼과 Footer의 Contact Us가 같은 Contact 레이어를 엽니다.
const Layout = ({ children }: LayoutProps) => {
    const { pathname } = useLocation();
    const isMain = pathname === '/';
    const [isContactOpen, setIsContactOpen] = useState(false);

    // 브라우저 기본 body 여백(8px) 제거: body 전역 선택자 CSS를 쓸 수 없어 일반 페이지가 열려 있는 동안만 적용 후 복원
    useEffect(() => {
        const { margin } = document.body.style;
        // [inline-style] body 기본 여백 제거: 전역 CSS 금지 정책으로 Layout 마운트 동안만 설정
        document.body.style.margin = '0';
        return () => {
            document.body.style.margin = margin;
        };
    }, []);

    const handleContactOpen = useCallback(() => setIsContactOpen(true), []);
    const handleContactClose = useCallback(() => setIsContactOpen(false), []);

    return (
        <div id="siteWrap" className={`wrap${isMain ? ' isMain' : ' isSub'}`}>
            <Header isMain={isMain} onContactOpen={handleContactOpen} />
            <main id="container" className="container">
                {children}
            </main>
            {!isMain && <Footer onContactOpen={handleContactOpen} />}

            {!isMain && (
                <Modal id="contactPop" className="contactSub" title="Contact Us" isOpen={isContactOpen} onClose={handleContactClose}>
                    <div className="contactIntroduce">
                        <strong className="title">
                            <em>
                                We want<br className="wHide" /> to <br className="mHide" />talk<br className="wHide" /> about
                                <br />
                                your<br className="wHide" /> project.
                            </em>
                        </strong>
                        <div className="inner">
                            <AlwaysInfo />
                            <a href={`mailto:${COMPANY_INFO.email}`} className="btnWrite">
                                <span>메일 작성하기</span>
                            </a>
                        </div>
                    </div>
                </Modal>
            )}

            <Cursor isWhite={isMain} />
        </div>
    );
};

export default Layout;
