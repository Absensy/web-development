import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledDivider = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '24px',
    marginBottom: '60px'
}));

export const LineDivider = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  backgroundColor: theme.palette.secondary.main,
  position: 'relative',
}));

  export const IconContainer = styled(Box)(() => ({
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }));
  