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

export default function LocalStorageDemoPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    birthDate: '',
    birthPlace: '',
    hobbies: '',
  });
  const [savedData, setSavedData] = useState<FormData | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const STORAGE_KEY = 'userPersonalData';

  // Загрузка данных из Local Storage при монтировании
  useEffect(() => {
    const loadedData = localStorage.getItem(STORAGE_KEY);
    if (loadedData) {
      try {
        const parsed = JSON.parse(loadedData);
        setSavedData(parsed);
        setFormData(parsed);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
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

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setSavedData({ ...formData });
      setMessage({ type: 'success', text: 'Данные успешно сохранены в Local Storage!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при сохранении данных' });
      console.error('Error saving to localStorage:', error);
    }
  };

  const handleLoad = () => {
    try {
      const loadedData = localStorage.getItem(STORAGE_KEY);
      if (loadedData) {
        const parsed = JSON.parse(loadedData);
        setFormData(parsed);
        setSavedData(parsed);
        setMessage({ type: 'success', text: 'Данные успешно загружены из Local Storage!' });
      } else {
        setMessage({ type: 'error', text: 'В Local Storage нет сохраненных данных' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при загрузке данных' });
      console.error('Error loading from localStorage:', error);
    }
  };

  const handleClear = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setFormData({
        fullName: '',
        email: '',
        birthDate: '',
        birthPlace: '',
        hobbies: '',
      });
      setSavedData(null);
      setMessage({ type: 'success', text: 'Local Storage успешно очищен!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при очистке данных' });
      console.error('Error clearing localStorage:', error);
    }
  };

  // Получение всех данных из Local Storage для отображения
  const getAllLocalStorageData = () => {
    const allData: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          const value = localStorage.getItem(key);
          allData[key] = value || '';
        } catch {
          allData[key] = 'Ошибка чтения';
        }
      }
    }
    return allData;
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Работа с Local Storage в JavaScript
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Задание №3: Сохранение, получение и очистка данных через Local Storage
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
                  Сохранить в Local Storage
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GetAppIcon />}
                  onClick={handleLoad}
                  fullWidth
                >
                  Загрузить из Local Storage
                </Button>
              </Box>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleClear}
                fullWidth
              >
                Очистить Local Storage
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Отображение сохраненных данных */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Сохраненные данные из Local Storage
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

      {/* Информация о Local Storage */}
      <Paper sx={{ p: 3, mt: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Все данные в Local Storage
        </Typography>
        <Box sx={{ mt: 2 }}>
          {Object.keys(getAllLocalStorageData()).length > 0 ? (
            <Box component="pre" sx={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>
              {JSON.stringify(getAllLocalStorageData(), null, 2)}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Local Storage пуст
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

