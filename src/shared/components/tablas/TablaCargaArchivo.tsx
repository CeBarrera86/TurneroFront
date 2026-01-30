import React, { useState, useRef } from 'react';
import {
  Typography,
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
  LinearProgress,
  Stack,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import type { ArchivoAdjunto } from '@/domain/models/forms';

interface TablaCargaArchivoProps {
  label?: string;
  nombre: string;
  maxSizeMB?: number;
  onChange: (archivos: ArchivoAdjunto[]) => void;
}

const TablaCargaArchivo = ({ label, nombre, maxSizeMB = 15, onChange }: TablaCargaArchivoProps) => {
  const [archivos, setArchivos] = useState<ArchivoAdjunto[]>([]);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const extensionesPermitidas = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm', 'avi'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    const archivosValidos = files.filter((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      return extensionesPermitidas.includes(ext);
    });

    if (archivosValidos.length !== files.length) {
      setError('Uno o más archivos tienen un formato no permitido.');
      return;
    }

    const archivosConEstado: ArchivoAdjunto[] = archivosValidos.map((file) => ({
      file,
      nombre: file.name,
      activa: true,
      sizeMB: file.size / (1024 * 1024),
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

  const handleCheckActivo = (index: number) => {
    const actualizados = archivos.map((f, i) => (i === index ? { ...f, activa: !f.activa } : f));
    setArchivos(actualizados);
    onChange(actualizados);
  };

  const totalSizeMB = archivos.reduce((acc, f) => acc + f.sizeMB, 0);
  const porcentaje = Math.min((totalSizeMB / maxSizeMB) * 100, 100);

  return (
    <Stack spacing={2}>
      <div>
        <input
          type="file"
          multiple
          hidden
          ref={inputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
          name={nombre}
        />
        <TextField
          value={archivos.map((a) => a.nombre).join(', ')}
          placeholder={label || 'Seleccione archivo(s)... (jpg, png, gif, mp4, webm, avi)'}
          fullWidth
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Tooltip title="Adjuntar archivo(s)">
                <IconButton onClick={() => inputRef.current?.click()}>
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
            ),
          }}
        />
      </div>

      {error && (
        <Alert severity="error">{error}</Alert>
      )}

      {archivos.length > 0 && (
        <>
          <div>
            <Typography variant="body2" gutterBottom>
              Tamaño total: {totalSizeMB.toFixed(2)} MB / {maxSizeMB} MB
            </Typography>
            <LinearProgress variant="determinate" value={porcentaje} />

          </div>
          <div>
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
                      <Checkbox checked={archivo.activa} onChange={() => handleCheckActivo(index)} />
                    </TableCell>
                    <TableCell>{archivo.sizeMB.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </Stack>
  );
};

export default TablaCargaArchivo;
