import styled  from "styled-components";

export const Wrapper = styled.div`
width:100%;
display:flex;
`;
export const DflexColumn = styled.div`
display:flex;
flex-direction:column;
`;

export const DflexColumn2 = styled.div`
display:flex;
justify-content:space-between;
flex-direction:center;
`; 
export const Content= styled.div`
width:100%;
`;

export const Ctap= styled.div`
border-top:1px solid #ccc;
width:1660px;
height:100vh;
max-width:100%;
background-color:white;
padding:10px 20px;
margin-top:-24px;
overflow-x:hidden !important;
`;

export const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const OrdersTable = styled.table`
  width: 100%;
  min-width: 1200px; /* 컬럼 많으니 필수 */
  white-space: nowrap;
`;

export const FilterBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 20;
  background: #fff;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`;


    
           
  
