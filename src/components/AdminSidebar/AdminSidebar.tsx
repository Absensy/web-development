'use client';

import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  Dashboard,
  Article,
  Inventory,
  Category,
  ContactPhone,
  ExitToApp,
  Menu as MenuIcon,
  Home,
  PhotoLibrary
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import LogoGranitPrimary1Icon from '@/icons/LogoGranitPrimary1';

interface AdminSidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
  { text: 'Контент', icon: <Article />, path: '/admin/content' },
  { text: 'Товары', icon: <Inventory />, path: '/admin/products' },
  { text: 'Категории', icon: <Category />, path: '/admin/categories' },
  { text: 'Примеры работ', icon: <PhotoLibrary />, path: '/admin/examples-work' },
  { text: 'Контакты', icon: <ContactPhone />, path: '/admin/contacts' },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      router.push('/admin');
    }
  };

  const handleBackToSite = () => {
    router.push('/');
  };


  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{
        p: { xs: 1.5, md: 2 },
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        minHeight: { xs: '60px', md: '70px' }
      }}>
        <Box sx={{
          '& svg': {
            width: { xs: 28, md: 32 },
            height: { xs: 28, md: 32 }
          }
        }}>
          <LogoGranitPrimary1Icon />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#333',
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          Админ-панель
        </Typography>
      </Box>

      <Divider />

      {/* Navigation */}
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={pathname === item.path}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 1,
                py: { xs: 1, md: 1.5 },
                '&.Mui-selected': {
                  backgroundColor: '#333',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#555',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: { xs: 36, md: 40 },
                  color: pathname === item.path ? 'white' : '#666',
                  '& svg': {
                    fontSize: { xs: '1.25rem', md: '1.5rem' }
                  }
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: { xs: '0.875rem', md: '1rem' }
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Footer actions */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleBackToSite}
            sx={{
              mx: 1,
              borderRadius: 1,
              py: { xs: 1, md: 1.5 }
            }}
          >
            <ListItemIcon sx={{
              minWidth: { xs: 36, md: 40 },
              color: '#666',
              '& svg': {
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }
            }}>
              <Home />
            </ListItemIcon>
            <ListItemText
              primary="На сайт"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              mx: 1,
              borderRadius: 1,
              color: '#d32f2f',
              py: { xs: 1, md: 1.5 }
            }}
          >
            <ListItemIcon sx={{
              minWidth: { xs: 36, md: 40 },
              color: '#d32f2f',
              '& svg': {
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }
            }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText
              primary="Выйти"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Modern Admin Header */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: '#333',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Toolbar sx={{
          minHeight: { xs: '56px', sm: '64px' },
          px: { xs: 2, sm: 3 },
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Left side - Logo and Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                color: '#333',
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{
                '& svg': {
                  width: { xs: 32, sm: 36 },
                  height: { xs: 32, sm: 36 }
                }
              }}>
                <LogoGranitPrimary1Icon />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#333',
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    lineHeight: 1.2
                  }}
                >
                  Админ-панель
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#666',
                    fontSize: '0.75rem',
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  Granit Memory
                </Typography>
              </Box>
            </Box>
          </Box>


          {/* Right side - Empty for now */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Empty space for future actions */}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Desktop sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: { xs: 280, lg: 280 },
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: { xs: 280, lg: 280 },
              boxSizing: 'border-box',
              borderRight: '1px solid #e0e0e0',
              boxShadow: '2px 0 4px rgba(0,0,0,0.1)'
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: { xs: 280, sm: 300 },
              boxSizing: 'border-box',
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default AdminSidebar;