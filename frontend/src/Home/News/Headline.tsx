import React, { memo, useMemo, useState } from "react";
import styled from "styled-components";

interface HeadlineProps {
  author?: string;
  description: string;
  title: string;
  thumbnail?: string;
  url: string;
}

const Container = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  min-height: 10rem;
`;

const contentBase = `
  border-radius: 1rem;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  ${contentBase}
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Title = styled.div`
  font-weight: 700;
  color: white;
  width: 80%;
`;

const Thumbnail = styled.img`
  ${contentBase}
  position: inherit;
  height: auto;
`;

function Headline({ author, title, thumbnail, url }: HeadlineProps) {
  const [isImgLoaded, setIsImgLoaded] = useState(!thumbnail);

  const renderedContent = useMemo(() => {
    if (!isImgLoaded) return <></>;
    return (
      <Content>
        <Title>{title}</Title>
      </Content>
    );
  }, [title, isImgLoaded]);
  return (
    <a href={url} target="__blank">
      <Container>
        <Thumbnail src={thumbnail} alt="" onLoad={() => setIsImgLoaded(true)} />
        {renderedContent}
      </Container>
    </a>
  );
}

export default memo(Headline);
