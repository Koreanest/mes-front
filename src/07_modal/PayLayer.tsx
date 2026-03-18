import {useState} from "react";
import BasicModal from "./BasicModal";

const PayLayer = () => {
    const [open, setOpen] = useState(false);

    return(
<>
<div className="footer-btn-wrap">
    <button className="basicMint" onClick={() => setOpen(true)}>구매하기
    </button>
</div>  

      <BasicModal isOpen={open} onClose={() => setOpen(false)}>
        <div className="content-wrap">
            <h2>쿠폰</h2>

            <div className="paid-price">
                <div className="le">
                    <img src="/svg/paid/ch.png" alt="" />
                </div>
                
                <div className="ri">
                    <button className="basicBtn">심화해석판</button>
                    <h1>내 연인은 바람기 있을까?</h1>
                </div>
            </div>

            <div className="underline"></div>

            <div className="price-box">

                <div className="d-flex justify-content-between align-items-center">
                    <h5>상품 금액</h5>
                    <h3>25,800원</h3>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <h5>특별 할인</h5>
                    <h3>-5,000원</h3>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <h5>특별 할인</h5>
                    <h3>-12,900원</h3>
                </div>
            
            </div>

            <div className="underline"></div>

            <div className="last-price">

                <div className="d-flex justify-content-between align-items-center">
                    <h5>총 결제 금액</h5>
                    <h3>7,900원</h3>
                </div>
            </div>

            <div className="paid-msg text-center">
                자동으로 특별 할인 들어갔어요 
            </div>

            <div className="price">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="left">
                        <h5>-5,000원</h5>
                        <h5>가입축하쿠폰</h5>
                    </div>
                    <div className="right">
                        <input type="radio" />
                    </div>
                </div>
            </div>

            <div className="price">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="left">
                        <h5>-3,000원</h5>
                        <h5>재구매쿠폰</h5>
                    </div>
                    <div className="right">
                        <input type="radio" />
                    </div>
                </div>
            </div>


           
            
        </div>
        <div className="price">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="left">
                        <h5>-5,000원</h5>
                        <h5>가입축하쿠폰</h5>
                    </div>
                    <div className="right">
                        <input type="radio" />
                    </div>
                </div>
            </div>

            <div className="price">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="left">
                        <h5>-3,000원</h5>
                        <h5>재구매쿠폰</h5>
                    </div>
                    <div className="right">
                        <input type="radio" />
                    </div>
                </div>
            </div>
            <div className="price">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="left">
                        <h5>적용안함</h5>
                    </div>
                    <div className="right">
                        <input type="radio" />
                    </div>
                </div>
            </div>

      </BasicModal>
</>
    );
}
export default PayLayer;