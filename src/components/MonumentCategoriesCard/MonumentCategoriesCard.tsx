import React from 'react';
import { CategoryCard, DiscountBadge } from './MonumentCategoriesCard.styles';
import { MonumentCategoryCardProps } from './MonumentCategoriesCard.styles';
import CatalogButton from '../GranitCatalogButton/GranitCatalogButton';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export const MonumentCategoryCard: React.FC<MonumentCategoryCardProps> = ({ name, price, image, discount, categoryId }) => {

    return (
        <CategoryCard>
            <Box height="250px" position="relative" display="block" overflow="hidden">
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
                        alt={`${name} background`}
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
                            alt={name}
                            fill
                            sizes="100%"
                            style={{ objectFit: 'contain' }}
                        />
                    </Box>
                </Box>
                {discount ? <DiscountBadge>-{discount}%</DiscountBadge> : null}
            </Box>
            <Box padding={{ xs: "16px", md: "24px" }} display="flex" flexDirection="column" flex="1">
                <Typography variant="h3" fontSize={{ xs: "18px", md: "24px" }} fontWeight="700" color="text.primary">{name}</Typography>
                <Typography padding={{ xs: "12px 0px", md: "24px 0px" }} fontSize={{ xs: "24px", md: "30px" }} fontWeight="800" color="text.primary">
                    от {price} BYN
                </Typography>
                <Box marginTop="auto">
                    <CatalogButton categoryId={categoryId} />
                </Box>
            </Box>
        </CategoryCard>
    );
};