'use client'

import { Grid, styled } from "@mui/material";

export const GridOurCatalog = styled(Grid)(({ theme }) => ({
     justifyContent: 'center',
    margin:'0px 80px',
    [theme.breakpoints.down("xl")]: {
        margin:'0px 40px',
    },
    [theme.breakpoints.down("md")]: {
        margin:'0px',
    }
}));
