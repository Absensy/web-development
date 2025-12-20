'use client'
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const GranitShowMoreButtonStyle = styled(Button) (({ theme }) => ({
     gap: '8px',
     display: 'none',
     fontSize: '16px',
     backgroundColor: '#2c2c2c',
     color: '#ffffff',
     borderRadius: '12px',
     textTransform: 'none',
     padding: '16px 24px',
     boxShadow: 'none',
     '&:hover': {
       backgroundColor: '#5E5D5D',
       boxShadow: 'none',
     },
     '&:active': {
       backgroundColor: '#000000',
       boxShadow: 'none',
     },
     '&:focus': {
       backgroundColor: '#5E5D5D',
       boxShadow: 'none',
     },
     [theme.breakpoints.down("sm")]: {
          display:'flex'
     }
}))

