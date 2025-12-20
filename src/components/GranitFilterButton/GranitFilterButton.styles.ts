'use client'
import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const FilterButtonStyles = styled(Button)(() => ({
    backgroundColor: '#2c2c2c',
    color: '#ffffff',
    borderRadius: '8px',
    textTransform: 'none' as const,
    padding: '10px 48px',
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
}}
))

export default FilterButtonStyles;