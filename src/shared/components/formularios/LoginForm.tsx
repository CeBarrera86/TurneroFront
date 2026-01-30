import React from 'react';
import { Box, TextField, Button, Typography, Paper, useTheme, InputAdornment } from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LockIcon from '@mui/icons-material/Lock';

interface LoginFormProps {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  message: string;
  loading: boolean;
  setMessage: (value: string) => void;
}

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  message,
  loading,
  setMessage,
}: LoginFormProps) => {
  const theme = useTheme();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setMessage('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setMessage('');
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 0,
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        overflow: 'hidden',
        background: theme.palette.background.layout,
      }}
    >
      <Box
        sx={{
          background: theme.palette.success.main,
          color: theme.palette.success.contrastText,
          borderRadius: '12px 12px 0 0',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Identifíquese
        </Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center', color: theme.palette.text.primary }}>
          Ingrese sus credenciales
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
            disabled={loading}
            autoComplete="username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FingerprintIcon sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={handlePasswordChange}
            disabled={loading}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
          />

          {message && (
            <Typography
              variant="body2"
              sx={{
                color: message.includes('exitoso') ? theme.palette.success.main : theme.palette.error.main,
                textAlign: 'center',
              }}
              aria-live="polite"
            >
              {message}
            </Typography>
          )}
          <Button variant="text" color="success" type="submit" disabled={loading} sx={{ mt: 1, fontWeight: 'bold' }}>
            {loading ? 'Cargando...' : 'Ingresar'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginForm;
