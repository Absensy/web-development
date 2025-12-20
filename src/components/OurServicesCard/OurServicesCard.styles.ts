'use client';

import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export interface OurServicesCardProps {
    image: string;
    name: string;
    subtext: string;
}

export const ServicesCard = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    minHeight: '280px',
    maxWidth: '395px',
    borderRadius: "16px", 
    textAlign: 'center',
    justifyContent: 'space-around',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        backgroundColor: '#f8f8f8',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.08)',
    },
    [theme.breakpoints.down('sm')]: {
        minHeight: '250px',
        maxWidth: '100%',
    },
}));
