// src/types/coupon.ts
export interface CouponDto {
    userCouponId: number;
    name: string;
    description: string;
    discountType: "FIXED" | "PERCENT" | string; // 혹시 다른 타입 들어오면 string
    discountValue: number;
    minOrderAmount: number;
    expiredAt: string | null;
    expired: boolean;
    usable: boolean;
  }
  