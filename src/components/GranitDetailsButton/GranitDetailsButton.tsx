import * as React from 'react';
import DetailsButtonStyles from './GranitDetailsButton.styles';

interface DetailsButtonProps {
    onClick?: () => void;
}

const DetailsButton: React.FC<DetailsButtonProps> = ({ onClick }) => {
    return (
        <DetailsButtonStyles variant="contained" onClick={onClick}>
            Детали
        </DetailsButtonStyles>
    )
}

export default DetailsButton;
