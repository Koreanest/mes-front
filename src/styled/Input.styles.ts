import styled from "styled-components";

const CONTROL_H = 44;

const baseControl = `
  width: 100%;
  height: ${CONTROL_H}px;
  padding: 0 14px;
  border: 1px solid #d1d5db;          /* 연한 그레이 */
  border-radius: 7px;                /* ✅ 둥글게 */
  background: #fff;
  font-size: 14px;
  line-height: 1;
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    border-color: #2563eb;            /* 포커스 색 */
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15); /* ✅ 포커스 링 */
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Time = styled.input`
  ${baseControl}
  padding-right: 44px; /* time 아이콘 공간 */
`;


export const TimeRange = styled.div`
  display: grid;
  grid-template-columns: 1fr 18px 1fr;
  gap: 10px;
  align-items: center;

  span {
    width: 18px;
    text-align: center;
    color: #9ca3af;
    user-select: none;
    font-weight: 600;
  }
`;

export const Select= styled.select`
  ${baseControl}
  padding-right: 44px;
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, #6b7280 50%),
    linear-gradient(135deg, #6b7280 50%, transparent 50%);
  background-position:
    calc(100% - 18px) 50%,
    calc(100% - 12px) 50%;
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
`;

export const Search = styled.input`
  ${baseControl}

`;

export const Submit = styled.button`
width:100px; max-width:100%;
height:36px;
border:1px solid #ccc !important;
border-radius:5px;
`;