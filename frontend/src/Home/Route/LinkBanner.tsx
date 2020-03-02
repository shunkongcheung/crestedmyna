import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const styledRounded = `
  border-radius: 0.5rem;
`;

const Img = styled.img`
  ${styledRounded}
  width: 100%;
  height: 100%;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  position: relative;
  width: 100%;
`;

const Name = styled.h2`
  align-items: center;
  color: white;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

interface ILinkBannerProps {
  imageSrc: string;
  linkTo: string;
  name: string;
}

function LinkBanner({ name, imageSrc, linkTo }: ILinkBannerProps) {
  return (
    <MyLink to={linkTo}>
      <Img src={imageSrc} alt={linkTo} />
      <Name>{name}</Name>
    </MyLink>
  );
}

export default memo(LinkBanner);
