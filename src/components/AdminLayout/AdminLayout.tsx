'use client';

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../AdminSidebar/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    // Проверка аутентификации теперь происходит через middleware
    // Если пользователь попал сюда, значит middleware его пропустил
  }, [router]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          pt: { xs: '56px', sm: '64px' },
          width: { xs: '100%', md: 'calc(100% - 280px)' },
          ml: { xs: 0, md: 0 },
          transition: 'all 0.3s ease',
          overflowX: 'hidden'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;