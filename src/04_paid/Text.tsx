import { useState, useEffect } from "react";
import Footer from "../include/footer/Footer";
import DesHeader from "../include/header/DesHeader";
import "./TextSkeleton.scss";
import Des1 from "../00_contents/Des1";
import Des2 from "../00_contents/Des2";
import Des3 from "../00_contents/Des3";
import Des4 from "../00_contents/Des4";
import Des5 from "../00_contents/Des5";
import LeftArrow from "../08_svg/LeftArrow";
import RightArrow from "../08_svg/RightArrow";
import { useSearchParams } from "react-router-dom";
import api from "../api/client";

type ProductResponse = {
  id: number;
  name: string;
  description: string;
  normalPrice: number;
  salePrice: number;
  discountRate: number;
  firstPurchasePrice: number;
  imageUrl: string | null;
  compositionItems: any[];
  categoryCode: string;
  categoryName: string;
  salesTypeCode: string;
  salesTypeName: string;
  paid: boolean;
};

type SajuHistoryResponse = {
  id: number;
  productId: number | null;
  gptResponse: string;
  targetName: string | null;
  targetGender: string | null;
  targetBirthDate: string | null;
  targetBirthTime: string | null;
  targetBirthTimeUnknown: boolean;
};

const Text = () => {
  const [loading, setLoading] = useState(true);

  // 현재 페이지 인덱스 상태 추가 (0 = Des1)
  const [page, setPage] = useState(0);

  const [searchParams] = useSearchParams();
  const historyIdParam = searchParams.get("historyId");
  const productIdParam = searchParams.get("productId");

  const historyId = historyIdParam ? Number(historyIdParam) : 0;
  const productId = productIdParam ? Number(productIdParam) : 0;

  const [productName, setProductName] = useState<string>("");
  const [gptText, setGptText] = useState<string>("");

  // 페이지별 보여줄 컴포넌트 배열
  const contents = [<Des1
    title={productName || "운세 결과"}
    content={gptText || "잠시만 기다려 주세요..."}
  />, <Des2/>, <Des3/>, <Des4/>, <Des5/>];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);

    const fetchData = async () => {
      try {
        // 1) 상품 정보 조회
        if (productId) {
          const res = await api.get<ProductResponse>(`/api/products/${productId}`);
          setProductName(res.data.name);
        }

        // 2) 사주 GPT 히스토리 조회
        if (historyId) {
          const res = await api.get<SajuHistoryResponse>(
            `/api/fortune/history/${historyId}`
          );
          setGptText(res.data.gptResponse || "");
        }
      } catch (e) {
        console.error("Text 페이지 데이터 조회 실패", e);
      }
    };

    fetchData();

    return () => clearTimeout(t);
  }, []);

  
  /* ------------------- 로딩 스켈레톤 ------------------- */
  if (loading) {
    return (
      <div className="Min390Max">
        {/* Header 스켈레톤 */}
        <div className="skeleton-header"></div>
        
        <div className="text-answer mt-90">
          <div className="text">
            <div className="d-flex justify-content-between align-items-center">
              <div className="skeleton-number w-10"></div>
              <div className="skeleton-line w-80"></div>
            </div>
            <div className="skeleton-title mt-2 w-90"></div>
            <div className="skeleton-paragraph mt-2">
              <div className="skeleton-line w-100"></div>
              <div className="skeleton-line w-95"></div>
              <div className="skeleton-line w-90"></div>
              <div className="skeleton-line w-85"></div>
              <div className="skeleton-line w-80"></div>
            </div>
          </div>
        </div>

        <div className="text-answer mt-3">
          <div className="text">
            <div className="d-flex justify-content-between align-items-center">
              <div className="skeleton-number w-10"></div>
              <div className="skeleton-line w-80"></div>
            </div>
            <div className="skeleton-img mx-auto mt-3"></div>
            <div className="skeleton-title mt-2 w-60 mx-auto"></div>
            <div className="skeleton-paragraph mt-2">
              <div className="skeleton-line w-95"></div>
              <div className="skeleton-line w-90"></div>
              <div className="skeleton-line w-85"></div>
              <div className="skeleton-line w-80"></div>
            </div>
          </div>
        </div>

        <div className="skeleton-footer mt-4"></div>
      </div>
    );
  }


  /* ------------------- 실제 화면 ------------------- */
  return(
    <>
    <DesHeader/>
      <div className="Min390Max">
        

        {/* 현재 page에 해당하는 콘텐츠만 렌더링 */}
        {contents[page]}

        <div className="inner-footer bg-white">
          <div className="d-flex">
            <img src="/svg/paid/adi.png" alt="" />
            <div>{String(page+1).padStart(2,'0')}/10</div> {/* 03/10 → 01~05 적용 */}
          </div>

          <div className="d-flex down">

            {/* 🔙 이전 버튼 */}
            <div 
              className={ page===0 ? "disabled" : "" }
              onClick={() => page>0 && setPage(prev=>prev-1)}
              style={{cursor: page>0? "pointer":"default"}}
            >
              <span className="mx-2"><LeftArrow/></span>이전
            </div>

            <div className="mx-3">&nbsp;|&nbsp;</div>

            {/* 🔜 다음 버튼 */}
            <div 
              className={ page===contents.length-1 ? "disabled" : "" }
              onClick={() => page < contents.length-1 && setPage(prev=>prev+1)}
              style={{cursor: page<contents.length-1? "pointer":"default"}}
            >
              <span className="mx-2">다음</span><RightArrow/>
            </div>

          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default Text;
