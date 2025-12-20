"use client";

import React from 'react';
import { Box, Typography, Paper, SxProps, Theme } from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';

interface EmptyStateProps {
    message?: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'minimal' | 'card';
    height?: string | number;
    sx?: SxProps<Theme>;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    message = "Нет записей",
    icon,
    variant = 'default',
    height = 200,
    sx = {}
}) => {
    const defaultIcon = <InboxOutlined sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />;

    const renderContent = () => (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            minHeight={height}
            p={3}
        >
            {icon || defaultIcon}
            <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontWeight: 400 }}
            >
                {message}
            </Typography>
        </Box>
    );

    if (variant === 'card') {
        return (
            <Paper
                elevation={1}
                sx={{
                    borderRadius: 2,
                    ...sx
                }}
            >
                {renderContent()}
            </Paper>
        );
    }

    if (variant === 'minimal') {
        return (
            <Box sx={sx}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ py: 2 }}
                >
                    {message}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={sx}>
            {renderContent()}
        </Box>
    );
};

export default EmptyState;



