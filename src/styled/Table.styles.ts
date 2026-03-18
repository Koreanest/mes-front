

import styled,{css} from "styled-components";

export type Align= 'left' | 'center' | 'right' ;
export type HeaderVariant = 'default'|'dark'|'border';

export const BaseTable =styled.table`
width:100%;
border-collapse : collapse;
table-layout:fixed;
`;

const headerVariant: Record<HeaderVariant, ReturnType<typeof css>>={
    default:css`
    background:#f5f5f5; color:#333;
    `,
    dark:css`
    background:#3335; color:#fff;
    `,
    border:css`
    background:#fff; border-bottom:2px solid #000;
    `,
}

export const Thead =styled.thead<{variant?: HeaderVariant}>`
${({variant = 'default'})=> headerVariant[variant]}
`;
export const Tbody =styled.tbody<{variant?: HeaderVariant}>`
${({variant = 'default'})=> headerVariant[variant]}
`;

export const Tfoot =styled.tfoot<{variant?: HeaderVariant}>`
${({variant = 'default'})=> headerVariant[variant]}
`;

export const Tr = styled.tr`
&:hover{background:#fafafa;}
`;
interface CellProps{align?:Align;}

export const Th = styled.th<CellProps>`
padding:12px; text-align:${({align='center'})=>align};
font-weight:600; 
border:1px solid #ddd;
`;

export const Td = styled.td<CellProps>`
padding:12px; text-align:${({align='left'})=>align};
border:1px solid #ddd;
`;