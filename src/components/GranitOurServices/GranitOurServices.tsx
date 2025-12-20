"use client"

import { Box, Typography } from "@mui/material"
import OurServicesCard from "../OurServicesCard/OurServicesCard";
import { useOurServicesContent } from '@/hooks/useContent';
import { ServiceCardSkeleton } from "../Skeleton/Skeleton";

const GranitOurServices = () => {
    const { data, loading, error } = useOurServicesContent();

    if (loading) {
        return (
            <Box padding={{ xs: "40px 4%", md: "80px 5%" }}>
                <Box>
                    <Typography fontSize={{ xs: "24px", md: "36px" }} fontWeight="700" textAlign="center" margin={{ xs: "0px 0px 40px 0px", md: "0px 0px 60px 0px" }}>Наши услуги</Typography>
                </Box>
                <Box
                    display="grid"
                    gridTemplateColumns={{
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)"
                    }}
                    gap={{ xs: "16px", sm: "20px", md: "24px" }}
                    justifyContent="center"
                >
                    {[1, 2, 3].map((i) => (
                        <ServiceCardSkeleton key={i} />
                    ))}
                </Box>
            </Box>
        );
    }

    if (error) {
        return (
            <Box padding={{ xs: "40px 4%", md: "80px 5%" }}>
                <Typography fontSize={{ xs: "24px", md: "36px" }} fontWeight="700" textAlign="center" margin={{ xs: "0px 0px 40px 0px", md: "0px 0px 60px 0px" }}>Наши услуги</Typography>
                <Typography color="error" textAlign="center">Ошибка загрузки данных: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box padding={{ xs: "40px 4%", md: "80px 5%" }}>
            <Box>
                <Typography fontSize={{ xs: "24px", md: "36px" }} fontWeight="700" textAlign="center" margin={{ xs: "0px 0px 40px 0px", md: "0px 0px 60px 0px" }}>Наши услуги</Typography>
            </Box>
            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)"
                }}
                gap={{ xs: "16px", sm: "20px", md: "24px" }}
                justifyContent="center"
            >
                {data.ourServices.map((service) => (
                    <OurServicesCard
                        key={service.id}
                        image={service.image}
                        name={service.name}
                        subtext={service.subtext}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default GranitOurServices;