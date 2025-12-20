'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tab,
  Tabs,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import { Save, Business, Build, ViewHeadline, ViewModule, Category } from '@mui/icons-material';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import ImageUpload from '@/components/ImageUpload/ImageUpload';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
}

interface AboutCompanyData {
  title: string;
  description: string;
  image: string;
  advantages: string[];
  statistics: Array<{
    value: string;
    label: string;
  }>;
}

interface FooterData {
  slogan: string;
  unp_number: string;
  copyright_text: string;
  company_full_name: string;
}

interface Service {
  id: number;
  name: string;
  subtext: string;
  image: string;
}

interface OurServicesData {
  ourServices: Service[];
}

export default function AdminContent() {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Состояния для данных
  const [aboutCompanyData, setAboutCompanyData] = useState<AboutCompanyData>({
    title: 'О нашей компании',
    description: '',
    image: '',
    advantages: ['', '', ''],
    statistics: [
      { value: '10+', label: 'лет опыта' },
      { value: '2000+', label: 'памятников' },
      { value: '100%', label: 'гарантия' }
    ]
  });

  const [footerData, setFooterData] = useState<FooterData>({
    slogan: '',
    unp_number: '',
    copyright_text: '',
    company_full_name: ''
  });

  const [ourServicesData, setOurServicesData] = useState<OurServicesData>({
    ourServices: [
      { id: 1, name: '', subtext: '', image: '' },
      { id: 2, name: '', subtext: '', image: '' },
      { id: 3, name: '', subtext: '', image: '' }
    ]
  });

  const [catalogData, setCatalogData] = useState({
    title: 'Каталог памятников',
    description: 'Выберите подходящий памятник из нашего каталога или закажите индивидуальный проект'
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError(null);
    setSaveSuccess(false);
  };

  // Загрузка данных
  const loadData = async () => {
    setLoading(true);
    try {
      const [aboutResponse, footerResponse, servicesResponse] = await Promise.all([
        fetch('/api/content/about-company'),
        fetch('/api/content/footer'),
        fetch('/api/content/our-services')
      ]);

      if (aboutResponse.ok) {
        const aboutData = await aboutResponse.json();
        setAboutCompanyData({
          title: aboutData.title || 'О нашей компании',
          description: aboutData.description || '',
          image: aboutData.image || '',
          advantages: aboutData.advantages || ['', '', ''],
          statistics: aboutData.statistics || [
            { value: '10+', label: 'лет опыта' },
            { value: '2000+', label: 'памятников' },
            { value: '100%', label: 'гарантия' }
          ]
        });
      }

      if (footerResponse.ok) {
        const footerData = await footerResponse.json();
        setFooterData({
          slogan: footerData.slogan || '',
          unp_number: footerData.unp_number || '',
          copyright_text: footerData.copyright_text || '',
          company_full_name: footerData.company_full_name || ''
        });
      }

      if (servicesResponse.ok) {
        const servicesData = await servicesResponse.json();
        setOurServicesData({
          ourServices: servicesData.ourServices || [
            { id: 1, name: '', subtext: '', image: '' },
            { id: 2, name: '', subtext: '', image: '' },
            { id: 3, name: '', subtext: '', image: '' }
          ]
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  // Сохранение данных
  const saveData = async () => {
    setSaving(true);
    setError(null);

    try {
      let response;

      switch (tabValue) {
        case 0: // О компании
          response = await fetch('/api/content/about-company', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aboutCompanyData),
          });
          break;
        case 1: // Наши услуги
          response = await fetch('/api/content/our-services', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ourServicesData),
          });
          break;
        case 2: // Шапка (использует данные о компании)
          response = await fetch('/api/content/about-company', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aboutCompanyData),
          });
          break;
        case 3: // Подвал
          response = await fetch('/api/content/footer', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(footerData),
          });
          break;
        case 4: // Каталог (пока только локальное состояние)
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
          setSaving(false);
          return;
        default:
          throw new Error('Неизвестная вкладка');
      }

      if (response?.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        throw new Error('Ошибка при сохранении данных');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
  };


  // Обновление преимуществ
  const updateAdvantage = (index: number, value: string) => {
    const newAdvantages = [...aboutCompanyData.advantages];
    newAdvantages[index] = value;
    setAboutCompanyData({ ...aboutCompanyData, advantages: newAdvantages });
  };

  // Обновление статистики
  const updateStatistic = (index: number, field: 'value' | 'label', value: string) => {
    const newStatistics = [...aboutCompanyData.statistics];
    newStatistics[index] = { ...newStatistics[index], [field]: value };
    setAboutCompanyData({ ...aboutCompanyData, statistics: newStatistics });
  };

  // Обновление услуги
  const updateService = (index: number, field: 'name' | 'subtext', value: string) => {
    const newServices = [...ourServicesData.ourServices];
    newServices[index] = { ...newServices[index], [field]: value };
    setOurServicesData({ ...ourServicesData, ourServices: newServices });
  };

  // Загрузка данных при монтировании
  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        </Container>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box mb={4}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Управление контентом
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Редактирование содержимого страниц сайта
          </Typography>
        </Box>

        {/* Alerts */}
        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Изменения успешно сохранены!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  minWidth: { xs: 'auto', sm: 120 },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  px: { xs: 1, sm: 2 }
                }
              }}
            >
              <Tab icon={<Business />} label="О компании" />
              <Tab icon={<Build />} label="Наши услуги" />
              <Tab icon={<ViewHeadline />} label="Шапка" />
              <Tab icon={<ViewModule />} label="Подвал" />
              <Tab icon={<Category />} label="Каталог" />
            </Tabs>
          </Box>

          {/* О компании */}
          <TabPanel value={tabValue} index={0}>
            <Stack spacing={3}>
              <Typography variant="h6" gutterBottom>
                Секция &quot;О нашей компании&quot;
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 2 }}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Заголовок секции"
                      value={aboutCompanyData.title}
                      onChange={(e) => setAboutCompanyData({ ...aboutCompanyData, title: e.target.value })}
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      label="Основной текст"
                      value={aboutCompanyData.description}
                      onChange={(e) => setAboutCompanyData({ ...aboutCompanyData, description: e.target.value })}
                      multiline
                      rows={6}
                      variant="outlined"
                    />


                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                      Статистика компании
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
                      {aboutCompanyData.statistics.map((statistic, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <TextField
                            fullWidth
                            label={`Число ${index + 1}`}
                            value={statistic.value}
                            onChange={(e) => updateStatistic(index, 'value', e.target.value)}
                            variant="outlined"
                            size="small"
                            helperText="Например: 10+, 2000+, 100%"
                          />
                          <TextField
                            fullWidth
                            label={`Описание ${index + 1}`}
                            value={statistic.label}
                            onChange={(e) => updateStatistic(index, 'label', e.target.value)}
                            variant="outlined"
                            size="small"
                            helperText="Например: лет опыта, памятников, гарантия"
                          />
                        </Box>
                      ))}
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Stack spacing={2}>
                    <ImageUpload
                      value={aboutCompanyData.image}
                      onChange={(imageUrl) => setAboutCompanyData({ ...aboutCompanyData, image: imageUrl })}
                      label="Изображение секции"
                      helperText="Загрузите изображение для секции 'О нашей компании'"
                      previewSize={{ width: 250, height: 150 }}
                      uploadType="content"
                    />

                  </Stack>
                </Box>
              </Box>
            </Stack>
          </TabPanel>

          {/* Наши услуги */}
          <TabPanel value={tabValue} index={1}>
            <Stack spacing={3}>
              <Typography variant="h6" gutterBottom>
                Секция &quot;Наши услуги&quot;
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                {ourServicesData.ourServices.map((service, index) => (
                  <Card key={service.id} variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Chip label={`Услуга ${index + 1}`} size="small" color="primary" />
                        </Box>

                        <TextField
                          fullWidth
                          label="Название услуги"
                          value={service.name}
                          onChange={(e) => updateService(index, 'name', e.target.value)}
                          variant="outlined"
                          size="small"
                        />

                        <TextField
                          fullWidth
                          label="Описание"
                          value={service.subtext}
                          onChange={(e) => updateService(index, 'subtext', e.target.value)}
                          multiline
                          rows={3}
                          variant="outlined"
                          size="small"
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Box>

            </Stack>
          </TabPanel>

          {/* Шапка */}
          <TabPanel value={tabValue} index={2}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Контент шапки
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  В шапке можно редактировать только текст на плашках с преимуществами компании
                </Typography>
              </Box>

              <Divider />

              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Преимущества компании (отображаются в шапке)
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                {aboutCompanyData.advantages.map((advantage, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    label={`Преимущество ${index + 1}`}
                    value={advantage}
                    onChange={(e) => updateAdvantage(index, e.target.value)}
                    variant="outlined"
                    size="small"
                    helperText={`Текст для ${index + 1}-го преимущества в шапке`}
                  />
                ))}
              </Box>

              <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Неизменяемые элементы шапки:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  • Название компании и логотип<br />
                  • Пункты меню навигации<br />
                  • Контактная информация<br />
                  • Дизайн и расположение элементов
                </Typography>
              </Paper>

            </Stack>
          </TabPanel>

          {/* Подвал */}
          <TabPanel value={tabValue} index={3}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Контент подвала
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Редактирование текстового содержимого подвала
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 2 }}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Слоган под логотипом"
                      value={footerData.slogan}
                      onChange={(e) => setFooterData({ ...footerData, slogan: e.target.value })}
                      multiline
                      rows={2}
                      variant="outlined"
                      helperText="Краткое описание компании под логотипом"
                    />

                    <TextField
                      fullWidth
                      label="Полное название компании"
                      value={footerData.company_full_name}
                      onChange={(e) => setFooterData({ ...footerData, company_full_name: e.target.value })}
                      variant="outlined"
                      helperText="Полное название компании для правовой информации (например: ООО 'Гранит Памяти')"
                    />

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
                      <TextField
                        fullWidth
                        label="Номер УНП"
                        value={footerData.unp_number}
                        onChange={(e) => setFooterData({ ...footerData, unp_number: e.target.value })}
                        variant="outlined"
                        helperText="Учетный номер плательщика"
                      />
                      <TextField
                        fullWidth
                        label="Copyright текст"
                        value={footerData.copyright_text}
                        onChange={(e) => setFooterData({ ...footerData, copyright_text: e.target.value })}
                        variant="outlined"
                        helperText="Текст авторских прав внизу страницы"
                      />
                    </Box>
                  </Stack>
                </Box>

              </Box>
            </Stack>
          </TabPanel>

          {/* Каталог */}
          <TabPanel value={tabValue} index={4}>
            <Stack spacing={3}>
              <Typography variant="h6" gutterBottom>
                Контент страницы каталога
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 2 }}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Заголовок страницы каталога"
                      value={catalogData.title}
                      onChange={(e) => setCatalogData({ ...catalogData, title: e.target.value })}
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      label="Описание каталога"
                      value={catalogData.description}
                      onChange={(e) => setCatalogData({ ...catalogData, description: e.target.value })}
                      multiline
                      rows={3}
                      variant="outlined"
                    />
                  </Stack>
                </Box>

              </Box>
            </Stack>
          </TabPanel>
        </Paper>

        {/* Общая кнопка сохранения */}
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            size="large"
            startIcon={<Save />}
            onClick={saveData}
            disabled={saving}
            sx={{
              backgroundColor: '#333',
              '&:hover': { backgroundColor: '#555' },
              px: 4,
              py: 1.5,
              width: { xs: '100%', sm: 'auto' },
              minWidth: 200
            }}
          >
            {saving ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
        </Box>
      </Container>
    </AdminLayout>
  );
}