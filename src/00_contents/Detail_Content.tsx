// src/00_contents/Detail_Content.tsx
import { useState, useEffect, useRef } from "react";
import DownArrow from "../08_svg/DownArrow";
import TopArrow from "../08_svg/TopArrow";
import RightArrow from "../08_svg/RightArrow";
import api from "../api/client";
import type { Product } from "../types/product";
import type { ProductDetail } from "../types/productDetail";

interface DetailContentProps {
  productId?: number; // optional (undefined 허용)
}

const Detail_Content: React.FC<DetailContentProps> = ({ productId }) => {
  // 자세히 보기 토글
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // 아코디언 토글 (guide = 이용안내, refund = 환불규정)
  const [openAccordion, setOpenAccordion] = useState<"guide" | "refund" | null>(
    null
  );

  const toggleAccordion = (name: "guide" | "refund") => {
    setOpenAccordion((prev) => (prev === name ? null : name));
  };

  // 상품 기본 정보 (제목, 설명, 가격 등)
  const [product, setProduct] = useState<Product | null>(null);
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);

  // 운세 구성(detail) API 관련 상태
  const [details, setDetails] = useState<ProductDetail[]>([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const didFetchRef = useRef(false); // React 18 StrictMode 대응

  useEffect(() => {
    if (!productId) return;              // productId 없으면 호출 안 함
    if (didFetchRef.current) return;     // StrictMode 중복 방지
    didFetchRef.current = true;

    const fetchAll = async () => {
      try {
        setProductError(null);
        setDetailsError(null);
        setProductLoading(true);
        setDetailsLoading(true);

        // 상품 기본 정보 + 상세 구성 동시에 호출
        const [productRes, detailRes] = await Promise.all([
          api.get<Product>(`/api/products/${productId}`),
          api.get<ProductDetail[]>(`/api/products/${productId}/details`),
        ]);

        setProduct(productRes.data || null);

        const list = detailRes.data || [];
        const sorted = [...list].sort((a, b) => a.sortOrder - b.sortOrder);
        setDetails(sorted);
      } catch (e) {
        console.error(e);
        setProductError("상품 정보를 불러오는 중 오류가 발생했습니다.");
        setDetailsError("운세 구성 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setProductLoading(false);
        setDetailsLoading(false);
      }
    };

    fetchAll();
  }, [productId]);

  // productId 자체가 없는 경우 (URL 잘못 들어온 경우 등)
  if (!productId) {
    return (
      <div className="detail-text-wrap">
        <p>상품 ID가 없습니다. 목록에서 다시 진입해 주세요.</p>
      </div>
    );
  }

  return (
    <>
      <div className="detail-img-wrap">
        <img src="/svg/paid/ch.png" alt="" />
      </div>

      <div className="paid-wrap">
        <div className="paid-pay">
          {/* 상품 타입(심화/무료) */}
          <button className="basicBtn">
            {product?.salesTypeName ?? "심화해석판"}
          </button>

          {/* 상품 제목 */}
          <p className="fs-18">
            {productLoading
              ? "상품 정보를 불러오는 중입니다…"
              : product?.name ?? "상품 제목을 불러올 수 없습니다."}
          </p>

          {/* 정가 */}
          <p className="fs-14-gray">
            {product
              ? `${product.normalPrice.toLocaleString()}원`
              : " "}
          </p>

          {/* 할인 / 판매가 */}
          <div className="d-flex pay">
            <div className="fs-22-dc">
              {product && product.discountRate > 0
                ? `${product.discountRate}%`
                : ""}
            </div>
            <div className="fs-22">
              {product
                ? `${product.salePrice.toLocaleString()}원`
                : ""}
            </div>
          </div>

          {/* 첫 구매 혜택가 */}
          <div className="d-flex pay align-items-center">
            <div className="fs-22-mint">
              {product
                ? `${product.firstPurchasePrice.toLocaleString()}원`
                : ""}
            </div>
            <div className="fs-13-mint mx-2">첫 구매 혜택가</div>
          </div>

          {productError && (
            <p style={{ color: "red", marginTop: "8px" }}>{productError}</p>
          )}
        </div>

        <div className="paid-msg align-items-center">
          <span>
            <img src="/svg/paid/boon.png" alt="" className="boon" />
          </span>
          <p className="paid-msg-inner">
            첫 구매 쿠폰 받고 <span className="mx-2">0원으로</span>
            풀이보기&nbsp;
            <RightArrow />
          </p>
        </div>
      </div>

      <div className="border-height-12 mt27mb27"></div>

      {/* -------------------------------------------------- */}
      {/*  운세 설명 (자세히 보기) - description 연동 */}
      {/* -------------------------------------------------- */}
      <div className="detail-text-wrap">
        <h3>운세설명</h3>

        <p>
          {productLoading
            ? "운세 설명을 불러오는 중입니다…"
            : product?.description ??
              "운세 설명을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요."}
        </p>

        {/* 자세히 보기 버튼 (showDetail=false일 때만 보임) */}
        {!showDetail && (
          <button
            className="whiteBasic"
            onClick={() => setShowDetail(true)}
          >
            자세히 보기{" "}
            <span className="fs-18 mx-2">
              <DownArrow />
            </span>
          </button>
        )}
      </div>

      {/* 자세히 보기 내용 */}
      {showDetail && (
        <>
          <div className="detail-extra mt-2">
            <div className="detail-extra-text">
              <h3>핵심만 콕 집어드려요</h3>
              <div className="d-flex justify-content-between">
                <div className="one">
                  <img src="/svg/paid/my1.png" alt="" />
                  <p>나의 본성</p>
                </div>

                <div className="one">
                  <img src="/svg/paid/my2.png" alt="" />
                  <p>주의 할점</p>
                </div>

                <div className="one">
                  <img src="/svg/paid/my3.png" alt="" />
                  <p>미래 방향</p>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-extra-my">
            <p>작은 고민도 바로 풀어 드립니다</p>
          </div>
          <div className="detail-extra-my-bg d-flex justify-content-between">
            <div className="text">
              <div className="one">
                그사람과 끝까지 함께할 수 있을까요?
              </div>
              <div className="two">
                타로와 사주로 명쾌하게 풀어 줄께요!
              </div>
            </div>
            <div className="">
              <img src="/svg/paid/my4.png" alt="" />
            </div>
          </div>

          {/* 여기부터 운세 구성 영역 → 백엔드 question 매핑 */}
          <div className="detail-extra-my-composition">
            <h3>운세구성</h3>
          </div>

          {detailsLoading && (
            <div className="detail-extra-my-composition">
              <div className="d-flex">
                <div className="front">?</div>
                <div className="end">구성을 불러오는 중입니다…</div>
              </div>
            </div>
          )}

          {detailsError && (
            <div className="detail-extra-my-composition">
              <div className="d-flex">
                <div className="front">?</div>
                <div className="end" style={{ color: "red" }}>
                  {detailsError}
                </div>
              </div>
            </div>
          )}

          {!detailsLoading && !detailsError && details.length === 0 && (
            <div className="detail-extra-my-composition">
              <div className="d-flex">
                <div className="front">?</div>
                <div className="end">등록된 운세 구성 항목이 없습니다.</div>
              </div>
            </div>
          )}

          {!detailsLoading &&
            !detailsError &&
            details.length > 0 &&
            details.map((d) => (
              <div
                key={d.id}
                className="detail-extra-my-composition"
              >
                <div className="d-flex">
                  <div className="front">?</div>
                  <div className="end">{d.question}</div>
                </div>
              </div>
            ))}
        </>
      )}

      <div className="border-height-12 mt27mb27"></div>

      {/* -------------------------------------------------- */}
      {/*  이용안내 & 환불규정 (아코디언) */}
      {/* -------------------------------------------------- */}
      <div className="detail-text-wrap">
        <h3 className="fs-17">이용안내 & 환불규정</h3>

        {/* 이용안내 */}
        <div
          className="d-flex justify-content-between align-items-center h54"
          style={{ cursor: "pointer" }}
          onClick={() => toggleAccordion("guide")}
        >
          <div className="fs-16">이용안내</div>
          <div className="fs-18">
            {openAccordion === "guide" ? <TopArrow /> : <DownArrow />}
          </div>
        </div>
        {openAccordion === "guide" && (
          <div className="accordion-content">
            <h3>서비스 이용 전 확인 주세요</h3>
            <div className="d-flex justify-content-between">
              <div className="front">?</div>
              <div className="end">
                저희의 AI는 방대한 데이터를 기반으로 매번 당신에게
                가장 적합한 해석을 생성합니다. 이 과정에서 동일한
                사주 정보로 분석하더라도, AI의 딥러닝 특성상 표현이나
                문장이 미세하게 달라질 수 있습니다. 다만, 당신의 핵심적인
                기질과 운명의 큰 흐름은 어떤 경우에도 일관되게 분석되니
                안심하셔도 좋습니다. 세부적인 표현의 차이는 당신의 운명을
                더욱 다각적으로 이해하는 과정으로 여겨주시기 바랍니다.
              </div>
            </div>
          </div>
        )}

        {/* 환불규정 */}
        <div
          className="d-flex justify-content-between align-items-center h54"
          style={{ cursor: "pointer" }}
          onClick={() => toggleAccordion("refund")}
        >
          <div className="fs-16">환불규정</div>
          <div className="fs-18">
            {openAccordion === "refund" ? <TopArrow /> : <DownArrow />}
          </div>
        </div>

        {openAccordion === "refund" && (
          <div className="accordion-content">
            <h3>서비스 이용 전 확인 주세요</h3>
            <div className="d-flex justify-content-between">
              <div className="front">?</div>
              <div className="end">
                본 서비스에서 제공하는 모든 운세 풀이는 구매 즉시 열람 및
                이용이 가능한 디지털 콘텐츠입니다. 따라서 「전자상거래
                등에서의 소비자보호에 관한 법률」 제17조 제2항에 따라
                청약 철회(환불)가 제한되는 점 양해 부탁드립니다. 신중한
                구매 결정을 부탁드립니다.
              </div>
            </div>
          </div>
        )}

        <div className="detail-btn-wrap">
          <a className="basicMint" href={`/dc?productId=${productId}`}>
            구매하기
          </a>
        </div>
      </div>
    </>
  );
};

export default Detail_Content;
