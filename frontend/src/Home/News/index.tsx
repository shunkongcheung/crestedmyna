import React, { memo, useEffect, useMemo } from "react";
import { useFetchList } from "react-accessories";
import styled from "styled-components";

import Headline from "./Headline";

interface HeadlineRet {
  author?: string;
  description: string;
  publishedAt: string;
  title: string;
  urlToImage?: string;
  url: string;
}

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 48px;
`;

const HeadlineContainer = styled.div`
  max-height: 60vh;
  overflow-y: auto;

  @media (min-width: ${({ theme }) => theme.size.small}) {
    max-height: 50vh;
  }
  @media (min-width: ${({ theme }) => theme.size.medium}) {
    max-height: 80vh;
  }
`;

function News() {
  const { fetchList, results } = useFetchList<HeadlineRet>();
  useEffect(() => {
    fetchList("/news", { isAuthenticated: false });
  }, [fetchList]);
  const headlines = useMemo(
    () =>
      results.map(itm => ({
        author: itm.author,
        description: itm.description,
        title: itm.title,
        url: itm.url,
        publishdAt: new Date(itm.publishedAt),
        thumbnail: itm.urlToImage
      })),
    [results]
  );

  const renderedHeadlines = useMemo(
    () =>
      headlines.map((headline, idx: number) => {
        const key = `Headline-${idx}`;
        return <Headline {...headline} key={key} />;
      }),
    [headlines]
  );
  return (
    <>
      <Title>NEWS</Title>
      <HeadlineContainer>{renderedHeadlines}</HeadlineContainer>
    </>
  );
}

export default memo(News);
