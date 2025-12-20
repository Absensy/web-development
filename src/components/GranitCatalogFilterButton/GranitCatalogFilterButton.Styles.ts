'use client'
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const GranitCatalogFilterButtonStyle = styled(Button) (({ theme }) => ({
     gap: '10px',
     fontSize: "14px",
     display: "none",
     backgroundColor: '#FFFFFF',
     color: '#0A0A0A',
     borderStyle: 'solid',
     borderRadius: '12px',
     borderWidth: '1px',
     borderColor:'#E5E7EB',
     textTransform: 'none',
     padding: '12px 20px',
     boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
     fontWeight: 500,
     transition: 'all 0.2s ease-in-out',
     '&:hover': {
       backgroundColor: '#F8F9FA',
       borderColor: '#D1D5DB',
       boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
       transform: 'translateY(-1px)',
     },
     '&:active': {
       backgroundColor: '#F1F3F4',
       boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
       transform: 'translateY(0)',
     },
     '&:focus': {
       backgroundColor: '#F8F9FA',
       borderColor: '#1976d2',
       boxShadow: '0px 0px 0px 3px rgba(25, 118, 210, 0.1)',
     },

     [theme.breakpoints.down("md")]: {
          display: "flex"
     },
     [theme.breakpoints.down("sm")]: {
          display: "flex",
          gap: '8px',
          padding: '10px 16px',
     }
}))

export default GranitCatalogFilterButtonStyle