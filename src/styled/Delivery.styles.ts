import styled from "styled-components";

/**
 * 납품 상태 표시용 Pill
 * - 버튼 높이(32px) 기준으로 맞춤
 * - 미납 / 부분 / 완납 상태별 색상 분기
 */
export const StatusPill = styled.span<{ $status: "미납" | "부분" | "완납" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 32px;              /* 납품처리 버튼 높이와 동일 */
  padding: 0 12px;
  min-width: 56px;           /* 글자 길이 흔들림 방지 */

  border-radius: 5px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  color: #fff;

  background-color: ${({ $status }) => {
    switch ($status) {
      case "미납":
        return "#6c757d";    // bootstrap secondary
      case "부분":
        return "#ffc107";    // bootstrap warning
      case "완납":
        return "#198754";    // bootstrap success
      default:
        return "#6c757d";
    }
  }};
`;
