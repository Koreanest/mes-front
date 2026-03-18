import { useEffect, useState } from "react";
import OutHeader from "../include/header/OutHeader";
import Footer from "../include/footer/Footer";
import "./OutSkeleton.scss"; // 스켈레톤 CSS 분리

const Out = () => {
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
                <OutHeader />
                <div className="mypage-wrap">
                    <div className="mypage-text-wrap">
                        <div className="skeleton-text short"></div>
                        <div className="skeleton-text long"></div>
                    </div>

                    <div className="out-wrap">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line"></div>
                    </div>

                    <div className="out-agree">
                        <div className="skeleton-checkbox"></div>
                        <div className="skeleton-text short"></div>
                    </div>
                </div>

                <Footer />

                <div className="out-btn-wrap">
                    <div className="skeleton-btn"></div>
                </div>
            </div>
        );
    }

    // ============================
    // 실제 페이지
    // ============================
    return (
        <>
        <OutHeader/>
            <div className="Min390Max">
                

                <div className="out-wrap">
                    <div className="out-text">     
                            <h5>아래 내용 확인 후 동의해 주세요</h5>
                            <h3>회원 탈퇴 시, 모든 서비스 이용이 불가해요</h3>
                    </div>

                    
                    <div className="out-des">
                        <h5>회원 탈퇴 절차</h5>
                        
                        <div className="d-flex">
                            <div className="mx-2">•</div>
                            <p>[탈퇴하기] 버튼을 눌러 직접 신청해 주세요.</p>
                        </div>
                        
                        <div className="d-flex">
                            <div className="mx-2">•</div>
                            <p>탈퇴 요청 즉시 계정은 비활성화되며, 서비스 이용이 제한됩니다.</p>
                        </div>
                    
                    </div>
                      

                    <div className="out-des">
                        <h5>회원 정보 삭제</h5>
                        
                        <div className="d-flex">
                            <div className="mx-2">•</div>
                            <p>탈퇴 후 관련 법령에 따라 일정 기간 보관이 필요한 정보는 별도 저장되며, 그 외 모든 개인정보는 즉시 삭제됩니다.</p>
                        </div>
                        
                        <div className="d-flex">
                            <div className="mx-2">•</div>
                            <p>보관 기간이 끝나면(최대 1년) 모든 데이터가 완전히 삭제됩니다.</p>
                        </div>
                        
                        <div className="d-flex">
                            <div className="mx-2">•</div>
                            <p>삭제된 정보는 복구가 불가능하니, 필요한 내용은 미리 백업해 주세요.</p>
                        </div>
                    
                    </div>
              

                    <div className="d-flex align-items-center out-agree">
                        <input type="checkbox" className="checkGray"/>
                        <p className="fs-15-gray-800">안내 내용을 모두 확인하였으며, 이에 동의합니다.</p>
                    </div>
                </div>
            </div>

<div className="mt-80">
            <Footer />
</div>
            <div className="out-btn-wrap">
                <a className="basicGrayBig">탈퇴하기</a>
            </div>
        </>
    );
}

export default Out;
