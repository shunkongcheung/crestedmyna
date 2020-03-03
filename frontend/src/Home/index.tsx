import React from "react";
import styled from "styled-components";

import Route from "./Route";
import Weather from "./Weather";
import { Layout } from "../components";

const Container = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const Column = styled.div<{ lgWidth: number }>`
  width: 100%;
  @media (min-width: ${({ theme }) => theme.size.small}) {
    width: 100%;
  }
  @media (min-width: ${({ theme }) => theme.size.medium}) {
    width: ${({ lgWidth }) => lgWidth}%;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const Hr = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const Row = styled.div`
  display: block;

  @media (min-width: ${({ theme }) => theme.size.small}) {
    display: block;
  }
  @media (min-width: ${({ theme }) => theme.size.medium}) {
    display: flex;
  }
`;

const News = () => <>news</>;

function Home() {
  // const { newsState, weatherState } = useHomeContainer();
  return (
    <Layout>
      <Container>
        <Row>
          <Column lgWidth={40}>
            <Weather />
          </Column>
          <Column lgWidth={60}>
            <News />
          </Column>
        </Row>
        <Hr>
          <Route />
        </Hr>
      </Container>
    </Layout>
  );
}
export default Home;
