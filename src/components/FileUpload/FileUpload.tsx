'use client';

import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Chip
} from '@mui/material';
import {
    Delete,
    Description,
    Download,
    CloudUpload
} from '@mui/icons-material';

interface FileUploadProps {
    value?: string;
    onChange: (fileData: string) => void;
    onError?: (error: string) => void;
    acceptedFormats?: string[];
    maxSize?: number; // in MB
    label?: string;
    helperText?: string;
    fileType?: 'pdf' | 'image' | 'document';
}

const FileUpload: React.FC<FileUploadProps> = ({
    value,
    onChange,
    onError,
    acceptedFormats = ['application/pdf'],
    maxSize = 10,
    label = 'Загрузить файл',
    helperText,
    fileType = 'pdf'
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');
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
        setFileName(file.name);

        try {
            if (fileType === 'pdf') {
                // For PDF files, upload to server and get URL
                const formData = new FormData();
                formData.append('file', file);
                formData.append('type', 'document');

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }

                const result = await response.json();
                onChange(result.fileUrl);
            } else {
                // For other files, convert to base64
                const base64 = await convertToBase64(file);
                onChange(base64);
            }
        } catch {
            const errorMsg = 'Ошибка при загрузке файла';
            setError(errorMsg);
            onError?.(errorMsg);
        } finally {
            setIsUploading(false);
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('Failed to convert file to base64'));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
        });
    };

    const handleRemoveFile = () => {
        onChange('');
        setError(null);
        setFileName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleDownload = () => {
        if (value) {
            const link = document.createElement('a');
            link.href = value;
            link.download = fileName || 'file';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const getFileIcon = () => {
        switch (fileType) {
            case 'pdf':
                return <Description sx={{ fontSize: 40, color: 'error.main' }} />;
            case 'image':
                return <Description sx={{ fontSize: 40, color: 'primary.main' }} />;
            default:
                return <Description sx={{ fontSize: 40, color: 'text.secondary' }} />;
        }
    };

    return (
        <Box>
            {label && (
                <Typography variant="subtitle2" gutterBottom>
                    {label}
                </Typography>
            )}

            <Box
                sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 2,
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    '&:hover': {
                        borderColor: '#333',
                    },
                    minHeight: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                }}
                onClick={handleClick}
            >
                {value ? (
                    <Box sx={{ textAlign: 'center' }}>
                        {getFileIcon()}
                        <Typography variant="body2" sx={{ mt: 1, fontWeight: 'medium' }}>
                            {fileName || 'Файл загружен'}
                        </Typography>
                        <Chip
                            label={`${fileType.toUpperCase()}`}
                            size="small"
                            color="primary"
                            sx={{ mt: 1 }}
                        />
                    </Box>
                ) : (
                    <Box>
                        {isUploading ? (
                            <CircularProgress size={40} />
                        ) : (
                            getFileIcon()
                        )}
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            {isUploading ? 'Загрузка...' : 'Нажмите для загрузки файла'}
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box sx={{ mt: 1, display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    onClick={handleClick}
                    disabled={isUploading}
                    size="small"
                >
                    {value ? 'Изменить' : 'Выбрать файл'}
                </Button>
                {value && (
                    <>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<Download />}
                            onClick={handleDownload}
                            size="small"
                        >
                            Скачать
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<Delete />}
                            onClick={handleRemoveFile}
                            size="small"
                        >
                            Удалить
                        </Button>
                    </>
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
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                    {helperText}
                </Typography>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 1 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default FileUpload;
