import React from "react";

interface BasicModalProps{
    isOpen: boolean;
    onClose: () => void;
    children:React.ReactNode;
}

/*const BasicModal:React.FC<PropsWithChildren<BasicModalProps>> = ({
isOpen,
onClose,
children,
})=>{*/
const BasicModal = ({isOpen, onClose, children}:BasicModalProps) => {
 if(!isOpen) return null;

return(
<>
<div className="modal-wrap" onClick={onClose}>
    <div className="popup" onClick={(e) => e.stopPropagation()}>
        {children}

    <div className="d-flex justify-content-between mt-3 mb-2">
        <div className="w-50">
            <button className="basicMintGray" onClick={onClose}>
                취소
            </button>
        </div>
        <div className="mx-2">&nbsp;</div>
        <div className="w-50">
            <button className="basicMint" onClick={onClose}>
                선택완료
            </button>
        </div>
    </div>

    </div>
</div>
</>
    );
}
export default BasicModal;