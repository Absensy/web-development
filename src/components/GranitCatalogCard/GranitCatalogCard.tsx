import { Box, Typography } from "@mui/material";
import { CatalogCardProps, CategoryCard, DiscountBadge, PriceContainer, OldPrice, CardActions, PopularBadge, StatusBadge } from "./GranitCatalogCard.Styles"
import DetailsButton from "../GranitDetailsButton/GranitDetailsButton"
import Image from "next/image";
import ProductModal from "../ProductModal/ProductModal";
import ImageViewerModal from "../ImageViewerModal/ImageViewerModal";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useImageBackgroundColor } from "@/hooks/useImageBackgroundColor";

export const GranitCatalogCard: React.FC<CatalogCardProps> = ({ name, price, oldPrice, image, discount, subtext, is_new, is_popular, product }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [imageViewerOpen, setImageViewerOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const isWhiteBackground = useImageBackgroundColor(image);

    const handleDetailsClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleImageClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setImageViewerOpen(true);
    };

    const handleCloseImageViewer = () => {
        setImageViewerOpen(false);
    };

    // Drag события
    const handleDragStart = (e: React.DragEvent) => {
        setIsDragging(true);
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', image);
        e.dataTransfer.setData('text/html', `<img src="${image}" alt="${name}" />`);
        // Создаем миниатюру для drag preview
        const img = new window.Image();
        img.src = image;
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

    // Динамический стиль для NewBadge в зависимости от наличия PopularBadge
    const DynamicNewBadge = styled(StatusBadge)(() => ({
        backgroundColor: '#2196f3',
        top: is_popular ? 40 : 8, // Если есть PopularBadge, то ниже, иначе вверху
        left: 8,
        zIndex: 10,
    }));

    return (
        <>
            <CategoryCard>
                <Box
                    height="200px"
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                    draggable
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleImageClick}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    sx={{
                        cursor: isDragging ? 'grabbing' : 'grab',
                        backgroundColor: (isWhiteBackground === false) ? 'transparent' : 'white',
                        opacity: isDragging ? 0.7 : 1,
                        transition: 'opacity 0.2s ease',
                        userSelect: 'none'
                    }}
                >
                    {/* Размытый фон - показывается только если фон НЕ белый */}
                    {isWhiteBackground === false && (
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            sx={{
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
                                src={image}
                                alt={`${name} background`}
                                fill
                                sizes="100%"
                                style={{ objectFit: 'cover', filter: 'blur(25px)', transform: 'scale(1.2)' }}
                            />
                        </Box>
                    )}
                    {/* Основное изображение */}
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ zIndex: 2 }}
                    >
                        <Box position="relative" width="100%" height="100%">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                sizes="100%"
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>
                    </Box>
                    {/* Оверлей с лупой при наведении */}
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            opacity: isHovered ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                            zIndex: 3,
                        }}
                    >
                        <ZoomInIcon sx={{ fontSize: 60, color: 'white' }} />
                    </Box>
                    {/* Бейджи */}
                    {discount ? <DiscountBadge>-{discount}%</DiscountBadge> : null}
                    {is_popular && <PopularBadge>Популярное</PopularBadge>}
                    {is_new && <DynamicNewBadge>Новинка</DynamicNewBadge>}
                </Box>
                <Box padding="20px" display="flex" flexDirection="column" flex={1} justifyContent="space-between">
                    <Typography variant="h3" fontSize="20px" fontWeight="700" color="text.primary" marginBottom="8px">
                        {name}
                    </Typography>
                    <Typography fontSize="14px" color="text.secondary" lineHeight="1.4">
                        {subtext}
                    </Typography>
                    <PriceContainer>
                        {oldPrice && <OldPrice>{oldPrice} BYN</OldPrice>}
                        <Typography fontSize="20px" fontWeight="700" color={oldPrice ? "#ff5252" : "text.primary"} >
                            {price} BYN
                        </Typography>
                    </PriceContainer>
                    <CardActions>
                        <DetailsButton onClick={handleDetailsClick} />
                    </CardActions>
                </Box>
            </CategoryCard>

            {product && (
                <ProductModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    product={product}
                />
            )}

            <ImageViewerModal
                open={imageViewerOpen}
                onClose={handleCloseImageViewer}
                imageSrc={image}
                imageAlt={name}
                useWhiteBackground={isWhiteBackground !== false}
            />
        </>
    );
};