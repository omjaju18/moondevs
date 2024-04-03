import React, { ReactNode } from 'react';
import { Tooltip } from '@material-ui/core';

interface AppTooltipProps {
  title: string;
  children?: ReactNode;
}

const AppTooltip: React.FC<AppTooltipProps> = ({ title, children }) => {
  return <Tooltip title={title}>{children}</Tooltip>;
};

export default AppTooltip;
