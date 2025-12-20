'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Button, Drawer, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@/icons/MenuIcon';
import CloseIcon from '@mui/icons-material/Close';
import GpsIcon from '@/icons/GPS';
import TelIcon from '@/icons/Tel';
import InstIcon from '@/icons/Inst';
import ClocksIcon from '@/icons/Clocks';
import GreenCheckIcon from '@/icons/GreenCheck';
import Link from 'next/link';
import CatalogButton from '../GranitCatalogButton/GranitCatalogButton';
import { useContactContext } from '@/contexts/ContactContext';
import { useAboutCompanyContent } from '@/hooks/useContent';
import { usePathname } from 'next/navigation';

const BurgerButton = styled(Button)(({ theme }) => ({
    display: 'none',
    marginLeft: '12px',
    padding: '0px',
    minWidth: 'auto',
    [theme.breakpoints.down(1024)]: {
        display: 'flex',
    },
}));

const MobileMenuButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    padding: '12px 16px',
    minWidth: 'auto',
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.text.primary,
    borderRadius: 6,
    justifyContent: 'flex-start',
    transition: 'color 0.2s, background 0.2s',
    '&:hover': {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.secondary.main,
        boxShadow: 'none',
    },
}));

const ContactInfoBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[50],
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
}));

const FeaturesBox = styled(Box)(() => ({
    backgroundColor: '#9a9da4',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
}));

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { contactInfo, loading } = useContactContext();
    const { data: aboutData } = useAboutCompanyContent();
    const pathname = usePathname();

    // Автоматически закрывать меню при изменении маршрута
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsOpen(open);
    };

    const menuItems = [
        { label: 'Каталог', href: '/catalog' },
        { label: 'О нас', href: '/#about' },
        { label: 'Услуги', href: '/#services' },
        { label: 'Примеры работ', href: '/#examples' },
        { label: '🎮 ООП Демо', href: '/oop-demo' },
        { label: '🎯 События', href: '/events-demo' },
        { label: '📝 Формы', href: '/forms-demo' },
        { label: '🛒 Корзина', href: '/shop' },
        { label: '🍪 Cookie', href: '/cookie-demo' },
        { label: '💾 LocalStorage', href: '/localstorage-demo' },
    ];

    return (
        <>
            <BurgerButton onClick={toggleDrawer(!isOpen)}>
                {isOpen ? <CloseIcon /> : <MenuIcon />}
            </BurgerButton>

            <Drawer
                anchor="top"
                open={isOpen}
                onClose={toggleDrawer(false)}
                hideBackdrop
                sx={{
                    zIndex: 1299, // Ниже хедера
                    '& .MuiDrawer-paper': {
                        top: '80px', // Начинается ниже Header'а
                        height: 'calc(100vh - 80px)', // Высота экрана минус Header
                        backgroundColor: '#ffffff',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <Box sx={{ width: '100%', padding: '20px', paddingTop: '20px' }}>
                    <Box marginTop="16px">
                        {/* Контактная информация */}
                        <ContactInfoBox>
                            <Typography variant="h6" fontWeight="600" marginBottom="16px">
                                Контактная информация
                            </Typography>

                            {loading ? (
                                <Typography>Загрузка...</Typography>
                            ) : (
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <GpsIcon />
                                        <Typography variant="body2" color="text.primary" fontWeight="500">
                                            {contactInfo?.address || 'пр. Янки Купалы 22а, цокольный этаж'}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <TelIcon />
                                        <Typography variant="body2" color="text.primary" fontWeight="500">
                                            {contactInfo?.phone || '+375 (29) 708-21-11'}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <InstIcon />
                                        <Typography variant="body2" color="text.primary" fontWeight="500">
                                            {contactInfo?.instagram || 'granit.grodno'}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="flex-start">
                                        <Box paddingTop="2px">
                                            <ClocksIcon />
                                        </Box>
                                        <Stack>
                                            <Typography variant="subtitle2" fontWeight="600" fontSize="16px" color="text.primary" marginBottom="4px">
                                                Режим работы
                                            </Typography>
                                            {contactInfo?.working_hours ? (
                                                contactInfo.working_hours.split(', ').map((hours: string, index: number) => (
                                                    <Typography key={index} variant="body2" color="text.secondary">
                                                        {hours}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Пн-Пт: 9:00 - 18:00
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Сб-Вс: 10:00 - 16:00
                                                    </Typography>
                                                </>
                                            )}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            )}
                        </ContactInfoBox>

                        <Divider sx={{ margin: '20px 0', borderColor: '#E5E7EB' }} />

                        {/* Навигационное меню */}
                        <Box marginBottom="24px">
                            <Typography variant="h6" fontWeight="600" marginBottom="16px">
                                Навигация
                            </Typography>
                            <Stack spacing={1}>
                                {menuItems.map((item) => (
                                    <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                                        <MobileMenuButton fullWidth onClick={toggleDrawer(false)}>
                                            {item.label}
                                        </MobileMenuButton>
                                    </Link>
                                ))}
                            </Stack>
                        </Box>

                        <Divider sx={{ margin: '20px 0', borderColor: '#E5E7EB' }} />

                        {/* Кнопка каталога */}
                        <Box marginBottom="24px">
                            <CatalogButton />
                        </Box>

                        {/* Преимущества */}
                        <FeaturesBox>
                            <Typography variant="h6" fontWeight="600" color="#FFFFFF" marginBottom="12px">
                                Наши преимущества
                            </Typography>
                            <Stack spacing={1}>
                                {aboutData.advantages.map((advantage, index) => (
                                    <Stack key={index} direction="row" spacing={1} alignItems="center">
                                        <GreenCheckIcon />
                                        <Typography variant="body2" color="#FFFFFF">
                                            {advantage}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </FeaturesBox>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default BurgerMenu;
