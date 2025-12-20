'use client'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export interface ExamplesOurWorkCardProps {
    image: string;
    title: string;
    description?: string;
    dimensions: string;
    date: string;
}

export const ExamplesWorkCard = styled(Box)(({ theme }) => ({
    justifySelf: 'center',
    width: '100%',
    minHeight: '340px',
    maxWidth: '584px',
    borderRadius: 16,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 4px 6px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0,0,0,0.06)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
    },
    [theme.breakpoints.down('sm')]: {
        minHeight: '300px',
        maxWidth: '100%',
    },
}))
