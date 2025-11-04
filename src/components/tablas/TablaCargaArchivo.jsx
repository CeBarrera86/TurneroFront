import React, { useState, useRef } from 'react';
import {
  Typography,
  Grid,
  Box,
  TextField,
  IconButton,
  Tooltip,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  LinearProgress
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const TablaCargaArchivo = ({ label, nombre, maxSizeMB = 15, onChange }) => {
  const [archivos, setArchivos] = useState([]);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const extensionesPermitidas = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm', 'avi'];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const archivosValidos = files.filter((file) => {
      const ext = file.name.split('.').pop().toLowerCase();
      return extensionesPermitidas.includes(ext);
    });

    if (archivosValidos.length !== files.length) {
      setError('Uno o más archivos tienen un formato no permitido.');
      return;
    }

    const archivosConEstado = archivosValidos.map((file) => ({
      file,
      nombre: file.name,
      activa: true,
      sizeMB: file.size / (1024 * 1024)
    }));

    const totalSize = archivosConEstado.reduce((acc, f) => acc + f.sizeMB, 0);
    if (totalSize > maxSizeMB) {
      setError(`El tamaño total supera los ${maxSizeMB} MB.`);
      return;
    }

    setError('');
    setArchivos(archivosConEstado);
    onChange(archivosConEstado);
  };

  const handleCheckActivo = (index) => {
    const actualizados = archivos.map((f, i) =>
      i === index ? { ...f, activa: !f.activa } : f
    );
    setArchivos(actualizados);
    onChange(actualizados);
  };

  const totalSizeMB = archivos.reduce((acc, f) => acc + f.sizeMB, 0);
  const porcentaje = Math.min((totalSizeMB / maxSizeMB) * 100, 100);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <input
          type="file"
          multiple
          hidden
          ref={inputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
        />
        <TextField
          value={archivos.map((a) => a.nombre).join(', ')}
          placeholder={label || 'Seleccione archivo(s)... (jpg, png, gif, mp4, webm, avi)'}
          fullWidth
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Tooltip title="Adjuntar archivo(s)">
                <IconButton onClick={() => inputRef.current.click()}>
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
            ),
          }}
        />
      </Grid>

      {error && (
        <Grid size={{ xs: 12 }}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}

      {archivos.length > 0 && (
        <>
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" gutterBottom>
              Tamaño total: {totalSizeMB.toFixed(2)} MB / {maxSizeMB} MB
            </Typography>
            <LinearProgress variant="determinate" value={porcentaje} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Archivo</TableCell>
                  <TableCell>Activo</TableCell>
                  <TableCell>Tamaño (MB)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {archivos.map((archivo, index) => (
                  <TableRow key={archivo.nombre}>
                    <TableCell>{archivo.nombre}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={archivo.activa}
                        onChange={() => handleCheckActivo(index)}
                      />
                    </TableCell>
                    <TableCell>{archivo.sizeMB.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default TablaCargaArchivo;