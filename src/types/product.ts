// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  normalPrice: number;
  salePrice: number;
  discountRate: number;
  firstPurchasePrice: number;
  imageUrl: string | null;
  compositionItems: string[];
  categoryCode: string;
  categoryName: string;
  salesTypeCode: string;
  salesTypeName: string;
  paid: boolean;
}

export interface ProductListResponse {
  list: Product[];
  total: number;
  totalPages: number;
  page: number;
}
