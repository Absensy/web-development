"use client"

import React, { useState } from "react";
import { ExamplesOurWorkCardProps, ExamplesWorkCard } from "./ExamplesOurWorkCard.styles";
import { Box, Typography, Divider } from "@mui/material";
import Image from "next/image";
import DescriptionModal from "./DescriptionModal";
import ImageViewerModal from "../ImageViewerModal/ImageViewerModal";
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const ExamplesOurWorkCard: React.FC<ExamplesOurWorkCardProps> = ({ image, title, description, dimensions, date }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [imageViewerOpen, setImageViewerOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const MAX_DESCRIPTION_LENGTH = 100;

    const shouldTruncate = description && description.length > MAX_DESCRIPTION_LENGTH;
    const truncatedDescription = shouldTruncate
        ? description!.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
        : description;

    const handleOpenModal = () => {
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
        e.dataTransfer.setData('text/html', `<img src="${image}" alt="${title}" />`);
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

    return (
        <>
            <ExamplesWorkCard>
                <Box
                    height={{ xs: 150, sm: 180, md: 192 }}
                    position="relative"
                    overflow="hidden"
                    draggable
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleImageClick}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    sx={{ 
                        cursor: isDragging ? 'grabbing' : 'grab',
                        opacity: isDragging ? 0.7 : 1,
                        transition: 'opacity 0.2s ease',
                        userSelect: 'none'
                    }}
                >
                    {/* Размытый фон */}
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
                            alt={`${title} background`}
                            fill
                            sizes="100%"
                            style={{ objectFit: 'cover', filter: 'blur(25px)', transform: 'scale(1.2)' }}
                        />
                    </Box>
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
                                alt={title}
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
                </Box>
                <Box display="flex" flexDirection="column" flex={1}>
                    <Typography fontSize="24px" fontWeight="600" padding="10px 20px" textAlign="center">{title}</Typography>
                    <Box padding="0px 20px" paddingBottom="20px">
                        <Divider style={{ backgroundColor: '#ccc', height: '1px', border: 'none' }} />
                    </Box>
                    <Box
                        flexGrow={1}
                        display={!description ? "flex" : "block"}
                        alignItems={!description ? "center" : "flex-start"}
                        justifyContent={!description ? "center" : "flex-start"}
                    >
                        <Box padding="0px 20px" paddingBottom="20px">
                            <Typography
                                fontSize="16px"
                                fontWeight="400"
                                color="text.secondary"
                                lineHeight={1.6}
                                textAlign={!description ? "center" : "left"}
                            >
                                {truncatedDescription || "Нет описания"}
                                {shouldTruncate && (
                                    <Typography
                                        component="span"
                                        onClick={handleOpenModal}
                                        sx={{
                                            color: 'primary.main',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            ml: 0.5,
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        Подробнее
                                    </Typography>
                                )}
                            </Typography>
                        </Box>
                    </Box>
                    <Box padding="0px 20px" paddingBottom="20px">
                        <Divider style={{ backgroundColor: '#ccc', height: '1px', border: 'none' }} />
                    </Box>
                    <Box display="flex" justifyContent="space-between" padding="0px 20px" paddingBottom="16px">
                        <Box color="text.secondary" textAlign="left">
                            <Typography fontSize="16px" fontWeight="400">Размеры: </Typography>
                            <Typography fontSize="16px" fontWeight="400">Дата установки: </Typography>
                        </Box>
                        <Box color="text.primary" textAlign="right">
                            <Typography fontSize="16px" fontWeight="500">{dimensions}</Typography>
                            <Typography fontSize="16px" fontWeight="500">{date}</Typography>
                        </Box>
                    </Box>
                </Box>
            </ExamplesWorkCard>

            <DescriptionModal
                open={modalOpen}
                onClose={handleCloseModal}
                title={title}
                description={description || "Нет описания"}
            />

            <ImageViewerModal
                open={imageViewerOpen}
                onClose={handleCloseImageViewer}
                imageSrc={image}
                imageAlt={title}
            />
        </>
    )
}

export default ExamplesOurWorkCard;