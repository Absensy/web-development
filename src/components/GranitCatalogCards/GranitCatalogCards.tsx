"use client"
import { Box, Typography, Alert } from "@mui/material";
import { GranitCatalogCard } from "../GranitCatalogCard/GranitCatalogCard";
import { PaginationStyles, Ctatalogbox, StackStyle, TypographyStyle, ShowMoreContainer } from "./GranitCatalogCard.Styles";
import MobileFilterDrawer from "../MobileFilterDrawer/MobileFilterDrawer";
import GranitShowMoreButton from "../GranitShowMoreButton/GranitShowMoreButton";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { useFilterContext } from "@/contexts/FilterContext";
import { usePagination } from "@/hooks/usePagination";
import { ProductCardSkeleton, Skeleton } from "../Skeleton/Skeleton";
import EmptyState from "../EmptyState/EmptyState";

const GranitCatalogCards = () => {
    const { filters } = useFilterContext();
    const { products, loading, error, totalCount } = useFilteredProducts(filters);
    const {
        currentPage,
        totalPages,
        visibleItems,
        hasMoreItems,
        remainingItems,
        handlePageChange,
        handleShowMore,
        isMobile
    } = usePagination(totalCount);

    if (loading) {
        return (
            <Ctatalogbox>
                <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="32px">
                    <Skeleton height="20px" width="200px" />
                    <MobileFilterDrawer />
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap="20px" justifyContent="center">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </Box>
            </Ctatalogbox>
        );
    }

    if (error) {
        return (
            <Ctatalogbox>
                <Alert severity="error">{error}</Alert>
            </Ctatalogbox>
        );
    }

    // Получаем товары для текущей страницы
    const getCurrentPageProducts = () => {
        if (isMobile) {
            // На мобилке показываем товары до visibleItems
            return products.slice(0, visibleItems);
        } else {
            // На десктопе показываем товары для текущей страницы
            const startIndex = (currentPage - 1) * 12;
            const endIndex = startIndex + 12;
            return products.slice(startIndex, endIndex);
        }
    };

    const currentProducts = getCurrentPageProducts();

    // Функция для склонения слова "результат"
    const getResultText = (count: number) => {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return 'результатов';
        }
        if (lastDigit === 1) {
            return 'результат';
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'результата';
        }
        return 'результатов';
    };

    return (
        <Ctatalogbox>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="32px">
                <Typography fontSize="16px" color="#9A9DA4">
                    Показано {isMobile ? Math.min(visibleItems, totalCount) : currentProducts.length} из {totalCount} {getResultText(totalCount)}
                </Typography>
                <MobileFilterDrawer />
            </Box>

            {products.length === 0 ? (
                <EmptyState
                    message="Товары не найдены"
                    variant="default"
                    height={200}
                />
            ) : (
                <>
                    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap="20px" justifyContent="center">
                        {currentProducts.map((product) => (
                            <Box key={product.id} display="flex" justifyContent="center">
                                <GranitCatalogCard
                                    name={product.name}
                                    subtext={product.short_description}
                                    price={product.discounted_price || product.price}
                                    oldPrice={product.discount ? product.price : undefined}
                                    image={product.image}
                                    discount={product.discount}
                                    is_new={product.is_new}
                                    is_popular={product.is_popular}
                                    product={product}
                                />
                            </Box>
                        ))}
                    </Box>

                    {/* Пагинация для десктопа */}
                    {!isMobile && totalPages > 1 && (
                        <StackStyle spacing={2}>
                            <PaginationStyles
                                count={totalPages}
                                size="large"
                                page={currentPage}
                                shape="rounded"
                                onChange={(_, page) => handlePageChange(page)}
                            />
                        </StackStyle>
                    )}

                    {/* Кнопка "Показать ещё" для мобилки */}
                    {isMobile && hasMoreItems && (
                        <ShowMoreContainer>
                            <GranitShowMoreButton onClick={handleShowMore}>
                                Показать ещё ({remainingItems})
                            </GranitShowMoreButton>
                            <TypographyStyle>Показано {visibleItems} из {totalCount} товаров</TypographyStyle>
                        </ShowMoreContainer>
                    )}
                </>
            )}
        </Ctatalogbox>
    );
};

export default GranitCatalogCards;