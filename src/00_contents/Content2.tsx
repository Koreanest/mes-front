// src/00_contents/Content2.tsx
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

const Content2: React.FC<ContentProps> = ({ category }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // StrictMode에서 중복 호출 방지용 플래그
  const didFetchRef = useRef(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setError(null);

        const params: Record<string, any> = {
          salesType: "PREMIUM",
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
          // 심화 해석판 상세 페이지 링크에 productId 쿼리 추가
          const link = `/des?productId=${p.id}`;

          return {
            id: p.id,
            img: p.imageUrl || "/svg/main/card1.png",
            text: p.name,
            btn: p.salesTypeName || "심화 해석판",
            type: "basicBtn",
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

    // 이미 한 번 실행했다면 다시 안 함 (StrictMode 대응)
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    fetchCards();
  }, [category]); // category 변하면 다시 호출

  // 스크롤 시 바닥 도달하면 카드 더 추가 (가짜 인피니트)
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

  if (loading) {
    return (
      <div className="content-wrap">
        <p style={{ padding: "16px" }}>심화 해석판 상품을 불러오는 중…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrap">
        <p style={{ padding: "16px", color: "red" }}>{error}</p>
      </div>
    );
  }

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

export default Content2;
