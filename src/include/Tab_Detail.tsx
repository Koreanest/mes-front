// src/include/Tab_Detail.tsx
import { useState } from "react";
import Detail_Content from "../00_contents/Detail_Content";
import Exp from "../00_contents/Exp";
import Gus from "../00_contents/Gus";

interface TabDetailProps {
  productId: number; // 어떤 상품인지 식별
}

const Tab_Detail: React.FC<TabDetailProps> = ({ productId }) => {
  const [activeTab, setActiveTab] = useState("상품 설명");

  const tabs = [
    { id: "상품 설명", label: "상품 설명" },
    { id: "풀이 원리", label: "풀이 원리" },
    { id: "맛보기", label: "맛보기" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "상품 설명":
        return (
          <div className="tab-content">
            {/* 상품 설명 탭에서 상세 구성까지 같이 보여주기 */}
            <Detail_Content productId={productId} />
          </div>
        );
      case "풀이 원리":
        return (
          <div className="tab-content">
            {/* 필요하면 Exp에도 productId 넘겨서 세부 설명을 동적으로 */}
            <Exp productId={productId} />
          </div>
        );
      case "맛보기":
        return (
          <div className="tab-content">
            <Gus productId={productId} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <nav className="tab mt-80">
        <div className="tab-wrap">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href="#"
              className={
                activeTab === tab.id ? "tab-wrap-a-active" : "tab-wrap-a"
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </nav>
      {renderContent()}
    </>
  );
};

export default Tab_Detail;
