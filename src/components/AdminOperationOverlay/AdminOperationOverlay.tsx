'use client';

import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Backdrop,
} from '@mui/material';

interface AdminOperationOverlayProps {
  open: boolean;
  message: string;
}

export const AdminOperationOverlay: React.FC<AdminOperationOverlayProps> = ({ open, message }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
      open={open}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          p: 4,
          color: 'text.primary',
          minWidth: 200,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" component="div" textAlign="center">
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};