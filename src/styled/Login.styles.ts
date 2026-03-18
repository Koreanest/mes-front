import styled from "styled-components";


export const Wrapper = styled.div`
min-height:100vh; display:flex; justify-content:center; align-items:center;
background:#f8f9fc; 
`;
export const Card = styled.div`
width:900px; background:#fff; border-radius:12px;
box-shadow: 0 0.5rem 2rem rgba(0,0,0,0.15);
overflow:hidden; display:flex;
`;
export const LeftImage = styled.div`
flex:1;
background:url("/img/login.jpg") center / cover no-repeat;
@media(max-width:992px){display:none;}
`;
export const Right = styled.div`
flex:1;
padding:3rem;
`;
export const Title = styled.h1`
font-size:1.25rem; 
font-weight:700;
text-align:center;
margin-bottom:2rem;
`;
export const Form = styled.form`
width:100%;
`;
export const Input = styled.input`
width:100%;
padding:0.9rem 1rem; margin-bottom:1rem; border-radius:10rem;
border:1px solid #d1d3e2; font-size: 0.9rem;
&:focus{outline:none; border-color:#4e73df;}

  /* ✅ checkbox일 때만 덮어쓰기 */
  &[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin: 0;
    padding: 0;
    border-radius: 4px;
  }
`;
export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
`;
export const Button = styled.button`
width:100%; padding:0.75rem; border-radius:10rem;
border:none; background:#4e73df; color:#fff; font-weight:700;
cursor:pointer;
&:hover{
background:#2e59d9;}

`;
export const Divider = styled.hr`
margin:1.5rem 0;
`;
export const SocialButton = styled.button<{$variant:"google"|"facebook"|"instagram";}>`
margin-top:0.8rem;
width:100%;
padding:0.7rem 1.2rem;
border-radius:10rem;
border:none;
cursor:pointer;

display:flex;
align-items:center;
justify-content:center;

gap:0.5rem; font-size:0.9rem;
font-weight:600;

  /* ✅ 아이콘 공통 크기 고정 (img/svg/i 전부) */
  img,
  svg,
  i {
    width: 16px;
    height: 16px;
    font-size: 16px;
    flex-shrink: 0;
    display: block;
  }

 

background:${({$variant})=>{
    switch($variant){
        case "google":
            return "#fff";
        case "facebook":
            return "#1877f2"
        case "instagram":
            return "linear-gradient(45deg, #f58529, #dd2a7b, #8134af)"
        default:
            return "#ccc";
    }
}};
color: ${({$variant})=> $variant ==="google"?"#3c4043":"#fff"};
border:${({$variant}) => $variant ==="google"?"1px solid #dadce0":"none"};

box-shadow:0 2px 6px rgba(0,0,0,0.15);
transition: all ease 0.2s;
i{font-size:1rem;}
&:hover{
transform:translateY(-1px);
opacity:0.95;
}
`;

/*export const SocialButton = styled.button<{bg:string}>`
width:100%;
padding:0.65rem;
border-radius:10rem;
border:none;
color:#fff;
font-size: 0.85rem;
margin-bottom:0.5rem;
background:${({bg})=>bg};
cursor:pointer;
`;
*/
export const LinkText = styled.a`
display:block; text-align:center; font-size:0.85rem;
color:#4e73df;
margin-top:0.5rem;
text-decoration:none;
&:hover{text-decoration:underline;}
`;