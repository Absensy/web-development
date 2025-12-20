'use client'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export interface MonumentCategoryCardProps {
    name: string;
    price: number;
    image: string;
    discount?: number;
    discounted_price?: number;
    categoryId?: number;
}

export const CategoryCard = styled(Box)(({ theme }) => ({
    width: '100%',
    minHeight: '400px',
    maxHeight: '450px',
    borderRadius: 16,
    backgroundColor: '#fff',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0,0,0,0.06)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
    },
    [theme.breakpoints.down('sm')]: {
        minHeight: '350px',
        maxHeight: '400px',
    },
}));

export const DiscountBadge = styled(Box)(() => ({
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff5252',
    color: '#fff',
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: '4px 10px',
    fontSize: '36px',
    fontWeight: 600,
    zIndex: 10,
}));