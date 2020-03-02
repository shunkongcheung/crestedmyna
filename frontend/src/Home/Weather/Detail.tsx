import React, { memo } from "react";

import styled from "styled-components";

interface DetailProps {
  dataTime: Date;
  humidity: number;
  location: string;
  tempMax: number;
  tempMin: number;
}

const DateTimeRow = styled.div`
  margin: auto 1rem 1rem 1rem;
  display: flex;
  justify-content: flex-end;
`;

const DateTimeTxt = styled.span`
  color: #eee;
  font-size: 0.7rem;
`;

const DetailRow = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
  padding: 1rem;
  padding-top: 0.5rem;
`;

const DetailTitle = styled.span`
  margin-right: auto;
  color: #efefef;
`;

const DetailValue = styled.span`
  color: #eee;
`;

const Location = styled.div`
  color: #eee;
  text-align: end;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
`;

function Detail({
  dataTime,
  location,
  tempMax,
  tempMin,
  humidity
}: DetailProps) {
  return (
    <>
      <Location>{location.toUpperCase()}</Location>
      <DetailRow>
        <DetailTitle>MAX TEMP.</DetailTitle>
        <DetailValue>
          {tempMax}
          &deg;C
        </DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailTitle>MIN TEMP.</DetailTitle>
        <DetailValue>
          {tempMin}
          &deg;C
        </DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailTitle>HUMIDITY</DetailTitle>
        <DetailValue>{humidity}%</DetailValue>
      </DetailRow>

      <DateTimeRow>
        <DateTimeTxt>{dataTime.toLocaleString()}</DateTimeTxt>
      </DateTimeRow>
    </>
  );
}

export default memo(Detail);
