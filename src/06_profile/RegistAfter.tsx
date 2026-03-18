import { useEffect, useState } from "react";
import RegistHeader from "../include/header/RegistHeader";
import Footer from "../include/footer/Footer";
import RightArrow from "../08_svg/RightArrow";
import "./PaySkeleton.scss"; // 기존 스켈레톤 CSS 재사용

const RegistAfter = () => {
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
                <RegistHeader />

                <div className="mypage-wrap">
                    <div className="mypage-regist-wrap skeleton-box">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="skeleton-img medium"></div>
                            <div className="flex-1 ml-2">
                                <div className="skeleton-text long"></div>
                                <div className="skeleton-text short mt-1"></div>
                            </div>
                        </div>
                        <div className="skeleton-text medium mt-2"></div>
                    </div>

                    <div className="wangborder skeleton-line"></div>

                    {[...Array(3)].map((_, i) => (
                        <div className="mypage-content-wrap d-flex justify-content-between mt-3" key={i}>
                            <div className="skeleton-text long"></div>
                            <div className="skeleton-btn small"></div>
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
        <RegistHeader/>
            <div className="Min390Max">
                

                <div className="mypage-wrap">
                    <div className="mypage-regist-wrap">
                        <div className="d-flex align-items-center">
                            <img src="/svg/mypage/monk.png" alt="" />
                            <div className="">
                                <h5>원숭이 띠</h5>
                                <h3>별빛 속에 피어난 작은꿈</h3>
                            </div>
                        </div>
                        <div className="regist-bottom-box">
                            양력 1994.07.23 (오)시 <span>|</span>원숭이띠<span>|</span>물고기자리<span>|</span>여성
                        </div>
                    </div>

                    <div className="wangborder"></div>

                    <div className="mypage-content-wrap3">
                        <div className="d-flex justify-content-between">
                            <div className="left">콘텐츠 만들기</div>
                            <a className="right"><RightArrow/></a>
                        </div> 
                        
                        <div className="d-flex justify-content-between">
                            <div className="left">사주 정보 관리</div>
                            <a className="right"><RightArrow/></a>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="left">구매 내역</div>
                            <a className="right"><RightArrow/></a>
                        </div> 
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default RegistAfter;
