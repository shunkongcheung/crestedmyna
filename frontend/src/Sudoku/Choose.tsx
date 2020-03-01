import React, { memo, useCallback, useState } from "react";
import { Button } from "antd";
import styled from "styled-components";

import { Center } from "../components";

type Difficulty = "easy" | "medium" | "difficult";

interface ChooseProps {
  handleContinue?: () => any;
  handleDifficultySelect: (difficulty: Difficulty) => any;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const LvlBtn = styled(Button).attrs<{ type?: string }>({
  type: ({ type }: any) => type || "primary"
})`
  margin-bottom: 28px;
  width: 80%;
  @media (min-width: ${({ theme }) => theme.size.medium}) {
    width: 50%;
  }
`;

const Title = styled.h1`
  margin-bottom: 40px;
`;

function Choose({ handleContinue, handleDifficultySelect }: ChooseProps) {
  const [loading, setIsLoading] = useState({
    easy: false,
    medium: false,
    difficult: false,
    any: false
  });
  const onClick = useCallback(
    async (lvl: Difficulty) => {
      setIsLoading(o => ({ ...o, [lvl]: true, any: true }));
      await handleDifficultySelect(lvl);
      setIsLoading(o => ({ ...o, [lvl]: false, any: false }));
    },
    [handleDifficultySelect]
  );

  return (
    <Center>
      <Container>
        <Title>CHOOSE A LEVEL</Title>
        <LvlBtn
          onClick={() => onClick("easy")}
          loading={loading.easy}
          disabled={loading.any}
        >
          Easy
        </LvlBtn>
        <LvlBtn
          onClick={() => onClick("medium")}
          loading={loading.medium}
          disabled={loading.any}
        >
          Medium
        </LvlBtn>
        <LvlBtn
          onClick={() => onClick("difficult")}
          loading={loading.difficult}
          disabled={loading.any}
        >
          Difficult
        </LvlBtn>
        {handleContinue && <LvlBtn onClick={handleContinue}>Continue</LvlBtn>}
      </Container>
    </Center>
  );
}

export default memo(Choose);
