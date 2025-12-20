"use client"

import { Box, Typography, Alert } from "@mui/material"
import { MonumentCategoryCard } from "../MonumentCategoriesCard/MonumentCategoriesCard"
import { DividerWithIcon } from "../GranitDividerWithIcon/GranitDividerWithIcon";
import { useCategories } from '@/hooks/useCategories';
import { CategoryCardSkeleton } from "../Skeleton/Skeleton";
import EmptyState from "../EmptyState/EmptyState";

const GranitOurCatagol = () => {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <Box paddingTop={{ xs: "40px", md: "80px" }} paddingX={{ xs: "4%", md: "5%" }}>
        <Typography component="h2" fontWeight="bold" fontSize={{ xs: "24px", sm: "30px", md: "48px" }} textAlign="center">
          Наш каталог
        </Typography>
        <DividerWithIcon />
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)"
          }}
          gap={{ xs: "16px", sm: "20px", md: "24px" }}
          paddingTop={{ md: "40px", lg: "80px" }}
          paddingBottom={{ xs: "40px", lg: "80px" }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box paddingTop={{ xs: "40px", md: "80px" }} paddingX={{ xs: "4%", md: "5%" }}>
        <Typography component="h2" fontWeight="bold" fontSize={{ xs: "24px", sm: "30px", md: "48px" }} textAlign="center">
          Наш каталог
        </Typography>
        <DividerWithIcon />
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box paddingTop={{ xs: "40px", md: "80px" }} paddingX={{ xs: "4%", md: "5%" }}>
      <Typography component="h2" fontWeight="bold" fontSize={{ xs: "24px", sm: "30px", md: "48px" }} textAlign="center">
        Наш каталог
      </Typography>
      <DividerWithIcon />
      {categories.length === 0 ? (
        <EmptyState
          message="Категории не найдены"
          variant="default"
          height={300}
        />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)"
          }}
          gap={{ xs: "16px", sm: "20px", md: "24px" }}
          paddingTop={{ md: "40px", lg: "80px" }}
          paddingBottom={{ xs: "40px", lg: "80px" }}
        >
          {categories.map((category) => (
            <MonumentCategoryCard
              key={category.id}
              name={category.name}
              price={category.discounted_price ? Number(category.discounted_price) : Number(category.price_from)}
              image={category.photo}
              discount={category.discount || undefined}
              categoryId={category.id}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default GranitOurCatagol;