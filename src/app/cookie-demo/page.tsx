"use client"
import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert, Divider, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';

interface FormData {
  fullName: string;
  email: string;
  birthDate: string;
  birthPlace: string;
  hobbies: string;
}

export default function CookieDemoPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    birthDate: '',
    birthPlace: '',
    hobbies: '',
  });
  const [savedData, setSavedData] = useState<FormData | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Функция для установки cookie
  const setCookie = (name: string, value: string, days: number = 7) => {
    if (typeof window === 'undefined') return; // Проверка на клиентскую сторону
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  };

  // Функция для получения cookie
  const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') return null; // Проверка на клиентскую сторону
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  };

  // Функция для удаления cookie
  const deleteCookie = (name: string) => {
    if (typeof window === 'undefined') return; // Проверка на клиентскую сторону
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  };

  // Загрузка данных из cookie при монтировании
  useEffect(() => {
    if (typeof window === 'undefined') return; // Проверка на клиентскую сторону
    const loadedData: FormData = {
      fullName: getCookie('fullName') || '',
      email: getCookie('email') || '',
      birthDate: getCookie('birthDate') || '',
      birthPlace: getCookie('birthPlace') || '',
      hobbies: getCookie('hobbies') || '',
    };

    const hasData = Object.values(loadedData).some((value) => value !== '');
    if (hasData) {
      setSavedData(loadedData);
      setFormData(loadedData);
    }
  }, []);

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    if (!formData.fullName || !formData.email) {
      setMessage({ type: 'error', text: 'Заполните обязательные поля (ФИО и Email)' });
      return;
    }

    // Сохраняем каждое поле в отдельную cookie
    setCookie('fullName', formData.fullName);
    setCookie('email', formData.email);
    setCookie('birthDate', formData.birthDate);
    setCookie('birthPlace', formData.birthPlace);
    setCookie('hobbies', formData.hobbies);

    setSavedData({ ...formData });
    setMessage({ type: 'success', text: 'Данные успешно сохранены в Cookie!' });
  };

  const handleLoad = () => {
    const loadedData: FormData = {
      fullName: getCookie('fullName') || '',
      email: getCookie('email') || '',
      birthDate: getCookie('birthDate') || '',
      birthPlace: getCookie('birthPlace') || '',
      hobbies: getCookie('hobbies') || '',
    };

    const hasData = Object.values(loadedData).some((value) => value !== '');
    if (hasData) {
      setFormData(loadedData);
      setSavedData(loadedData);
      setMessage({ type: 'success', text: 'Данные успешно загружены из Cookie!' });
    } else {
      setMessage({ type: 'error', text: 'В Cookie нет сохраненных данных' });
    }
  };

  const handleClear = () => {
    deleteCookie('fullName');
    deleteCookie('email');
    deleteCookie('birthDate');
    deleteCookie('birthPlace');
    deleteCookie('hobbies');

    setFormData({
      fullName: '',
      email: '',
      birthDate: '',
      birthPlace: '',
      hobbies: '',
    });
    setSavedData(null);
    setMessage({ type: 'success', text: 'Cookie успешно очищены!' });
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Работа с COOKIE в JavaScript
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Задание №2: Сохранение, получение и очистка данных через Cookie
      </Typography>

      {message && (
        <Alert
          severity={message.type}
          onClose={() => setMessage(null)}
          sx={{ mb: 3 }}
        >
          {message.text}
        </Alert>
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {/* Форма ввода данных */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Форма ввода данных
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="ФИО *"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                fullWidth
                required
              />
              <TextField
                label="Электронная почта *"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                fullWidth
                required
              />
              <TextField
                label="Дата рождения"
                type="date"
                value={formData.birthDate}
                onChange={handleInputChange('birthDate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Место рождения"
                value={formData.birthPlace}
                onChange={handleInputChange('birthPlace')}
                fullWidth
              />
              <TextField
                label="Увлечения"
                value={formData.hobbies}
                onChange={handleInputChange('hobbies')}
                fullWidth
                multiline
                rows={3}
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  fullWidth
                >
                  Сохранить в Cookie
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GetAppIcon />}
                  onClick={handleLoad}
                  fullWidth
                >
                  Загрузить из Cookie
                </Button>
              </Box>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleClear}
                fullWidth
              >
                Очистить Cookie
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Отображение сохраненных данных */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Сохраненные данные из Cookie
            </Typography>
            {savedData ? (
              <Box sx={{ mt: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>ФИО:</strong> {savedData.fullName || 'Не указано'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {savedData.email || 'Не указано'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Дата рождения:</strong> {savedData.birthDate || 'Не указано'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Место рождения:</strong> {savedData.birthPlace || 'Не указано'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Увлечения:</strong> {savedData.hobbies || 'Не указано'}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Нет сохраненных данных
              </Typography>
            )}
          </Paper>
        </Box>
      </Stack>

      {/* Информация о Cookie */}
      <Paper sx={{ p: 3, mt: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Информация о Cookie
        </Typography>
        <Typography variant="body2" component="pre" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
          {typeof window !== 'undefined' ? (document.cookie || 'Cookie пусты') : 'Cookie пусты'}
        </Typography>
      </Paper>
    </Box>
  );
}

