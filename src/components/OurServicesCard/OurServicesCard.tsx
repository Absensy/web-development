import React from "react";
import { OurServicesCardProps, ServicesCard } from "./OurServicesCard.styles";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const OurServicesCard: React.FC<OurServicesCardProps> = ({ image, name, subtext }) => {
    return (
        <ServicesCard>
            <Box paddingTop="50px">
                <Image src={image} alt={name} width={64} height={64} />
            </Box>
            <Box paddingTop="15px">
                <Typography fontSize={{ xs: "24px", md: "20px" }} fontWeight="600" padding="0px 18px" minHeight="60px" display="flex" alignItems="center" justifyContent="center">{name}</Typography>
            </Box>
            <Box flex="1" display="flex" alignItems="flex-start">
                <Typography fontSize="16px" fontWeight="400" color="text.secondary" padding="0px 40px" paddingBottom="30px">{subtext}</Typography>
            </Box>
        </ServicesCard>
    )
}

export default OurServicesCard;