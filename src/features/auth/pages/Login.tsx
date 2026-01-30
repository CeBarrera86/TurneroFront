import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, styled, ThemeProvider } from '@mui/material';
import NavbarGuest from '@/shared/layouts/NavbarGuest';
import Footer from '@/shared/layouts/Footer';
import LoginForm from '@/shared/components/formularios/LoginForm';
import appTheme from '@/shared/theme/Themes';
import backgroundImage from '@/assets/img/corpico_central.jpg';
import { useAuth } from '@/shared/auth/useAuth';
import { getFriendlyErrorMessage, NetworkError } from '@/data/http/httpClient';
import { HttpError, loginRequest } from '@/features/auth/controllers/authController';

const RootContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

const MainContent = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = await loginRequest(username, password);

      login(data);
      setMessage('Inicio de sesión exitoso. Redirigiendo...');
      navigate('/');
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        setMessage('Error: Credenciales inválidas');
      } else if (error instanceof NetworkError) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage(`Error: ${getFriendlyErrorMessage(error)}`);
      }
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={appTheme}>
      <RootContainer>
        <NavbarGuest />
        <MainContent>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            message={message}
            loading={loading}
            setMessage={setMessage}
          />
        </MainContent>
        <Footer />
      </RootContainer>
    </ThemeProvider>
  );
};

export default Login;
