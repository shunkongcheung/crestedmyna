import React, { memo } from "react";
import styled from "styled-components";

import Detail from "./Detail";
import TimeAndTemp from "./TimeAndTemp";

interface IHmeWeatherProps {
  dataTime: Date;
  descDetail: string;
  descMain: string;
  humidity: number;
  iconUrl: string;
  location: string;
  temp: number;
  tempMax: number;
  tempMin: number;
}

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

function HmeWeather({
  dataTime,
  descDetail,
  descMain,
  humidity,
  iconUrl,
  location,
  temp,
  tempMax,
  tempMin
}: IHmeWeatherProps) {
  return (
    <Container>
      <SkyImg />
      <Content>
        <TimeAndTemp descMain={descMain} iconUrl={iconUrl} temperature={temp} />
        <DescDetail>{descDetail}</DescDetail>
        <DetailContainer>
          <Detail
            dataTime={dataTime}
            location={location}
            humidity={humidity}
            tempMax={tempMax}
            tempMin={tempMin}
          />
        </DetailContainer>
      </Content>
    </Container>
  );
}

export default memo(HmeWeather);
