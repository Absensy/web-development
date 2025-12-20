'use client';

import React from 'react';
import { StyledDivider, LineDivider, IconContainer } from './GranitDividerWithIcon.styles';
import ArrowDownIcon from '@/icons/ArrowDown';


export const DividerWithIcon = () => {
  return (
    <StyledDivider>
      <LineDivider>
        <IconContainer>
          <ArrowDownIcon/>
        </IconContainer>
      </LineDivider>
    </StyledDivider>
  );
};
