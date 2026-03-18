import { useState, useEffect } from "react";
import Footer from "../include/footer/Footer";
import NomalHeader from "../include/header/NomalHeader";
import "./PaidInputManSkeleton.scss";
import SelectModal from "../07_modal/SelectModal";

const PaidInputMan = () => {
  const [loading, setLoading] = useState(true);

  // 관계 선택 모달 열림/닫힘 상태
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="Min390Max">
        {/* Header */}
        <div className="skeleton-header"></div>

        {/* 이름 */}
        <div className="input-wrap mt-80">
          <div className="skeleton-input"></div>
        </div>

        {/* 성별 체크박스 */}
        <div className="input-wrap d-flex">
          <div className="skeleton-checkbox"></div>
          <div className="skeleton-checkbox"></div>
        </div>

        {/* 생년월일 */}
        <div className="input-wrap">
          <div className="skeleton-input"></div>
        </div>

        {/* 태어난 시간 */}
        <div className="input-wrap-small d-flex justify-content-between align-items-center">
          <div className="skeleton-input w-50"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-checkbox-small"></div>
        </div>

        {/* 관계 / 파일 업로드 */}
        <div className="input-wrap mt-3">
          <div className="skeleton-input h-48"></div>
        </div>

        {/* 버튼 */}
        <div className="input-btn-wrap2 mt-4">
          <div className="skeleton-btn"></div>
        </div>

        {/* Footer */}
        <div className="skeleton-footer mt-4"></div>
      </div>
    );
  }

  return (
    <>
      <div className="Min390Max">
        <NomalHeader />

        {/* 이름 */}
        <div className="input-wrap">
          <div className="">
            <label htmlFor="">이름</label>
            <input type="text" placeholder="예:홍길동" />
          </div>
        </div>

        {/* 성별 */}
        <div className="input-wrap mt-56">
          <div className="input-wrap-check">
            <div className="edit">
              <input type="checkbox" id="female" defaultChecked />
              <label htmlFor="female">여성</label>
            </div>
            <div className="edit">
              <input type="checkbox" id="male" />
              <label htmlFor="male">남성</label>
            </div>
          </div>
        </div>

        {/* 생년월일 */}
        <div className="input-wrap mt-56">
          <div className="">
            <label htmlFor="">생년월일 (양력기준으로 입력해 주세요)</label>
            <input type="text" placeholder="예:1992-07-15(양력)" />
          </div>
        </div>

        {/* 태어난 시간 */}
        <div className="input-wrap-small mt-56">
          <label htmlFor="">태어난 시간</label>
          <div className="d-flex align-items-center justify-content-between">
            <input
              type="text"
              placeholder="예:1992-07-15(양력)"
              className="date"
            />
            <div className="d-flex align-items-center">
              <span className="fs-15-gray-500">모르겠어요</span>
              <input type="checkbox" className="check mx-3" />
            </div>
          </div>
        </div>

        {/* 관계 */}
        <div className="input-wrap">
          <div className="">
            <label htmlFor="">관계</label>
            <div className="d-flex align-items-center justify-content-between">
              <p className="fs-15-gray-400">관계를 선택해 주세요</p>
              {/* 이 버튼 클릭 시 SelectModal 보이게 */}
              <button
                className="whiteBtn"
                type="button"
                onClick={() => setIsSelectOpen(true)}
              >
                선택
              </button>
            </div>
          </div>
        </div>

        {/* 다음 버튼 */}
        <div className="input-btn-wrap2">
          <a className="basicGray100" href="/dup">
            다음
          </a>
        </div>
      </div>

      <Footer />

      {/* 선택 모달: 버튼 눌렀을 때만 렌더링 */}
      {isSelectOpen && <SelectModal />}
    </>
  );
};

export default PaidInputMan;
