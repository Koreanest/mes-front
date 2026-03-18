import {useState} from "react";
import BasicModal from "./BasicModal";

const SelectLayer = () => {
    const [open, setOpen] = useState(false);

    return(
<>
<div className="select-btn-wrap2">
    <div className="w-50">
        <button className="basicMint" onClick={() => setOpen(true)}>사주정보 추가</button>

    </div>
    <div className="w-50">
        <a className="basicMintGray" href="/profile2">다음</a>
    </div>
</div>

      <BasicModal isOpen={open} onClose={() => setOpen(false)}>
        <div className="content-wrap">
            <h2>관계 선택</h2>
            <div className="underline py-2"></div>
           
            <div className="d-flex justify-content-between align-items-center">
                <div className="left">연인</div>
                <div className="right">
                    <input type="radio" />
                </div>
            </div>
            <div className="underline py-2"></div>

            <div className="d-flex justify-content-between align-items-center">
                <div className="left">가족</div>
                <div className="right">
                    <input type="radio" />
                </div>
            </div>
            <div className="underline py-2"></div>

            <div className="d-flex justify-content-between align-items-center">
                <div className="left">친구</div>
                <div className="right">
                    <input type="radio" />
                </div>
            </div>
            <div className="underline py-2"></div>

            <div className="d-flex justify-content-between align-items-center">
                <div className="left">지인</div>
                <div className="right">
                    <input type="radio" />
                </div>
            </div>
            <div className="underline py-2"></div>

            <div className="d-flex justify-content-between align-items-center">
                <div className="left">동료</div>
                <div className="right">
                    <input type="radio" />
                </div>
            </div>
            <div className="underline py-2"></div>

            <div className="d-flex justify-content-between align-items-center">
                <div className="left">기타</div>
                <div className="right">
                    <input type="radio" />
                </div>
            </div>
            <div className="underline py-2"></div>
        
        </div>

      </BasicModal>
</>
    );
}
export default SelectLayer;