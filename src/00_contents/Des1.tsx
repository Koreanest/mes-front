// src/00_contents/Des1.tsx
type Des1Props = {
    title: string;
    content: string;
  };
  
  const Des1 = ({ title, content }: Des1Props) => {
    return (
      <>
        <div className="text-answer mt-90">
          <div className="text">
            <div className="d-flex justify-content-between align-items-center">
              <h5>01</h5>
              <div className="grayline"></div>
            </div>
            {/* 상품명 들어가는 부분 */}
            <h1>{title}</h1>
  
            {/* GPT가 생성한 운세 텍스트 */}
            <p>{content}</p>
          </div>
        </div>
      </>
    );
  };
  
  export default Des1;
  