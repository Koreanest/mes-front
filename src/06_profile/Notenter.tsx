import { useState, useEffect } from "react";
import RightArrow from "../08_svg/RightArrow";
import Footer from "../include/footer/Footer";
import MyPageHeader from "../include/header/MyPageHeader";
import './Notenter.scss'; // 스켈레톤 CSS 분리


const Notenter = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200); // 2초 후 로딩 완료
        return () => clearTimeout(timer);
    }, []);

    return(
        <>
        <MyPageHeader/>
            <div className="Min390Max">
                

                <div className="mypage-wrap">
                    {/* 이미지 */}
                    <div className="mypage-wrap-img">
                        {loading ? (
                            <div className="skeleton-img"></div>
                        ) : (
                            <img src="/svg/mypage/ball.png" alt="" />
                        )}
                    </div>

                    {/* 텍스트 */}
                    <div className="mypage-text-wrap">
                        {loading ? (
                            <>
                                <div className="skeleton-text short"></div>
                                <div className="skeleton-text long"></div>
                            </>
                        ) : (
                            <>
                                <h3>사주정보가 아직 없어요</h3>
                                <p>사주를 등록하면 운세 풀이가 시작돼요</p>
                            </>
                        )}
                    </div>

                    {/* 버튼 */}
                    <div className="mypage-btn-wrap">
                        {loading ? (
                            <div className="skeleton-btn"></div>
                        ) : (
                            <a className="basicMint" href="/userinput">사주정보 등록하기</a>
                        )}
                    </div>

                    <hr/>

                    {/* 콘텐츠 목록 */}
                    <div className="mypage-content-wrap">
                        {loading ? (
                            <>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line"></div>
                            </>
                        ) : (
                            <>
                                <div className="d-flex justify-content-between">
                                    <div className="left">콘텐츠 만들기</div>
                                    <div className="right"><RightArrow/></div>
                                </div> 
                                
                                <div className="d-flex justify-content-between">
                                    <div className="left">사주 정보 관리</div>
                                    <div className="right"><RightArrow/></div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div className="left">구매 내역</div>
                                    <div className="right"><RightArrow/></div>
                                </div> 

                                <div className="d-flex justify-content-between">
                                    <div className="left">로그아웃</div>
                                    <div className="right"><RightArrow/></div>
                                </div> 
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );  
}

export default Notenter;