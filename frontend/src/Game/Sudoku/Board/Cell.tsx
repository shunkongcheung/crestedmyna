import React, { memo } from "react";

import styled from "styled-components";

const Container = styled.div<{ rowIdx: number; colIdx: number }>`
  display: flex;
  align-items: center;
  width: calc(100% / 9);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-bottom-width: ${({ rowIdx }) => ((rowIdx + 1) % 3 === 0 ? 2 : 0)}px;
  border-right-width: ${({ colIdx }) => ((colIdx + 1) % 3 === 0 ? 2 : 0)}px;

  padding-left: 0.1rem;
  @media (min-width: ${({ theme }) => theme.size.medium}) {
    padding-left: 0.5rem;
  }
`;

const StartCell = styled.span`
  font-weight: 700;
  color: #bbb;
`;

const Input = styled.input`
  border: 0;
  outline: none;
  height: 80%;
  width: 50%;
  font-size: inherit;

  @media (min-width: ${({ theme }) => theme.size.medium}) {
    width: 70%;
  }

  @include (min-width: ${({ theme }) => theme.size.small}) {
    width: 60%;
  }
`;

interface BoardCellProps {
  rowIdx: number;
  colIdx: number;
  isFromStart: boolean;
  value: string;
  handleCellChange: (rowIdx: number, colIdx: number, value: string) => any;
}

function BoardCell(props: BoardCellProps) {
  const { isFromStart, value, handleCellChange, rowIdx, colIdx } = props;
  const onChange = ({ target: { value } }: any) =>
    handleCellChange(rowIdx, colIdx, value.toString());

  if (isFromStart)
    return (
      <Container rowIdx={rowIdx} colIdx={colIdx}>
        <StartCell>{value}</StartCell>
      </Container>
    );
  return (
    <Container rowIdx={rowIdx} colIdx={colIdx}>
      <Input min={1} max={9} type="number" value={value} onChange={onChange} />
    </Container>
  );
}

export default memo(BoardCell);
