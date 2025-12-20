'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  Alert,
  Chip,
  Avatar,
  Stack,
  Button,
} from '@mui/material';
import {
  Inventory,
  Category,
  Article,
  Add,
  Visibility,
  Phone,
  NewReleases,
  ContentCopy,
} from '@mui/icons-material';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { AdminDashboardSkeleton } from '@/components/AdminSkeleton/AdminSkeleton';

interface RecentProduct {
  id: number;
  name: string;
  price: number;
  discount?: number;
  created_at: string;
  category?: {
    id: number;
    name: string;
  };
}

const StatCard = ({
  title,
  value,
  icon,
  color,
  trend,
  subtitle
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
  subtitle?: string;
}) => (
  <Card
    sx={{
      height: '100%',
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
      border: `1px solid ${color}30`,
      borderRadius: 3,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 25px ${color}25`,
      }
    }}
  >
    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: 2,
            p: { xs: 1, md: 1.5 },
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': {
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }
          }}
        >
          {icon}
        </Box>
        {trend && (
          <Chip
            label={trend}
            size="small"
            color="success"
            sx={{ fontSize: '0.75rem', height: 24 }}
          />
        )}
      </Box>
      <Typography
        variant="h4"
        component="div"
        fontWeight="bold"
        color={color}
        gutterBottom
        sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' } }}
      >
        {value}
      </Typography>
      <Typography
        color="textSecondary"
        variant="body2"
        fontWeight="medium"
        sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          color="textSecondary"
          variant="caption"
          sx={{ mt: 1, display: 'block', fontSize: { xs: '0.75rem', md: '0.75rem' } }}
        >
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const QuickActionCard = ({
  title,
  description,
  icon,
  color,
  onClick
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}) => (
  <Card
    sx={{
      height: '100%',
      cursor: 'pointer',
      borderRadius: 3,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${color}25`,
      }
    }}
  >
    <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: 2,
              p: { xs: 1, md: 1.5 },
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& svg': {
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }
            }}
          >
            {icon}
          </Box>
          <Box flex={1}>
            <Typography
              variant="h6"
              component="div"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              {title}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
              sx={{ fontSize: { xs: '0.875rem', md: '0.875rem' } }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
);

const RecentProductCard = ({ product }: { product: RecentProduct }) => (
  <Card sx={{ mb: 2, borderRadius: 2 }}>
    <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src="/images/placeholder.jpg"
          alt={product.name}
          variant="rounded"
          sx={{ width: { xs: 40, md: 48 }, height: { xs: 40, md: 48 } }}
        />
        <Box flex={1} minWidth={0}>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            gutterBottom
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {product.name}
          </Typography>
          <Box
            display="flex"
            gap={2}
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Chip
              label={product.category?.name || 'Без категории'}
              size="small"
              variant="outlined"
              sx={{ fontSize: { xs: '0.75rem', md: '0.75rem' } }}
            />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
            >
              {new Date(product.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Box textAlign="right" minWidth="fit-content">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            {product.price} BYN
          </Typography>
          {product.discount && (
            <Typography
              variant="caption"
              color="success.main"
              sx={{ fontSize: { xs: '0.75rem', md: '0.75rem' } }}
            >
              Скидка {product.discount}%
            </Typography>
          )}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default function AdminDashboard() {
  const router = useRouter();
  const { stats, loading, error } = useAdminDashboard();

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-product':
        router.push('/admin/products');
        break;
      case 'add-category':
        router.push('/admin/categories');
        break;
      case 'edit-content':
        router.push('/admin/content');
        break;
      case 'update-contacts':
        router.push('/admin/contacts');
        break;
      default:
        console.log(`Quick action: ${action}`);
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box mb={{ xs: 3, md: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' } }}
          >
            Панель управления
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
          >
            Добро пожаловать в админ-панель Granit Memory
          </Typography>
        </Box>

        {/* Loading State */}
        {loading && <AdminDashboardSkeleton />}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Statistics Cards */}
        {!loading && !error && stats && (
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={{ xs: 2, md: 3 }}
            mb={{ xs: 3, md: 4 }}
          >
            <StatCard
              title="Всего товаров"
              value={stats.totalProducts}
              icon={<Inventory />}
              color="#2196f3"
              subtitle="В каталоге"
            />
            <StatCard
              title="Категории"
              value={stats.totalCategories}
              icon={<Category />}
              color="#4caf50"
              subtitle="Активных категорий"
            />
            <StatCard
              title="Примеры работ"
              value={stats.totalExamplesWork}
              icon={<Article />}
              color="#ff9800"
              subtitle="В портфолио"
            />
            <StatCard
              title="Недавние товары"
              value={stats.recentProducts.length}
              icon={<NewReleases />}
              color="#9c27b0"
              subtitle="Последние добавленные"
            />
          </Box>
        )}

        {/* Main Content Grid */}
        <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={{ xs: 2, md: 3 }}>
          {/* Quick Actions */}
          <Box flex={{ xs: '1', lg: '2' }}>
            <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, mb: { xs: 2, md: 3 } }}>
              <Typography
                variant="h5"
                component="h2"
                fontWeight="bold"
                mb={3}
                sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
              >
                Быстрые действия
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)' }}
                gap={{ xs: 1.5, sm: 2 }}
              >
                <QuickActionCard
                  title="Добавить товар"
                  description="Создать новый товар в каталоге"
                  icon={<Add />}
                  color="#2196f3"
                  onClick={() => handleQuickAction('add-product')}
                />
                <QuickActionCard
                  title="Управление категориями"
                  description="Добавить или изменить категории"
                  icon={<Category />}
                  color="#4caf50"
                  onClick={() => handleQuickAction('add-category')}
                />
                <QuickActionCard
                  title="Редактировать контент"
                  description="Изменить содержимое страниц"
                  icon={<ContentCopy />}
                  color="#ff9800"
                  onClick={() => handleQuickAction('edit-content')}
                />
                <QuickActionCard
                  title="Контактная информация"
                  description="Обновить контакты и адреса"
                  icon={<Phone />}
                  color="#9c27b0"
                  onClick={() => handleQuickAction('update-contacts')}
                />
              </Box>
            </Paper>

            {/* Recent Products */}
            <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={3}
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={{ xs: 2, sm: 0 }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                >
                  Недавние товары
                </Typography>
                <Button
                  variant="text"
                  endIcon={<Visibility />}
                  onClick={() => router.push('/admin/products')}
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Все товары
                </Button>
              </Box>
              {stats?.recentProducts && stats.recentProducts.length > 0 ? (
                <Box>
                  {stats.recentProducts.map((product) => (
                    <RecentProductCard key={product.id} product={product} />
                  ))}
                </Box>
              ) : (
                <Box textAlign="center" py={4}>
                  <Inventory sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Нет товаров
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mb={3}>
                    Добавьте первый товар в каталог
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleQuickAction('add-product')}
                  >
                    Добавить товар
                  </Button>
                </Box>
              )}
            </Paper>
          </Box>

          {/* Sidebar */}
          <Box flex={{ xs: '1', lg: '1' }}>
            {/* System Status */}
            <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
              >
                Статус системы
              </Typography>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                    <Typography variant="body2">База данных</Typography>
                  </Box>
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    Онлайн
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                    <Typography variant="body2">API</Typography>
                  </Box>
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    Работает
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                    <Typography variant="body2">Cloudinary</Typography>
                  </Box>
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    Подключен
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Container>
    </AdminLayout>
  );
}