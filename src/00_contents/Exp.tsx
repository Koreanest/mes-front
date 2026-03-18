// src/00_contents/Exp.tsx
import React from "react";

interface ExpProps {
  productId: number; 
}

const Exp: React.FC<ExpProps> = ({ productId }) => {
  // productId를 나중에 활용할 수 있도록 props로만 받고 현재는 사용 X
  // console.log("풀이 원리 productId:", productId);

  return (
    <>
      <div className="exp-top">
        <img src="/svg/paid/exp1.png" alt="" />
        <div className="text-center">
          <h1>우리 운세는 왜 다를까요?</h1>
          <h2 className="mt-2">
            시중의 수많은 운세, 왜 조금씩 다를까 궁금하셨죠?
          </h2>
          <p>
            저희는 평균적인 해석이 아닌 당신만을 위한 가장 정확한 답을
            찾아 드립니다
          </p>
        </div>
      </div>

      <div className="border-height-12"></div>

      <div className="exp-text-wrap">
        <h1>믿을수 있는 이유 3가지</h1>
        <div className="number">01</div>
        <h2>정통명리해석</h2>
        <p>
          명리학은 태어난 순간의 ‘팔자(八字)’를 수(數)와 오행
          (五行)으로 해석하는 학문입니다. 저희는 명리학의
          대표적인 3대 고전, 『자평진전』·『적천수』·『궁통보감』에
          기반한 정통 추론 방식을 현대 프로그램에 맞게 재해석했습니다.
          <span>
            복잡한 계산을 거치지만, 그만큼 깊이 있고 정통성 있는 분석을
            제공해드립니다.
          </span>
        </p>
      </div>

      <div className="exp-text-wrap">
        <div className="number">02</div>
        <h2>AI데이터 분석</h2>
        <p>
          사주의 핵심은 바로 용신(用神) 해석입니다. 저희는 억부, 전왕,
          통관, 병약, 조후 등 다양한 용신법을 명리학자의 검증을 거친
          자체 개발 AI로 분석합니다.
          <span>
            사람마다 달라질 수 있는 주관적 해석 대신, 가장 객관적이고
            균형 잡힌 답을 제시합니다.
          </span>
        </p>
      </div>

      <div className="exp-text-wrap">
        <div className="number">03</div>
        <h2>10만+사례검증</h2>
        <p>
          세종대왕부터 현대의 유명 인물까지, 전 세계 인물들의
          사주를 분석해왔습니다. 25년 상담 노하우와
          10만 건 이상의 실제 사례를 바탕으로, 전문가는 물론
          AI와 함께 완성도를 높였습니다.
          <span>
            단순한 이론이 아니라, 실제 검증된 데이터를 기반으로 신뢰할 수
            있는 해석을 제공합니다.
          </span>
        </p>
      </div>

      <div className="exp-btn-wrap">
        <a className="basicMint" href="/dc">
          구매하기
        </a>
      </div>
    </>
  );
};

export default Exp;
