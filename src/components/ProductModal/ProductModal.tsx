import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    IconButton,
    Chip,
    Divider,
    Stack,
    Button,
    Card,
    CardContent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image';
import { Product } from '@/lib/db';
import { useContactContext } from '@/contexts/ContactContext';
import { useImageBackgroundColor } from '@/hooks/useImageBackgroundColor';

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product }) => {
    const { contactInfo, loading } = useContactContext();
    const isWhiteBackground = useImageBackgroundColor(product?.image || '');
    const [isDragging, setIsDragging] = React.useState(false);

    // Debug - проверяем загрузку данных
    React.useEffect(() => {
        if (open && product) {
            console.log('=== ProductModal Debug ===');
            console.log('ContactInfo:', contactInfo);
            console.log('Loading:', loading);
            console.log('Email:', contactInfo?.email);
            console.log('Phone:', contactInfo?.phone);
            console.log('Instagram:', contactInfo?.instagram);
            console.log('=========================');
        }
    }, [open, contactInfo, loading, product]);

    if (!product) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'BYN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Drag события
    const handleDragStart = (e: React.DragEvent) => {
        if (!product) return;
        setIsDragging(true);
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', product.image);
        e.dataTransfer.setData('text/html', `<img src="${product.image}" alt="${product.name}" />`);
        // Создаем миниатюру для drag preview
        const img = new window.Image();
        img.src = product.image;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                e.dataTransfer.setDragImage(canvas, img.width / 2, img.height / 2);
            }
        };
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    maxHeight: '90vh'
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 1
            }}>
                <Typography variant="h5" component="h2" fontWeight="700">
                    {product.name}
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={3}>
                    {/* Изображение товара */}
                    <Box 
                        draggable
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        sx={{
                            width: '100%',
                            height: 300,
                            position: 'relative',
                            borderRadius: 2,
                            overflow: 'hidden',
                            backgroundColor: (isWhiteBackground === false) ? 'transparent' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isDragging ? 'grabbing' : 'grab',
                            opacity: isDragging ? 0.7 : 1,
                            transition: 'opacity 0.2s ease',
                            userSelect: 'none'
                        }}
                    >
                        {/* Размытый фон - показывается только если фон НЕ белый */}
                        {isWhiteBackground === false && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        zIndex: 1,
                                    }
                                }}
                            >
                                <Image
                                    src={product.image}
                                    alt={`${product.name} background`}
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                        filter: 'blur(25px)',
                                        transform: 'scale(1.2)'
                                    }}
                                />
                            </Box>
                        )}
                        {/* Основное изображение */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 2,
                            }}
                        >
                            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                    }}
                                    priority
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Цена и скидка */}
                    <Box>
                        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                            {product.discount && (
                                <Chip
                                    label={`-${product.discount}%`}
                                    color="error"
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                            )}
                            <Typography
                                variant="h4"
                                fontWeight="700"
                                color={product.discount ? "error.main" : "text.primary"}
                            >
                                {product.discounted_price ? formatPrice(product.discounted_price) : formatPrice(product.price)}
                            </Typography>
                            {product.discount && (
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textDecoration: 'line-through',
                                        color: 'text.secondary'
                                    }}
                                >
                                    {formatPrice(product.price)}
                                </Typography>
                            )}
                        </Stack>
                    </Box>

                    <Divider />

                    {/* Краткое описание */}
                    <Box>
                        <Typography variant="h6" component="h3" fontWeight="600" gutterBottom>
                            Описание
                        </Typography>
                        <Typography variant="body1" color="text.secondary" lineHeight={1.6}>
                            {product.short_description}
                        </Typography>
                    </Box>

                    {/* Полное описание */}
                    <Box>
                        <Typography variant="h6" component="h3" fontWeight="600" gutterBottom>
                            Подробное описание
                        </Typography>
                        <Typography variant="body1" color="text.secondary" lineHeight={1.6}>
                            {product.full_description}
                        </Typography>
                    </Box>

                    {/* Материалы */}
                    <Box>
                        <Typography variant="h6" component="h3" fontWeight="600" gutterBottom>
                            Материалы
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {product.materials}
                        </Typography>
                    </Box>

                    {/* Сроки изготовления */}
                    <Box>
                        <Typography variant="h6" component="h3" fontWeight="600" gutterBottom>
                            Сроки изготовления
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {product.production_time}
                        </Typography>
                    </Box>

                    <Divider />

                    {/* CTA секция с контактами */}
                    <Card sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        borderRadius: 2
                    }}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography variant="h6" component="h3" fontWeight="700" textAlign="center">
                                    Для заказа или подробностей свяжитесь с нами
                                </Typography>

                                {loading ? (
                                    <Typography variant="body2" sx={{ opacity: 0.9, textAlign: 'center' }}>
                                        Загрузка контактной информации...
                                    </Typography>
                                ) : contactInfo ? (
                                    <Stack spacing={1.5}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <PhoneIcon fontSize="small" />
                                            <Typography variant="body1">
                                                {contactInfo.phone}
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <EmailIcon fontSize="small" />
                                            <Typography variant="body1">
                                                {contactInfo.email}
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <LocationOnIcon fontSize="small" />
                                            <Typography variant="body1">
                                                {contactInfo.address}
                                            </Typography>
                                        </Stack>

                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                            {contactInfo.working_hours}
                                        </Typography>
                                    </Stack>
                                ) : (
                                    <Typography variant="body2" sx={{ opacity: 0.9, textAlign: 'center' }}>
                                        Контактная информация недоступна
                                    </Typography>
                                )}

                                <Box textAlign="center" mt={2}>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={1.875} // 15px gap
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{ gap: '15px' }}
                                    >
                                        {/* Кнопка телефона */}
                                        <Button
                                            variant="contained"
                                            size="large"
                                            startIcon={<PhoneIcon sx={{ color: 'black' }} />}
                                            component="a"
                                            href={contactInfo?.phone ? `tel:${contactInfo.phone.replace(/\s+/g, '')}` : '#'}
                                            sx={{
                                                px: 4,
                                                py: 1.5,
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                borderRadius: 2,
                                                minWidth: 'auto',
                                                backgroundColor: 'white',
                                                color: 'black',
                                                '&:hover': {
                                                    backgroundColor: 'grey.100',
                                                },
                                                pointerEvents: contactInfo?.phone ? 'auto' : 'none',
                                                opacity: contactInfo?.phone ? 1 : 0.5,
                                            }}
                                            onClick={(e) => {
                                                console.log('Phone button clicked');
                                                console.log('Contact phone:', contactInfo?.phone);
                                                if (!contactInfo?.phone) {
                                                    e.preventDefault();
                                                    console.error('No phone available');
                                                    alert('Телефон недоступен.');
                                                }
                                            }}
                                        >
                                            Позвонить
                                        </Button>

                                        {/* Кнопка email */}
                                        <Button
                                            variant="contained"
                                            size="large"
                                            startIcon={<EmailIcon sx={{ color: 'black' }} />}
                                            component="a"
                                            href={contactInfo?.email ? `mailto:${contactInfo.email}` : '#'}
                                            sx={{
                                                px: 4,
                                                py: 1.5,
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                borderRadius: 2,
                                                minWidth: 'auto',
                                                backgroundColor: 'white',
                                                color: 'black',
                                                '&:hover': {
                                                    backgroundColor: 'grey.100',
                                                },
                                                pointerEvents: contactInfo?.email ? 'auto' : 'none',
                                                opacity: contactInfo?.email ? 1 : 0.5,
                                            }}
                                            onClick={(e) => {
                                                console.log('Email button clicked');
                                                console.log('Contact email:', contactInfo?.email);
                                                if (!contactInfo?.email) {
                                                    e.preventDefault();
                                                    console.error('No email available');
                                                    alert('Email недоступен. Пожалуйста, попробуйте позвонить.');
                                                }
                                            }}
                                        >
                                            Написать
                                        </Button>

                                        {/* Кнопка Instagram */}
                                        {contactInfo?.instagram && (
                                            <Button
                                                variant="contained"
                                                size="large"
                                                startIcon={<InstagramIcon sx={{ color: 'black' }} />}
                                                component="a"
                                                href={
                                                    contactInfo.instagram.startsWith('http')
                                                        ? contactInfo.instagram
                                                        : `https://instagram.com/${contactInfo.instagram.replace('@', '')}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    px: 4,
                                                    py: 1.5,
                                                    fontWeight: 600,
                                                    textTransform: 'none',
                                                    borderRadius: 2,
                                                    minWidth: 'auto',
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    '&:hover': {
                                                        backgroundColor: 'grey.100',
                                                    }
                                                }}
                                                onClick={() => {
                                                    console.log('Instagram button clicked');
                                                    console.log('Contact instagram:', contactInfo?.instagram);
                                                }}
                                            >
                                                Instagram
                                            </Button>
                                        )}
                                    </Stack>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </DialogContent>

        </Dialog>
    );
};

export default ProductModal;
