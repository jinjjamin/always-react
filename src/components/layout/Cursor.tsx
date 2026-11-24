import { useEffect, useRef, useState } from 'react';

interface CursorProps {
    isWhite: boolean;
}

const HIDE_DELAY = 8000;

// 원본 커서 포인트(.cursor): 마우스를 따라다니며 링크·버튼 위에서 커지고, 링크 이미지 위에서 화살표를 표시합니다.
const Cursor = ({ isWhite }: CursorProps) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHover, setIsHover] = useState(false);
    const [isImgHover, setIsImgHover] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timerId = 0;

        const handleMouseMove = (event: MouseEvent) => {
            const cursor = cursorRef.current;
            if (cursor) {
                // [inline-style] 커서 좌표: 마우스 위치에 따라 런타임에 계산되는 값
                cursor.style.left = `${event.clientX}px`;
                cursor.style.top = `${event.clientY}px`;
            }
            setIsVisible(true);
            window.clearTimeout(timerId);
            timerId = window.setTimeout(() => setIsVisible(false), HIDE_DELAY);
        };

        const handleMouseOver = (event: MouseEvent) => {
            const target = event.target instanceof Element ? event.target : null;
            setIsHover(Boolean(target?.closest('a, button')));
            setIsImgHover(Boolean(target?.closest('a img, a .thumb, button .thumb')));
        };

        const handleMouseLeave = () => setIsVisible(false);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.clearTimeout(timerId);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const className = [
        'cursor',
        isWhite ? 'isWhite' : '',
        isVisible ? 'isVisible' : '',
        isHover ? 'is-hover' : '',
        isImgHover ? 'is-img-hover' : ''
    ]
        .filter(Boolean)
        .join(' ');

    return <div className={className} ref={cursorRef} aria-hidden="true" />;
};

export default Cursor;
