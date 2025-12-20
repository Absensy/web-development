'use client'

import { Stack, Box, styled, Typography } from "@mui/material";

export const TitleAboutCompany = styled(Typography)(({ theme }) => ({
    fontWeight: '700',
    fontSize: '36px',
    color: theme.palette.primary.main,
    paddingBottom: '60px',
    [theme.breakpoints.down("md")]: {
    textAlign: 'center',
    fontSize: '24px',
    paddingBottom: '24px',
    },
}));

export const BoxAboutCompany = styled(Box)(({ theme }) => ({
    width: '100%',
    background: theme.palette.background.paper, 
    padding: '80px 5%',
    [theme.breakpoints.down('lg')]: {
        padding: '60px 4%',
    },
    [theme.breakpoints.down("md")]: {   
        padding: '40px 4%',
    },
    [theme.breakpoints.down("sm")]: {
        padding: '30px 3%',
    }
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '60px',
    [theme.breakpoints.down('lg')]: {
        gap: '40px',
    },
    [theme.breakpoints.down("md")]: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
    }
}));

export const LeftContent = styled(Box)(({ theme }) => ({
    flex: '1',
    minWidth: '300px',
    maxWidth: '700px',
    [theme.breakpoints.down("md")]: {
        minWidth: 'auto',
        maxWidth: '100%',
        width: '100%',
    }
}));

export const RightContent = styled(Box)(({ theme }) => ({
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down("md")]: {
        width: '100%',
    }
}));

export const StackStats = styled(Stack)(({ theme }) => ({
    justifyContent: 'flex-start',
    [theme.breakpoints.down("md")]: {
        justifyContent: 'space-between',
    }
}));

export const BoxImage = styled(Box)(({ theme }) => ({
    display: 'flex',
    borderRadius: '2px',
    alignItems: 'center',
    height: '384px',
    overflow: 'hidden',
    [theme.breakpoints.down(1024)]: {
        maxWidth: '450px',
        height: '300px',
    },
    [theme.breakpoints.down("md")]: {
        justifyContent: 'center',
        height: '250px',
    }
}));




