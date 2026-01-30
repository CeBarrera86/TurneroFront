import React, { useState } from 'react';
import { Box, styled, Typography, Container } from '@mui/material';

const StyledFooter = styled(Box)(({ theme }) => {
  return {
    backgroundColor: theme.palette.corpico.terciario.main,
    color: theme.palette.corpico.terciario.contrastText,
    boxShadow: '0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(0, 0, 0, .4)',
    borderRadius: '12px',
    position: 'relative',
    overflow: 'hidden',
    height: '65px',
    display: 'flex',
    alignItems: 'center',
  };
});

const GradientLine = styled(Box)(({ theme }) => {
  const borderColorsForGradient = [
    theme.palette.corpico.azul,
    theme.palette.corpico.violeta,
    theme.palette.corpico.rojo,
    theme.palette.corpico.naranja,
    theme.palette.corpico.amarillo,
    theme.palette.corpico.verde,
    theme.palette.corpico.celeste,
  ];

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: `linear-gradient(to right, ${borderColorsForGradient.join(', ')})`,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
  };
});

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <StyledFooter>
      <GradientLine />
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Typography variant="body2" color="inherit">
            Corpico &copy; <span>{currentYear}</span>. Turnero creado por <strong>Sección Sistemas</strong>.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
