'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  Home,
  ArrowBack,
  Search,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import LogoGranitPrimary1Icon from '@/icons/LogoGranitPrimary1';
import { useContactContext } from '@/contexts/ContactContext';

export default function NotFound() {
  const router = useRouter();
  const { contactInfo, loading } = useContactContext();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToCatalog = () => {
    router.push('/catalog');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 3,
            backgroundColor: 'white',
          }}
        >
          {/* Логотип */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <LogoGranitPrimary1Icon />
          </Box>

          {/* Большой номер 404 */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '6rem', md: '8rem' },
              fontWeight: 900,
              color: '#333',
              lineHeight: 0.8,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            404
          </Typography>

          {/* Заголовок */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: '#333',
              mb: 2,
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Страница не найдена
          </Typography>

          {/* Описание */}
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              mb: 4,
              fontSize: { xs: '1rem', md: '1.1rem' },
              maxWidth: '500px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            К сожалению, запрашиваемая вами страница не существует.
            Возможно, она была перемещена или удалена. Давайте поможем вам найти то, что вы ищете.
          </Typography>

          {/* Кнопки действий */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={handleGoHome}
              size="large"
              sx={{
                backgroundColor: '#333',
                color: 'white',
                py: 1.5,
                px: 3,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#555',
                },
              }}
            >
              На главную
            </Button>

            <Button
              variant="outlined"
              startIcon={<Search />}
              onClick={handleGoToCatalog}
              size="large"
              sx={{
                borderColor: '#333',
                color: '#333',
                py: 1.5,
                px: 3,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#555',
                  color: '#555',
                  backgroundColor: 'rgba(51, 51, 51, 0.04)',
                },
              }}
            >
              Посмотреть каталог
            </Button>

            <Button
              variant="text"
              startIcon={<ArrowBack />}
              onClick={handleGoBack}
              size="large"
              sx={{
                color: '#666',
                py: 1.5,
                px: 3,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  color: '#333',
                  backgroundColor: 'rgba(102, 102, 102, 0.04)',
                },
              }}
            >
              Назад
            </Button>
          </Stack>

          {/* Дополнительная информация */}
          <Box
            sx={{
              borderTop: '1px solid #e0e0e0',
              pt: 3,
              mt: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#999',
                mb: 2,
              }}
            >
              Если вы считаете, что это ошибка, свяжитесь с нами:
            </Typography>

            {loading ? (
              <Box display="flex" justifyContent="center" py={2}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
                divider={
                  <Box
                    sx={{
                      width: { xs: '100%', sm: '1px' },
                      height: { xs: '1px', sm: '20px' },
                      backgroundColor: '#e0e0e0',
                    }}
                  />
                }
              >
                <Typography variant="body2" color="textSecondary">
                  📞 {contactInfo?.phone || '+375 (29) 708-21-11'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  📧 {contactInfo?.email || 'info@granit-grodno.by'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  📍 {contactInfo?.address || 'пр. Янки Купалы 22а'}
                </Typography>
              </Stack>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}