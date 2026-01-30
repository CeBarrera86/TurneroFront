import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import CrearForm from '@/shared/components/formularios/CrearForm';
import { createUsuario, getRoles } from '@/features/usuarios/controllers/usuariosController';
import type { CampoConfig, CampoOption } from '@/domain/models/forms';

interface OutletContextValue {
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
}

const CrearUsuario = () => {
  const { setTitulo } = useOutletContext<OutletContextValue>();
  const navigate = useNavigate();
  const [opcionesRol, setOpcionesRol] = useState<CampoOption[]>([]);

  useEffect(() => {
    setTitulo('Crear Usuario');
    const token = sessionStorage.getItem('token') ?? '';
    getRoles(token)
      .then((data) => {
        const opciones = data.map((r) => ({ value: r.id as any, label: r.tipo ?? r.nombre ?? '—' }));
        setOpcionesRol(opciones);
      })
      .catch((err) => console.error('Error al cargar roles:', err));
  }, [setTitulo]);

  const campos: CampoConfig[] = [
    { nombre: 'nombre', label: 'Nombre', tipo: 'text', requerido: true },
    { nombre: 'apellido', label: 'Apellido', tipo: 'text', requerido: true },
    { nombre: 'username', label: 'Username', tipo: 'text', requerido: true },
    { nombre: 'rolId', label: 'Rol', tipo: 'select', opciones: opcionesRol, requerido: true },
  ];

  const handleSuccess = () => {
    navigate('/usuarios');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <CrearForm
        campos={campos}
        onSubmit={(payload, token) => createUsuario(payload as any, token ?? '')}
        onSuccess={handleSuccess}
        volverA="/usuarios"
      />
    </Box>
  );
};

export default CrearUsuario;
