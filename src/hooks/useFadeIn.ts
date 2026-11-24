import { useEffect } from 'react';
import type { RefObject } from 'react';

// 원본 scrollAnimation: [data-motion="bottom-fade-in"] 요소가 화면 하단에 들어오면 is-fade 클래스를 붙입니다.
// refreshKey가 바뀌면(목록 더보기 등) 새로 그려진 요소까지 다시 감시합니다.
const useFadeIn = (rootRef: RefObject<HTMLElement | null>, refreshKey?: unknown) => {
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const targets = root.querySelectorAll<HTMLElement>('[data-motion="bottom-fade-in"]');

        const handleScroll = () => {
            const viewBottom = window.innerHeight;
            targets.forEach((target) => {
                const { top } = target.getBoundingClientRect();
                target.classList.toggle('is-fade', viewBottom > top + 10);
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [rootRef, refreshKey]);
};

export default useFadeIn;
