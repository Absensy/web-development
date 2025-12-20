'use client';

import React from 'react';
import {
  Box,
  Paper,
  Skeleton,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

// Скелетон для карточек товаров
export const AdminProductsTableSkeleton: React.FC = () => {
  return (
    <>
      {/* Controls Skeleton */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          gap={2}
        >
          <Box
            display="flex"
            gap={2}
            alignItems="center"
            flexDirection={{ xs: 'column', sm: 'row' }}
            width={{ xs: '100%', sm: 'auto' }}
          >
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{
                borderRadius: 1,
                width: { xs: '100%', sm: 300 }
              }}
            />
          </Box>
          <Box
            display="flex"
            gap={2}
            flexDirection={{ xs: 'column', sm: 'row' }}
            width={{ xs: '100%', sm: 'auto' }}
          >
            <Skeleton
              variant="rectangular"
              height={36}
              sx={{
                borderRadius: 1,
                width: { xs: '100%', sm: 160 }
              }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Cards Grid Skeleton */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: { xs: 2, md: 3 }
      }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ position: 'relative' }}>
              <Skeleton
                variant="rounded"
                width="100%"
                sx={{ height: { xs: 160, sm: 180, md: 200 } }}
              />
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <Skeleton variant="rounded" width={70} height={24} />
              </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, md: 2 }, pb: 1 }}>
              <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={16} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="60%" height={16} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="70%" height={16} sx={{ mb: 1 }} />

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                <Skeleton variant="rounded" width={60} height={24} />
                <Skeleton variant="rounded" width={80} height={24} />
              </Box>

              <Skeleton variant="text" width="50%" height={14} />
            </CardContent>

            <Box sx={{ p: { xs: 1, md: 1.5 }, pt: 0 }}>
              <Box display="flex" gap={1}>
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
};

// Скелетон для таблицы категорий
export const AdminCategoriesGridSkeleton: React.FC = () => {
  return (
    <>
      {/* Controls Skeleton */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
      >
        <Skeleton variant="text" width={150} height={24} />
        <Skeleton
          variant="rectangular"
          height={36}
          sx={{
            borderRadius: 1,
            width: { xs: '100%', sm: 160 }
          }}
        />
      </Box>

      {/* Grid Skeleton */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ position: 'relative' }}>
              <Skeleton variant="rounded" width="100%" height={200} />
              <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                <Skeleton variant="circular" width={32} height={32} />
              </Box>
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <Skeleton variant="rounded" width={70} height={24} />
              </Box>
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="80%" height={24} sx={{ marginBottom: '8px' }} />
              <Box sx={{ marginBottom: '16px' }}>
                <Skeleton variant="text" width="60%" height={20} sx={{ marginBottom: '4px' }} />
                <Skeleton variant="text" width="50%" height={16} />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Skeleton variant="text" width="40%" height={16} />
                <Skeleton variant="text" width="30%" height={16} />
              </Box>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 2 }}>
              <Box display="flex" gap={1}>
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
              </Box>
              <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
};

// Скелетон для формы товара/категории
export const AdminFormDialogSkeleton: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <Dialog open={open} maxWidth="lg" fullWidth fullScreen>
      <DialogTitle>
        <Skeleton variant="text" width={200} height={32} />
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} pt={1}>
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />

          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, flex: 1 }} />
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, flex: 1 }} />
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, flex: 1 }} />
          </Box>

          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, flex: 1 }} />
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, flex: 1 }} />
          </Box>

          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />

          <Box>
            <Skeleton variant="text" width={200} height={20} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width={200} height={120} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
      </DialogActions>
    </Dialog>
  );
};

