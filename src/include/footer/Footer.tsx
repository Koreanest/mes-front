import FooterSmallLogo from "../../08_svg/FooterSmallLogo";

const Footer = () => {
    return(
        <>
        <footer>
<FooterSmallLogo/>

<p className="mt-3">
Copyright 2024@Stargiosoft All Rights Reserved.<br/>
대표자 서지현 | 사업자등록번호 827-88-01815<br/>
통신판매사업번호 2024-서울영등포-2084<br/>
서울시 영등포구 양평로 149, 1507호<br/>
문의 stargiosoft@gmail.com<br/>
</p>
<p>
<a href="#">이용약관</a><span className="mx-2">|</span><a href="/privacy">개인정보처리방침</a>
</p>       

        </footer>
        </>
    )
}
export default Footer;