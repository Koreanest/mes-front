import { useEffect, useState } from "react";
import PayHeader from "../include/header/PayHeader";
import Footer from "../include/footer/Footer";
import PricePaidImg from "../08_svg/PricePaidImg";
import "./PaySkeleton.scss";

const PayComp = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    // ============================
    // 스켈레톤 UI
    // ============================
    if (isLoading) {
        return (
            <div className="Min390Max">
                <PayHeader />

                <div className="pay-wrap">
                    <div className="skeleton-text short"></div>
                    <hr />
                    
                    {[...Array(4)].map((_, i) => (
                        <div className="pay-price mt-4" key={i}>
                            <div className="left">
                                <div className="skeleton-img"></div>
                            </div>
                            <div className="right">
                                <div className="skeleton-text long"></div>
                                <div className="skeleton-text short"></div>
                                <div className="skeleton-text long"></div>
                                <div className="skeleton-text short"></div>
                                <div className="skeleton-btn mt-2"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <Footer />
            </div>
        );
    }

    // ============================
    // 실제 페이지
    // ============================
    return (
        <>
        <PayHeader/>
            <div className="Min390Max">
                

                <div className="pay-wrap">
                    <h5>2025.9.30</h5>
                    <hr />

                    {[...Array(4)].map((_, i) => (
                        <div className="pay-price mt-4" key={i}>
                            <div className="left">
                                <PricePaidImg/>
                            </div>
                            <div className="right">
                                <h1>내 연인은 바람기 있을까?</h1>
                                <h3>25,800원</h3>
                                <p>풀이 대상 : 김석훈 (1992.09.02)</p>
                                <p>구매 일시 : 2025.09.30 (14:33)</p>
                                <div className="mt-2">
                                    <a className="whiteBasic2">운세보기</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default PayComp;
