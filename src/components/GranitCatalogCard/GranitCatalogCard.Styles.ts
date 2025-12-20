'use client'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Product } from '@/lib/db';

export interface CatalogCardProps{
     name: string;
     subtext: string;
     price: number;
     oldPrice?: number;
     image: string;
     discount?: number;
     is_new?: boolean;
     is_popular?: boolean;
     product?: Product;
}

export const CategoryCard = styled(Box)(({ theme }) => ({
    justifySelf: 'center',
    width: '100%',
    minHeight: '350px',
    height: 'auto',
    borderRadius: 8,
    backgroundColor: '#fff',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0,0,0,0.06)',
    [theme.breakpoints.down('sm')]: {
        minHeight: '320px',
    },
}));

export const DiscountBadge = styled(Box)(() => ({
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff5252',
    color: '#fff',
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    padding: '6px 16px',
    fontSize: '32px',
    fontWeight: 600,
    zIndex: 10,
}));

export const StatusBadge = styled(Box)(() => ({
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#4caf50',
    color: '#fff',
    borderRadius: 12,
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 600,
    zIndex: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
}));

export const PopularBadge = styled(StatusBadge)(() => ({
    backgroundColor: '#ff9800',
    top: 8,
    left: 8,
}));

export const NewBadge = styled(StatusBadge)(() => ({
    backgroundColor: '#2196f3',
    top: 8, // Верхняя позиция по умолчанию
    left: 8,
}));


export const PriceContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '16px',
}));

export const OldPrice = styled(Box)(() => ({
    fontSize: '20px',
    color: '#9A9DA4',
    textDecoration: 'line-through',
}));

export const NewPrice = styled(Box)(() => ({
    fontSize: '20px',
    fontWeight: 700,
    color: '#ff5252',
}));

export const CardActions = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: '16px',
}));