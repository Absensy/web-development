'use client'
import { styled } from '@mui/material/styles';
import { Pagination, Box, Typography, Stack } from "@mui/material";

export const PaginationStyles = styled(Pagination) (({ theme }) => ({
         '& .MuiPaginationItem-root': {
             color: "grey.600", 
             "&.Mui-selected": {
                 backgroundColor: '#000000', 
                 color: 'white',
                 borderRadius:"8px",
                 '&:hover': {
                     backgroundColor: '#000000',
                     color: 'white'
                 }
             },
             '&:hover': {
                 backgroundColor: 'rgba(0, 0, 0, 0.04)',
                 color: 'grey.600'
             }
         },

        [theme.breakpoints.down("sm")]: {
            display: 'none'
        }
}));

export const Ctatalogbox = styled(Box) (({theme}) => ({
    marginLeft: "80px",
    marginRight: "80px",
    marginBottom: "80px",

    [theme.breakpoints.down("md")]: {
        marginLeft: "24px",
        marginRight: "24px",
    },

    [theme.breakpoints.down("sm")]: {
        marginLeft: "16px",
        marginRight: "16px",
        marginBottom: '32px',
    }
}));

export const StackStyle = styled(Stack) (({theme}) => ({
    alignItems: 'center',
    marginTop: '40px',

    [theme.breakpoints.down("md")]:{
        display: "flex",
        marginTop: '24px',
    },

    [theme.breakpoints.down("sm")]:{
        display: "flex",
        marginTop: '32px',
    }
}));

export const ShowMoreContainer = styled(Box) (({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '48px',
    marginBottom: '32px',

    [theme.breakpoints.down("sm")]:{
        marginTop: '40px',
        marginBottom: '24px',
    }
}));

export const TypographyStyle = styled(Typography) (({theme}) => ({
    display: 'none',

    [theme.breakpoints.down("sm")]:{
        display: "flex",
        marginTop: '24px',
        marginBottom: '32px',
    }
}));