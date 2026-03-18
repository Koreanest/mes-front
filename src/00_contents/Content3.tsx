// src/00_contents/Content3.tsx
import React, { useRef, useEffect, useState } from "react";
import api from "../api/client";
import type { Product, ProductListResponse } from "../types/product";

interface Card {
  id: number;
  img: string;
  text: string;
  btn: string;
  type: string;
  link: string;
}

interface ContentProps {
  category?: string; // 메뉴 필터
}

const Content3: React.FC<ContentProps> = ({ category }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // StrictMode 중복 호출 방지용 플래그
  const didFetchRef = useRef(false);

  // ====== 최초 상품 조회 (/api/products, FREE 전용) ======
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setError(null);

        const params: Record<string, any> = {
          salesType: "FREE",
          page: 0,
          size: 20,
        };

        if (category) {
          params.category = category;
        }

        const res = await api.get<ProductListResponse>("/api/products", {
          params,
        });

        const list = res.data.list || [];

        const mapped: Card[] = list.map((p: Product) => {
          const isPaid = p.paid;

          // 유료/무료에 따라 버튼/스타일/링크 다르게
          const btn = isPaid ? "심화 해석판" : "무료 체험판";
          const type = isPaid ? "basicBtn" : "basicGray";

          // 상세 페이지 링크에 productId 쿼리 추가
          //   - 유료면 /des?productId=...
          //   - 무료면 /dt?productId=...
          // const basePath = isPaid ? "/des" : "/dt";
          // const link = `${basePath}?productId=${p.id}`;
          const link = `/des?productId=${p.id}`;

          // 카드 이미지도 대충 느낌 맞게 분기
          let img = "/svg/main/card1.png";
          if (!isPaid) {
            img =
              p.salesTypeCode === "FREE"
                ? "/svg/main/card2.png"
                : "/svg/main/card3.png";
          }

          return {
            id: p.id,
            img,
            text: p.name,
            btn,
            type,
            link,
          };
        });

        setCards(mapped);
      } catch (e) {
        console.error(e);
        setError("상품을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    // 이미 한 번 실행했다면 재실행 막기 (React 18 StrictMode 대응)
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    fetchCards();
  }, [category]); // category 바뀌면 다시 로딩

  // ====== 인피니트 스크롤: 바닥에서 카드 배열 복제 ======
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      if (scrollTop + clientHeight >= scrollHeight - 10 && cards.length > 0) {
        setCards((prev) => [...prev, ...prev]);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [cards]);

  // ====== 로딩 / 에러 처리 ======
  if (loading) {
    return (
      <div className="content-wrap">
        <div className="img-wrap">
          <img src="/svg/main/mainimg.png" alt="" />
        </div>
        <p style={{ padding: "16px" }}>상품을 불러오는 중…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrap">
        <div className="img-wrap">
          <img src="/svg/main/mainimg.png" alt="" />
        </div>
        <p style={{ padding: "16px", color: "red" }}>{error}</p>
      </div>
    );
  }

  // ====== 실제 렌더링 ======
  return (
    <div className="content-wrap">
      <div className="img-wrap">
        <img src="/svg/main/mainimg.png" alt="" />
      </div>

      <div className="infinite-content">
        <div className="text-wrap">
          <p>내연인은 어디 있을까?</p>
          <button className="basicBtn">심화해석판</button>
        </div>

      <div className="infinite-wrap">
        <div
          ref={scrollRef}
          style={{
            height: "600px",
            overflowY: "scroll",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* 여기서는 cards만 렌더 */}
          {cards.map((card, i) => (
            <div key={`${card.id}-${i}`} className="infinite-content">
              <div className="infinite-img-wrap">
                <img src={card.img} alt="" />
              </div>

              <div className="infinite-text-wrap">
                <p
                  onClick={() => (window.location.href = card.link)}
                  style={{ cursor: "pointer" }}
                >
                  {card.text}
                </p>

                <button
                  className={card.type}
                  onClick={() => (window.location.href = card.link)}
                >
                  {card.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Content3;
