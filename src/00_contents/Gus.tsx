// src/00_contents/Gus.tsx
import { useState, useEffect, useRef } from "react";
import api from "../api/client";
import type { ProductDetail } from "../types/productDetail";

interface GusProps {
  productId: number;
}

const Gus: React.FC<GusProps> = ({ productId }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [items, setItems] = useState<
    { title: string; content: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const didFetchRef = useRef(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setError(null);
        setLoading(true);

        const res = await api.get<ProductDetail[]>(
          `/api/products/${productId}/details`
        );

        const list = (res.data || []).sort(
          (a, b) => a.sortOrder - b.sortOrder
        );

        // question + detailGuide를 맛보기 아코디언으로 사용
        const mapped = list.map((d, idx) => ({
          title: `${(idx + 1).toString().padStart(2, "0")}. ${
            d.question
          }`,
          content:
            d.exampleAnswer && d.exampleAnswer !== "NULL"
              ? d.exampleAnswer
              : d.detailGuide || "",
        }));

        setItems(mapped);
      } catch (e) {
        console.error(e);
        setError("맛보기 해석을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (!productId) return;
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    fetchDetails();
  }, [productId]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <>
        <div className="gus-title">아래는 일부 예시 해석입니다</div>
        <div className="gus-wrap">
          <h1>맛보기 해석을 불러오는 중…</h1>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="gus-title">아래는 일부 예시 해석입니다</div>
        <div className="gus-wrap">
          <h1 style={{ color: "red" }}>{error}</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="gus-title">아래는 일부 예시 해석입니다</div>

      {items.map((item, index) => (
        <div key={index}>
          <div
            className="gus-wrap"
            onClick={() => toggle(index)}
            style={{ cursor: "pointer" }}
          >
            <h1>{item.title}</h1>
          </div>

          {openIndex === index && (
            <div className="gus-bg">
              <h2>[맛보기]</h2>
              {item.content}
              <div className="bottom">여기까지만 공개돼요</div>
            </div>
          )}
        </div>
      ))}

      <div className="border-height-12"></div>

      <div className="gus-btn-wrap">
        <div className="gus-border">
          더 깊은 풀이는 구매 후 확인할수 있습니다
        </div>
        <a className="basicMint mt-5" href="/dc">
          구매하기
        </a>
      </div>
    </>
  );
};

export default Gus;
