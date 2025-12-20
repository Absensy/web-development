import React from 'react';
import { GranitShowMoreButtonStyle } from './GranitShowMoreButton.Style';
import ShowMore from "@/icons/ShowMore";

interface GranitShowMoreButtonProps {
     onClick?: () => void;
     children?: React.ReactNode;
}

const GranitShowMoreButton = ({ onClick, children }: GranitShowMoreButtonProps) => {
     return (
          <GranitShowMoreButtonStyle onClick={onClick}>
               <ShowMore />
               {children || 'Показать еще'}
          </GranitShowMoreButtonStyle>
     )
}

export default GranitShowMoreButton