import { createTheme } from '@mui/material/styles';
import components from './components';

const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2C2C2C',
    },
    secondary: {
      main: '#9A9DA4',
    },
    background: {
      default: '#ffffff',
      paper: '#f9fafb',
    },
    common: {
      black: '#2c2c2c',
      white: '#ffffff',
    },
    success: {
      main: '#9cd323',
      contrastText: '#2c2c2c',
    },
    error: {
      main: '#ef4444',
      contrastText: '#2c2c2c',
    },
    warning: {
      main: '#ffc73a',
      contrastText: '#2c2c2c',
    },
    info: {
      main: '#9a9da4',
      contrastText: '#2c2c2c',
    },
    text: {
      primary: '#2c2c2c',
      secondary: '#4b5563',
    },
  },
  typography: {
    fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    fontSize: 16,
  },

  
  components: {
    ...components,
  }
});

export default customTheme;