import React, { memo } from "react";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 1rem;
`;

const DescMainTxt = styled.span`
  font-size: 1.2rem;
  color: white;
`;

const IconContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const IconImg = styled.img`
  width: 4rem;
`;

const Unit = styled.span`
  font-size: 1rem;
  color: $primaryColor;
`;
const Value = styled.span`
  font-size: 5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

interface TimeAndTempProps {
  descMain: string;
  iconUrl: string;
  temperature: number;
}

function TimeAndTemp({ iconUrl, descMain, temperature }: TimeAndTempProps) {
  return (
    <Container>
      <Value>{temperature}</Value>
      <Unit>&deg;C</Unit>
      <IconContainer>
        <IconImg alt="" src={iconUrl} />
        <DescMainTxt>{descMain.toUpperCase()}</DescMainTxt>
      </IconContainer>
    </Container>
  );
}

export default memo(TimeAndTemp);
