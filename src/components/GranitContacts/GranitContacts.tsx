"use client"

import ClockCircleIcon from '@/icons/ClockCircleIcon';
import MailCircleIcon from '@/icons/MailCircleIcon';
import MapCircleIcon from '@/icons/MapCircleIcon';
import PhoneCircleIcon from '@/icons/PhoneCircleIcon';
import { Box, Stack, Typography, CircularProgress } from '@mui/material'
import Maps from '../Maps/Maps';
import { useContactContext } from '@/contexts/ContactContext';
import { ContactInfoSkeleton } from '../Skeleton/Skeleton';
const GranitContacts = () => {
    const { contactInfo, loading } = useContactContext();

    if (loading) {
        return (
            <Box padding={{ xs: "40px 4%", md: "80px 5%" }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap="40px">
                    <Box flex="1" minWidth="300px">
                        <Typography variant="h4" fontWeight="700" marginBottom="32px">
                            Контакты
                        </Typography>
                        <ContactInfoSkeleton />
                    </Box>
                    <Box width={{ xs: "100%", lg: "605px" }} height="313px" border="5px solid" borderColor="common.black" borderRadius="8px" overflow="hidden">
                        <Box width="100%" height="100%" sx={{ backgroundColor: 'grey.200' }} display="flex" alignItems="center" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    const workingHours = contactInfo?.working_hours?.split(', ') || ['Пн-Пт: 9:00 - 18:00', 'Сб-Вс: 10:00 - 16:00'];

    return (
        <Box padding={{ xs: "40px 4%", md: "80px 5%" }}>
            <Typography fontSize={{ xs: "24px", md: "36px" }} fontWeight="700" textAlign="center" paddingBottom={{ xs: "40px", md: "80px" }}>Контакты</Typography>
            <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} gap={{ xs: "40px", lg: "80px" }} alignItems={{ xs: "flex-start", lg: "stretch" }}>
                <Box flex="1">
                    <Stack flexDirection="row" alignItems="center" paddingBottom="20px">
                        <Box width="49px" height="49px" display="flex" alignItems="center" justifyContent="center">
                            <MapCircleIcon size={49} />
                        </Box>
                        <Box paddingLeft="16px">
                            <Typography fontSize="20px" fontWeight="600" paddingBottom="4px">Адрес</Typography>
                            <Typography fontSize="16px" fontWeight="400" color="text.secondary">
                                {contactInfo?.address || 'пр.Янки Купалы 22а, цокольный этаж'}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack flexDirection="row" alignItems="center" paddingBottom="20px">
                        <Box width="49px" height="49px" display="flex" alignItems="center" justifyContent="center">
                            <PhoneCircleIcon size={49} />
                        </Box>
                        <Box paddingLeft="16px">
                            <Typography fontSize="20px" fontWeight="600" paddingBottom="4px">Телефон</Typography>
                            <Typography fontSize="16px" fontWeight="400" color="text.secondary">
                                {contactInfo?.phone || '+375(29)708-21-11'}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack flexDirection="row" alignItems="center" paddingBottom="20px">
                        <Box width="49px" height="49px" display="flex" alignItems="center" justifyContent="center">
                            <MailCircleIcon size={49} />
                        </Box>
                        <Box paddingLeft="16px">
                            <Typography fontSize="20px" fontWeight="600" paddingBottom="4px">Email</Typography>
                            <Typography fontSize="16px" fontWeight="400" color="text.secondary">
                                {contactInfo?.email || 'info@granite-memory.by'}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack flexDirection="row" alignItems="center" paddingBottom="20px">
                        <Box width="49px" height="49px" display="flex" alignItems="center" justifyContent="center">
                            <ClockCircleIcon size={49} />
                        </Box>
                        <Box paddingLeft="16px">
                            <Typography fontSize="20px" fontWeight="600" paddingBottom="4px">Режим работы</Typography>
                            {workingHours.map((hours: string, index: number) => (
                                <Typography key={index} fontSize="16px" fontWeight="400" color="text.secondary">
                                    {hours}
                                </Typography>
                            ))}
                        </Box>
                    </Stack>
                </Box>
                <Box width={{ xs: "100%", lg: "605px" }} height="313px" border="5px solid" borderColor="common.black" borderRadius="8px" overflow="hidden">
                    <Maps />
                </Box>
            </Box>
        </Box>
    )
}

export default GranitContacts;