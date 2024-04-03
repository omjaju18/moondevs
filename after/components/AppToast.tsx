import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface AppToastProps {
  position: { vertical: 'top' | 'bottom', horizontal: 'left' | 'center' | 'right' };
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  onClose?: () => void;
}

const AppToast: React.FC<AppToastProps> = ({ position, message, severity, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={position}
      open={Boolean(message)}
      autoHideDuration={5000}
      onClose={onClose}
    >
      <SnackbarContent style={{ backgroundColor: 'transparent' }}>
        <Alert severity={severity} onClose={onClose}>
          {message}
        </Alert>
      </SnackbarContent>
    </Snackbar>
  );
};

export default AppToast;
