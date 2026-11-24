import { useRef } from 'react';
import AlwaysInfo from '../common/AlwaysInfo';
import useFadeIn from '../../hooks/useFadeIn';

interface FooterProps {
    onContactOpen: () => void;
}

// 서브 페이지 공통 하단 (원본 /project #footer)
const Footer = ({ onContactOpen }: FooterProps) => {
    const footerRef = useRef<HTMLElement>(null);
    useFadeIn(footerRef);

    return (
        <footer id="footer" ref={footerRef}>
            <div className="inner">
                <p className="msg" data-motion="bottom-fade-in">
                    always help create experiences and cultures
                    <br />
                    with ideas, skills, and emotions.
                    <br />
                    we realize digital potential beyond what you want.
                </p>
                <AlwaysInfo hasMotion />
                <div className="btmAlways" data-motion="bottom-fade-in">
                    <button type="button" className="contact" onClick={onContactOpen} aria-controls="contactPop">
                        Contact Us
                    </button>
                    <div className="copyright">
                        ⓒalways
                        <br />
                        all rights reserved
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
