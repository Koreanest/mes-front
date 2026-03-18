import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";   
import LoadingHeader from "../include/header/LoadingHeader";
import './Loading.scss';

const Loading = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();              // 훅 사용

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);                   // 로딩 상태 종료
            navigate("/detail");                    // 3초 후 /detail로 이동
        }, 3000);

        return () => clearTimeout(timer);         // cleanup: 컴포넌트가 언마운트될 때 타이머 제거
    }, [navigate]);

    return (
        <>
            <LoadingHeader/>
            <div className="Min390Max">
                <div className="load-any-wrap">
                    <div className="loading-bar d-flex justify-content-between">
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div>
                    <div className="loading-text">
                        <div>
                            홍길동님의<br/> 운세를 분석중이에요!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );  
}

export default Loading;
