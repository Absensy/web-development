'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert, Snackbar, AlertColor } from '@mui/material';

interface AlertMessage {
  id: string;
  message: string;
  severity: AlertColor;
  duration?: number;
}

interface AlertContextType {
  showAlert: (message: string, severity?: AlertColor, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const showAlert = useCallback((message: string, severity: AlertColor = 'info', duration: number = 4000) => {
    const id = Date.now().toString();
    const newAlert: AlertMessage = {
      id,
      message,
      severity,
      duration,
    };

    setAlerts(prev => [...prev, newAlert]);

    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, duration);
  }, []);

  const showSuccess = useCallback((message: string, duration?: number) => {
    showAlert(message, 'success', duration);
  }, [showAlert]);

  const showError = useCallback((message: string, duration?: number) => {
    showAlert(message, 'error', duration);
  }, [showAlert]);

  const showWarning = useCallback((message: string, duration?: number) => {
    showAlert(message, 'warning', duration);
  }, [showAlert]);

  const showInfo = useCallback((message: string, duration?: number) => {
    showAlert(message, 'info', duration);
  }, [showAlert]);

  const handleClose = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const value: AlertContextType = {
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      {alerts.map((alert, index) => (
        <Snackbar
          key={alert.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            top: `${80 + index * 70}px !important`, // Stack multiple alerts
          }}
        >
          <Alert
            severity={alert.severity}
            onClose={() => handleClose(alert.id)}
            sx={{
              width: '100%',
              minWidth: 300,
              boxShadow: 3,
            }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </AlertContext.Provider>
  );
};