import { useState,  type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import {Row, Col, Form} from "react-bootstrap";
import {
  PageContainer, StyledCard, LeftImage, FormWrapper, GenderLabel,
  AddressGroup, AddressButton, SubmitButton, SocialButton, FooterLinks, FooterLink,
  GenderRow
} from "../styled/Member.styles";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import {
  faInstagram, faFacebookF,
  faKakaoTalk
} from "@fortawesome/free-brands-svg-icons";

//다음 api 관련
declare global{
    interface Window{
        daum: any;
    }
}
//성별 enum 특별한 변수 대문자가 권장됨
type Gender = 'male' | 'female' | 'other'| "";

// 신상명세 필드명에 맞는 타입을 명시
interface MemberForm{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    gender: Gender
    companyName: string;
    position: string;
    tel:string;
    address:string;
    detailAddress:string;

}


const Member = () => {
    //초기화
    const[form,setForm] =useState<MemberForm>({
        firstName: "",
        lastName: "",
        email:"" ,
        password:"" ,
        repeatPassword: "",
        gender:"",
        companyName: "",
        position: "",
        tel:"",
        address:"",
        detailAddress:"",
    });


// 여기서부터 추가됨
//백엔드 기본주소
const BACKEND_BASE_URL= "http://localhost:9500";
// 추가 끝

//구글 회원가입(소셜로그인)버튼 클릭시
const handlegoogleSignup=()=>{
    window.location.href=`${BACKEND_BASE_URL}/oauth2/authorization/google`;
};

//인스타 회원가입(소셜로그인)버튼 클릭시
const handleInstaSignup=()=>{
    window.location.href=`${BACKEND_BASE_URL}/oauth2/authorization/instagram`;
};

//페이스북 회원가입(소셜로그인)버튼 클릭시
const handleFacebookSignup=()=>{
    window.location.href=`${BACKEND_BASE_URL}/oauth2/authorization/facebook`;
};


//카카오 회원가입(소셜로그인)버튼 클릭시
const handleKakaoSignup=()=>{
    window.location.href=`${BACKEND_BASE_URL}/oauth2/authorization/kakao`;
};



  //공통 입력값 변경 함수
    const handleChange=(e:ChangeEvent<HTMLInputElement & HTMLSelectElement>)=>{
        //입력창에서 값이 바뀔때 리액트가 보내주는 이벤트 객체
        //회원가입 폼에서 input, select 둘다 이 함수 하나로 처리하려는 의도
        const{name,value}=e.target;//실제로 값이 바뀐 DOM요소 
        //그 안에 여러 속성이 있는데 그 중에서 2개만 뽑아쓰는 것
        setForm((prev)=>({...prev,[name]:value}));
        //useState로 만든 form상태를 바꾸는 함수
        //...prev: 기존 값들을 그대로 복사하고
        //[name]:value: 방금 바뀐 한 필드만 덮어씀

    };
        //성별 선택용 함수
        const handleGenderChange= (e:ChangeEvent<HTMLInputElement>)=>{
            setForm((prev) => ({...prev,gender:e.target.value as Gender}));
            //...prev: 기존 값들을 그대로 복사하고
            //이 값이 분명히 젠더 타입이야 라고 강제로 캐스팅 할때 as
        };
        //폼전송(회원가입 요청)
        const handleSubmit = async (e:FormEvent)=>{
            e.preventDefault();
            if(form.password!==form.repeatPassword){
                alert("비밀번호와 비밀번호 확인이 일치하지 않습니다")
                return;
            }try{
                //백앤드 스프링부트 서버url
                const response = await axios.post(
                    "http://localhost:9500/api/auth/register",form
                );
                console.log(response.data);
                alert("회원가입성공");
            }catch(error:any){
                console.error(error);
                alert("회원가입 중 오류가 발생했습니다");
            }
        };

        const handleAddressSearch = ()=>{
            if(!window.daum||!window.daum.postcode){
                /*
                window: 브라우저 창을 나타내는 전역 객체
                스크립트를 안불렀거나 || 준비가 되지 않았거나
                */
                alert("주소검색 스크립트 검색 중 입니다. 잠시 후 다시 시도해 주세요");
                return;
            }
            //자바스크립트 콜백은 나중에 어떤일이 끝날때 실행
            new window.daum.Postcode({//카카오에서 제공하는 우편번호 검색 팝업 객체를 하나 생성하는 코드
                //가장 중요한 옵션이 oncomplete라는 callbackd임
                oncomplete:(data:any) => {
                    //oncomplete은 언제 실행되냐면, 검색 -> 주소선택-> 확인 그리고
                    //그때 data라는 객체를 함께 넘겨줍니다
                    const fulladdr= data.address;//기본주소
                    setForm((prev)=>({...prev,address:fulladdr}));
                },
            }).open();//옵션을 가진 우편번호 검색 팝업을 생성하고 바로 화면에 띄워라
        }
        /*
        why 이렇게 복잡하게 쓰는이유?
        =>언제 끝날지 모르는 작업이 많음
        서버에 요청 보내기(axios, fetch)
        버튼 클릭/ 입력값 변경
        타이머
        외부 스크립트(다음) 결과 검색 기다리기

        setTimeout(()=>{
        나는 3초뒤에 실행됨
        },3000);//3000:3초
         */

    return (
    <PageContainer>
      <script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        async
      ></script>

      <StyledCard>
        <StyledCard.Body className="p-0">
          <Row>
            <Col lg={5} className="d-none d-lg-block p-0">
            <LeftImage/>
            </Col>
            <Col lg={7}>
              <FormWrapper>
                
                  <h1 className="h4 text-gray-900 mb-4">
                    Create an Account!
                    </h1>
                
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-2">
                    <Col sm={6}>
                      <Form.Control
                        type="text"                        
                        placeholder="이름"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col sm={6}>
                      <Form.Control
                        type="text"                        
                        placeholder="성"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}

                      />
                    </Col>
                  </Row>

                  <Row className="mb-2" >
                     <Col>
                    <Form.Control
                      type="email"
                      placeholder="이메일"
                      name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                     </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm={6} className="mb-3 mb-sm-0">
                      <Form.Control
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                         value={form.password}
                        onChange={handleChange}
        
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="password"
                        placeholder="비밀번호 확인"
                        name="repeatPassword"
                         value={form.repeatPassword}
                        onChange={handleChange}

                      />
                    </Col>
                  </Row>

                  {/* 성별 추가 */}
                  <div className="mb-3">
                    <GenderLabel>성별 :</GenderLabel>    
                    <GenderRow>              
                    <Form.Check
                      inline
                      type="radio"
                      label="남성"
                      name="gender"
                      value="male"
                      checked={form.gender==="male"}
                      onChange={handleGenderChange}

                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="여성"
                      name="gender"
                      value="female"
                      checked={form.gender==="female"}
                      onChange={handleGenderChange}
  
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="기타"
                      name="gender"
                      value="other"
                      checked={form.gender==="other"}
                      onChange={handleGenderChange}

                    />                   
                  </GenderRow>

                 </div>


                  <div className="form-group">
                    <div className="d-flex justify-content-between">
                      <Form.Control
                        type="text"
                        className="form-control-user"
                        placeholder="회사명"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}

                      />
                      <Form.Control
                        type="text"
                        className="form-control-user mx-4"
                        placeholder="직급"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                      />
                      <Form.Control
                        type="text"
                        className="form-control-user"
                        placeholder="전화번호"
                        name="tel"
                        value={form.tel}
                        onChange={handleChange}

                      />
                    </div>
                  </div>

                  <AddressGroup>
                      <Form.Control
                        type="text"                        
                        name="address"
                        readOnly
                        value={form.address}
                      />
                      <AddressButton
                      type="button"                      
                      onClick={handleAddressSearch}
                      >
                        주소검색
                        </AddressButton>
                        </AddressGroup>                          
                    
                   
                      <Form.Control
                        type="text"
                        className="form-control-user w-100 mt-3"
                        placeholder="상세주소"
                        name="detailAddress"
                        value={form.detailAddress}
                        onChange={handleChange}

                      />
                   
                  

                  <SubmitButton
                    type="submit"
                  >
                    회원가입
                  </SubmitButton>
                </Form>
                <hr />

<SocialButton 
bg="#fff"
onClick={handlegoogleSignup}
>
 <img src="/svg/google.svg" alt="Google" width={18} height={18} /> 
    Register with 
    <span className="google-text">
    <span className="g-blue">G</span>
    <span className="g-red">o</span>
    <span className="g-yellow">o</span>
    <span className="g-blue">g</span>
    <span className="g-green">l</span>
    <span className="g-red">e</span>
  </span>
</SocialButton>

<SocialButton 
bg="linear-gradient(45deg, #f58529, #dd2a7b, #8134af)"
onClick={handleInstaSignup}

>
  <FontAwesomeIcon icon={faInstagram}/>   
    Register with Insta
</SocialButton>

<SocialButton 
bg="#FEE500"
onClick={handleKakaoSignup}

style={{color:"#000"}}
>
   <FontAwesomeIcon icon={faKakaoTalk}/>  
      Register with Kakao
</SocialButton>

<SocialButton 

bg="#1877f2"
onClick={handleFacebookSignup}

>
  <FontAwesomeIcon icon={faFacebookF}/>   
    Register with Facebook
</SocialButton>


                <FooterLinks>
                  <FooterLink href="/forgot">
                    Forgot password?
                  </FooterLink>
               
                  <FooterLink href="/login">
                    Already have an account? Login!
                  </FooterLink>
                </FooterLinks>
              </FormWrapper>
              </Col>
              </Row>
              </StyledCard.Body>
              </StyledCard>
              </PageContainer>
  );
};

export default Member;

