'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Divider,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import {
  Save,
  Phone,
  LocationOn,
  Instagram,
  Schedule,
  Email,
} from '@mui/icons-material';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import { useAdminContacts } from '@/hooks/useAdminContacts';
import { AdminContactsSkeleton } from '@/components/AdminSkeleton/AdminSkeleton';
import { AdminOperationOverlay } from '@/components/AdminOperationOverlay/AdminOperationOverlay';

export default function AdminContacts() {
  const { contactInfo, loading, saving, error, updateContactInfo } = useAdminContacts();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [contactData, setContactData] = useState({
    phone: '',
    address: '',
    instagram: '',
    email: '',
    working_hours: '',
  });
  const [workingHours, setWorkingHours] = useState({
    weekdays: '',
    weekends: '',
  });

  // Загружаем данные из БД при инициализации
  React.useEffect(() => {
    if (contactInfo) {
      setContactData({
        phone: contactInfo.phone,
        address: contactInfo.address,
        instagram: contactInfo.instagram || '',
        email: contactInfo.email,
        working_hours: contactInfo.working_hours,
      });

      // Парсим режим работы для раздельного редактирования
      const workingHoursStr = contactInfo.working_hours || 'Пн-Пт: 9:00 - 18:00, Сб-Вс: 10:00 - 16:00';
      const parts = workingHoursStr.split(', ');
      const weekdays = parts[0]?.replace('Пн-Пт: ', '') || '9:00 - 18:00';
      const weekends = parts[1]?.replace('Сб-Вс: ', '') || '10:00 - 16:00';

      setWorkingHours({
        weekdays,
        weekends,
      });
    }
  }, [contactInfo]);

  const handleSave = async () => {
    try {
      // Собираем режим работы из отдельных полей
      const workingHoursStr = `Пн-Пт: ${workingHours.weekdays}, Сб-Вс: ${workingHours.weekends}`;

      await updateContactInfo({
        ...contactData,
        working_hours: workingHoursStr,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving contact info:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setContactData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleWorkingHoursChange = (type: 'weekdays' | 'weekends', value: string) => {
    setWorkingHours(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box mb={{ xs: 3, md: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' } }}
          >
            Управление контактами
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Редактирование контактной информации компании
          </Typography>
        </Box>

        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Контактные данные успешно обновлены!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <AdminContactsSkeleton />
        ) : (
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {/* Основная контактная информация */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: { xs: 2, md: 3 } }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  <Phone color="primary" />
                  Основная информация
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box display="flex" flexDirection="column" gap={3}>
                  <TextField
                    fullWidth
                    label="Номер телефона"
                    value={contactData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Phone sx={{ color: 'action.active', mr: 1 }} />,
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={contactData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />,
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Адрес"
                    value={contactData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    variant="outlined"
                    multiline
                    rows={1}
                    size="small"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: 'action.active', mr: 1, alignSelf: 'flex-start', mt: 0.5 }} />,
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Instagram"
                    value={contactData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Instagram sx={{ color: 'action.active', mr: 1 }} />,
                    }}
                    helperText="Только имя пользователя без @"
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Режим работы */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: { xs: 2, md: 3 } }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  <Schedule color="primary" />
                  Режим работы
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box display="flex" flexDirection="column" gap={3}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.875rem', md: '0.875rem' }
                      }}
                    >
                      Будние дни (Пн-Пт)
                    </Typography>
                    <TextField
                      fullWidth
                      label="Время работы"
                      value={workingHours.weekdays}
                      onChange={(e) => handleWorkingHoursChange('weekdays', e.target.value)}
                      variant="outlined"
                      placeholder="9:00 - 18:00"
                      helperText="Введите время в формате ЧЧ:ММ - ЧЧ:ММ"
                      size="small"
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.875rem', md: '0.875rem' }
                      }}
                    >
                      Выходные дни (Сб-Вс)
                    </Typography>
                    <TextField
                      fullWidth
                      label="Время работы"
                      value={workingHours.weekends}
                      onChange={(e) => handleWorkingHoursChange('weekends', e.target.value)}
                      variant="outlined"
                      placeholder="10:00 - 16:00"
                      helperText="Введите время в формате ЧЧ:ММ - ЧЧ:ММ"
                      size="small"
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>


            {/* Предварительный просмотр */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: { xs: 2, md: 3 } }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                >
                  Предварительный просмотр
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
                    >
                      Как будет отображаться в шапке:
                    </Typography>
                    <Box sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, color: 'text.secondary' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <LocationOn sx={{ fontSize: { xs: 14, md: 16 } }} />
                        {contactData.address}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Phone sx={{ fontSize: { xs: 14, md: 16 } }} />
                        {contactData.phone}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Instagram sx={{ fontSize: { xs: 14, md: 16 } }} />
                        {contactData.instagram}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
                    >
                      Режим работы:
                    </Typography>
                    <Box sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, color: 'text.secondary' }}>
                      <div>Пн-Пт: {workingHours.weekdays}</div>
                      <div>Сб-Вс: {workingHours.weekends}</div>
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Save Button */}
        <Box mt={{ xs: 3, md: 4 }} display="flex" justifyContent="center">
          <Button
            variant="contained"
            size="large"
            startIcon={<Save />}
            onClick={handleSave}
            sx={{
              backgroundColor: '#333',
              '&:hover': { backgroundColor: '#555' },
              px: { xs: 3, md: 4 },
              py: 1.5,
              width: { xs: '100%', sm: 'auto' },
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            Сохранить все изменения
          </Button>
        </Box>

        {/* Operation Overlay */}
        <AdminOperationOverlay
          open={saving}
          message="Сохранение контактной информации..."
        />
      </Container>
    </AdminLayout>
  );
}