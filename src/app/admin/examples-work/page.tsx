'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    IconButton,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Add,
    Edit,
    Delete,
} from '@mui/icons-material';
import { useAdminExamplesWork } from '@/hooks/useAdminExamplesWork';

interface ExampleWork {
    id: number;
    title: string;
    description?: string;
    image: string;
    dimensions: string;
    date: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import { AdminOperationOverlay } from '@/components/AdminOperationOverlay/AdminOperationOverlay';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import EmptyState from '@/components/EmptyState/EmptyState';

interface ExampleWorkFormData {
    title: string;
    description?: string;
    image: string;
    dimensions: string;
    date: string;
    is_active: boolean;
}

export default function AdminExamplesWork() {
    const { examplesWork, loading, saving, deleting, error, createExampleWork, updateExampleWork, deleteExampleWork } = useAdminExamplesWork();
    const [openDialog, setOpenDialog] = useState(false);
    const [editingExampleWork, setEditingExampleWork] = useState<ExampleWork | null>(null);
    const [saveAlert, setSaveAlert] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [formData, setFormData] = useState<ExampleWorkFormData>({
        title: '',
        description: '',
        image: '',
        dimensions: '',
        date: '',
        is_active: true,
    });

    const handleAddExampleWork = () => {
        setEditingExampleWork(null);
        setFormData({
            title: '',
            description: '',
            image: '',
            dimensions: '',
            date: '',
            is_active: true,
        });
        setOpenDialog(true);
    };

    const handleEditExampleWork = (exampleWork: ExampleWork) => {
        setEditingExampleWork(exampleWork);
        setFormData({
            title: exampleWork.title,
            description: exampleWork.description || '',
            image: exampleWork.image,
            dimensions: exampleWork.dimensions,
            date: exampleWork.date,
            is_active: exampleWork.is_active,
        });
        setOpenDialog(true);
    };

    const handleSaveExampleWork = async () => {
        try {
            const exampleWorkData = {
                title: formData.title,
                description: formData.description,
                image: formData.image,
                dimensions: formData.dimensions,
                date: formData.date,
                is_active: formData.is_active,
            };

            if (editingExampleWork) {
                await updateExampleWork(editingExampleWork.id, exampleWorkData);
            } else {
                await createExampleWork(exampleWorkData);
            }

            setOpenDialog(false);
            setEditingExampleWork(null);
            setSaveAlert(true);
            setTimeout(() => setSaveAlert(false), 3000);
        } catch (error) {
            console.error('Error saving example work:', error);
        }
    };

    const handleDeleteExampleWork = async (exampleWorkId: number) => {
        try {
            await deleteExampleWork(exampleWorkId);
            setDeleteAlert(true);
            setTimeout(() => setDeleteAlert(false), 3000);
        } catch (error) {
            console.error('Error deleting example work:', error);
        }
    };

    const handleInputChange = (field: keyof ExampleWorkFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (loading) {
        return (
            <AdminLayout>
                <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                        <CircularProgress />
                    </Box>
                </Container>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
                {/* Header */}
                <Box mb={{ xs: 3, md: 4 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' } }}
                    >
                        Примеры наших работ
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                    >
                        Управление примерами работ для отображения на сайте
                    </Typography>
                </Box>

                {/* Alerts */}
                {saveAlert && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Пример работы успешно сохранен!
                    </Alert>
                )}

                {deleteAlert && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Пример работы успешно удален!
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Paper sx={{ width: '100%' }}>
                    {/* Header with Add Button */}
                    <Box sx={{ p: { xs: 2, md: 3 }, borderBottom: 1, borderColor: 'divider' }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            gap={{ xs: 2, sm: 0 }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                fontWeight="600"
                                sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                            >
                                Примеры работ
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={handleAddExampleWork}
                                sx={{
                                    backgroundColor: '#333',
                                    '&:hover': { backgroundColor: '#555' },
                                    width: { xs: '100%', sm: 'auto' }
                                }}
                            >
                                Добавить пример работы
                            </Button>
                        </Box>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: { xs: 2, md: 3 } }}>
                        {/* Examples Work Grid */}
                        {examplesWork.length === 0 ? (
                            <EmptyState
                                message="Примеры работ не найдены"
                                variant="default"
                                height={300}
                            />
                        ) : (
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                                gap: { xs: 2, md: 3 }
                            }}>
                                {examplesWork.map((exampleWork) => (
                                    <Card key={exampleWork.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={exampleWork.image}
                                            alt={exampleWork.title}
                                            sx={{
                                                objectFit: 'cover',
                                                height: { xs: 160, sm: 180, md: 200 }
                                            }}
                                        />
                                        <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, md: 2 } }}>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                gutterBottom
                                                sx={{
                                                    fontSize: { xs: '1rem', md: '1.25rem' },
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {exampleWork.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                gutterBottom
                                                sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
                                            >
                                                Размеры: {exampleWork.dimensions}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
                                            >
                                                Дата: {exampleWork.date}
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{ p: { xs: 1.5, md: 2 } }}>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => handleEditExampleWork(exampleWork)}
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteExampleWork(exampleWork.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Paper>

                {/* Add/Edit Dialog */}
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    maxWidth="md"
                    fullWidth
                    fullScreen
                >
                    <DialogTitle
                        sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                    >
                        {editingExampleWork ? 'Редактировать пример работы' : 'Добавить пример работы'}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ pt: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Название работы"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    variant="outlined"
                                    size="small"
                                />

                                <ImageUpload
                                    value={formData.image}
                                    onChange={(imageUrl) => handleInputChange('image', imageUrl)}
                                    label="Изображение работы"
                                    helperText="Загрузите изображение примера работы (JPEG, PNG, WebP до 5MB)"
                                    previewSize={{ width: 200, height: 150 }}
                                    uploadType="example"
                                />

                                <TextField
                                    fullWidth
                                    label="Описание"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    variant="outlined"
                                    placeholder="Напишите описание работы"
                                    size="small"
                                    multiline
                                    rows={4}
                                />

                                <TextField
                                    fullWidth
                                    label="Размеры"
                                    value={formData.dimensions}
                                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                                    variant="outlined"
                                    placeholder="например: 120 × 60 × 15 см"
                                    size="small"
                                />

                                <TextField
                                    fullWidth
                                    label="Дата"
                                    value={formData.date}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                    variant="outlined"
                                    placeholder="например: 15 марта 2024"
                                    size="small"
                                />
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                        <Button
                            onClick={() => setOpenDialog(false)}
                            sx={{ width: { xs: '100%', sm: 'auto' } }}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSaveExampleWork}
                            disabled={saving}
                            sx={{
                                backgroundColor: '#333',
                                '&:hover': { backgroundColor: '#555' },
                                width: { xs: '100%', sm: 'auto' }
                            }}
                        >
                            {saving ? 'Сохранение...' : (editingExampleWork ? 'Сохранить' : 'Добавить')}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Operation Overlays */}
                <AdminOperationOverlay
                    open={saving}
                    message={editingExampleWork ? "Сохранение изменений..." : "Создание примера работы..."}
                />
                <AdminOperationOverlay
                    open={deleting}
                    message="Удаление примера работы..."
                />
            </Container>
        </AdminLayout>
    );
}
