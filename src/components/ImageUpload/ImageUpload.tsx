'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
    Box,
    Typography,
    IconButton,
    Alert,
    CircularProgress,
    Tooltip
} from '@mui/material';
import {
    Delete,
    Image as ImageIcon,
    Edit
} from '@mui/icons-material';

interface ImageUploadProps {
    value?: string;
    onChange: (imageUrl: string) => void;
    onError?: (error: string) => void;
    previewSize?: { width: number; height: number };
    maxSize?: number; // in MB
    acceptedFormats?: string[];
    label?: string;
    helperText?: string;
    uploadType?: 'product' | 'category' | 'example' | 'content';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    onError,
    previewSize = { width: 200, height: 120 },
    maxSize = 5,
    acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'],
    label = 'Загрузить изображение',
    helperText,
    uploadType = 'product'
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            const errorMsg = `Размер файла не должен превышать ${maxSize}MB`;
            setError(errorMsg);
            onError?.(errorMsg);
            return;
        }

        // Validate file format
        if (!acceptedFormats.includes(file.type)) {
            const errorMsg = `Поддерживаются только форматы: ${acceptedFormats.join(', ')}`;
            setError(errorMsg);
            onError?.(errorMsg);
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            // Upload file to server
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', uploadType);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Ошибка загрузки файла');
            }

            onChange(result.fileUrl);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Ошибка при загрузке изображения';
            setError(errorMsg);
            onError?.(errorMsg);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = () => {
        onChange('');
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Box sx={{ width: 'fit-content' }}>
            {label && (
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                    {label}
                </Typography>
            )}

            <Box
                sx={{
                    position: 'relative',
                    width: previewSize.width,
                    height: previewSize.height,
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: value ? '2px solid #e0e0e0' : '2px dashed #ccc',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    '&:hover': {
                        borderColor: value ? '#999' : '#333',
                        transform: 'scale(1.02)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: value ? 'transparent' : '#fafafa',
                }}
                onClick={handleClick}
            >
                {value ? (
                    <>
                        <Image
                            src={value}
                            alt="Preview"
                            fill
                            style={{
                                objectFit: 'cover',
                                borderRadius: '6px'
                            }}
                        />
                        {/* Overlay с кнопками */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                opacity: 0,
                                transition: 'opacity 0.2s ease',
                                '&:hover': {
                                    opacity: 1,
                                }
                            }}
                        >
                            <Tooltip title="Изменить изображение">
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClick();
                                    }}
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        color: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                        }
                                    }}
                                >
                                    <Edit sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Удалить изображение">
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveImage();
                                    }}
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        color: 'error.main',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                        }
                                    }}
                                >
                                    <Delete sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ textAlign: 'center' }}>
                        {isUploading ? (
                            <CircularProgress size={32} />
                        ) : (
                            <ImageIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
                        )}
                        <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                            {isUploading ? 'Загрузка...' : 'Нажмите для загрузки'}
                        </Typography>
                    </Box>
                )}
            </Box>

            <input
                ref={fileInputRef}
                type="file"
                accept={acceptedFormats.join(',')}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />

            {helperText && (
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block', maxWidth: previewSize.width }}>
                    {helperText}
                </Typography>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 1, maxWidth: previewSize.width }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default ImageUpload;