// Скелетон для дашборда
export const AdminDashboardSkeleton: React.FC = () => {
  return (
    <>
      {/* Header Skeleton */}
      <Box mb={4}>
        <Skeleton variant="text" width={300} height={48} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={400} height={32} />
      </Box>

      {/* Statistics Cards Skeleton */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Box key={index}>
            <Card sx={{
              height: '100%',
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
              border: '1px solid rgba(33, 150, 243, 0.2)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                  <Skeleton variant="rounded" width={48} height={48} />
                  <Skeleton variant="rounded" width={60} height={24} />
                </Box>
                <Skeleton variant="text" width={80} height={48} sx={{ mb: 1 }} />
                <Skeleton variant="text" width={120} height={20} />
                <Skeleton variant="text" width={100} height={16} sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Main Content Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        {/* Quick Actions */}
        <Box>
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Skeleton variant="text" width={180} height={32} sx={{ mb: 3 }} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Box key={index}>
                  <Card sx={{ height: '100%', borderRadius: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Skeleton variant="rounded" width={48} height={48} />
                        <Box flex={1}>
                          <Skeleton variant="text" width={140} height={24} sx={{ mb: 0.5 }} />
                          <Skeleton variant="text" width={180} height={16} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Recent Products */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Skeleton variant="text" width={180} height={32} />
              <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 1 }} />
            </Box>
            <Box>
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} sx={{ mb: 2, borderRadius: 2 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Skeleton variant="rounded" width={48} height={48} />
                      <Box flex={1}>
                        <Skeleton variant="text" width={200} height={20} sx={{ mb: 1 }} />
                        <Box display="flex" alignItems="center" gap={2}>
                          <Skeleton variant="rounded" width={80} height={20} />
                          <Skeleton variant="text" width={100} height={16} />
                        </Box>
                      </Box>
                      <Box textAlign="right">
                        <Skeleton variant="text" width={80} height={24} />
                        <Skeleton variant="text" width={60} height={16} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Sidebar */}
        <Box>
          {/* System Status */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Skeleton variant="text" width={120} height={24} sx={{ mb: 2 }} />
            <Box>
              {Array.from({ length: 3 }).map((_, index) => (
                <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Skeleton variant="circular" width={8} height={8} />
                    <Skeleton variant="text" width={80} height={16} />
                  </Box>
                  <Skeleton variant="text" width={60} height={16} />
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

// Скелетон для страницы контактов
export const AdminContactsSkeleton: React.FC = () => {
  return (
    <>
      {/* Header Skeleton */}
      <Box mb={4}>
        <Skeleton variant="text" width={250} height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={400} height={24} />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
        {/* Основная контактная информация */}
        <Box>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" width={180} height={24} />
            </Box>
            <Skeleton variant="rectangular" width="100%" height={1} sx={{ mb: 3 }} />

            <Box display="flex" flexDirection="column" gap={3}>
              <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
              <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
              <Box>
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
                <Skeleton variant="text" width={200} height={16} sx={{ mt: 0.5 }} />
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Режим работы */}
        <Box>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" width={120} height={24} />
            </Box>
            <Skeleton variant="rectangular" width="100%" height={1} sx={{ mb: 3 }} />

            <Box display="flex" flexDirection="column" gap={3}>
              <Box>
                <Skeleton variant="text" width={150} height={20} sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
                <Skeleton variant="text" width={250} height={16} sx={{ mt: 0.5 }} />
              </Box>
              <Box>
                <Skeleton variant="text" width={150} height={20} sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
                <Skeleton variant="text" width={250} height={16} sx={{ mt: 0.5 }} />
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Предварительный просмотр */}
        <Box>
          <Paper sx={{ p: 3 }}>
            <Skeleton variant="text" width={200} height={24} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" width="100%" height={1} sx={{ mb: 3 }} />

            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Skeleton variant="text" width={220} height={20} sx={{ mb: 2 }} />
                <Box sx={{ fontSize: '0.875rem' }}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Skeleton variant="circular" width={16} height={16} />
                      <Skeleton variant="text" width={180} height={16} />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Skeleton variant="text" width={120} height={20} sx={{ mb: 2 }} />
                <Box>
                  <Skeleton variant="text" width={160} height={16} />
                  <Skeleton variant="text" width={140} height={16} />
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Box>
      </Box>

      {/* Save Button Skeleton */}
      <Box mt={4} display="flex" justifyContent="center">
        <Skeleton variant="rectangular" width={250} height={48} sx={{ borderRadius: 1 }} />
      </Box>
    </>
  );
};

// Скелетон для операций (создание/обновление/удаление)
export const AdminOperationSkeleton: React.FC<{ type: 'create' | 'update' | 'delete' }> = () => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999
      }}
    >
      <Skeleton variant="circular" width={60} height={60} />
      <Skeleton variant="text" width={120} height={24} />
    </Box>
  );
};