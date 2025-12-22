'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import LogoGranitPrimary1Icon from '@/icons/LogoGranitPrimary1';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Ошибка авторизации');
        setPassword('');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Ошибка соединения с сервером');
      setPassword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleBackToSite = () => {
    router.push('/');
  };

  React.useEffect(() => {
    // Проверяем, есть ли действующий JWT токен через запрос к защищенному роуту
    const checkAuth = async () => {
      try {
        const response = await fetch('/admin/dashboard', {
          method: 'HEAD',
        });
        if (response.ok) {
          router.push('/admin/dashboard');
        }
      } catch {
        // Пользователь не авторизован, остаемся на странице логина
      }
    };

    checkAuth();
  }, [router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      {/* Кнопка возврата на сайт */}
      <IconButton
        onClick={handleBackToSite}
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          backgroundColor: 'white',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: '#f0f0f0'
          }
        }}
      >
        <ArrowBack />
      </IconButton>

      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          {/* Логотип */}
          <Box sx={{ mb: 3 }}>
            <LogoGranitPrimary1Icon />
          </Box>

          {/* Заголовок */}
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#333',
              textAlign: 'center',
              mb: 3
            }}
          >
            Админ-панель
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#666',
              textAlign: 'center',
              mb: 4
            }}
          >
            Введите пароль для доступа к панели управления
          </Typography>

          {/* Форма входа */}
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              onKeyPress={handleKeyPress}
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleLogin}
              disabled={!password}
              sx={{
                py: 1.5,
                fontSize: 16,
                fontWeight: 600,
                backgroundColor: '#333',
                '&:hover': {
                  backgroundColor: '#555'
                }
              }}
            >
              Войти
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}