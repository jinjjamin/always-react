import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
    id: string;
    className: 'allMenuPop' | 'contactSub' | 'portfolioSub';
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}

// 원본 modalPop 구조(.modalPop > .modalPopArea > .modalBody > .bodyArea + .btnModalClose)를 유지한 전체 화면 레이어
const Modal = ({ id, className, isOpen, title, onClose, children }: ModalProps) => {
    const closeRef = useRef<HTMLButtonElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const lastFocused = document.activeElement as HTMLElement | null;
        const { overflow } = document.body.style;

        // [inline-style] 레이어가 열린 동안 페이지 스크롤 잠금: 전역 선택자(html/body) CSS를 쓸 수 없어 열림 시점에만 설정 후 복원
        document.body.style.overflow = 'hidden';
        bodyRef.current?.scrollTo(0, 0);
        closeRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = overflow;
            document.removeEventListener('keydown', handleKeyDown);
            lastFocused?.focus();
        };
    }, [isOpen, onClose]);

    return (
        <div
            className={`modalPop ${className}${isOpen ? ' isOpen' : ''}`}
            id={id}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            aria-hidden={!isOpen}
        >
            <div className="modalPopArea">
                <div className="modalBody" ref={bodyRef}>
                    <div className="bodyArea">{children}</div>
                </div>
            </div>
            <button type="button" className="btnModalClose" onClick={onClose} ref={closeRef} tabIndex={isOpen ? 0 : -1}>
                <span>해당 팝업 닫기</span>
            </button>
        </div>
    );
};

export default Modal;
