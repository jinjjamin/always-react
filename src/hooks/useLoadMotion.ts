import { useEffect, useState } from 'react';
import { LOAD_MOTION_DELAY } from '../constants';

// 원본 loadFunc/loadFunc2: 진입 직후 load 클래스를 붙이고, 일정 시간 뒤 before 클래스를 제거합니다.
const useLoadMotion = (delay: number = LOAD_MOTION_DELAY) => {
    const [isLoad, setIsLoad] = useState(false);
    const [isBefore, setIsBefore] = useState(true);

    useEffect(() => {
        const loadTimerId = window.setTimeout(() => setIsLoad(true), 50);
        const timerId = window.setTimeout(() => setIsBefore(false), delay);

        return () => {
            window.clearTimeout(loadTimerId);
            window.clearTimeout(timerId);
        };
    }, [delay]);

    return { isLoad, isBefore };
};

export default useLoadMotion;
