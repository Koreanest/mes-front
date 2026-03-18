// src/include/FooterBtn.tsx
import FooterSmallLogo from "../../08_svg/FooterSmallLogo";

type FooterBtnProps = {
  /** 구매하기 눌렀을 때 실행할 콜백 (없으면 기존처럼 /dup 이동) */
  onBuy?: () => void;
};

const FooterBtn: React.FC<FooterBtnProps> = ({ onBuy }) => {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (onBuy) {
      e.preventDefault();  // a 태그의 기본 이동 막고
      onBuy();             // 부모에서 넘긴 로직 실행
    }
    // onBuy 없으면 그냥 href="/dup"으로 이동
  };

  return (
    <>
      <footer>
        <FooterSmallLogo />

        <p className="mt-3">
          Copyright 2024@Stargiosoft All Rights Reserved.<br />
          대표자 서지현 | 사업자등록번호 827-88-01815<br />
          통신판매사업번호 2024-서울영등포-2084<br />
          서울시 영등포구 양평로 149, 1507호<br />
          문의 stargiosoft@gmail.com<br />
        </p>
        <p>
          <a href="/privacy">이용약관</a>
          <span className="mx-2">|</span>
          <a href="/term">개인정보처리방침</a>
        </p>

        <div className="footer-btn-wrap">
          <a
            className="basicMint"
            href="/dup"
            onClick={handleClick}
          >
            구매하기
          </a>
        </div>
      </footer>
    </>
  );
};

export default FooterBtn;
