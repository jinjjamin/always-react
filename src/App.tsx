import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Project from './pages/Project';
import Ia from './pages/Ia';
import Guide from './pages/Guide';

// 라우트 이동 시 스크롤을 맨 위로 (해시 이동은 제외)
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
};

const App = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* IA·Guide 관리 화면: 공통 Header·Footer·Layout을 적용하지 않는 독립 화면 (docs/ia-spec.md, docs/guide-spec.md) */}
                <Route path="/Ia" element={<Ia />} />
                <Route path="/Guide" element={<Guide />} />
                {/* 일반 페이지는 Layout 안에서 렌더링 */}
                <Route
                    element={
                        <Layout>
                            <Outlet />
                        </Layout>
                    }
                >
                    <Route path="/" element={<Home />} />
                    <Route path="/project" element={<Project />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
