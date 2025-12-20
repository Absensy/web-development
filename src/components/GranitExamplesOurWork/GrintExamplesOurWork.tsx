"use client"

import { Box, Typography, Alert } from "@mui/material";
import ExamplesOurWorkCard from "../ExamplesOurWorkCard/ExamplesOurWorkCard";
import { useExamplesWork } from "@/hooks/useExamplesWork";
import { ExampleWorkCardSkeleton } from "../Skeleton/Skeleton";
import EmptyState from "../EmptyState/EmptyState";

const GranitExamplesOurWork = () => {
    const { examplesWork, loading, error } = useExamplesWork();

    if (loading) {
        return (
            <Box paddingBottom={{ xs: "64px", md: "128px" }} bgcolor="background.paper">
                <Box textAlign="center" paddingTop={{ xs: "40px", md: "80px" }} paddingBottom={{ xs: "30px", md: "60px" }}>
                    <Typography component="h2" fontSize={{ xs: "24px", md: "36px" }} fontWeight="700">Примеры наших работ</Typography>
                </Box>
                <Box
                    display="grid"
                    gridTemplateColumns={{
                        xs: "1fr",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)"
                    }}
                    gap={{ xs: "16px", sm: "20px", md: "24px" }}
                    padding={{ xs: "0px 4%", md: "0px 5%" }}
                    justifyContent="center"
                >
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <ExampleWorkCardSkeleton key={i} />
                    ))}
                </Box>
            </Box>
        );
    }

    if (error) {
        return (
            <Box paddingBottom={{ xs: "64px", md: "128px" }} bgcolor="background.paper">
                <Box textAlign="center" paddingTop={{ xs: "40px", md: "80px" }} paddingBottom={{ xs: "30px", md: "60px" }}>
                    <Typography component="h2" fontSize={{ xs: "24px", md: "36px" }} fontWeight="700">Примеры наших работ</Typography>
                </Box>
                <Box padding="0px 4%">
                    <Alert severity="error">Ошибка загрузки данных: {error}</Alert>
                </Box>
            </Box>
        );
    }

    return (
        <Box paddingBottom={{ xs: "64px", md: "128px" }} bgcolor="background.paper">
            <Box textAlign="center" paddingTop={{ xs: "40px", md: "80px" }} paddingBottom={{ xs: "30px", md: "60px" }}>
                <Typography component="h2" fontSize={{ xs: "24px", md: "36px" }} fontWeight="700">Примеры наших работ</Typography>
            </Box>
            {examplesWork.length === 0 ? (
                <EmptyState
                    message="Примеры работ не найдены"
                    variant="default"
                    height={300}
                />
            ) : (
                <Box
                    display="grid"
                    gridTemplateColumns={{
                        xs: "1fr",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)"
                    }}
                    gap={{ xs: "16px", sm: "20px", md: "24px" }}
                    padding={{ xs: "0px 4%", md: "0px 5%" }}
                    justifyContent="center"
                >
                    {examplesWork.map((work) => (
                        <ExamplesOurWorkCard
                            key={work.id}
                            image={work.image}
                            title={work.title}
                            description={work.description}
                            dimensions={work.dimensions}
                            date={work.date}
                        />
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default GranitExamplesOurWork;