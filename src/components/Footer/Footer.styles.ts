import {Stack, Grid, styled } from '@mui/material';

export const StackFooter = styled(Stack)(({ theme }) => ({
    gap: '8px',
    marginBottom: '32px',
    [theme.breakpoints.down('md')]: {
       marginLeft: '0px',
      },

}));

export const GridFooter = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        marginLeft: '0px',
       },
}));