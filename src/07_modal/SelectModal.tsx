const SelectModal = () => {
    return(
        <>
        <div className="modal-wrap">
<div className="popup">
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
</div>
    </div>
        </>
    )
}
export default SelectModal;