import React, { memo } from "react";
import styled from "styled-components";

import Detail from "./Detail";
import Temperature from "./Temperature";
import useWeather from "./useWeather";

const styleContentBase = `
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

const Container = styled.div`
  position: relative;
  height: 30rem;
`;

const Content = styled.div`
  ${styleContentBase}
  display: flex;
  flex-direction: column;
`;

const DescDetail = styled.div`
  margin-left: 1rem;
  color: white;
`;

const DetailContainer = styled.div`
  margin-top: auto;
`;

const SkyImg = styled.div`
  ${styleContentBase}
  opacity: 0.7;
  background-image: linear-gradient(#9ac9f8, #3f7fbf);
`;

function HmeWeather() {
  const weather = useWeather();
  return (
    <Container>
      <SkyImg />
      <Content>
        <Temperature
          descMain={weather.descMain}
          iconUrl={weather.iconUrl}
          temperature={weather.temp}
        />
        <DescDetail>{weather.descDetail}</DescDetail>
        <DetailContainer>
          <Detail
            dataTime={weather.dataTime}
            location={weather.location}
            humidity={weather.humidity}
            tempMax={weather.tempMax}
            tempMin={weather.tempMin}
          />
        </DetailContainer>
      </Content>
    </Container>
  );
}

export default memo(HmeWeather);
