import styled from "styled-components";
import { Container, Card, Button } from "react-bootstrap";


/*전체컨테이너 */
export const PageContainer = styled(Container)`
margin-top:5rem;
`;

/*로그인 이미지 */
export const LeftImage = styled.div`
width:100%;
height:100%;
min-height:600px;
background:url("/img/register-bg.jpg") center / cover no-repeat;
`;

/*Form영역 */
export const FormWrapper = styled.div`
padding: 3rem;
`;

/*성별 라벨 */
export const GenderLabel = styled.label`
margin-right:1rem; font-weight:500;
`;

/*주소 검색 영역 */
export const AddressGroup = styled.div`
display:flex; gap:0.5rem;
`;

/*주소 검색 버튼 */
export const AddressButton = styled.button`
width:25%; background-color:#6c757d;
border:none; color:#fff; border-radius:0.35rem;
&:hover{
background-color:#5a6268;
}
`;

/*회원 가입 버튼 */
export const SubmitButton = styled(Button)`
width:100%; margin-bottom:0.5rem;
`;

export const SocialButton = styled.a<{bg:string}>`
display:flex; 
align-items:center; 
justify-content:center;
gap:0.6rem; 
width:100%; 
padding:0.75rem;
margin-bottom:0.6rem; 
font-size:0.9rem; font-weight:600; 

background:${({bg})=>bg};
border-radius:0.35rem; text-decoration:none;

/* 기본 글자색 */
  color: ${({ bg }) => (bg === "#fff" ? "#3c4043" : "#fff")};

/* 구글 버튼일 때만 테두리 */
  border: ${({ bg }) => (bg === "#fff" ? "1px solid #dadce0" : "none")};

transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;

&:hover{
    /* 전역 a:hover 컬러 덮어쓰기 방지 */
      color: ${({ bg }) => (bg === "#fff" ? "#3c4043" : "#fff")};
      text-decoration: none;

    /* 구글은 살짝만 */
      filter: ${({ bg }) => (bg === "#fff" ? "brightness(0.98)" : "brightness(1.06)")};

   
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    transform: translateY(-1px);  
}

&:active {
  transform: translateY(0px);
  filter: ${({ bg }) => (bg === "#fff" ? "brightness(0.96)" : "brightness(0.98)")};
}




  /* Google 컬러 텍스트 */
  .google-text {
    display: flex;
    font-weight: 700;
    letter-spacing: -0.3px;
  }

  .g-blue { color: #4285F4; }
  .g-red { color: #DB4437; }
  .g-yellow { color: #F4B400; }
  .g-green { color: #0F9D58; }

`;



/*카드 */

export const StyledCard = styled(Card)`
border:none;
box-shadow: 0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15);
border-radius:0.5rem;
`;

/*Footer */
export const FooterLinks = styled.div`
margin-top:1rem;
text-align:center;
display: flex !important;
flex-direction: column;
gap:0.5rem;
`;

export const FooterLink = styled.a`
display:inline-block;
font-size:0.85rem;
color:#6c757d;
text-decoration:none;
line-height: 1.3;
&:hover{
text-decoration:underline; color:#495057;
}
`;

/*성별 내부 정렬 */
export const GenderRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1rem;

  /* 부트스트랩 Form.Check의 내부 정렬 보정 */
  .form-check {
    display: inline-flex;
    align-items: center;
    margin: 0;          /* inline 기본 여백 제거 */
  }

  .form-check-input {
    margin-top: 0;      /* 라디오 위로 뜨는 현상 제거 */
  }

  .form-check-label {
    margin-left: 0.35rem;
    line-height: 1;
  }
`;