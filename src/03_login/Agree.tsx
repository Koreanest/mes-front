import React, { useState, useEffect } from "react";
import BackHeader from "../include/header/BackHeader";
import TopArrow from "../08_svg/TopArrow";
import DownArrow from "../08_svg/DownArrow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

interface OpenTermsState {
  terms1: boolean;
  terms2: boolean;
  terms3: boolean;
  terms4: boolean;
  terms5: boolean;
}

interface AgreementsState {
  ageOver14: boolean;      // 약관1
  termsOfUse: boolean;     // 약관2
  privacyPolicy: boolean;  // 약관3
  marketingAgree: boolean; // 선택
  adInfoAgree: boolean;    // 선택
  allAgree: boolean;       // 전체 동의
}

const Agree: React.FC = () => {
  const [openTerms, setOpenTerms] = useState<OpenTermsState>({
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
    terms5: false,
  });

  const [agreements, setAgreements] = useState<AgreementsState>({
    ageOver14: false,
    termsOfUse: false,
    privacyPolicy: false,
    marketingAgree: false,
    adInfoAgree: false,
    allAgree: false,
  });

  const navigate = useNavigate();

  const toggleTerm = (key: keyof OpenTermsState) => {
    setOpenTerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 개별 체크 변경
  const handleCheckChange = (key: keyof AgreementsState) => {
    setAgreements((prev) => {
      const next = { ...prev, [key]: !prev[key] };

      const allNow =
        next.ageOver14 &&
        next.termsOfUse &&
        next.privacyPolicy &&
        next.marketingAgree &&
        next.adInfoAgree;

      return { ...next, allAgree: allNow };
    });
  };

  // 전체 동의 on/off
  const handleAllAgreeChange = () => {
    setAgreements((prev) => {
      const nextValue = !prev.allAgree;
      return {
        ageOver14: nextValue,
        termsOfUse: nextValue,
        privacyPolicy: nextValue,
        marketingAgree: nextValue,
        adInfoAgree: nextValue,
        allAgree: nextValue,
      };
    });
  };

  // 약관 동의 저장 + 다음 단계 이동
  const handleSubmit = async () => {
    if (!agreements.ageOver14 || !agreements.termsOfUse || !agreements.privacyPolicy) {
      alert("필수 약관에 모두 동의해 주세요.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("인증 정보가 없습니다. 다시 로그인해 주세요.");
      navigate("/login");
      return;
    }

    try {
      await api.post(
        "/api/v1/terms",
        {
          ageOver14: agreements.ageOver14,
          termsOfUse: agreements.termsOfUse,
          privacyPolicy: agreements.privacyPolicy,
          marketingAgree: agreements.marketingAgree,
          adInfoAgree: agreements.adInfoAgree,
        }
      );

      navigate("/comp");
    } catch (e: any) {
      console.error(e);
      const msg = e?.response?.data || "약관 동의 저장 중 오류가 발생했습니다.";
      alert(msg);
    }
  };

  // 이미 저장된 약관 동의 값이 있으면 불러오기 (옵션)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get("/api/v1/terms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data) return;

        // 백엔드 엔티티 필드명이 아래와 같다고 가정 (ageOver14, termsOfUse 등)
        const data = res.data as {
          ageOver14?: boolean;
          termsOfUse?: boolean;
          privacyPolicy?: boolean;
          marketingAgree?: boolean;
          adInfoAgree?: boolean;
        };

        const ageOver14 = !!data.ageOver14;
        const termsOfUse = !!data.termsOfUse;
        const privacyPolicy = !!data.privacyPolicy;
        const marketingAgree = !!data.marketingAgree;
        const adInfoAgree = !!data.adInfoAgree;

        const allNow =
          ageOver14 &&
          termsOfUse &&
          privacyPolicy &&
          marketingAgree &&
          adInfoAgree;

        setAgreements({
          ageOver14,
          termsOfUse,
          privacyPolicy,
          marketingAgree,
          adInfoAgree,
          allAgree: allNow,
        });
      })
      .catch(() => {
        // 약관 정보 없거나 에러 나도 화면 동작에는 지장 없으니 무시
      });
  }, []);

  return (
    <>
    <BackHeader />
      <div className="Min390Max">
        

        <div className="login-text-wrap">
          <div className="login-text">
            <p>바로 만나기 전</p>
            <h1>잠깐, 약관에 동의해 주세요!</h1>
          </div>
        </div>

        <div className="agree-input-wrap">
          {/* 약관 1 */}
          <div className="d-flex space-between mb28">
            <div>
              <h5>
                <span>필수</span>만 14세 이상입니다
              </h5>
            </div>
            <div className="wh28">
              <input
                type="checkbox"
                className="form-check w-100"
                checked={agreements.ageOver14}
                onChange={() => handleCheckChange("ageOver14")}
              />
            </div>
          </div>

          {/* 약관 2 */}
          <div className="d-flex space-between mb28">
            <div className="pointer" onClick={() => toggleTerm("terms1")}>
              <h5>
                <span>필수</span>이용약관 동의
                <span className="gray">
                  {openTerms.terms1 ? <TopArrow /> : <DownArrow />}
                </span>
              </h5>
            </div>
            <div className="wh28">
              <input
                type="checkbox"
                className="form-check w-100"
                checked={agreements.termsOfUse}
                onChange={() => handleCheckChange("termsOfUse")}
              />
            </div>
          </div>
          {openTerms.terms1 && (
            <>
              <div className="term-box">
                <h5>제1조 (목적)</h5>
                <p>
                  이 약관은 회사가 제공하는 '나다운' 서비스의 이용과 관련
                  <br />
                  하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을
                  <br />
                  목적으로 합니다. 본 약관은 서비스 이용과 관련된 모든 사항에
                  <br />
                  대해 적용됩니다.
                </p>
              </div>
              <div className="term-box">
                <p>약관 전체 동의</p>
              </div>
            </>
          )}

          {/* 약관 3 */}
          <div className="d-flex space-between mb28">
            <div className="pointer" onClick={() => toggleTerm("terms2")}>
              <h5>
                <span>필수</span>개인정보 처리방침 동의
                <span className="gray">
                  {openTerms.terms2 ? <TopArrow /> : <DownArrow />}
                </span>
              </h5>
            </div>
            <div className="wh28">
              <input
                type="checkbox"
                className="form-check w-100"
                checked={agreements.privacyPolicy}
                onChange={() => handleCheckChange("privacyPolicy")}
              />
            </div>
          </div>
          {openTerms.terms2 && (
            <div className="term-box">
              <p>
                개인정보 처리방침 내용 예시입니다.
                수집하는 개인정보 항목, 이용 목적, 보관 기간 등을 안내합니다.
              </p>
            </div>
          )}

          {/* 선택 약관 1 */}
          <div className="d-flex space-between mb28">
            <div className="pointer" onClick={() => toggleTerm("terms3")}>
              <h5>
                <span className="black">선택</span>마케팅 동의
                <span className="gray">
                  {openTerms.terms3 ? <TopArrow /> : <DownArrow />}
                </span>
              </h5>
            </div>
            <div className="wh28">
              <input
                type="checkbox"
                className="form-check w-100"
                checked={agreements.marketingAgree}
                onChange={() => handleCheckChange("marketingAgree")}
              />
            </div>
          </div>
          {openTerms.terms3 && (
            <div className="term-box">
              <p>
                마케팅 정보 수신 동의 내용입니다.
                이벤트, 프로모션 소식을 받아볼 수 있습니다.
              </p>
            </div>
          )}

          {/* 선택 약관 2 */}
          <div className="d-flex space-between mb28">
            <div className="pointer" onClick={() => toggleTerm("terms4")}>
              <h5>
                <span className="black">선택</span>광고성 정보 수신 동의
                <span className="gray">
                  {openTerms.terms4 ? <TopArrow /> : <DownArrow />}
                </span>
              </h5>
            </div>
            <div className="wh28">
              <input
                type="checkbox"
                className="form-check w-100"
                checked={agreements.adInfoAgree}
                onChange={() => handleCheckChange("adInfoAgree")}
              />
            </div>
          </div>
          {openTerms.terms4 && (
            <div className="term-box">
              <p>
                광고성 정보 수신 동의 내용입니다.
                이메일, 문자 등으로 광고성 정보를 받을 수 있습니다.
              </p>
            </div>
          )}
        </div>

        {/* 전체 동의 */}
        <div className="p20">
          <div className="d-flex space-between mb28 gray-bg">
            <div>
              <h5>
                <span className="black">약관 전체 동의</span>
              </h5>
            </div>
            <div className="wh28">
              <input
                type="checkbox"
                className="form-check w-100"
                checked={agreements.allAgree}
                onChange={handleAllAgreeChange}
              />
            </div>
          </div>
        </div>

        <div className="agree-btn-wrap">
          {/* a 태그 대신 button + onClick (CSS 클래스는 그대로 사용) */}
          <button
            type="button"
            className="agreeBtn"
            onClick={handleSubmit}
          >
            다음 단계로 이동하기
          </button>
        </div>
      </div>
    </>
  );
};

export default Agree;
