import { COMPANY_INFO } from '../../constants';

interface AlwaysInfoProps {
    hasMotion?: boolean;
}

// 회사 주소·연락처 블록 (원본 .infoAlways 구조) — /project Footer와 Contact 레이어에서 사용
const AlwaysInfo = ({ hasMotion = false }: AlwaysInfoProps) => {
    const motion = hasMotion ? 'bottom-fade-in' : undefined;

    return (
        <div className="infoAlways" data-motion={motion}>
            <div className="addr">
                <p>
                    {COMPANY_INFO.addressEnLine1}
                    <br />
                    {COMPANY_INFO.addressEnLine2}
                </p>
                <a href={COMPANY_INFO.mapUrl} className="linkText" target="_blank" rel="noreferrer">
                    View map
                </a>
            </div>
            <div className="community" data-motion={motion}>
                <a href={COMPANY_INFO.telHref} className="tel">{COMPANY_INFO.tel}</a>
                <br />
                <a href={`mailto:${COMPANY_INFO.email}`} className="mail">{COMPANY_INFO.email}</a>
            </div>
        </div>
    );
};

export default AlwaysInfo;
