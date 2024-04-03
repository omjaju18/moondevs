

import React from 'react';
import styled from 'styled-components';

interface AppIconProps {
  url: string;
  fill: string;
  size: number;
  margin: number;
}

const StyledAppIcon = styled.img<{ size: number; margin: number }>`
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  margin: ${(props) => props.margin}rem;
`;

const AppIcon: React.FC<AppIconProps> = ({ url, fill, size, margin }) => {
  return <StyledAppIcon src={url} alt="App Icon" fill={fill} size={size} margin={margin} />;
};

export default AppIcon;
