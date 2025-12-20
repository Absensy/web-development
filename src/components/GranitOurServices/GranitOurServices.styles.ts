'use client'

import { styled, Grid } from '@mui/material';

export const GridOurServices = styled(Grid)(({ theme }) => ({
    justifyContent: 'center',
    [theme.breakpoints.down("md")]: {
        justifyContent: 'space-evenly',
    }
}));