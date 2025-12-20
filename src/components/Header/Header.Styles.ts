import { styled } from '@mui/material/styles';
import {Button, Box, Typography} from '@mui/material';


export const TopHeaderBox = styled(Box)(({ theme }) => ({
  background: 'theme.palette.background.default',
  borderBottom: '1px solid ${theme.palette.secondary.main}',
  padding: '29px 5%',
  [theme.breakpoints.down(1024)]: {
    display: 'none',
  },
}));

export const BottomHeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.08)',
  padding: '10px 80px',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  width: '100%',
  display: 'block',
  minHeight: '60px',
  [theme.breakpoints.down(1024)]: {
    padding: '16px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
    display: 'block',
    minHeight: '60px',
  },
}));

export const TypographyTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  variant: 'h6', 
  component: 'div', 
  fontWeight: '700', 
  fontSize: '24px',
  paddingLeft: '10px',
  [theme.breakpoints.down(1024)]: {
    fontSize: '18px',
  },
}))

export const ButtonHeader = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(1024)]: {
    display: 'none',
  },
}));


export const HeaderMenuButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: 0,
  minWidth: 'auto',
  fontWeight: 500,
  fontSize: 16,
  color: theme.palette.text.primary,
  borderRadius: 6,
  transition: 'color 0.2s, background 0.2s',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.secondary.main,
    boxShadow: 'none',
  },
  '&:active': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.dark,
    boxShadow: 'none',
  },
  '&:focus': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    boxShadow: 'none',
  },
  [theme.breakpoints.down(1024)]: {
    display: 'none',
  },
}));