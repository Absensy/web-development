'use client'
import { styled } from '@mui/material/styles';
import { Typography, Box } from "@mui/material";

export const HeaderBox = styled(Box) (({theme})=> ({
     padding: "30px 80px",
     [theme.breakpoints.down('md')]: {
          padding: "30px 24px",
        },
     [theme.breakpoints.down('sm')]: {
          padding: "30px 16px",
     }
}))

export const TypographyStyle = styled(Typography) (({theme})=> ({
     fontSize: "30px",
     [theme.breakpoints.down('md')]: {
          fontSize: "24px",
        },
     [theme.breakpoints.down('sm')]: {
          fontSize: "20x"
     }
}))