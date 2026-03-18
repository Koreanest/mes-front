import { useEffect, useState } from "react";
import SelectHeader from "../include/header/SelectHeader";
import Footer from "../include/footer/Footer";
import ProfileNonImg from "../08_svg/ProfileNonImg";
import "./PaySkeleton.scss"; // 기존 스켈레톤 CSS 사용

const ProfileSelect2 = () => {
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
                <SelectHeader />

                <div className="select-wrap">
                    <div className="skeleton-text short"></div>
                </div>
                <div className="underline skeleton-line"></div>

                {[...Array(4)].map((_, i) => (
                    <div className="select-wrap d-flex mt-3" key={i}>
                        <div className="pic-wrap d-flex align-items-center">
                            <div className="skeleton-img small"></div>
                        </div>
                        <div className="text-wrap flex-1 ml-2">
                            <div className="skeleton-text long"></div>
                            <div className="skeleton-text short mt-1"></div>
                        </div>
                    </div>
                ))}

                <div className="select-btn-wrap2 mt-4">
                    <div className="skeleton-btn"></div>
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
        <SelectHeader/>
            <div className="Min390Max">
                

                <div className="select-wrap">
                    <h5>내 사주</h5>        
                </div> 
                <div className="underline"></div>

                <div className="select-wrap d-flex ">
                    <div className="pic-wrap d-flex align-items-center">
                        <div className="radio">
                            <input type="radio"/>
                        </div>
                        <img src="/svg/paid/select1.png" alt="" />
                    </div>
                    <div className="text-wrap">
                        <div className="d-flex ">
                            <h3>별빛속에 피어난 작은 꿈(본인)</h3>
                            <button>&middot;&middot;&middot;</button>
                        </div>
                        <p>
                            양력 1994.07.23 (午)시<br/>
                            원숭이띠 <span>|</span> 물고기자리 <span>|</span> 여성
                        </p>
                    </div>
                </div>   

                <div className="select-wrap mt-5">
                    <h5>함께 보는 사주</h5>        
                </div> 
                <div className="underline"></div>

                {[...Array(3)].map((_, i) => (
                    <div className="select-wrap d-flex align-items-center" key={i}>
                        <div className="pic-wrap d-flex align-items-center">
                            <div className="radio">
                                <input type="radio"/>
                            </div>
                            <img src="/svg/paid/select1.png" alt="" />
                        </div>
                        <div className="text-wrap">
                            <div className="d-flex align-items-center">
                                <h3>{i===0 ? "연인-1(연인)" : i===1 ? "연인-2(연인)" : "바람 따라 걷는 여행자(친구)"}</h3>
                                <button className="mx-3">&middot;&middot;&middot;</button>
                            </div>
                            <p>
                                양력 1994.07.23 (午)시<br/>
                                원숭이띠 <span>|</span> 물고기자리 <span>|</span> 여성
                            </p>
                        </div>
                    </div>
                ))}

                <div className="select-btn-wrap4">
                    <a className="basicMint" href="/userinput2">
                        사주 정보 추가
                        <span>
                            <ProfileNonImg/>
                        </span>
                    </a>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default ProfileSelect2;
