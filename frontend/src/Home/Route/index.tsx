import React, { memo } from "react";
import styled from "styled-components";

import LinkBanner from "./LinkBanner";
// import journalBannerImg from "./images/journalBanner.jpg";
import gameBannerImg from "./images/gameBanner.jpeg";
// import stockBannerImg from "./images/stockBanner.jpeg";

const Row = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  margin-left: -8px;
  margin-right: -8px;

  @media (min-width: ${({ theme }) => theme.size.medium}) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  display: flex;
  padding: 0 8px;
  width: 50%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 40px;
  padding: 0.2rem;
`;

function Route() {
  return (
    <>
      <Title>VISIT</Title>
      <Row>
        <Column>
          <LinkBanner name="SUDOKU" imageSrc={gameBannerImg} linkTo="/sudoku" />
        </Column>
      </Row>
    </>
  );
}

export default memo(Route);
