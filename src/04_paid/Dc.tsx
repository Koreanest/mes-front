// src/06_dc/Dc.tsx
import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FooterBtn from "../include/footer/FooterBtn";
import PriceHeader from "../include/header/PriceHeader";
import Coupon from "../07_modal/Coupon";
import "./DcSkeleton.scss";

import api from "../api/client";
import type { Product } from "../types/product";

const Dc = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const productIdParam = searchParams.get("productId");
  const productId = productIdParam ? Number(productIdParam) : undefined;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const didFetchRef = useRef(false);

  // 부모에서 쿠폰 할인 금액 관리
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  useEffect(() => {
    if (!productId || Number.isNaN(productId)) {
      setError("상품 ID가 없습니다. 다시 시도해 주세요.");
      setLoading(false);
      return;
    }

    if (didFetchRef.current) return;
    didFetchRef.current = true;

    const fetchProduct = async () => {
      try {
        setError(null);
        setLoading(true);

        const res = await api.get<Product>(`/api/products/${productId}`);
        setProduct(res.data || null);
      } catch (e) {
        console.error(e);
        setError("상품 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const openCoupon = () => setIsCouponOpen(true);
  const closeCoupon = () => setIsCouponOpen(false);

  const handleBuyClick = async () => {
    // 1) 0원 이하면 PG 안 타고 바로 무료 완료 플로우
    if (totalPrice <= 0) {
      // 예: 바로 결제완료 페이지로 이동
      navigate(`/pi?productId=${product!.id}`);
      return;
    }

    try {
      // 2) 1원 이상이면 백엔드에 결제 준비 요청
      const res = await api.post("/api/payments/inicis/ready", {
        productId: product?.id,
        amount: totalPrice,
        userCouponId: null, // 나중에 선택 쿠폰 ID 있으면 넣기
      });

      const data = res.data as {
        mid: string;
        oid: string;
        price: string;
        timestamp: string;
        signature: string;
        mkey: string;
        goodName: string;
        buyerName: string;
        buyerEmail: string;
        returnUrl: string;
        closeUrl: string;
      };

      // 3) INIStdPay용 form 동적 생성
      const form = document.createElement("form");
      form.setAttribute("id", "SendPayForm_id");
      form.setAttribute("method", "POST");
      form.setAttribute("accept-charset", "utf-8");

      const appendHidden = (name: string, value: string) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      // === 이니시스 표준결제 필수 파라미터들 ===
      appendHidden("version", "1.0");
      appendHidden("gopaymethod", "Card"); // 기본 카드결제 예시
      appendHidden("mid", data.mid);
      appendHidden("oid", data.oid);
      appendHidden("price", data.price);
      appendHidden("timestamp", data.timestamp);
      appendHidden("signature", data.signature);
      appendHidden("mKey", data.mkey);
      appendHidden("goodname", data.goodName);
      appendHidden("buyername", data.buyerName);
      appendHidden("buyeremail", data.buyerEmail);
      appendHidden("returnUrl", data.returnUrl);
      appendHidden("closeUrl", data.closeUrl);
      appendHidden("currency", "WON");

      document.body.appendChild(form);

      // 4) KG 이니시스 결제창 오픈
      // index.html 등에 <script src="https://stgstdpay.inicis.com/stdjs/INIStdPay.js"></script> 추가 필요
      // 타입스크립트 회피용 any 캐스팅
      (window as any).INIStdPay.pay("SendPayForm_id");
    } catch (e) {
      console.error(e);
      alert("결제 준비 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  if (loading) {
    // ... (스켈레톤 부분 그대로 유지)
  }

  if (error || !product) {
    return (
      <div className="Min390Max" style={{ padding: "16px" }}>
        <PriceHeader />
        <p style={{ color: "red", marginTop: "24px" }}>
          {error ?? "상품 정보를 찾을 수 없습니다."}
        </p>
      </div>
    );
  }

  // ====== 가격 계산 ======
  const normalPrice = product.normalPrice ?? 0;   // 상품금액
  const salePrice = product.salePrice ?? normalPrice;
  const discountAmount = normalPrice - salePrice; // 기본 할인
  const totalPrice = salePrice - couponDiscount;  // 쿠폰까지 반영된 최종가

  return (
    <>
    <PriceHeader />
      <div className="Min390Max">
        

        <div className="paid-wrap mt-95">
          <div className="paid-top">
            <div className="left">
              <h3>운세 구성</h3>
            </div>
            <div className="right">
              <button className="btn" onClick={openCoupon}>
                쿠폰 3
              </button>
            </div>
          </div>

          <Link
            to=""
            onClick={(e) => {
              e.preventDefault();
              openCoupon();
            }}
          >
            <div className="paid-msg">
              <span>
                <img src="/svg/paid/raiders.png" alt="" />
              </span>
              {/* 여기 문구는 나중에 totalPrice에 맞게 바꿔도 됨 */}
              특별 할인 + 쿠폰 사용으로 이번 결제는 0원이에요
            </div>
          </Link>

          <div className="paid-price">
            <div className="left">
              <img src={product.imageUrl || "/svg/paid/ch.png"} alt="" />
            </div>

            <div className="right">
              <button className="basicBtn">
                {product.salesTypeName ?? "심화해석판"}
              </button>

              <h1>{product.name}</h1>

              {/* 정가 */}
              <h3>{normalPrice.toLocaleString()}원</h3>

              {/* 최종가: 쿠폰 포함 */}
              <h1 className="txt">
                <span>{totalPrice.toLocaleString()}원</span>
                특별할인 + 쿠폰 적용가
              </h1>
            </div>
          </div>
        </div>

        <div className="border-height-12"></div>

        {/* 결제 금액 영역 */}
        <div className="paid-wrap">
          <div className="paid-pay">
            <h3>결제 금액</h3>
            <hr />
            <div className="d-flex justify-content-between pay">
              <div className="left">상품금액</div>
              <div className="right">
                {normalPrice.toLocaleString()}원
              </div>
            </div>

            <div className="d-flex justify-content-between pay">
              <div className="left">기본 할인</div>
              <div className="right">
                {discountAmount > 0
                  ? `-${discountAmount.toLocaleString()}원`
                  : "0원"}
              </div>
            </div>

            <div className="d-flex justify-content-between pay">
              <div className="left">쿠폰 할인</div>
              <div className="right">
                {couponDiscount > 0
                  ? `-${couponDiscount.toLocaleString()}원`
                  : "0원"}
              </div>
            </div>
          </div>
        </div>

        {/* 총 결제 금액 */}
        <div className="border-height-72 d-flex justify-content-between total">
          <div className="left">총 결제 금액</div>
          <div className="right">
            {totalPrice.toLocaleString()}원
          </div>
        </div>

        {/* 이하 결제수단/안내는 그대로 */}
      </div>

      <FooterBtn onBuy={handleBuyClick} />

      {/* 쿠폰 모달에 product + onApply 전달 */}
      {isCouponOpen && (
        <Coupon
          onClose={closeCoupon}
          product={product}
          onApply={(coupon, discount) => {
            // coupon은 지금 안 써도 되고, 나중에 이름 표시할 때 활용 가능
            setCouponDiscount(discount);
            closeCoupon(); // 모달 닫기
          }}
        />
      )}
    </>
  );
};

export default Dc;
