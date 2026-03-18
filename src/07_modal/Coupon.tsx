// src/07_modal/Coupon.tsx
import { useEffect, useState } from "react";
import api from "../api/client";
import type { Product } from "../types/product";
import type { CouponDto } from "../types/coupon";

type CouponProps = {
  onClose: () => void;
  product: Product; // Dc에서 전달
  onApply: (coupon: CouponDto | null, discountAmount: number) => void; // 추가
};

const Coupon = ({ onClose, product, onApply }: CouponProps) => {
  const [coupons, setCoupons] = useState<CouponDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | "NONE">("NONE");

  const normalPrice = product.normalPrice ?? 0;
  const salePrice = product.salePrice ?? normalPrice;
  const basicDiscount = normalPrice - salePrice;

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setError(null);
        setLoading(true);

        const res = await api.get<CouponDto[]>("/api/coupons");
        setCoupons(res.data || []);
      } catch (e) {
        console.error(e);
        setError("쿠폰 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const calcCouponDiscount = (coupon: CouponDto): number => {
    if (!coupon.usable) return 0;
    if (salePrice < coupon.minOrderAmount) return 0;

    if (coupon.discountType === "FIXED") {
      return Math.min(coupon.discountValue, salePrice);
    }

    if (coupon.discountType === "PERCENT") {
      const raw = (salePrice * coupon.discountValue) / 100;
      return Math.floor(raw);
    }

    return 0;
  };

  const selectedCoupon =
    selectedId !== "NONE"
      ? coupons.find((c) => c.userCouponId === selectedId) ?? null
      : null;

  const couponDiscount = selectedCoupon ? calcCouponDiscount(selectedCoupon) : 0;
  const totalPrice = salePrice - couponDiscount;

  // 적용 버튼 핸들러
  const handleApply = () => {
    if (selectedId === "NONE") {
      // 쿠폰 사용 안함
      onApply(null, 0);
    } else {
      const coupon =
        coupons.find((c) => c.userCouponId === selectedId) ?? null;
      const discount = coupon ? calcCouponDiscount(coupon) : 0;
      onApply(coupon, discount);
    }
    onClose(); // 모달 닫기
  };

  return (
    <>
      <div className="modal-wrap">
        <div className="popup">
          <div className="content-wrap">
            <h2>쿠폰</h2>

            {/* 상단 상품 정보 영역 */}
            <div className="d-flex align-items-center mb-3">
              <div className="me-3">
                <img
                  src={product.imageUrl || "/svg/paid/ch.png"}
                  alt=""
                  style={{ width: 60, height: 60, objectFit: "cover" }}
                />
              </div>
              <div>
                <button className="basicBtn">
                  {product.salesTypeName ?? "심화해석판"}
                </button>
                <p className="mt-2">{product.name}</p>
              </div>
            </div>

            <hr />

            {/* 금액 요약 */}
            <div className="d-flex justify-content-between">
              <div>상품 금액</div>
              <div>{normalPrice.toLocaleString()}원</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>특별 할인</div>
              <div>
                {basicDiscount > 0
                  ? `-${basicDiscount.toLocaleString()}원`
                  : "0원"}
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <div>쿠폰 할인</div>
              <div>
                {couponDiscount > 0
                  ? `-${couponDiscount.toLocaleString()}원`
                  : "0원"}
              </div>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <div>총 결제 금액</div>
              <div>{totalPrice.toLocaleString()}원</div>
            </div>

            <div className="mt-2 mb-2">자동으로 특별할인 들어갔어요</div>

            {loading && <div>쿠폰을 불러오는 중입니다…</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}

            {!loading && !error && (
              <div>
                {coupons.length === 0 && (
                  <div className="mt-2 mb-2">사용 가능한 쿠폰이 없습니다.</div>
                )}

                {coupons.map((c) => {
                  const thisDiscount = calcCouponDiscount(c);
                  const disabled = !c.usable || thisDiscount === 0;

                  return (
                    <div
                      key={c.userCouponId}
                      className="d-flex justify-content-between mt-2"
                    >
                      <div>
                        <h2>
                          {thisDiscount > 0
                            ? `-${thisDiscount.toLocaleString()}원`
                            : c.discountType === "PERCENT"
                            ? `-${c.discountValue}%`
                            : `-${c.discountValue.toLocaleString()}원`}
                        </h2>
                        <h5>{c.name}</h5>
                        {c.minOrderAmount > 0 && (
                          <div style={{ fontSize: 12, color: "#777" }}>
                            {c.minOrderAmount.toLocaleString()}원 이상 결제 시
                            사용 가능
                          </div>
                        )}
                        {c.expired && (
                          <div style={{ fontSize: 12, color: "red" }}>
                            이미 만료된 쿠폰입니다.
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="coupon"
                          disabled={disabled}
                          checked={selectedId === c.userCouponId}
                          onChange={() => setSelectedId(c.userCouponId)}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* 적용 안함 */}
                <div className="d-flex justify-content-between mt-3">
                  <div>
                    <h2>적용안함</h2>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="coupon"
                      checked={selectedId === "NONE"}
                      onChange={() => setSelectedId("NONE")}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 버튼 영역 */}
            <div className="d-flex justify-content-between mt-3">
              <div className="w-50 pe-1">
                <button
                  className="basicMintGray w-100"
                  type="button"
                  onClick={onClose}
                >
                  취소
                </button>
              </div>
              <div className="w-50 ps-1">
                {/* 부모에게 선택 쿠폰/할인 전달 */}
                <button
                  className="basicMint w-100"
                  type="button"
                  onClick={handleApply}
                >
                  쿠폰 적용 하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
