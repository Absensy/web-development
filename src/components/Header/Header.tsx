'use client';

import * as React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import CatalogButton from '../GranitCatalogButton/GranitCatalogButton';
import { ButtonHeader, HeaderMenuButton, TopHeaderBox } from './Header.Styles';
import LogoGranitPrimary2Icon from '@/icons/LogoGranitPrimary2';
import GpsIcon from '@/icons/GPS';
import TelIcon from '@/icons/Tel';
import InstIcon from '@/icons/Inst';
import GreenCheckIcon from '@/icons/GreenCheck';
import LogoGranitPrimary1Icon from '@/icons/LogoGranitPrimary1';
import ClocksIcon from '@/icons/Clocks';
import Link from 'next/link';
import { useContactContext } from '@/contexts/ContactContext';
import { useAboutCompanyContent } from '@/hooks/useContent';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { Skeleton } from '../Skeleton/Skeleton';
import { CartIcon } from '../CartDrawer/CartDrawer';

const Header = () => {
  const { contactInfo, loading } = useContactContext();
  const { data: aboutData } = useAboutCompanyContent();

  if (loading) {
    return (
      <Box>
        {/* Верхняя часть Header - скелетон */}
        <Box sx={{ padding: { xs: '29px 4%', md: '29px 5%' }, display: { xs: 'none', md: 'block' } }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" gap="20px">
            <Box display="flex" alignItems="center" gap="20px">
              <Skeleton width="120px" height="40px" />
              <Box>
                <Box sx={{ marginBottom: '8px' }}>
                  <Skeleton width="200px" height="20px" />
                </Box>
                <Box sx={{ marginBottom: '8px' }}>
                  <Skeleton width="150px" height="20px" />
                </Box>
                <Skeleton width="180px" height="20px" />
              </Box>
            </Box>
            <Box>
              <Skeleton width="200px" height="60px" />
            </Box>
          </Box>
        </Box>

        {/* Разделитель */}
        <Box sx={{ borderTop: '1px solid #E5E7EB', backgroundColor: '#F8F9FA', height: '1px' }} />

        {/* Нижняя часть Header - скелетон */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1300,
            backgroundColor: 'white',
            boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.08)',
            padding: { xs: '16px 4%', md: '10px 5%' },
            width: '100%',
            display: 'block',
            contain: 'layout',
            isolation: 'isolate'
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap="10px">
              <Skeleton width="40px" height="40px" />
              <Skeleton width="150px" height="24px" />
            </Box>
            <Box display="flex" alignItems="center" gap="20px">
              <Skeleton width="200px" height="20px" />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* Верхняя часть Header */}
      <TopHeaderBox>
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap="20px">
            <Stack direction="row" alignItems="center">
              <Link href="/"><LogoGranitPrimary1Icon /></Link>
              <Stack spacing={1} alignItems="flex-start" marginLeft="0" justifyContent="center" paddingLeft="17px">
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
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="flex-start" paddingRight="14%" paddingTop="5px">
              <Box paddingTop="2px">
                <ClocksIcon />
              </Box>
              <Stack textAlign="left">
                <Typography variant="subtitle2" fontWeight="600" fontSize="18px" color="text.primary" paddingBottom="4px">Режим работы</Typography>
                {contactInfo?.working_hours ? (
                  contactInfo.working_hours.split(', ').map((hours: string, index: number) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      {hours}
                    </Typography>
                  ))
                ) : (
                  <>
                    <Typography variant="body2" color="text.secondary">Пн-Пт: 9:00 - 18:00</Typography>
                    <Typography variant="body2" color="text.secondary">Сб-Вс: 10:00 - 16:00</Typography>
                  </>
                )}
              </Stack>
            </Stack>

            <Box bgcolor="#9a9da4" borderRadius="21px">
              <Stack spacing={1} alignItems="flex-start" padding="10px 24px">
                {aboutData.advantages.slice(0, 3).map((advantage, index) => (
                  <Stack key={index} direction="row" spacing={1} alignItems="center">
                    <GreenCheckIcon />
                    <Typography variant="body2" color="#FFFFFF">{advantage}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
        </Stack>
      </TopHeaderBox>

      {/* Разделитель */}
      <Box sx={{
        borderTop: '1px solid #E5E7EB',
        backgroundColor: '#F8F9FA',
        height: '1px'
      }} />

      {/* Нижняя часть Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1300, // Увеличиваем z-index для Material-UI совместимости
          backgroundColor: 'white',
          boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.08)',
          padding: { xs: '16px 4%', md: '10px 5%' },
          width: '100%',
          display: 'block',
          // Добавляем дополнительные свойства для лучшей работы sticky
          contain: 'layout',
          isolation: 'isolate'
        }}
      >
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between" 
          spacing={2} 
          width="100%"
          sx={{ minHeight: { xs: '56px', md: '60px' } }}
        >
          {/* Левая часть: Логотип */}
          <Box display='flex' alignItems='center' flexShrink={0}>
            <Link href="/"><LogoGranitPrimary2Icon /></Link>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Typography 
                variant="h6" 
                component="div" 
                fontWeight="700" 
                fontSize={{ xs: '16px', md: '18px', lg: '24px' }} 
                paddingLeft='10px' 
                color="text.primary"
                sx={{ whiteSpace: 'nowrap' }}
              >
                Гранит памяти
              </Typography>
            </Link>
          </Box>

          {/* Центральная часть: Меню */}
          <Stack 
            direction="row" 
            gap={{ md: '15px', lg: '30px' }}
            sx={{ 
              flexGrow: 1,
              justifyContent: 'center',
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <Link href="/catalog" style={{ textDecoration: 'none' }}>
              <HeaderMenuButton variant="text" color="inherit">Каталог</HeaderMenuButton>
            </Link>
            <Link href="/#about" style={{ textDecoration: 'none' }}>
              <HeaderMenuButton variant="text" color="inherit">О нас</HeaderMenuButton>
            </Link>
            <Link href="/#services" style={{ textDecoration: 'none' }}>
              <HeaderMenuButton variant="text" color="inherit">Услуги</HeaderMenuButton>
            </Link>
            <Link href="/#examples" style={{ textDecoration: 'none' }}>
              <HeaderMenuButton variant="text" color="inherit">Примеры работ</HeaderMenuButton>
            </Link>
            <Link href="/oop-demo" style={{ textDecoration: 'none' }}>
              <HeaderMenuButton variant="text" color="inherit" sx={{ color: 'primary.main', fontWeight: 600 }}>
                ООП
              </HeaderMenuButton>
            </Link>
            <Link href="/events-demo" style={{ textDecoration: 'none' }}>
              <HeaderMenuButton variant="text" color="inherit" sx={{ color: 'primary.main', fontWeight: 600 }}>
                События
              </HeaderMenuButton>
            </Link>
            <Link href="/forms-demo" style={{ textDecoration: 'none' }}>
              <HeaderMenuButton variant="text" color="inherit" sx={{ color: 'primary.main', fontWeight: 600 }}>
                Формы
              </HeaderMenuButton>
            </Link>
            <Link href="/shop" style={{ textDecoration: 'none' }}>
              <HeaderMenuButton variant="text" color="inherit" sx={{ color: 'primary.main', fontWeight: 600 }}>
                Корзина
              </HeaderMenuButton>
            </Link>
            <Link href="/cookie-demo" style={{ textDecoration: 'none' }}>
              <HeaderMenuButton variant="text" color="inherit" sx={{ color: 'primary.main', fontWeight: 600 }}>
                Cookie
              </HeaderMenuButton>
            </Link>
            <Link href="/localstorage-demo" style={{ textDecoration: 'none' }}>
              <HeaderMenuButton variant="text" color="inherit" sx={{ color: 'primary.main', fontWeight: 600 }}>
                LocalStorage
              </HeaderMenuButton>
            </Link>
          </Stack>

          {/* Правая часть: Кнопка и иконки */}
          <Stack 
            direction='row' 
            spacing={{ xs: 0.5, md: 1 }} 
            alignItems='center'
            flexShrink={0}
            sx={{ ml: { md: 2 } }}
          >
            <ButtonHeader>
              <CatalogButton />
            </ButtonHeader>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CartIcon />
            </Box>
            <BurgerMenu />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Header;