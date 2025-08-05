import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const TurnoCard = ({ title, buttonText, onClick, backgroundColor }) => {
  return (
    <Card
      sx={{
        backgroundColor: backgroundColor,
        borderRadius: '12px',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '150px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color="black" fontWeight="bold">
          {title}
        </Typography>
        <Button
          variant="contained"
          onClick={onClick}
          sx={{
            mt: 2,
            backgroundColor: 'corpico.verde',
            '&:hover': {
              backgroundColor: 'corpico.verde',
            },
          }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TurnoCard;