'use client'
import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const DetailsButtonStyles = styled(Button)(() => ({
              height: "40px",
               backgroundColor: '#2c2c2c',
               color: '#ffffff',
               borderRadius: '8px',
               padding: '10px 20px',
               boxShadow: 'none',
               textTransform: 'none' as const,
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
}))

export default DetailsButtonStyles;