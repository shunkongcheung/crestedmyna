import React, { memo, useCallback, useMemo } from "react";
import { Button } from "antd";
import styled from "styled-components";

type Difficulity = "easy" | "medium" | "difficult";
type GameStage = "playing" | "paused";

interface GameHeaderProps {
  difficulty: Difficulity;
  handleSubmit: () => any;
  usedSecond: number;
  setGameStage: (s: GameStage) => any;
}

const Container = styled.div`
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;

  display: block;
  @media (min-width: ${({ theme }) => theme.size.small}) {
    display: flex;
    align-items: flex-end;
  }
`;

const UsedTimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (min-width: ${({ theme }) => theme.size.small}) {
    justify-content: flex-start;
  }
`;

const UsedTimeTitle = styled.div`
  color: #777;
  font-weight: 700;
  margin-right: 0.5rem;
`;

const UsedTimeValue = styled.div`
  color: #444;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 0.9rem;

  margin-top: 1rem;
  justify-content: flex-end;

  @media (min-width: ${({ theme }) => theme.size.small}) {
    margin-left: auto;
  }
`;

function GameHeader({
  handleSubmit,
  setGameStage,
  usedSecond
}: GameHeaderProps) {
  const handlePause = useCallback(() => setGameStage("paused"), [setGameStage]);
  const usedHourLocale = useMemo(
    () =>
      Math.floor(usedSecond / 3600).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }),
    [usedSecond]
  );
  const usedMinuteLocale = useMemo(
    () =>
      Math.floor(usedSecond / 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }),
    [usedSecond]
  );
  const usedSecondLocale = useMemo(
    () =>
      (usedSecond % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }),
    [usedSecond]
  );

  return (
    <Container>
      <UsedTimeContainer>
        <UsedTimeTitle>USED</UsedTimeTitle>
        <UsedTimeValue>
          {usedHourLocale}:{usedMinuteLocale}:{usedSecondLocale}
        </UsedTimeValue>
      </UsedTimeContainer>
      <BtnContainer>
        <Button type="link" onClick={handlePause}>
          PAUSE
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </BtnContainer>
    </Container>
  );
}

export default memo(GameHeader);
