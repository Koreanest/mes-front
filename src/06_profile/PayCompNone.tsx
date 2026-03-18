import { useEffect, useState } from "react";
import PayHeader from "../include/header/PayHeader";
import Footer from "../include/footer/Footer";
import PayNoneImg from "../08_svg/PayNoneImg";
import "./PaySkeleton.scss"; // 이전 PaySkeleton.scss 그대로 사용 가능

const PayCompNon = () => {
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

                <div className="pay-wrap mt-150 d-flex justify-content-center">
                    <div className="text-center payNone">
                        <div className="skeleton-img large"></div>
                        <div className="skeleton-text long mt-3"></div>
                        <div className="skeleton-text short mt-1"></div>
                    </div>
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
            <div className="Min390Max">
                <PayHeader/>

                <div className="pay-wrap mt-150 d-flex justify-content-center">
                    <div className="text-center payNone">
                        <div>
                            <PayNoneImg/>
                        </div>
                        <h1>아직 구매한 운세가 없어요</h1>
                        <h5>
                            구매한 운세는 이곳에서<br/>
                            다시 확인할 수 있어요
                        </h5>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default PayCompNon;
